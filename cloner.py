import requests
import os
import subprocess

username = "your github username"
token = "your access_token"

headers = {
    "Authorization": f"token {token}"
}

response = requests.get(f"https://api.github.com/users/{username}/repos", headers=headers)
repos = response.json()

for repo in repos:
    clone_url = repo['clone_url']
    repo_name = repo['name']
    
    if not os.path.exists(repo_name):
        subprocess.run(["git", "clone", clone_url])
        print(f"Cloned {repo_name}")
    else:
        print(f"{repo_name} already exists")
