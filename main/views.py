from django.core.exceptions import EmptyResultSet
from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
# from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from newsapi import NewsApiClient
from .models import *
from . import util
from urllib.request import urlopen
from bs4 import BeautifulSoup

# Create your views here.
#Homepage
def index(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/profile')
    context = {
        'categorydropdown': Category.objects.all() 
    }
    return render(request, "main/index.html", context)

#users main page with profile info
@login_required(login_url='/login')
def profile(request):
    user = request.user
    context = {
        'user': user,
        'categorydropdown': Category.objects.all(),
        'profile': Profile.objects.get(user=user)
    }
    return render(request, "main/profile.html", context)
      
#shows all discussions user is part
@login_required(login_url='/login')
def discussions(request):
    discussions = Discussion.objects.all()
    context = {
        'discussions': discussions,
        'categorydropdown': Category.objects.all() 
    }
    return render(request, "main/discussions.html", context)

# loads the discussion page
@login_required(login_url='/login')
def discussion(request, discussion_id):
    discussion = Discussion.objects.get(pk=discussion_id)
    user = request.user
    #check if discusiion is private and user is joined
    if discussion.private is True:
        joined = []
        members = DiscussionMember.objects.filter(discussion=discussion)
        for memeber in members:
            joined.append(memeber.member)
        if user in joined:
            context = {
                'discussion': discussion,
                'members': members,
                'count': members.count(),
                'user': user,
                'categorydropdown': Category.objects.all() 
            }
            return render(request, "main/discussion.html", context)
        else:
            return HttpResponseRedirect('/profile')
    else:
        context = {
                    'discussion': discussion,
                    'categorydropdown': Category.objects.all() 
                }
        return render(request, "main/discussion.html", context)

# post fetch request to save new discussion to website
@login_required(login_url='/login')
def startDiscussion(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            user = request.user
            url = request.POST['url']
            bool = request.POST['bool']
            category = request.POST['category']
            if url not in util.get_user_saved_articles_urls(user):
                return JsonResponse([{'message': 'Please save article before starting discussion' }, {'id': ''}], safe=False)
            if 'True' in bool:
                private = util.start_private_discussion(url,category,user,bool)
                return JsonResponse([{'message': 'New Private Discussion started' }, {'id': private}], safe=False)
            elif 'False' in bool:
                public = util.start_public_discussion(url,category,user,bool)
                return JsonResponse([{'message': 'New Public Discussion started' }, {'id': public}], safe=False)
        return JsonResponse([{'message': 'nothing happened' },{'id': ''}], safe=False)

# post fetch request to delete discussion
@login_required(login_url='/login')
def deleteDiscussion(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            id = request.POST['object_id']
            getDiscussion = Discussion.objects.get(pk=id)
            getDiscussion.delete()
            return JsonResponse({'message': 'ok' })

#fetch request to get discussions by category in the discussions view
@login_required(login_url='/login')  
def getDiscussionsByCategory(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            user = request.user
            category = request.POST['category']
            c = Category.objects.get(categories=category)
            discussions = Discussion.objects.all().filter(category=c)
            notusers = discussions.exclude(owner=user)
            requested = DiscussionRequest.objects.all().filter(user=user, approved=False)
            approved = DiscussionRequest.objects.all().filter(user=user, approved=True)
            requestedtojoin = []
            approvedtrue = []
            for disc in requested:
                requestedtojoin.append(disc.discussion)
            for disc in approved:
                approvedtrue.append(disc.discussion)
            finallist = []
            for disc in notusers:
                if disc not in approvedtrue:
                    finallist.append(disc)
            send = []
            id = 0
            for d in finallist:
                id += 1
                if d in requestedtojoin:
                    isrequested = True
                else:
                    isrequested = False
                membercount = d.members.all().count() - 1
                commentcount = d.comments.all().count()
                labels = ['id', 'object_id', 'title', 'url', 'owner','private', 'requested', 'membercount', 'commentcount', 'urltoimage']
                info=[id, d.id, d.article.title, d.article.url,d.owner.username, d.private, isrequested, membercount, commentcount, d.article.urltoimage]
                data = dict(zip(labels,info))
                send.append(data)
            return JsonResponse(send, safe=False)

# post fetch request to create a new discussion request
@login_required(login_url='/login')  
def privateDiscussionRequest(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            user = request.user
            id = request.POST['object_id']
            d = Discussion.objects.get(pk=id)
            DiscussionRequest.objects.create(user=user, discussion=d, approved=False)
        return JsonResponse({'message': 'ok'})

#loads news page to show retrieved news from newsAPI
@login_required(login_url='/login')
def news(request, category):
    context = {
        'categorydropdown': Category.objects.all(), 
        'category': category
    }
    return render(request, 'main/news.html', context)

#works with util.py to retrieve news from API and prepare the data
@login_required(login_url='/login')  
def getNews(request, category):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        try:
            key = '2de4a375ca274e75ba3a89300363b38b'
            api = NewsApiClient(api_key=key)
            news = api.get_top_headlines(country='us', category=category)
            articles = util.prepare_news(news, category)
            return JsonResponse(articles, safe=False)
        except EmptyResultSet:
            return JsonResponse({'error': 'something went wrong please try later' })

# post fetch request to save article and create new relationship to save to users profile. 
@login_required(login_url='/login')  
def saveArticle(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            user = request.user
            url = request.POST['url']
            c = request.POST['category']
            category = Category.objects.get(categories=c)
            #check if article is in database
            urls = util.get_saved_articles()
            if url not in urls:
                newArticle = util.save_new_article(request, user, url, category)
                return JsonResponse({'message': newArticle.title + ' saved to your profile' })
            else:
                try:
                    #Check if article is already saved in user account
                    urls = util.get_user_saved_articles_urls(user)
                    if url in urls:
                        return JsonResponse({'message': 'This article is already saved in your account' })
                except ArticleRelationship.DoesNotExist:
                    pass
                articleSaved = util.save_new_Articlerelationship(user, url)
                return JsonResponse({'message': articleSaved.title + ' saved to your profile' })

#get three articles for the homepage
@csrf_exempt
def getArticles(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        # assign how many articles to retrieve for homepage
        articles = util.get_articles(3) 
        return JsonResponse(articles, safe=False)

# post fetch request to delete article from user account
@login_required(login_url='/login')  
def deleteArticle(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            user = request.user
            id = request.POST['object_id']
            article = Article.objects.get(pk=id)
            all = ArticleRelationship.objects.all().filter(article=article)
            # check if there are more saved articles for other users, if yes do not delete it, remove article relationship only
            if len(all) == 1:
                article.delete()
            else:
                getRelationship = ArticleRelationship.objects.get(user=user, article=article)
                getRelationship.delete()
            return JsonResponse({'message': 'ok' })
                
# get user data to display on profile page
@login_required(login_url='/login')  
def getProfileData(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            user = request.user
            userArticles = util.get_user_saved_articles_urls(user)
            userDiscussions = util.get_users_discussions(user)
            userMember = util.get_discussion_member(user)
            userPendingRequests = util.get_pending_requests(user)
            yourSavedArticles = []
            YourDiscussions = []
            JoinedPrivateDiscussions = []
            pendingRequests = []
            send = {}
            send['yourSavedArticles'] = yourSavedArticles
            send['YourDiscussions'] = YourDiscussions
            send['JoinedPrivateDiscussions'] = JoinedPrivateDiscussions
            send['pendingRequests'] = pendingRequests
            # get all articles saved by user
            id = 0
            if userArticles is not None:
                for a in userArticles:
                    article = Article.objects.get(url=a)
                    id += 1
                    c = article.category.get()
                    labels = ['id', 'object_id', 'name', 'author', 'title', 'description', 'url', 'urlToImage', 'publishedAt', 'category', 'howmanydiscussions']
                    info = [id, article.id,article.name,article.author,article.title,article.description,article.url,article.urltoimage,article.publishedat,c.categories,article.discussions.all().count()]
                    data = dict(zip(labels, info))
                    yourSavedArticles.append(data)
             # get all discussions started by user
            id_d = 0
            if userDiscussions is not None:
                for article in userDiscussions:
                    id_d += 1
                    c = article.article.category.get()
                    data = util.get_profile_data(article, c, id_d)
                    YourDiscussions.append(data)
            # get all private discussions users joined
            id_m = 0
            if userMember is not None:
                for article in userMember:
                    id_m += 1
                    c = article.article.category.get()
                    data = util.get_profile_data(article, c, id_m)
                    JoinedPrivateDiscussions.append(data)
            # pending private discusison requests
            id_r = 0
            if userPendingRequests is not None:
                for r in userPendingRequests:
                    id_r+= 1
                    c = r.discussion.category.get()
                    discussion = r.discussion
                    labels = ['id', 'object_id', 'name', 'author', 'title', 'description', 'url', 'urlToImage', 'publishedAt', 'category','private', 'howmanyrequests', 'howmanycomments', 'owner', 'membercount']
                    info = [id_r, r.id,discussion.article.name,discussion.article.author,discussion.article.title,discussion.article.description,discussion.article.url,discussion.article.urltoimage,discussion.article.publishedat,c.categories, discussion.private, discussion.requests.all().exclude(approved=True).count(), discussion.comments.all().count(), discussion.owner.username, discussion.members.all().count()-1]
                    data = dict(zip(labels, info))
                    pendingRequests.append(data)
            return JsonResponse(send, safe=False)

# post fetch request to update the users first and last name
@login_required(login_url='/login')  
def updateProfile(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            user = request.user
            fname = request.POST['fname']
            lname = request.POST['lname']
            if fname != "":
                user.first_name = fname.capitalize()
                user.save()
            if lname != "":
                user.last_name = lname.capitalize()
                user.save()
            return JsonResponse({'message': 'ok'})

# post fetch request to get a list of discussion requests to show on private discussion page
@login_required(login_url='/login')
def getDiscussionRequests(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            discussion_id = request.POST['discussion_id']
            d = Discussion.objects.get(pk=discussion_id)
            requests = DiscussionRequest.objects.all().filter(discussion=d, approved=False)
            send = []
            id = 0
            try:
                for r in requests:
                    id += 1
                    labels = ['id','object_id','discussion_id','name', 'user_id']
                    info = [id, r.id, r.discussion.id, r.user.username]
                    data = dict(zip(labels,info))
                    send.append(data)
                return JsonResponse(send, safe=False)
            except EmptyResultSet:
                pass

#fetch comments and replies
def getComments(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        discussion_id = request.POST['discussion_id']
        discussion = Discussion.objects.get(pk=discussion_id)
        comments = Comment.objects.all().filter(discussion=discussion)
        send = []
        for comment in comments:
            commentreplies = []
            commentlabels = ['comment_id','name','comment', 'date', 'replys']
            commentinfo = [comment.id, comment.user.username, comment.comment, comment.date, commentreplies]
            replys = Reply.objects.all().filter(comment=comment)
            for reply in replys:
                replylabels = ['reply_id','name','reply', 'date']
                replyinfo = [reply.id, reply.user.username, reply.reply, reply.date]
                replies = dict(zip(replylabels,replyinfo))
                commentreplies.append(replies)
            comments = dict(zip(commentlabels,commentinfo))
            send.append(comments)
        return JsonResponse(send, safe=False)

# delete a comment   
@login_required(login_url='/login')
def deleteComment(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:      
        id = request.POST['id']
        type = request.POST['type']
        if type == 'reply':
            deletereply = Reply.objects.get(pk=id)
            deletereply.delete()
        else:
            deletecomment = Comment.objects.get(pk=id)
            deletecomment.delete()
        return JsonResponse({'message': 'ok'})

#add comment
@login_required(login_url='/login')
def addComment(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:   
        if request.user.is_authenticated:
            user = request.user
            id = request.POST['id']
            text = request.POST['text']
            type = request.POST['type']
            if type == "reply":
               comment = Comment.objects.get(pk=id)
               Reply.objects.create(user=user,reply=text, comment=comment, date=timezone.now())
            else:
                discussion = Discussion.objects.get(pk=id)
                Comment.objects.create(user=user,comment=text,discussion=discussion,date=timezone.now())
            return JsonResponse({'message': 'ok'})

# loads list of members for specified discussion
@login_required(login_url='/login')
def loadMembers(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:   
        if request.user.is_authenticated:
            user = request.user
            discussion_id = request.POST['discussion_id']
            discussion = Discussion.objects.get(pk=discussion_id)
            userInstance = DiscussionMember.objects.get(member=user,discussion=discussion)
            members = discussion.members.all().exclude(discussionmember=userInstance)
            send = []
            for member in members:
                id = DiscussionMember.objects.get(member=member,discussion=discussion)
                labels = ['object_id', 'name']
                info = [id.id, member.username]
                memberdata = dict(zip(labels,info))
                send.append(memberdata)
            return JsonResponse(send, safe=False)

# deletes member
@login_required(login_url='/login')
def deleteMember(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:   
        if request.user.is_authenticated:
            id = request.POST['id']
            member = DiscussionMember.objects.get(pk=id)
            member.delete()
        return JsonResponse({'message':'ok'})

# cancel a request to join a discussion
@login_required(login_url='/login')
def cancelRequest(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:   
        if request.user.is_authenticated:
            id = request.POST['id']
            r = DiscussionRequest.objects.get(pk=id)
            r.delete()
        return JsonResponse({'message':'ok'})

# user can leave a discussion
@login_required(login_url='/login')     
def leaveDiscussion(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:   
        if request.user.is_authenticated:
            user = request.user
            id = request.POST['id']
            discussion = Discussion.objects.get(pk=id)
            membership = DiscussionMember.objects.get(member=user, discussion=discussion)
            membership.delete()
            request = DiscussionRequest.objects.get(user=user, discussion=discussion)
            request.delete()
        return JsonResponse({'message': 'ok'})
        
# loads create page to scrape and parse articles using urls 
@login_required(login_url='/login')  
def create(request):
    context = {
        'categorydropdown': Category.objects.all() 
    }
    return render(request, 'main/create.html', context)

# when user submits url i use BeautifulSoup library to give me access to search meta data and extract its content, which i then send back to user to manipulate and save. 
@login_required(login_url='/login')  
def scrape(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            url = request.POST['url']
            urltoscrape = url
            html = urlopen(urltoscrape).read()
            article = BeautifulSoup(html, features="html.parser")
            send = []
            title = article.find("meta",  {"property":"og:title"}) #title
            urltoimage = article.find("meta",  {"property":"og:image"}) #urltoimage
            description = article.find("meta",  {"property":"og:description"})#description
            url = article.find("meta",  {"property":"og:url"})#url
            author = article.find("meta",  {"property":"og:site_name"})#author
            name = article.find("meta",  {"property":"og:site_name"})
            #category
            title = title["content"] if title else "Empty"
            urltoimage = urltoimage["content"] if urltoimage else "Empty"
            description = description["content"] if description else "Empty"
            url = url["content"] if url else "Empty"
            author = author["content"] if author else "Empty"
            name = name["content"] if name else "Empty"
            if title is not None and urltoimage is not None and description is not None and author is not None:
                labels = ['name','title', 'description', 'urltoimage', 'author', 'url']
                info = [name,title,description,urltoimage,author, url]
                data = dict(zip(labels,info))
                send.append(data)
            return JsonResponse(send, safe=False)

# saves the scraped article to database and creates a relationship with user. checks if article is already in databse to avoid duplicates
@login_required(login_url='/login')  
def saveScrapedArticle(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            user = request.user
            url = request.POST['url']
            c = request.POST['category']
            category = Category.objects.get(categories=c)
            #check if article is in database
            urls = util.get_saved_articles()
            if url not in urls:
                author = request.POST['author']
                description = request.POST['description']
                name = request.POST['name']
                title = request.POST['title']
                urlToImage = request.POST['urltoimage']
                newArticle = Article.objects.create(name=name,author=author,title=title,description=description,url=url,urltoimage=urlToImage,publishedat=timezone.now())
                newArticle.category.add(category)
                ArticleRelationship.objects.create(user=user,article=newArticle)
                return JsonResponse({'message': newArticle.title + ' saved to your profile' })
            else:
                try:
                    #Check if article is already saved in user account
                    urls = util.get_user_saved_articles_urls(user)
                    if url in urls:
                        return JsonResponse({'message': 'This article is already saved in your account' })
                except ArticleRelationship.DoesNotExist:
                    pass
                articleSaved = util.save_new_Articlerelationship(user, url)
                return JsonResponse({'message': articleSaved.title + ' saved to your profile' })