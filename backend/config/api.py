from django.urls import path
from rest_framework import routers
from apps.users.views import UserViewSet

from apps.commits.views import ListCommitView

# Settings
api = routers.DefaultRouter()
api.trailing_slash = '/?'

# Users API
api.register(r'users', UserViewSet)
api.register(r'repo/(?P<organization>.+)/(?P<project_slug>.+)/commits', ListCommitView, basename="list-commits")
