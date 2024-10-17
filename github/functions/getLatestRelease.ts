import { githubClient } from "../utils/client.js";

export async function getLatestRelease({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  try {
    const { octokit } = await githubClient();
    const { data } = await octokit.rest.repos.getLatestRelease({
      owner,
      repo,
    });

    return data;
  } catch (error) {
    throw new Error(`Error while fetching releases: ${error}`);
  }
}
