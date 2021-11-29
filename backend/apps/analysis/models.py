from django.db import models


class CommitData(models.Model):
    repository = models.CharField(max_length=20)
    author = models.CharField(max_length=100, default="")
    hash = models.CharField(max_length=200)
    date = models.DateTimeField()
    message = models.TextField()