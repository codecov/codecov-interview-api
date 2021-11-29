from rest_framework import routers
from apps.users.views import UserViewSet
from apps.analysis.views import AnalysisViewSet

# Settings
api = routers.DefaultRouter()
api.trailing_slash = '/?'

# Users API
api.register(r'users', UserViewSet)
api.register(r'analysis', AnalysisViewSet, basename='analysis')
