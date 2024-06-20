import requests

org = 'WebOps-and-Blockchain-Club'
token = 'your-token'

def get_org_members(org, token, page):
    url = f'https://api.github.com/orgs/{org}/members?page={page}&per_page=30'
    headers = {
        'Authorization': f'token {token}'
    }
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        members_data = response.json()
        return [member['login'] for member in members_data]
    else:
        print(f"Failed to fetch organization members. Status code: {response.status_code}")
        return []

def get_contributions(member, org, token):
    url = f'https://api.github.com/search/commits?q=author:{member}+org:{org}'
    headers = {
        'Accept': 'application/vnd.github.cloak-preview+json',
        'Authorization': f'token {token}'
    }
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        return data.get('total_count', 0)
    else:
        print(f"Failed to fetch contributions for {member}. Status code: {response.status_code}")
        return 0

page = 2
members = get_org_members(org, token, page)

if members:
    for member in members:
        contributions = get_contributions(member, org, token)
        print(f'{member} made {contributions} contributions')
else:
    print("No members found or failed to fetch members.")