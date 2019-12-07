import requests
from uuid import uuid4

from django.contrib.auth import authenticate, login
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

from rest_framework import viewsets, status
from rest_framework.decorators import list_route
from rest_framework.response import Response

from apps.users.models import User, Commit
from apps.users.serializers import UserSerializer, UserWriteSerializer, CommitSerializer


class CommitViewSet(viewsets.ModelViewSet):
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer
    permission_classes = []

    @list_route(methods=["GET"])
    def sync(self, request):

        # Initialize response
        commits = {"github_commits": [], "bitbucket_commits": []}

        # Get & save commits from github
        github_url = "https://api.github.com/repos/pytest-dev/pytest/commits"
        github_commits = requests.get(github_url).json()

        for gh_commit in github_commits:
            new_commit = {
                "commit_hash": gh_commit["sha"],
                "message": gh_commit["commit"]["message"][:100],
                "author": gh_commit["commit"]["author"]["name"],
                "git_provider": "Github",
                "repo_name": "pytest",
                "repo_link": "https://github.com/pytest-dev/pytest",
            }

            Commit.objects.update_or_create(**new_commit)
            commits["github_commits"].append(new_commit)

        # Get & save commits from bitbucket
        bitbucket_url = (
            "https://api.bitbucket.org/2.0/repositories/tortoisehg/thg/commits"
        )
        bitbucket_commits = requests.get(bitbucket_url).json()["values"]
        for bb_commit in bitbucket_commits:
            new_commit = {
                "commit_hash": bb_commit["hash"],
                "message": bb_commit["message"][:100],
                "author": bb_commit["author"]["user"]["display_name"],
                "git_provider": "BitBucket",
                "repo_name": "thg",
                "repo_link": "https://bitbucket.org/tortoisehg/thg/src/default/",
            }

            Commit.objects.update_or_create(**new_commit)
            commits["bitbucket_commits"].append(new_commit)

        return Response(status=status.HTTP_200_OK, data=commits)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return UserSerializer
        return UserWriteSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        user.set_password(self.request.data.get("password"))
        user.save()

    def perform_update(self, serializer):
        user = serializer.save()
        if "password" in self.request.data:
            user.set_password(self.request.data.get("password"))
            user.save()

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    @list_route(methods=["GET"])
    def profile(self, request):
        if request.user.is_authenticated:
            serializer = self.serializer_class(request.user)
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    @list_route(methods=["POST"])
    def login(self, request, format=None):
        email = request.data.get("email", None)
        password = request.data.get("password", None)
        user = authenticate(username=email, password=password)

        if user:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    @list_route(methods=["POST"])
    def register(self, request):
        last_name = request.data.get("last_name", None)
        first_name = request.data.get("first_name", None)
        email = request.data.get("email", None)
        password = request.data.get("password", None)

        if User.objects.filter(email__iexact=email).exists():
            return Response({"status": 210})

        # user creation
        user = User.objects.create(
            email=email,
            password=password,
            last_name=last_name,
            first_name=first_name,
            is_admin=False,
        )
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

    @list_route(methods=["POST"])
    def password_reset(self, request, format=None):
        if User.objects.filter(email=request.data["email"]).exists():
            user = User.objects.get(email=request.data["email"])
            params = {"user": user, "DOMAIN": settings.DOMAIN}
            send_mail(
                subject="Password reset",
                message=render_to_string("mail/password_reset.txt", params),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[request.data["email"]],
            )
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @list_route(methods=["POST"])
    def password_change(self, request, format=None):
        if User.objects.filter(token=request.data["token"]).exists():
            user = User.objects.get(token=request.data["token"])
            user.set_password(request.data["password"])
            user.token = uuid4()
            user.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
