from django.shortcuts import render
from commits.services.sync_repository_commits import synchronize_repository
from commits.serializers import CommitSerializer
from commits.models import Commit, Repository
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

# from rest_framework.generics import ListAPIView

class ListCommitView(mixins.ListModelMixin, GenericViewSet):
    serializer_class = CommitSerializer
    permission_classes = []

    def get_queryset(self):
        organization = self.kwargs["organization"]
        project_slug = self.kwargs["project_slug"]
        return Commit.objects.filter(
            repository__organization=organization, 
            repository__project_slug=project_slug
        ).order_by("-date")

    @action(detail=False, methods=["post"])
    def sync(self, *args, organization, project_slug, **kwars):
        repository, _  = Repository.objects.get_or_create(
            organization=organization, 
            project_slug=project_slug
        )
        synchronize_repository(repository)
        return Response(status=status.HTTP_200_OK)
