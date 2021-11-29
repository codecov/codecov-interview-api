import requests, datetime
from rest_framework.response import Response
from rest_framework import viewsets
from apps.analysis.constants import BITBUCKET_REPO_URL, GITHUB_REPO_URL
from apps.analysis.dataclasses import CommitAnalysisData
from apps.analysis.models import CommitData
from apps.analysis.helpers import get_dict_info_bitbucket_repo, get_dict_info_github_repo


class AnalysisViewSet(viewsets.ViewSet):
    def list(self, request):
        is_synced = CommitData.objects.exists()
        if is_synced:
            pass
        print("REQUESTSSS", request.data, request.query_params, request)
        github_commits = get_dict_info_github_repo()
        bitbucket_commits = get_dict_info_bitbucket_repo()

        return Response({
            "github": github_commits,
            "bitbucket": bitbucket_commits,
        })

    def post(self, request):
        is_synced = CommitData.objects.exists()
        if is_synced:
            return Response(data={"message": "You are already in sync."}, status=200)
        objects_to_create = []

        bitbucket_commits = get_dict_info_bitbucket_repo()
        github_commits = get_dict_info_github_repo()

        for commit in bitbucket_commits:
            formated_date = datetime.datetime.fromisoformat(commit.date)
            commit_data = CommitData(
                repository='bitbucket',
                hash=commit.hash,
                author=commit.author,
                date=formated_date,
                message=commit.message
            )
            objects_to_create.append(commit_data)
        
        for commit in github_commits:
            formated_date = datetime.datetime.strptime(commit.date, "%Y-%m-%dT%H:%M:%SZ")
            commit_data = CommitData(
                repository="github",
                hash=commit.hash,
                author=commit.author,
                date=formated_date,
                message=commit.message
            )
            objects_to_create.append(commit_data)

        CommitData.objects.bulk_create(objects_to_create)
        return Response(data={"message": "Commits synced correctly"}, status=200)
