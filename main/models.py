from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class Category(models.Model):
    categoriesOptions = [
        ('business','business'),
        ('entertainment','entertainment'),
        ('general','general'),
        ('health','health'),
        ('science','science'),
        ('sports','sports'),
        ('technology','technology')
    ]
    categories = models.CharField(max_length=64, choices=categoriesOptions, default=None)

    def __str__(self):
        return f"Category: {self.categories}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile",blank=True, null=True)

    def __str__(self):
        return f"Username: {self.user}"

class Article(models.Model):
    name = models.CharField(max_length=500, blank=True, null=True)
    author = models.CharField(max_length=250, blank=True, null=True)
    title = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    urltoimage = models.URLField(blank=True, null=True)
    category = models.ManyToManyField(Category, related_name="articles")
    publishedat = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Article: {self.name}, Author: {self.author}"
    
class ArticleRelationship(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles", blank=True, null=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="users", blank=True, null=True) 

    def __str__(self):
        return f"Article: {self.article.name}, User: {self.user.username}"

class Discussion(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="discussionowner",blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="discussions",blank=True)
    private = models.BooleanField(default=False,blank=True, null=True)
    category = models.ManyToManyField(Category, related_name="discussions", blank=True)
    members = models.ManyToManyField(User, related_name='members', blank=True, through='DiscussionMember')

    def __str__(self):
        return f"{self.id} Article: {self.article.name}, Owner:{self.owner.username}, Private: {self.private} in {self.category.get()}"

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    comment = models.CharField(max_length=500)
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE, blank=True, null=True, related_name="comments")
    date = models.DateTimeField(timezone.now(),blank=True, null=True)

    def __str__(self):
        return f"{self.id}, {self.user},{self.comment}, {self.date}"

class Reply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reply = models.CharField(max_length=500)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateTimeField(timezone.now(),blank=True, null=True)

    def __str__(self):
        return f"{self.user}, {self.reply}, {self.date}"

class DiscussionMember(models.Model): 
    member = models.ForeignKey(User, on_delete=models.CASCADE,blank=True, null=True)
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE,blank=True, null=True)
    date_joined = models.DateField(timezone.now(),blank=True, null=True)

    def __str__(self):
        return f" User: {self.member}, Date Joined: {self.date_joined}, Discussion: {self.discussion}"

# Pending request to join private discussion
class DiscussionRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="requests",blank=True, null=True)
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE, blank=True, null=True, related_name="requests")
    approved = models.BooleanField(default=False,blank=True, null=True)

    def __str__(self):
        return f"Discussion: {self.discussion.article.name}, User: {self.user}, Approved: {self.approved}"
