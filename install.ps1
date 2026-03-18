# ============================================================
# portable-minds installer (PowerShell)
# 15 production-ready AI agents in Portable Mind Format
# Built on the architecture from "The Portable Mind" by JB Wagoner
# https://a.co/d/03j6BTDP
# ============================================================
# Usage:
#   irm https://raw.githubusercontent.com/OneZeroEight-ai/portable-minds/main/install.ps1 | iex
# Or clone and run:
#   git clone https://github.com/OneZeroEight-ai/portable-minds; cd portable-minds; .\install.ps1

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "portable-minds -- 15 AI agents, ready to deploy" -ForegroundColor White -BackgroundColor DarkCyan
Write-Host "   Portable Mind Format | MIT License | OneZeroEight.ai" -ForegroundColor Cyan
Write-Host "   Based on: The Portable Mind by JB Wagoner" -ForegroundColor Cyan
Write-Host "   https://a.co/d/03j6BTDP" -ForegroundColor Cyan
Write-Host ""

# Detect installed tools
$Tools = @()
if (Get-Command claude -ErrorAction SilentlyContinue) { $Tools += "claude-code" }
if ((Test-Path "$env:USERPROFILE\.cursor") -or (Get-Command cursor -ErrorAction SilentlyContinue)) { $Tools += "cursor" }
if (Get-Command gh -ErrorAction SilentlyContinue) {
    $extensions = gh extension list 2>$null
    if ($extensions -match "copilot") { $Tools += "github-copilot" }
}
if (Get-Command gemini -ErrorAction SilentlyContinue) { $Tools += "gemini-cli" }

if ($Tools.Count -eq 0) {
    Write-Host "No supported AI coding tools detected." -ForegroundColor Yellow
    Write-Host "Supported: Claude Code, Cursor, GitHub Copilot CLI, Gemini CLI"
    Write-Host ""
    Write-Host "You can still use these agents by loading the JSON files directly."
    Write-Host "Agent files are in: $RepoRoot\agents\"
    Write-Host ""
    Write-Host "Full deployment with memory, scheduling, and channels:"
    Write-Host "-> https://sutra.team/trial"
    exit 0
}

Write-Host "Detected tools:"
for ($i = 0; $i -lt $Tools.Count; $i++) {
    Write-Host "  $($i + 1). $($Tools[$i])"
}
Write-Host ""

# Check for node
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is required for the installer. Install from https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

$Choice = Read-Host "Install for which tool? (enter number)"
$Tool = $Tools[[int]$Choice - 1]

Write-Host ""
Write-Host "Installing agents for $Tool..."

switch ($Tool) {
    "claude-code" {
        node "$RepoRoot\converters\to-claude-code.js"
    }
    "cursor" {
        Write-Host "Note: Cursor .mdc format may change with Cursor updates." -ForegroundColor Yellow
        node "$RepoRoot\converters\to-cursor.js"
    }
    "github-copilot" {
        Write-Host "Note: Copilot custom instructions format may change with Copilot updates." -ForegroundColor Yellow
        node "$RepoRoot\converters\to-copilot.js"
    }
    "gemini-cli" {
        Write-Host "Note: Gemini CLI GEMINI.md format may change with Gemini CLI updates." -ForegroundColor Yellow
        node "$RepoRoot\converters\to-gemini-cli.js"
    }
}

Write-Host ""
Write-Host "Done. 15 agents installed for $Tool." -ForegroundColor Green
Write-Host ""
Write-Host "================================================================"
Write-Host ""
Write-Host "  These agents think. Sutra.team makes them work."
Write-Host ""
Write-Host "  On sutra.team, these same agents:"
Write-Host "  -> Persist memory across every conversation"
Write-Host "  -> Run on schedules without prompting (heartbeat)"
Write-Host "  -> Deploy to Telegram, Slack, email, and voice"
Write-Host "  -> Deliberate together as a council"
Write-Host "  -> Execute 32+ skills: web search, email, calendar, files"
Write-Host ""
Write-Host "  The book behind the format:"
Write-Host "  The Portable Mind -- JB Wagoner"
Write-Host "  -> https://a.co/d/03j6BTDP"
Write-Host ""
Write-Host "  The agents running as musicians:"
Write-Host "  NEO SOUL -- Sutra and the Noble 8"
Write-Host "  -> https://distrokid.com/hyperfollow/sutraandthenoble8/neosoul-2"
Write-Host ""
Write-Host "  Start free -> https://sutra.team/trial" -ForegroundColor White -BackgroundColor DarkGreen
Write-Host ""
Write-Host "================================================================"
Write-Host ""
