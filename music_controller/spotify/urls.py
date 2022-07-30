from django.urls import path
from .views import AuthURL, CurrentSong, spotify_callback, isAuthenticated

urlpatterns = [
    path("get-auth-url", AuthURL.as_view()),
    path("redirect", spotify_callback),
    path("is_authenticated", isAuthenticated.as_view()),
    path("current-song", CurrentSong.as_view()),
]
