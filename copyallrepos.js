const { Octokit } = require("@octokit/rest");
const NodeGit = require("nodegit");
const path = require("path");
const fs = require("fs");

////////////////////////////////////////////////////////////////
const sourceToken = '';
const targetToken = '';
const sourceUsername = '';
const targetUsername = '';

if (!sourceToken || !targetToken) {
  console.error("GitHub tokens are required.");
  process.exit(1);
}

const octokitSource = new Octokit({ auth: sourceToken });
const octokitTarget = new Octokit({ auth: targetToken });

async function cloneAndPushRepos() {
  try {
    const { data: repos } = await octokitSource.repos.listForAuthenticatedUser({
      per_page: 100,
      affiliation: 'owner'
    });

    for (const repo of repos) {
      const repoName = repo.name;
      const cloneUrl = repo.clone_url.replace('https://', `https://${sourceUsername}:${sourceToken}@`);

      console.log(`Cloning repository '${repoName}'...`);
      const localPath = path.join(__dirname, repoName);
      if (fs.existsSync(localPath)) {
        fs.rmSync(localPath, { recursive: true, force: true }); // Use fs.rmSync for Node.js versions >= 14
      }
      await NodeGit.Clone(cloneUrl, localPath);

      const repoExists = await checkRepositoryExists(repoName);
      if (repoExists) {
        console.log(`Repository '${repoName}' already exists in the target account. Skipping creation.`);
      } else {

        console.log(`Creating repository '${repoName}' in target account...`);
        await octokitTarget.repos.createForAuthenticatedUser({
          name: repoName,
          private: repo.private
        });

        console.log(`Pushing repository '${repoName}' to target account...`);
        const targetRepoUrl = `https://${targetUsername}:${targetToken}@github.com/${targetUsername}/${repoName}`;
        const repoToPush = await NodeGit.Repository.open(localPath);
        const remote = await NodeGit.Remote.create(repoToPush, 'target', targetRepoUrl);
        await repoToPush.getRemotes();
        await repoToPush.fetchAll();
        await repoToPush.push(['refs/heads/*:refs/heads/*'], {
          callbacks: {
            credentials: () => NodeGit.Cred.userpassPlaintextNew(targetUsername, targetToken)
          }
        });

        console.log(`Repository '${repoName}' has been cloned and pushed to the target account.`);
      }

      fs.rmSync(localPath, { recursive: true, force: true });
    }

    console.log("All repositories have been cloned and pushed to the target account.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function checkRepositoryExists(repoName) {
  try {
    const response = await octokitTarget.repos.get({
      owner: targetUsername,
      repo: repoName
    });
    return true; 
  } catch (error) {
    if (error.status === 404) {
      return false;
    } else {
      throw error; 
    }
  }
}

cloneAndPushRepos();
