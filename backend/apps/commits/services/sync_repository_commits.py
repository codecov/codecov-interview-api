from commits.models import Commit
from commits.services.git_hub_client import get_commits

# Assumption: Commits won't be removed from the repository
# Temporary assumption: Only GitHUB is supported for now
def synchronize_repository(repository):
    commits = get_commits(repository)
    for commit in commits:
        Commit.objects.update_or_create(hash=commit["hash"], defaults=commit)
        
