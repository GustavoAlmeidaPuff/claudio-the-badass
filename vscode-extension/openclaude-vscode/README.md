# Claudio, The Badass VS Code Extension

A practical VS Code companion for Claudio, The Badass with a project-aware **Control Center**, predictable terminal launch behavior, and quick access to useful Claudio, The Badass workflows.

## Features

- **Real Control Center status** in the Activity Bar:
  - whether the configured `Claudio-the-badass` command is installed
  - the launch command being used
  - whether the launch shim injects `CLAUDIO_THE_BADASS_USE_OPENAI=1`
  - the current workspace folder
  - the launch cwd that will be used for terminal sessions
  - whether `.Claudio-the-badass-profile.json` exists in the current workspace root
  - a conservative provider summary derived from the workspace profile or known environment flags
- **Project-aware launch behavior**:
  - `Launch Claudio, The Badass` launches from the active editor's workspace when possible
  - falls back to the first workspace folder when needed
  - avoids launching from an arbitrary default cwd when a project is open
- **Practical sidebar actions**:
  - Launch Claudio, The Badass
  - Launch in Workspace Root
  - Open Workspace Profile
  - Open Repository
  - Open Setup Guide
  - Open Command Palette
- **Built-in dark theme**: `Claudio, The Badass Terminal Black`

## Requirements

- VS Code `1.95+`
- `Claudio-the-badass` available in your terminal PATH (`npm install -g @gitlawb/Claudio-the-badass`)

## Commands

- `Claudio, The Badass: Open Control Center`
- `Claudio, The Badass: Launch in Terminal`
- `Claudio, The Badass: Launch in Workspace Root`
- `Claudio, The Badass: Open Repository`
- `Claudio, The Badass: Open Setup Guide`
- `Claudio, The Badass: Open Workspace Profile`

## Settings

- `Claudio-the-badass.launchCommand` (default: `Claudio-the-badass`)
- `Claudio-the-badass.terminalName` (default: `Claudio, The Badass`)
- `Claudio-the-badass.useOpenAIShim` (default: `false`)

`Claudio-the-badass.useOpenAIShim` only injects `CLAUDIO_THE_BADASS_USE_OPENAI=1` into terminals launched by the extension. It does not guess or configure a provider by itself.

## Notes on Status Detection

- Provider status prefers the real workspace `.Claudio-the-badass-profile.json` file when present.
- If no saved profile exists, the extension falls back to known environment flags available to the VS Code extension host.
- If the source of truth is unclear, the extension shows `unknown` instead of guessing.

## Development

From this folder:

```bash
npm run test
npm run lint
```

To package (optional):

```bash
npm run package
```

