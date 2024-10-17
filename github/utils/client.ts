import { Octokit } from "octokit";
import { createTokenAuth } from "@octokit/auth-token";

import "dotenv/config";

export async function githubClient(
  accessToken?: string
): Promise<{ octokit: Octokit }> {
  const auth = createTokenAuth(accessToken ?? process.env.GITHUB_AUTH_TOKEN!);
  const { token } = await auth();

  const octokit = new Octokit({
    auth: token,
  });

  return { octokit };
}
