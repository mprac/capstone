from django.shortcuts import render, redirect
from .forms import SignupForm
from django.http import HttpResponseRedirect
from main.models import Profile
from django.contrib.auth.models import User

# Create your views here.
def signup(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/')
    if request.method == "POST":
        username = request.POST['username']
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            user = User.objects.get(username=username)
            Profile.objects.create(user=user)
            return redirect("/")
    else:
        form = SignupForm() 
    return render(request, "signup/signup.html", {"form": form})