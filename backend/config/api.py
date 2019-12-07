from rest_framework import routers
from apps.users.views import UserViewSet, CommitViewSet

# Settings
api = routers.DefaultRouter()
api.trailing_slash = "/?"

# Users API
api.register(r"users", UserViewSet)
api.register(r"commits", CommitViewSet)
