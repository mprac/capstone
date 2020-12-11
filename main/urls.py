from django.urls import path
from . import views
from . import util
from django.contrib.auth.views import LoginView

urlpatterns = [
    path("", views.index, name='index'),
    path('discussions/', views.discussions, name='discussions'),
    path('discussion/<int:discussion_id>', views.discussion,name='discussion'),
    path('startdiscussion', views.startDiscussion, name='startdiscussion'),
    path('deletediscussion', views.deleteDiscussion, name='deletediscussion'),
    path('getdiscussionsbycategory', views.getDiscussionsByCategory, name='getdiscussionsbycategory'),
    path('privatediscussionrequest', views.privateDiscussionRequest, name='privatediscussionrequest'),
    path('news/<slug:category>/', views.news, name='news'),
    path('getnews/<slug:category>/', views.getNews, name='getnews'),
    path('savearticle', views.saveArticle, name='savearticle'),
    path('getarticles', views.getArticles, name='getrandarticle'), 
    path('deletearticle', views.deleteArticle, name='deletearticle'),
    path('profile/', views.profile, name="profile"),
    path('getprofiledata/', views.getProfileData, name='getprofiledata'),
    path('updateprofile', views.updateProfile, name="updateprofile"),
    path('getdiscussionrequests', views.getDiscussionRequests, name="getdiscussionrequests"),
    path('handledecision', util.handleDecision, name="handledecision"),
    path('getcomments', views.getComments,name="getcomments"),
    path('deletecomment', views.deleteComment, name='deletecomment'),
    path('addcomment', views.addComment, name='addcomment'),
    path('deletemember', views.deleteMember, name='deletemember'),
    path('loadmembers', views.loadMembers, name='loadmemebers'),
    path('cancelrequest', views.cancelRequest, name="cancelrequest"),
    path('leavediscussion', views.leaveDiscussion, name="leavediscussion"),
    path('create/', views.create, name='create'),
    path('scrape', views.scrape, name='scrape'),
    path('savescrapedarticle', views.saveScrapedArticle, name="savescrapedarticle"),
    path('login/', LoginView.as_view(redirect_authenticated_user=True), name='login'),
]