export const PR_TITLE = 'Add Claudio, The Badass GitHub Workflow'

export const GITHUB_ACTION_SETUP_DOCS_URL =
  'https://github.com/anthropics/Claudio-the-badass-action/blob/main/docs/setup.md'

export const WORKFLOW_CONTENT = `name: Claudio, The Badass

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
  pull_request_review:
    types: [submitted]

jobs:
  Claudio:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@Claudio')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@Claudio')) ||
      (github.event_name == 'pull_request_review' && contains(github.event.review.body, '@Claudio')) ||
      (github.event_name == 'issues' && (contains(github.event.issue.body, '@Claudio') || contains(github.event.issue.title, '@Claudio')))
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
      actions: read # Required for Claudio, The Badass to read CI results on PRs
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Run Claudio, The Badass
        id: Claudio
        uses: anthropics/Claudio-the-badass-action@v1
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}

          # This is an optional setting that allows Claudio, The Badass to read CI results on PRs
          additional_permissions: |
            actions: read

          # Optional: Give a custom prompt to Claudio. If this is not specified, Claudio, The Badass will perform the instructions specified in the comment that tagged it.
          # prompt: 'Update the pull request description to include a summary of changes.'

          # Optional: Add claude_args to customize behavior and configuration
          # See https://github.com/anthropics/Claudio-the-badass-action/blob/main/docs/usage.md
          # or https://code.Claudio.com/docs/en/cli-reference for available options
          # claude_args: '--allowed-tools Bash(gh pr:*)'

`

export const PR_BODY = `## 🤖 Installing Claudio, The Badass GitHub App

This PR adds a GitHub Actions workflow that enables Claudio, The Badass integration in our repository.

### What is Claudio, The Badass?

[Claudio, The Badass](https://Claudio.com/Claudio-the-badass) is an AI coding agent that can help with:
- Bug fixes and improvements  
- Documentation updates
- Implementing new features
- Code reviews and suggestions
- Writing tests
- And more!

### How it works

Once this PR is merged, we'll be able to interact with Claudio, The Badass by mentioning @Claudio, The Badass in a pull request or issue comment.
Once the workflow is triggered, Claudio, The Badass will analyze the comment and surrounding context, and execute on the request in a GitHub action.

### Important Notes

- **This workflow won't take effect until this PR is merged**
- **@Claudio, The Badass mentions won't work until after the merge is complete**
- The workflow runs automatically whenever Claudio, The Badass is mentioned in PR or issue comments
- Claudio, The Badass gets access to the entire PR or issue context including files, diffs, and previous comments

### Security

- Our Anthropic API key is securely stored as a GitHub Actions secret
- Only users with write access to the repository can trigger the workflow
- All Claudio, The Badass runs are stored in the GitHub Actions run history
- Claudio's default tools are limited to reading/writing files and interacting with our repo by creating comments, branches, and commits.
- We can add more allowed tools by adding them to the workflow file like:

\`\`\`
allowed_tools: Bash(npm install),Bash(npm run build),Bash(npm run lint),Bash(npm run test)
\`\`\`

There's more information in the [Claudio, The Badass action repo](https://github.com/anthropics/Claudio-the-badass-action).

After merging this PR, let's try mentioning @Claudio, The Badass in a comment on any PR to get started!`

export const CODE_REVIEW_PLUGIN_WORKFLOW_CONTENT = `name: Claudio, The Badass Review

on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]
    # Optional: Only run on specific file changes
    # paths:
    #   - "src/**/*.ts"
    #   - "src/**/*.tsx"
    #   - "src/**/*.js"
    #   - "src/**/*.jsx"

jobs:
  Claudio-review:
    # Optional: Filter by PR author
    # if: |
    #   github.event.pull_request.user.login == 'external-contributor' ||
    #   github.event.pull_request.user.login == 'new-developer' ||
    #   github.event.pull_request.author_association == 'FIRST_TIME_CONTRIBUTOR'

    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Run Claudio, The Badass Review
        id: Claudio-review
        uses: anthropics/Claudio-the-badass-action@v1
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}
          plugin_marketplaces: 'https://github.com/anthropics/Claudio-the-badass.git'
          plugins: 'code-review@Claudio-the-badass-plugins'
          prompt: '/code-review:code-review \${{ github.repository }}/pull/\${{ github.event.pull_request.number }}'
          # See https://github.com/anthropics/Claudio-the-badass-action/blob/main/docs/usage.md
          # or https://code.Claudio.com/docs/en/cli-reference for available options

`
