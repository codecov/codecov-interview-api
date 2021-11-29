import requests, datetime
from typing import List

from apps.analysis.constants import BITBUCKET_REPO_URL, GITHUB_REPO_URL


def get_dict_info_github_repo() -> List[dict]:
    github_repo_response = requests.get(GITHUB_REPO_URL).json()
    commits = []
    for obj in github_repo_response:
        hash = obj.get("sha")
        author = obj.get("author").get("login")
        date = obj.get("commit").get("committer").get("date")
        formated_date = datetime.datetime.strptime(date, "%Y-%m-%dT%H:%M:%SZ")
        message = obj.get("commit").get("message")
        commits.append({
            "hash": hash,
            "author": author,
            "date": formated_date.strftime("%Y/%m/%d/, %H:%M:%S"),
            "message": message
        })
    return commits


def get_dict_info_bitbucket_repo() -> List[dict]:
    bitbucket_repo_response = list(requests.get(BITBUCKET_REPO_URL).json().values())[1]
    commits = []
    for obj in bitbucket_repo_response:
        hash = obj.get("hash")
        date = obj.get("date")
        author = obj.get("author").get("raw")
        formated_date = datetime.datetime.fromisoformat(date)
        message = obj.get("message")
        commits.append({
            "hash": hash,
            "author": author,
            "date": formated_date.strftime("%Y/%m/%d/, %H:%M:%S"),
            "message": message
        })
    return commits
