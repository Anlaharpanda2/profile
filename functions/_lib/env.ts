export interface Env {
  LOGIN_USERNAME: string;
  LOGIN_PASSWORD: string;
  GITHUB_USERNAME: string;
  GITHUB_TOKEN: string;
  GITHUB_REPO: string;
  GITHUB_BRANCH?: string;
}

export function requireEnv(env: Env) {
  const required: Array<keyof Env> = [
    "LOGIN_USERNAME",
    "LOGIN_PASSWORD",
    "GITHUB_USERNAME",
    "GITHUB_TOKEN",
    "GITHUB_REPO",
  ];
  for (const key of required) {
    if (!env[key]) {
      throw new Error(`Missing required env var: ${key}`);
    }
  }
}
