
# PLEASE CHECKOUT OTHER REPOS AS WELL:
**CHESS:** https://github.com/ProElecttro/my_chess.git
**Chess Live** http://15.206.72.127:3000/

# GitHub-Scripts

GitHub-Scripts is a collection of scripts designed to automate various Git operations using JavaScript and Python. These scripts help streamline repository management, including tasks such as toggling repository privacy, cloning and migrating repositories, analyzing contributions, and automating pull request reviews.

## Getting Started

To use these scripts, you will need a GitHub access token. You can generate one by following [this guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Make sure to grant the necessary permissions for the operations you want to perform.

## Scripts Overview

### OverviewScript.py
This script provides a comprehensive overview of your GitHub account, including repository statistics and activity summaries. It can help you understand your overall contribution and activity on GitHub.

### PR_Reviewer.js
Automates the process of reviewing pull requests. This script can be configured to review open pull requests in your repositories, making the code review process more efficient.

### cloner.py
This script clones all repositories from a specified GitHub account. It is useful for creating backups or duplicating repositories for migration purposes.

### contribution_analyser.py
Analyzes contributions across your repositories. This script generates detailed reports on your commits, issues, and pull requests, helping you track and visualize your contribution patterns.

### copyallrepos.js
Copies all repositories from one GitHub account and migrates them to another account. This is particularly useful when transferring ownership or duplicating repositories between accounts.

### makePrivate.js
Toggles the privacy setting of repositories to private. Use this script to quickly make your repositories private, ensuring that only authorized users have access.

### makePublic.js
Toggles the privacy setting of repositories to public. This script makes your repositories publicly accessible, allowing anyone to view and contribute.

## Usage

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/ProElecttro.git
    cd ProElecttro
    ```

2. Install the necessary dependencies:
    ```sh
    npm install
    pip install -r requirements.txt
    ```

3. Set your GitHub access token as an environment variable:
    ```sh
    export GITHUB_TOKEN=youraccesstoken
    ```

4. Run the desired script:
    ```sh
    node makePrivate.js
    python cloner.py
    ```
---

Replace `yourusername` with your actual GitHub username, and `youraccesstoken` with your actual GitHub access token. Make sure to update the repository URL if it's different.
