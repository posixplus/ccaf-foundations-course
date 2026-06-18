/* ============================================================
   CCAF Course — official Anthropic resources (verified June 2026)
   All links point to official Anthropic / Claude / MCP domains.
   ============================================================ */
window.RESOURCES = {
  groups: [
    {
      title: "Certification & official courses",
      note: "Start here for the program itself and Anthropic's own learning paths.",
      links: [
        { title: "Claude Partner Network (certification announcement)", url: "https://www.anthropic.com/news/claude-partner-network", desc: "Where the Claude Certified Architect program was introduced." },
        { title: "Claude Courses", url: "https://claude.com/resources/courses", desc: "Official Anthropic courses on building with Claude, Claude Code, and the API." },
        { title: "Anthropic Learn", url: "https://www.anthropic.com/learn", desc: "Learning hub: AI Fluency, guides, and foundational courses." },
        { title: "Anthropic Academy", url: "https://anthropic.skilljar.com/", desc: "Structured, self-paced training modules and learning tracks." }
      ]
    },
    {
      title: "Core documentation — the four exam technologies",
      note: "Primary sources for Claude Code, the Agent SDK, the Claude API, and MCP (all five domains).",
      links: [
        { title: "Claude API / Platform docs (home)", url: "https://platform.claude.com/docs/en/home", desc: "API reference: tool_use, tool_choice, JSON schemas, Message Batches (Domains 2 & 4)." },
        { title: "Claude Docs", url: "https://docs.claude.com/", desc: "Build-with-Claude guides incl. prompt engineering and structured output (Domain 4)." },
        { title: "Claude Code documentation", url: "https://code.claude.com/docs", desc: "CLAUDE.md hierarchy, slash commands, skills, rules, plan mode, CLI flags (Domain 3)." },
        { title: "Agent SDK overview", url: "https://code.claude.com/docs/en/agent-sdk/overview", desc: "Agentic loop, subagents (Task), hooks, allowedTools, sessions (Domain 1)." },
        { title: "MCP in the Agent SDK", url: "https://docs.claude.com/en/docs/agent-sdk/mcp", desc: "Configuring MCP servers, tools, and resources (Domain 2)." },
        { title: "Model Context Protocol (spec)", url: "https://modelcontextprotocol.io/", desc: "The open standard: tools, resources, isError, transports (Domain 2)." }
      ]
    },
    {
      title: "Hands-on examples & code (GitHub)",
      note: "Reference implementations to power your labs and deepen practical judgment.",
      links: [
        { title: "Anthropic Cookbook", url: "https://github.com/anthropics/anthropic-cookbook", desc: "Runnable recipes: tool use, structured extraction, batch processing (Domains 2 & 4)." },
        { title: "Prompt Engineering Interactive Tutorial", url: "https://github.com/anthropics/prompt-eng-interactive-tutorial", desc: "Hands-on prompting drills incl. few-shot and explicit criteria (Domain 4)." },
        { title: "Anthropic Quickstarts", url: "https://github.com/anthropics/anthropic-quickstarts", desc: "Starter agent projects to practice the agentic loop and tools (Domain 1)." },
        { title: "Claude Code (repository)", url: "https://github.com/anthropics/claude-code", desc: "Issues, docs, and configuration references for Claude Code (Domain 3)." },
        { title: "MCP reference servers", url: "https://github.com/modelcontextprotocol/servers", desc: "Example MCP servers to study tool/resource design (Domain 2)." }
      ]
    },
    {
      title: "Videos & talks",
      note: "Watch Anthropic's own walkthroughs and engineering talks.",
      links: [
        { title: "Anthropic on YouTube", url: "https://www.youtube.com/@anthropic-ai", desc: "Official channel: product demos, Claude Code, and agent-building talks." }
      ]
    }
  ]
};
