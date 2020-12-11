from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Profile)
admin.site.register(Category)
admin.site.register(Article)
admin.site.register(ArticleRelationship)
admin.site.register(Comment)
admin.site.register(Discussion)
admin.site.register(DiscussionMember)
admin.site.register(DiscussionRequest)
admin.site.register(Reply)
