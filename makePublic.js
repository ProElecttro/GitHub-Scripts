const { Octokit } = require("@octokit/rest");

const token = 'your acces_token';

const octokit = new Octokit({
  auth: token
});

async function makeAllReposPublic() {
  try {
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      per_page: 100
    });

    for (const repo of repos) {
      if (repo.private) {
        console.log(`Making repository '${repo.name}' public...`);

        await octokit.repos.update({
          owner: repo.owner.login,
          repo: repo.name,
          private: false
        });
        
        console.log(`Repository '${repo.name}' is now public.`);
      } else {
        console.log(`Repository '${repo.name}' is already public.`);
      }
    }

    console.log("All repositories have been processed.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

makeAllReposPublic();
