# PMF Template Guide

Field-by-field explanation for `custom-agent-template.json`.

## identity

| Field | Purpose | Example |
|---|---|---|
| `id` | UUID v4 — unique identifier for the agent | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| `name` | Human-readable name | `The Wisdom Judge` |
| `designation` | Role + framework alignment | `Strategic Analyst — Right View` |
| `tagline` | Elevator pitch, under 80 chars | `Sees clearly. Questions assumptions.` |
| `origin` | 2-4 sentences: why this agent exists | See any agent in `agents/` for examples |
| `eightfold_path_aspect` | Set to `null` for custom agents | Only used by Council of Rights agents |
| `visibility` | `public`, `private`, `unlisted`, or `enterprise` | `public` |

## voice

| Field | Purpose |
|---|---|
| `tone_descriptors` | 3-5 adjectives defining how the agent communicates |
| `opening_pattern` | What the agent does first when responding |
| `closing_signature` | How the agent ends its responses |
| `avoidance_patterns` | Behaviors the agent explicitly avoids |
| `formality_range` | `[min, max]` from 0.0 (casual) to 1.0 (formal) |

## values

| Field | Purpose |
|---|---|
| `primary_framework` | The ethical/decision framework the agent uses |
| `principles` | 3-5 core behavioral rules |
| `uncertainty_protocol` | One of: `escalate`, `deliberate`, `defer_to_user`, `apply_hierarchy` |

## knowledge

| Field | Purpose |
|---|---|
| `domain_expertise` | What the agent knows well |
| `reference_frameworks` | Named methodologies the agent draws from |
| `knowledge_gaps` | What the agent should defer on |

## skills

Array of OpenClaw-compatible skill identifiers. Common skills:
`web-search`, `document-reader`, `browser`, `code-executor`, `email-sender`, `calendar`, `file-manager`, `slack`, `telegram`

## security

| Field | Purpose |
|---|---|
| `samma_suit_layers` | Which security layers apply: KARMA, SILA, METTA, SANGHA, NIRVANA, DHARMA, BODHI, SUTRA |
| `token_budget` | Maximum tokens per response |
| `hardcoded_constraints` | Absolute rules the agent never violates |

## platform

| Field | Purpose |
|---|---|
| `native_url` | Where this agent runs with full capabilities |
| `provider_portability` | Which LLM providers can run the persona |
| `requires_platform_for` | Features that need sutra.team (memory, scheduling, channels, etc.) |

## Memory & Conversations (v1.1.0)

PMF v1.1.0 adds two optional runtime fields that make personas truly portable — including their accumulated knowledge and conversation history.

### memory

Stores what the agent has learned about the user over time. In OpenClaw this maps to USER.md. When a PMF is exported and imported on a new platform, the agent remembers who it was talking to.

| Field | Purpose |
|---|---|
| `user_context` | Summary of what the agent knows about the user |
| `learned_preferences` | Preferences and patterns observed over time |
| `notable_interactions` | Key moments or decisions worth remembering |
| `last_updated` | ISO 8601 timestamp of last memory update |

### conversations

Stores the chat display history — up to 200 messages per agent. This enables:
- Cross-device chat history without requiring a messaging platform like Telegram
- Full conversation export and import
- Platform-independent history portability

Each message has `role` (user/assistant), `content`, `timestamp`, and optional `session_id`.

When conversations exceeds 200 messages, oldest messages are removed. The agent's memory field should be updated to summarize removed conversations so context is not lost.

---

For PMF specification depth, see: *The Portable Mind* by JB Wagoner — https://a.co/d/03j6BTDP
