from rest_framework.response import Response
from apps.users.models import User
from rest_framework import viewsets
from apps.users.serializers import UserSerializer


class AnalysisViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({})
