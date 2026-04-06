# Claudio, The Badass Quick Start for macOS and Linux

This guide uses a standard shell such as Terminal, iTerm, bash, or zsh.

## 1. Install Node.js

Install Node.js 20 or newer from:

- `https://nodejs.org/`

Then check it:

```bash
node --version
npm --version
```

## 2. Install Claudio, The Badass

```bash
npm install -g @gitlawb/Claudio-the-badass
```

## 3. Pick One Provider

### Option A: OpenAI

Replace `sk-your-key-here` with your real key.

```bash
export CLAUDIO_THE_BADASS_USE_OPENAI=1
export OPENAI_API_KEY=sk-your-key-here
export OPENAI_MODEL=gpt-4o

Claudio-the-badass
```

### Option B: DeepSeek

```bash
export CLAUDIO_THE_BADASS_USE_OPENAI=1
export OPENAI_API_KEY=sk-your-key-here
export OPENAI_BASE_URL=https://api.deepseek.com/v1
export OPENAI_MODEL=deepseek-chat

Claudio-the-badass
```

### Option C: Ollama

Install Ollama first from:

- `https://ollama.com/download`

Then run:

```bash
ollama pull llama3.1:8b

export CLAUDIO_THE_BADASS_USE_OPENAI=1
export OPENAI_BASE_URL=http://localhost:11434/v1
export OPENAI_MODEL=llama3.1:8b

Claudio-the-badass
```

No API key is needed for Ollama local models.

### Option D: LM Studio

Install LM Studio first from:

- `https://lmstudio.ai/`

Then in LM Studio:

1. Download a model (e.g., Llama 3.1 8B, Mistral 7B)
2. Go to the "Developer" tab
3. Select your model and enable the server via the toggle

Then run:

```bash
export CLAUDIO_THE_BADASS_USE_OPENAI=1
export OPENAI_BASE_URL=http://localhost:1234/v1
export OPENAI_MODEL=your-model-name
# export OPENAI_API_KEY=lmstudio  # optional: some users need a dummy key

Claudio-the-badass
```

Replace `your-model-name` with the model name shown in LM Studio.

No API key is needed for LM Studio local models (but uncomment the `OPENAI_API_KEY` line if you hit auth errors).

## 4. If `Claudio-the-badass` Is Not Found

Close the terminal, open a new one, and try again:

```bash
Claudio-the-badass
```

## 5. If Your Provider Fails

Check the basics:

### For OpenAI or DeepSeek

- make sure the key is real
- make sure you copied it fully

### For Ollama

- make sure Ollama is installed
- make sure Ollama is running
- make sure the model was pulled successfully

### For LM Studio

- make sure LM Studio is installed
- make sure LM Studio is running
- make sure the server is enabled (toggle on in the "Developer" tab)
- make sure a model is loaded in LM Studio
- make sure the model name matches what you set in `OPENAI_MODEL`

## 6. Updating Claudio, The Badass

```bash
npm install -g @gitlawb/Claudio-the-badass@latest
```

## 7. Uninstalling Claudio, The Badass

```bash
npm uninstall -g @gitlawb/Claudio-the-badass
```

## Need Advanced Setup?

Use:

- [Advanced Setup](advanced-setup.md)
