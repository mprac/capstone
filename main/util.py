from .models import *
import json
from django.utils import timezone
from django.http import JsonResponse, HttpResponseRedirect

#get all saved articles
def get_saved_articles():
    getArticles = Article.objects.all() 
    urls = []
    for article in getArticles:
        urls.append(article.url)
    return urls

#get user articles
def get_user_saved_articles(user):
    r = ArticleRelationship.objects.all().filter(user=user)
    return json(r)

#get all url articles for user
def get_user_saved_articles_urls(user):
    r = ArticleRelationship.objects.all().filter(user=user)
    urls = []
    for a in r:
        urls.append(a.article.url)
    return urls

#get pending requests
def get_pending_requests(user):
    requests = DiscussionRequest.objects.all().filter(user=user, approved=False)
    return requests

# save new article to DB then create relationship
def save_new_article(request, user, url, category):
    author = request.POST['author']
    description = request.POST['description']
    name = request.POST['name']
    publishedAt = request.POST['publishedAt']
    title = request.POST['title']
    urlToImage = request.POST['urlToImage']
    newArticle = Article.objects.create(name=name,author=author,title=title,description=description,url=url,urltoimage=urlToImage,publishedat=publishedAt)
    newArticle.category.add(category)
    ArticleRelationship.objects.create(user=user,article=newArticle)
    return newArticle

# create relationship using existing article
def save_new_Articlerelationship(user, url):
    article = Article.objects.get(url=url)
    ArticleRelationship.objects.create(user=user,article=article)
    return article

#Prepare articles retrived from API to use in application
def prepare_news(news, category):
    articles = []
    id = 0
    for article in news['articles']:
        try:
            name =  article['source']['name']
            author = article['author']
            title = article['title']
            description = article['description']
            url = article['url']
            urlToImage = article['urlToImage']
            publishedat = article['publishedAt']
            category = category
            if name is not None and author is not None and title is not None and url is not None and urlToImage is not None and description is not None and publishedat is not None and len(name) > 0 and len(author) > 0 and len(title) > 0 and len(url) > 0 and len(urlToImage) > 0 and len(description) > 0 and len(publishedat) > 0:
                id += 1
                labels = ['id', 'name', 'author', 'title', 'description', 'url', 'urlToImage', 'publishedAt', 'category']
                info = [id,name,author,title,description,url,urlToImage,publishedat,category]
                data = dict(zip(labels,info))
                articles.append(data)
        except TypeError:
            pass
    return articles

#Start private discussion
def start_private_discussion(url, category, user, bool):
    article = Article.objects.get(url=url)
    category = Category.objects.get(categories=category)
    private = Discussion.objects.create(owner=user, article=article, private=bool)
    private.category.add(category)
    DiscussionMember.objects.create(member=user,discussion=private, date_joined=timezone.now())
    return private.id

#Start public discussion
def start_public_discussion(url,category, user, bool):
    article = Article.objects.get(url=url)
    category = Category.objects.get(categories=category)
    public = Discussion.objects.create(owner=user, article=article, private=bool)
    public.category.add(category)
    return public.id

#get four articles to display data on homepage
def get_articles(number):
    four = []
    id = 0
    count = 0
    articles = Article.objects.all()
    for article in articles:
        if count < number:
            data = {}
            id += 1
            data['urltoimage'] = article.urltoimage
            data['title'] = article.name
            data['description'] = article.title
            data['author'] = article.author
            data['id'] = id
            count += 1
            four.append(data)
    return four

####### DISCUSSIONS #########
# get users saved discussions
def get_users_discussions(user):
    d = Discussion.objects.all().filter(owner=user)
    return d

# get private discussions user is a member of
def get_discussion_member(user):
    e = Discussion.objects.all().exclude(owner=user)
    d = e.all().filter(members=user, private=True)
    return d

# get profile data and converting the data to a dictionary using zip()
def get_profile_data(article, c, id):
    labels = ['id', 'object_id', 'name', 'author', 'title', 'description', 'url', 'urlToImage', 'publishedAt', 'category','private', 'howmanyrequests', 'howmanycomments', 'owner', 'membercount']
    info = [id, article.id,article.article.name,article.article.author,article.article.title,article.article.description,article.article.url,article.article.urltoimage,article.article.publishedat,c.categories, article.private, article.requests.all().exclude(approved=True).count(), article.comments.all().count(), article.owner.username, article.members.all().count()-1]
    data = dict(zip(labels, info))
    return data

# handledecision request
def handleDecision(request):
    if not request.method == "POST":
        return HttpResponseRedirect('/')
    else:
        if request.user.is_authenticated:
            decision = request.POST['decision']
            id = request.POST['object_id']
            discussionRequest = DiscussionRequest.objects.get(pk=id)
            if decision == "false":
                discussionRequest.delete()
                return JsonResponse({'message': 'ok'})
            elif decision == "true":
                user = request.POST['user']
                getuser = User.objects.get(username=user)
                discussion_id = request.POST['discussion_id']
                discussion = Discussion.objects.get(pk=discussion_id)
                DiscussionMember.objects.create(member=getuser,discussion=discussion, date_joined=timezone.now())
                discussionRequest.approved = True
                discussionRequest.save()
                return JsonResponse({'message': 'ok'})

