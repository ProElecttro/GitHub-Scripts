const { Octokit } = require("@octokit/rest");

// Set your GitHub personal access token
const octokit = new Octokit({ auth: `personal_access_token` });

// List of repositories and reviewers
const repos = [
  { name: "repo1", reviewers: ["reviewer1", "reviewer2"] },
  { name: "repo2", reviewers: ["reviewer3", "reviewer4"] }
];

// Function to assign reviewers to open PRs
async function assignReviewers() {
  for (const repo of repos) {
    const { name, reviewers } = repo;
    const [owner, repoName] = name.split("/");
    const { data: pullRequests } = await octokit.pulls.list({
      owner,
      repo: repoName,
      state: "open"
    });

    for (const pr of pullRequests) {
      await octokit.pulls.requestReviewers({
        owner,
        repo: repoName,
        pull_number: pr.number,
        reviewers
      });
      console.log(`Assigned reviewers to PR #${pr.number} in ${name}`);
    }
  }
}

assignReviewers().catch(console.error);
