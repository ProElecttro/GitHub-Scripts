import requests
from datetime import datetime

# Set your GitHub username, repository, and personal access token
username = 'WebOps-and-Blockchain-Club'
repository = 'udaan-app-client'
token = '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'

# Define the base GitHub API URL
base_url = f'https://api.github.com/repos/{username}/{repository}'

# Function to get repository details
def get_repo_details():
    response = requests.get(base_url, auth=(username, token))
    repo_details = response.json()
    return repo_details

# Function to get commits
def get_commits():
    commits_url = f'{base_url}/commits'
    response = requests.get(commits_url, auth=(username, token))
    commits = response.json()
    return commits

# Function to format date
def format_date(date_str):
    return datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%SZ').strftime('%Y-%m-%d %H:%M:%S')

# Get repository details
repo_details = get_repo_details()
print(f"Repository: {repo_details['name']}")
print(f"Description: {repo_details['description']}")
print(f"Owner: {repo_details['owner']['login']}")
print(f"Private: {repo_details['private']}")
print(f"Forks: {repo_details['forks_count']}")
print(f"Open Issues: {repo_details['open_issues_count']}")
print(f"Watchers: {repo_details['watchers_count']}")
print(f"Stars: {repo_details['stargazers_count']}")
print(f"Created At: {format_date(repo_details['created_at'])}")
print(f"Updated At: {format_date(repo_details['updated_at'])}")
print(f"Pushed At: {format_date(repo_details['pushed_at'])}")
print()

# Get and print commits
commits = get_commits()
print("Commits:")
for commit in commits:
    sha = commit['sha']
    author = commit['commit']['author']['name']
    date = format_date(commit['commit']['author']['date'])
    message = commit['commit']['message']
    print(f"Commit SHA: {sha}")
    print(f"Author: {author}")
    print(f"Date: {date}")
    print(f"Message: {message}")
    print()

print("End of repository details.")
