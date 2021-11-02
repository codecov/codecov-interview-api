from django.db import models

# Create your models here.

class Repository(models.Model):
    project_slug = models.CharField(max_length=255)    
    organization = models.CharField(max_length=255)


class Commit(models.Model):
    hash = models.CharField(unique=True, max_length=40)
    description = models.TextField()
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    date = models.DateTimeField()
