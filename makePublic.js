const { Octokit } = require("@octokit/rest");

const token = "your_token here";

if (!token) {
  console.error("Error: GITHUB_TOKEN environment variable is not set.");
  process.exit(1);
}

console.log("Token:", token);

const octokit = new Octokit({
  auth: token
});

async function makeAllReposPublic() {
  try {
    let page = 1;
    let repos;
    do {
      const { data } = await octokit.repos.listForAuthenticatedUser({
        per_page: 100,
        page
      });
      repos = data;

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

      page++;
    } while (repos.length === 100);

    console.log("All repositories have been processed.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

makeAllReposPublic();
