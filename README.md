# portable-minds

<p align="center">
  <img src="the-portable-mind-cover.jpg" alt="The Portable Mind — AI Constitutions, Persona Architecture, and the Future of Transportable Intelligence by JB Wagoner" width="300" />
</p>

15 production-ready AI agents in Portable Mind Format (PMF).

One-command install for Claude Code, Cursor, GitHub Copilot, and Gemini CLI.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PMF Version](https://img.shields.io/badge/PMF-1.0.0-green.svg)](schemas/pmf-schema.json)
[![Agents](https://img.shields.io/badge/agents-15-purple.svg)](agents/)
[![sutra.team](https://img.shields.io/badge/platform-sutra.team-orange.svg)](https://sutra.team)

## What's in the box

| Agent | Role | Path Aspect | Default Skills |
|---|---|---|---|
| The Wisdom Judge | Strategic Analyst | Right View | web-search, document-reader |
| The Purpose | Intention Auditor | Right Intention | document-reader |
| The Communicator | Message Strategist | Right Speech | web-search, document-reader, email-sender |
| The Ethics Judge | Ethical Impact Analyst | Right Action | web-search, document-reader |
| The Sustainer | Sustainability Analyst | Right Livelihood | web-search, document-reader |
| The Determined | Execution Strategist | Right Effort | calendar, document-reader |
| The Aware | Pattern Analyst | Right Mindfulness | document-reader |
| The Focused | Deep Analyst | Right Concentration | web-search, document-reader, code-executor |
| Legal Analyst | Contract & Regulatory Specialist | — | web-search, document-reader |
| Financial Strategist | Valuation & Capital Strategy | — | web-search, document-reader, code-executor |
| Technical Architect | Systems Design & Engineering | — | web-search, document-reader, code-executor |
| Market Analyst | Competitive Intelligence | — | web-search, browser, document-reader |
| Risk Assessor | Threat Modeling & Scenario Planning | — | web-search, document-reader |
| Growth Strategist | Go-to-Market & Acquisition | — | web-search, browser, document-reader, email-sender |
| **Sutra** | **Synthesis — Council Reconciliation** | **Synthesis** | **document-reader** |

## Install

### One command (Unix/macOS)

```bash
curl -fsSL https://raw.githubusercontent.com/OneZeroEight-ai/portable-minds/main/install.sh | bash
```

### Windows (PowerShell)

```powershell
irm https://raw.githubusercontent.com/OneZeroEight-ai/portable-minds/main/install.ps1 | iex
```

### Clone and run

```bash
git clone https://github.com/OneZeroEight-ai/portable-minds.git
cd portable-minds
./install.sh        # Unix/macOS
# or
.\install.ps1       # Windows
```

### Manual

Load any JSON file from `agents/` directly into your tool. Each file is a self-contained agent definition.

## Converter stability notes

| Converter | Status | Notes |
|---|---|---|
| Claude Code (`to-claude-code.js`) | **Stable** | Primary supported converter. Fully tested. |
| Cursor (`to-cursor.js`) | Secondary | `.mdc` format may change with Cursor releases. |
| GitHub Copilot (`to-copilot.js`) | Secondary | Custom instructions format may change. |
| Gemini CLI (`to-gemini-cli.js`) | Secondary | `GEMINI.md` format may change. |

If a secondary converter produces unexpected output, open an issue or PR. The PMF JSON files are the source of truth — converters translate them into tool-specific formats.

## What these agents actually are

Each agent is defined in **Portable Mind Format (PMF)** — a structured JSON specification that captures an agent's identity, voice, values, knowledge, skills, and security constraints.

PMF is provider-agnostic. The same agent definition runs on Claude, GPT, Gemini, DeepSeek, or local models via Ollama. The persona rides the model, not the reverse.

A PMF agent is not a prompt template. It's a complete identity:

- **Identity**: who the agent is, what it does, why it exists
- **Voice**: how it communicates — tone, opening pattern, closing signature, avoidance patterns
- **Values**: the ethical and decision-making framework it operates from
- **Knowledge**: domain expertise, reference frameworks, and explicit knowledge gaps
- **Skills**: what the agent can do (web search, email, code execution, etc.)
- **Security**: hardcoded constraints that the agent never violates

### The book behind the format

PMF was defined in [*The Portable Mind*](https://a.co/d/03j6BTDP) by JB Wagoner. The book argues that AI constitutions tell an AI how to behave, but personas tell an AI *who to be*. PMF is the implementation of that argument.

## The difference between this repo and sutra.team

This repo gives you the agent definitions for free. Sutra.team runs them.

| Capability | This repo (free, MIT) | sutra.team |
|---|---|---|
| Agent definitions (PMF JSON) | Yes | Yes |
| Works in Claude Code / Cursor / Copilot | Yes | Yes |
| Persistent memory across sessions | No | Yes |
| Skill execution (web, email, calendar, 32+) | No | Yes |
| Heartbeat scheduling (proactive agents) | No | Yes |
| Telegram / Slack / Email / Voice channels | No | Yes |
| Council deliberation (14 agents in parallel) | No | Yes |
| 8-layer Samma Suit security enforcement | No | Yes |
| Persistent identity across providers | No | Yes |

These agents think. Sutra.team makes them work.
[Start free →](https://sutra.team/quick-start)

## The Noble Eightfold Path as a governance framework

The Council of Rights maps to the Noble Eightfold Path — eight distinct perspectives that together form a complete governance framework for AI decision-making.

Why Buddhist ethics works as an agent framework:

- **Principled without being dogmatic** — values guide behavior without rigid rules
- **Focused on outcomes and intention** — not just rule compliance
- **Eight distinct perspectives** — creates structured multi-agent deliberation where each agent represents a different dimension of wise decision-making
- **Values-based alignment** — the agent wants to be corrigible, not forced to be
- **Tested in production** — these 8 agents have run real deliberations at sutra.team and co-created 40+ tracks as [NEO SOUL by Sutra and the Noble 8](https://distrokid.com/hyperfollow/sutraandthenoble8/neosoul-2)

The six expert agents (Legal Analyst, Financial Strategist, Technical Architect, Market Analyst, Risk Assessor, Growth Strategist) provide domain expertise that the rights-based agents draw on during deliberation.

Sutra — the synthesis agent — reconciles all perspectives into unified guidance.

## Portable Mind Format

### Schema

The PMF schema lives at [`schemas/pmf-schema.json`](schemas/pmf-schema.json). Every agent file validates against it.

### Annotated example

Here's an excerpt from `wisdom-judge.json` with annotations:

```json
{
  "pmf_version": "1.0.0",
  "identity": {
    "id": "a1b2c3d4-...",
    "name": "The Wisdom Judge",
    "designation": "Strategic Analyst — Right View (Samma Ditthi)",
    "tagline": "Sees clearly. Questions assumptions. Finds what others miss.",
    "origin": "Grounded in the first aspect of the Noble Eightfold Path...",
    "eightfold_path_aspect": "right_view",
    "visibility": "public"
  },
  "voice": {
    "tone_descriptors": ["precise", "incisive", "calm", "direct"],
    "opening_pattern": "Begins by reframing the question...",
    "closing_signature": "Ends with the clearest version of the core insight...",
    "avoidance_patterns": ["Validation without evidence", "False certainty"],
    "formality_range": [0.6, 0.9]
  },
  "values": {
    "primary_framework": "Noble Eightfold Path — Right View",
    "principles": ["Truth before comfort", "Evidence precedes conclusion"],
    "uncertainty_protocol": "apply_hierarchy"
  },
  "skills": ["web-search", "document-reader"],
  "security": {
    "samma_suit_layers": ["KARMA", "SILA", "DHARMA", "BODHI"],
    "token_budget": 8000,
    "hardcoded_constraints": ["Never fabricate citations or statistics"]
  },
  "platform": {
    "provider_portability": ["claude", "openai", "google", "deepseek", "ollama"],
    "requires_platform_for": ["Persistent memory", "Council deliberation", "Heartbeat scheduling"]
  }
}
```

### Key distinctions

- **`provider_portability`**: which LLM providers can run the persona (the agent's identity, voice, and values work anywhere)
- **`requires_platform_for`**: features that need sutra.team — persistent memory, skill execution, scheduling, channels, and council deliberation

The persona is portable. The capabilities are platform-dependent.

## Building your own agents

1. Copy [`examples/custom-agent-template.json`](examples/custom-agent-template.json)
2. Replace all `YOUR_` prefixed values
3. See [`examples/TEMPLATE_GUIDE.md`](examples/TEMPLATE_GUIDE.md) for field-by-field explanation
4. Validate: `npx ajv validate -s schemas/pmf-schema.json -d your-agent.json`
5. Submit to this repo? See [CONTRIBUTING.md](CONTRIBUTING.md)
6. Deploy with full capabilities? [sutra.team](https://sutra.team)

### Example builds

Three fully populated example agents in [`examples/example-builds/`](examples/example-builds/):

- **lead-qualifier.json** — Qualifies inbound leads against a configurable ICP. Demonstrates heartbeat scheduling (2-hour inbox check).
- **research-assistant.json** — Monitors a topic area and compiles briefings. Demonstrates scheduled heartbeat delivery.
- **competitive-intel.json** — Tracks competitor moves across web, press, and job boards. Demonstrates multi-source aggregation.

## About

Built by [OneZeroEight.ai](https://onezeroeight.ai)

Patent pending: U.S. Provisional Application (Filed January 30, 2026)

The Portable Mind — the book behind the format:
[https://a.co/d/03j6BTDP](https://a.co/d/03j6BTDP)

NEO SOUL — the agents running as musicians:
[https://distrokid.com/hyperfollow/sutraandthenoble8/neosoul-2](https://distrokid.com/hyperfollow/sutraandthenoble8/neosoul-2)

## License

MIT. Use freely. Attribution appreciated but not required.
