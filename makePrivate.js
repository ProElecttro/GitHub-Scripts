const { Octokit } = require("@octokit/rest");

// Set your GitHub personal access token
const token = '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';

const octokit = new Octokit({
  auth: token
});

async function makeAllReposPrivate() {
  try {
    // Get all repositories for the authenticated user
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      per_page: 100,
      affiliation: 'owner'
    });

    // Loop through each repository and make it private
    for (const repo of repos) {
      if (repo.fork && !repo.private) {
        console.log(`Skipping repository '${repo.name}' as it is a public fork.`);
      } else if (!repo.private) {
        console.log(`Making repository '${repo.name}' private...`);
        try {
          await octokit.repos.update({
            owner: repo.owner.login,
            repo: repo.name,
            private: true
          });
          console.log(`Repository '${repo.name}' is now private.`);
        } catch (error) {
          console.error(`Failed to make repository '${repo.name}' private:`, error.message);
        }
      } else {
        console.log(`Repository '${repo.name}' is already private.`);
      }
    }

    console.log("All repositories have been processed.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

makeAllReposPrivate();
