from django.contrib import admin
from django.urls import path, include
from registration import views as v

urlpatterns = [
    path('', include("main.urls")),
    path('admin/', admin.site.urls),
    path('signup/', v.signup, name="signup"),
    path('', include("django.contrib.auth.urls")),
]
