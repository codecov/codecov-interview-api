import requests

def map_github_commit_to_internal(item, repository_id):
    return {
        "description": item["commit"]["message"], 
        "hash": item["sha"], 
        "date": item["commit"]["author"]["date"],
        "repository_id": repository_id
    }


def get_commits(repository):
    with requests.Session() as s:
        response = s.get(f"https://api.github.com/repos/{repository.organization}/{repository.project_slug}/commits?per_page=5")
        response.raise_for_status()
        return map(lambda item: map_github_commit_to_internal(item, repository.pk), response.json())