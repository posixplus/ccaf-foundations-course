/* ============================================================
   CCAF Course content — modules, lessons, slides, narration
   Each slide: {kicker,title,bullets[],text,big,code,center, say}
   `say` = the enthusiastic narration (also drives captions + audio file naming)
   audioBase: "assets/audio/<id>" -> slide files "<id>-1.m4a", "<id>-2.m4a", ...
   ============================================================ */
window.COURSE = {
  meta: { title: "Claude Certified Architect – Foundations", pass: 720 },
  modules: [

  /* ===================== MODULE 0 — ORIENTATION ===================== */
  {
    id: "m0", num: 0, title: "Orientation", summary: "What the exam is, how it's scored, and how to use this course to pass it.",
    lessons: [
      {
        id: "o-welcome", title: "Welcome & how to pass this exam", audioBase: "assets/audio/o-welcome",
        subtitle: "Meet the exam, the mindset, and the plan that gets you certified.",
        slides: [
          { center: true, kicker: "Welcome", big: "You're about to become a Claude Certified Architect.",
            say: "Welcome to the most complete free course for the Claude Certified Architect Foundations exam! I'm thrilled you're here, and over the next few hours we are going to turn you into someone who can architect real production systems with Claude - and pass this exam with confidence. Let's go!" },
          { kicker: "What this cert proves", title: "It's about judgment, not trivia", bullets: [
            "Validates you can make sound tradeoff decisions building real systems with Claude",
            "Four core technologies: Claude Code, the Agent SDK, the Claude API, and MCP",
            "Every question is a realistic production scenario - not a definition quiz" ],
            say: "Here's the key thing to understand: this certification is about judgment. Anthropic isn't testing whether you memorized definitions. They're testing whether you can look at a messy, real-world production problem and pick the best architectural decision. The whole thing covers four technologies - Claude Code, the Agent SDK, the Claude API, and the Model Context Protocol. Keep that judgment mindset front and center the entire time." },
          { kicker: "The five domains", title: "Where the points live", bullets: [
            "Domain 1 — Agentic Architecture & Orchestration — 27%",
            "Domain 2 — Tool Design & MCP Integration — 18%",
            "Domain 3 — Claude Code Configuration & Workflows — 20%",
            "Domain 4 — Prompt Engineering & Structured Output — 20%",
            "Domain 5 — Context Management & Reliability — 15%" ],
            say: "The exam splits into five domains. Domain one, agentic architecture and orchestration, is the biggest at twenty-seven percent - so that's where we invest the most. Then tool design and MCP at eighteen, Claude Code at twenty, prompt engineering and structured output at twenty, and context management and reliability at fifteen. Notice that agentic patterns and Claude Code together are nearly half the exam. We'll weight your study time to match." },
          { kicker: "How it's scored", title: "720 out of 1000 to pass", bullets: [
            "Multiple choice: one best answer, three distractors",
            "Scaled score 100–1000; you need 720 (roughly 69% correct)",
            "No penalty for guessing - never leave a question blank" ],
            say: "Scoring is simple. Every question is multiple choice with one correct answer and three distractors - and those distractors are specifically designed to look tempting if your knowledge is shaky. Your score is scaled from one hundred to one thousand, and you need seven-twenty to pass, which is roughly sixty-nine percent. And critically: there is no penalty for guessing. So you never, ever leave a question blank. If you're stuck, eliminate and guess." },
          { kicker: "How to use this course", title: "Watch, practice, build", bullets: [
            "Watch the narrated lessons in order - they follow the blueprint exactly",
            "Take the domain quiz after each module while it's fresh",
            "Do the four hands-on labs - they mirror the official prep exercises",
            "Finish with the full timed mock exam, then review every miss" ],
            say: "So here's how to win with this course. Watch the lessons in order - they map one-to-one onto the official blueprint, so nothing is filler. After each domain, take the quiz right away while it's fresh. Then do the hands-on labs, because actually building is the number one predictor of passing. And when you're ready, sit the full timed mock exam under real conditions, and review every single question you miss. Do that, and you'll walk in ready. Let's get into it!" }
        ],
        takeaways: [
          "The exam tests **architectural judgment** on realistic scenarios, not definitions.",
          "Pass mark is **720/1000** (~69%); no penalty for guessing, so never leave blanks.",
          "Domain weights: D1 27%, D2 18%, D3 20%, D4 20%, D5 15% - study to match.",
          "Distractors are designed to catch incomplete knowledge - always eliminate." ]
      },
      {
        id: "o-format", title: "Exam format & the 6 scenarios", audioBase: "assets/audio/o-format",
        subtitle: "How questions are framed and the six production scenarios they're drawn from.",
        slides: [
          { kicker: "Question style", title: "Scenario-framed, single best answer", bullets: [
            "The exam presents 4 scenarios (picked from 6) that frame the questions",
            "Each question gives production context, then asks the best action",
            "Often several options 'work' - you pick the one that best fits constraints" ],
            say: "Let's talk format so there are no surprises on exam day. The questions are framed by scenarios - on the real exam you'll get four scenarios pulled at random from a pool of six. Each question hands you a slice of production reality - metrics, logs, a symptom - and asks for the best action. And here's the trap: often two or three options technically work. Your job is to pick the one that best fits the stated constraints. That's the judgment skill again." },
          { kicker: "The 6 scenarios", title: "Know these cold", bullets: [
            "1 — Customer Support Resolution Agent (Agent SDK + MCP tools)",
            "2 — Code Generation with Claude Code",
            "3 — Multi-Agent Research System (coordinator + subagents)",
            "4 — Developer Productivity tools (built-in tools + MCP)",
            "5 — Claude Code for Continuous Integration (CI/CD)",
            "6 — Structured Data Extraction (JSON schemas + validation)" ],
            say: "These are the six scenarios, and you should know each one cold. A customer support resolution agent built on the Agent SDK with MCP tools. Code generation with Claude Code. A multi-agent research system with a coordinator delegating to subagents. Developer productivity tools using the built-in tools plus MCP. Claude Code wired into a CI/CD pipeline. And a structured data extraction system using JSON schemas. We dedicate an entire module to walking through all six - because if you recognize the scenario, you're halfway to the answer." },
          { kicker: "Recurring tension", title: "The themes the exam loves", bullets: [
            "Deterministic enforcement (hooks, gates) vs probabilistic prompting",
            "Right-sized solution vs over-engineering (classifiers, extra infra)",
            "Scoped tools & context vs giving an agent everything",
            "Structured data & errors vs generic blobs" ],
            say: "Across all six scenarios, the same tensions show up again and again, and recognizing them is your cheat code. One: when business rules must be guaranteed, prefer deterministic enforcement like hooks and prerequisite gates over hoping a prompt complies. Two: pick the right-sized fix - the exam punishes over-engineering like training a classifier when a better prompt would do. Three: scope tools and context tightly instead of giving an agent everything. And four: prefer structured data and structured errors over generic blobs. Memorize those four tensions." },
          { center: true, kicker: "Mindset", big: "When two answers both work, the exam rewards the simplest fix that directly targets the root cause.",
            say: "If you remember one sentence from this lesson, make it this one: when two answers both seem to work, the exam rewards the simplest fix that directly targets the root cause. Not the fanciest. Not the most infrastructure. The most proportionate. Hold onto that, and let's start learning the material that makes those calls obvious." }
        ],
        takeaways: [
          "Exam shows **4 of 6 scenarios**; each question is production context + 'best action'.",
          "Know all six scenarios - recognizing the scenario narrows the answer fast.",
          "Four recurring tensions: deterministic vs probabilistic, right-sized vs over-engineered, scoped vs everything, structured vs generic.",
          "When answers tie, choose the **simplest fix targeting the root cause**." ]
      }
    ]
  },

  /* ===================== MODULE 1 — DOMAIN 1 ===================== */
  {
    id: "m1", num: 1, title: "Agentic Architecture & Orchestration", domain: 1, weight: 27, quizId: true,
    summary: "Agentic loops, coordinator-subagent systems, the Task tool, hooks, decomposition, and sessions.",
    lessons: [
      {
        id: "l1-1", task: "Task 1.1", title: "The agentic loop", audioBase: "assets/audio/l1-1",
        subtitle: "Designing autonomous task execution around stop_reason.",
        slides: [
          { kicker: "The core loop", title: "What an agentic loop actually is", bullets: [
            "Send request to Claude → inspect the response's stop_reason",
            "If stop_reason is 'tool_use': run the tool(s), append results, loop again",
            "If stop_reason is 'end_turn': you're done - present the final answer" ],
            say: "Let's crack open the single most important concept in domain one: the agentic loop. It's beautifully simple. You send a request to Claude and you look at one field in the response - the stop reason. If the stop reason is tool use, that means Claude wants to call a tool. So you execute the tool, append the result to the conversation, and send it right back for another turn. If the stop reason is end turn, Claude is finished thinking and you present the answer. That loop - send, check stop reason, run tools, repeat - is the heartbeat of every agent." },
          { kicker: "Why it works", title: "Tool results become new context", bullets: [
            "Each tool result is appended to conversation history",
            "Claude reasons over the updated history to decide the next action",
            "This is model-driven decision-making, not a hardcoded sequence" ],
            say: "Why is this so powerful? Because every tool result you append becomes new context that Claude reasons over to decide what to do next. The model is driving the decisions - it looks at what it just learned and chooses the next tool. That's fundamentally different from a hardcoded decision tree where you, the developer, pre-script every step. The exam loves this distinction: model-driven decision-making versus pre-configured tool sequences. Agents are model-driven." },
          { kicker: "Anti-patterns", title: "How people get the loop wrong", bullets: [
            "❌ Parsing natural-language text to decide when to stop",
            "❌ Using an arbitrary max-iteration cap as the primary stop mechanism",
            "❌ Checking for assistant text content as a 'done' signal",
            "✅ Terminate strictly on stop_reason == 'end_turn'" ],
            say: "Now, the exam will absolutely test the anti-patterns, so let's nail them. The wrong way to end a loop is to parse Claude's natural language looking for phrases like I'm finished. That's fragile and unreliable. It's also wrong to use an arbitrary iteration cap as your main stopping mechanism - a safety cap is fine as a backstop, but it's not how you decide you're done. And don't check whether there's assistant text as your completion signal. The one correct answer is always: terminate when stop reason equals end turn. Structured signal, not vibes." },
          { kicker: "Skill", title: "Implementing it cleanly", code:
            'while True:\n    resp = client.messages.create(model, messages, tools=tools)\n    if resp.stop_reason == "tool_use":\n        results = run_tools(resp.content)        # execute requested tools\n        messages.append(assistant(resp.content)) # keep Claude\'s turn\n        messages.append(user(results))           # feed results back\n        continue\n    if resp.stop_reason == "end_turn":\n        return resp                                # done',
            say: "Here's the loop in about eight lines. We loop forever. We call the model. If the stop reason is tool use, we run the requested tools, we append Claude's turn AND the tool results to the messages, and we continue the loop. If the stop reason is end turn, we return. That's it. Notice we append both Claude's tool-use turn and the results - skipping either breaks the conversation. If you can write this from memory, you own task statement one-one." },
          { center: true, kicker: "Remember", big: "Loop while stop_reason == 'tool_use'. Stop when stop_reason == 'end_turn'. Never parse text to decide.",
            say: "Lock this in: loop while the stop reason is tool use, stop when it's end turn, and never parse text to decide. Get that reflex and a whole cluster of exam questions become free points. On to multi-agent systems!" }
        ],
        takeaways: [
          "The agentic loop: send → inspect `stop_reason` → run tools & append results → repeat.",
          "Continue while `stop_reason == 'tool_use'`; terminate on `'end_turn'`.",
          "Tool results appended to history enable **model-driven** next-action decisions.",
          "Anti-patterns: parsing text for completion, arbitrary iteration caps as primary stop, checking for assistant text." ]
      },
      {
        id: "l1-2", task: "Task 1.2", title: "Coordinator–subagent orchestration", audioBase: "assets/audio/l1-2",
        subtitle: "Hub-and-spoke multi-agent systems and their failure modes.",
        slides: [
          { kicker: "The pattern", title: "Hub-and-spoke", bullets: [
            "A coordinator agent manages ALL inter-subagent communication",
            "It owns task decomposition, delegation, result aggregation, error handling",
            "Subagents are specialists: web search, document analysis, synthesis, reporting" ],
            say: "Multi-agent systems on this exam follow one architecture: hub-and-spoke. There's a coordinator at the center, and it manages all communication between subagents. The coordinator decomposes the task, delegates to specialist subagents, aggregates their results, and handles errors. The subagents are focused specialists - one searches the web, one analyzes documents, one synthesizes, one writes the report. All routing goes through the hub. That centralization is what gives you observability and consistent error handling." },
          { kicker: "Critical fact", title: "Subagents have isolated context", bullets: [
            "Subagents do NOT inherit the coordinator's conversation history",
            "Any context a subagent needs must be explicitly placed in its prompt",
            "This isolation is a feature - it keeps each agent focused and token-lean" ],
            say: "Here is the fact the exam tests more than any other in multi-agent land: subagents have isolated context. They do not automatically inherit the coordinator's conversation history. They start fresh. So whatever a subagent needs to know, you must explicitly hand it in its prompt. If you forget this, your synthesis agent will produce garbage because it never saw the research. Remember: isolation is intentional - it keeps each agent focused and keeps token usage lean - but it puts the burden on you to pass context explicitly." },
          { kicker: "The classic failure", title: "Over-narrow decomposition", bullets: [
            "Coordinator decomposes too narrowly → incomplete topic coverage",
            "Example: 'creative industries' split only into visual arts subtasks",
            "Subagents execute perfectly, but the final report misses whole domains" ],
            say: "Now the signature failure mode, and it shows up as a real exam question. When the final output is missing whole areas of a topic, the root cause is almost always the coordinator decomposing too narrowly. Picture researching the impact of A.I. on creative industries, and the coordinator only spins up subtasks for digital art, graphic design, and photography - completely missing music, writing, and film. Each subagent did its job perfectly. The problem is upstream, in what they were assigned. When you see perfect subagent execution but incomplete coverage, blame the coordinator's decomposition - not the workers." },
          { kicker: "Skills", title: "Designing a good coordinator", bullets: [
            "Dynamically select which subagents to invoke based on query complexity",
            "Partition scope to minimize duplication (distinct subtopics per agent)",
            "Run iterative refinement: evaluate synthesis for gaps, re-delegate, repeat",
            "Route all subagent comms through the coordinator for observability" ],
            say: "So what does a good coordinator do? First, it dynamically selects which subagents to invoke based on the query - it doesn't blindly push everything through the full pipeline. Second, it partitions scope so subagents don't duplicate each other - assign distinct subtopics or source types. Third, it runs iterative refinement: it looks at the synthesis, spots coverage gaps, and re-delegates targeted queries until coverage is sufficient. And fourth, it routes everything through itself for observability and consistent error handling. Smart hub, focused spokes." },
          { center: true, kicker: "Remember", big: "Subagents don't inherit context. Missing coverage = coordinator decomposed too narrowly.",
            say: "Two reflexes to bank from this lesson: subagents never inherit the coordinator's context, so pass it explicitly. And when the output has coverage gaps but every subagent worked, the coordinator's decomposition was too narrow. Those two facts answer a surprising number of questions." }
        ],
        takeaways: [
          "Multi-agent = **hub-and-spoke**: coordinator owns decomposition, delegation, aggregation, error handling.",
          "Subagents have **isolated context** - they don't inherit coordinator history; pass context explicitly.",
          "Incomplete coverage with correct subagent execution ⇒ **coordinator decomposed too narrowly**.",
          "Good coordinators: dynamic subagent selection, scope partitioning, iterative refinement for gaps." ]
      },
      {
        id: "l1-3", task: "Task 1.3", title: "Subagent invocation & context passing", audioBase: "assets/audio/l1-3",
        subtitle: "The Task tool, AgentDefinition, and passing complete findings.",
        slides: [
          { kicker: "Mechanism", title: "The Task tool spawns subagents", bullets: [
            "Subagents are spawned via the Task tool",
            "The coordinator's allowedTools MUST include \"Task\"",
            "AgentDefinition configures each subagent: description, system prompt, tool restrictions" ],
            say: "How does a coordinator actually create a subagent? Through the Task tool. And here's a detail the exam checks: for a coordinator to invoke subagents, its allowed-tools list must include Task. If Task isn't in allowedTools, no subagents - full stop. Each subagent type is configured with an AgentDefinition, which sets its description, its system prompt, and its tool restrictions. So you define the specialist once, then spawn it via Task." },
          { kicker: "Context passing", title: "Hand over complete findings", bullets: [
            "Include prior agents' complete findings directly in the subagent's prompt",
            "e.g. pass web-search results and document analysis into the synthesis prompt",
            "Use structured formats that separate content from metadata (URLs, page #s)" ],
            say: "Because subagents start with no shared memory, you pass context by putting prior findings directly into the new subagent's prompt. Building a synthesis agent? Put the actual web search results and document analysis into its prompt - don't assume it can see them. And do it with structure: separate the content from the metadata like source URLs, document names, and page numbers, so attribution survives the handoff. Sloppy context passing is where multi-agent systems quietly fall apart." },
          { kicker: "Parallelism", title: "Spawn subagents in parallel", bullets: [
            "Emit MULTIPLE Task tool calls in a SINGLE coordinator response",
            "That runs subagents in parallel - not across separate turns",
            "Big latency win for independent research branches" ],
            say: "Want speed? Spawn in parallel. The trick is to emit multiple Task tool calls in a single coordinator response. When the coordinator returns several Task calls at once, those subagents run in parallel. If instead you spawn them one per turn, you've serialized them and thrown away the latency win. So for independent branches - like searching three different source types - fire all the Task calls together. The exam rewards knowing that parallelism comes from multiple Task calls in one response." },
          { kicker: "Prompt design", title: "Goals, not step-by-step scripts", bullets: [
            "Coordinator prompts should specify research goals and quality criteria",
            "Avoid rigid step-by-step procedural instructions",
            "Goal-oriented prompts let subagents adapt to what they find" ],
            say: "One more skill: design coordinator prompts around goals and quality criteria, not rigid step-by-step scripts. If you over-specify the exact procedure, the subagent can't adapt when it discovers something unexpected. Tell it what good looks like - the research goal and the quality bar - and let the model figure out the steps. Goal-oriented prompting plus adaptable specialists is the winning combination." },
          { center: true, kicker: "Remember", big: "Task tool spawns subagents (allowedTools must include 'Task'). Multiple Task calls in one response = parallel.",
            say: "Bank these: the Task tool spawns subagents, and the coordinator's allowedTools must include Task. Pass complete findings explicitly into prompts. And multiple Task calls in one response run in parallel. Three facts, lots of points." }
        ],
        takeaways: [
          "Subagents are spawned with the **Task tool**; coordinator `allowedTools` must include `\"Task\"`.",
          "**AgentDefinition** sets each subagent's description, system prompt, and tool restrictions.",
          "Pass complete prior findings **directly in the subagent's prompt**; separate content from metadata.",
          "**Multiple Task calls in one response = parallel** execution; design prompts around goals, not scripts." ]
      },
      {
        id: "l1-4", task: "Task 1.4", title: "Enforcement & handoff patterns", audioBase: "assets/audio/l1-4",
        subtitle: "Programmatic gates vs prompt guidance, and structured escalation handoffs.",
        slides: [
          { kicker: "The big distinction", title: "Enforcement vs guidance", bullets: [
            "Programmatic enforcement: hooks, prerequisite gates - deterministic",
            "Prompt-based guidance: instructions in the system prompt - probabilistic",
            "Prompts have a non-zero failure rate - even good ones don't comply 100%" ],
            say: "This task statement is one of the highest-value ideas on the entire exam, so let's be crisp. There are two ways to control workflow ordering. Programmatic enforcement - hooks and prerequisite gates - which is deterministic and guaranteed. And prompt-based guidance - instructions in the system prompt - which is probabilistic. Here's the line you must internalize: prompt instructions, no matter how well written, have a non-zero failure rate. Tell the model a hundred times to verify identity first, and some small percentage of the time it won't." },
          { kicker: "When it matters", title: "Deterministic compliance for critical rules", bullets: [
            "Identity verification before financial operations",
            "Refund limits, policy gates, anything with money or safety on the line",
            "If a rule MUST hold, enforce it in code - not in a prompt" ],
            say: "So when does the difference matter? Whenever a rule absolutely must hold. Verifying a customer's identity before processing a refund. Blocking refunds over a threshold. Any gate where money or safety is on the line. For those, you do not rely on a prompt - you enforce it in code with a programmatic prerequisite. This exact situation is the very first sample question on the official exam, and the answer is always the deterministic gate, never the better-worded prompt." },
          { kicker: "Skill", title: "Prerequisite gates", bullets: [
            "Block downstream tools until prerequisites complete",
            "e.g. block process_refund until get_customer returns a verified ID",
            "The gate makes the ordering impossible to skip" ],
            say: "Concretely, you implement a prerequisite gate that blocks downstream tool calls until the prerequisite has completed. Block process refund until get customer has returned a verified customer I.D. Now it is literally impossible for the agent to refund someone it hasn't verified - the gate intercepts and refuses. Compare that to a prompt saying please verify first - the gate wins every time a guarantee is required." },
          { kicker: "Handoffs", title: "Structured escalation to humans", bullets: [
            "Human agents often lack the conversation transcript",
            "Compile a structured handoff: customer ID, root cause, amount, recommended action",
            "Decompose multi-concern requests, investigate each, then synthesize" ],
            say: "The other half of this task is handoffs. When an agent escalates to a human, that human usually can't see the whole conversation. So don't just throw the chat over the wall - compile a structured handoff summary: the customer I.D., the root cause analysis, the refund amount, and a recommended action. And for messy multi-concern requests, decompose them into distinct items, investigate each, then synthesize one unified resolution. Structure in, structure out." },
          { center: true, kicker: "Remember", big: "If a business rule MUST hold, enforce it programmatically. Prompts are guidance, not guarantees.",
            say: "The one-liner for this lesson: if a business rule must hold, enforce it programmatically - prompts are guidance, not guarantees. Any exam question about guaranteed compliance, financial gates, or required ordering points straight at hooks and prerequisite gates. Memorize that reflex." }
        ],
        takeaways: [
          "**Programmatic enforcement** (hooks, gates) is deterministic; **prompt guidance** is probabilistic with non-zero failure.",
          "For guaranteed rules (identity-before-refund, limits), **enforce in code**, not prompts.",
          "Prerequisite gates block downstream tools until prerequisites complete (e.g. `process_refund` after verified `get_customer`).",
          "Escalations need **structured handoffs** (ID, root cause, amount, recommended action) - humans lack the transcript." ]
      },
      {
        id: "l1-5", task: "Task 1.5", title: "Agent SDK hooks", audioBase: "assets/audio/l1-5",
        subtitle: "Tool-call interception and data normalization with PostToolUse.",
        slides: [
          { kicker: "What hooks do", title: "Intercept the tool pipeline", bullets: [
            "PostToolUse: intercept tool RESULTS before the model processes them",
            "Pre-call interception: intercept outgoing tool CALLS to enforce rules",
            "Hooks give deterministic guarantees; prompts give probabilistic hope" ],
            say: "Hooks are how you reach into the tool pipeline and take control. There are two flavors to know. PostToolUse hooks intercept the results coming back from a tool before the model ever sees them - perfect for cleaning data. And call-interception hooks intercept the outgoing tool calls before they execute - perfect for enforcing rules. The theme from the last lesson carries straight over: hooks are deterministic guarantees, prompts are probabilistic hope." },
          { kicker: "Use case 1", title: "Normalize heterogeneous data", bullets: [
            "Different MCP tools return different formats: Unix timestamps, ISO 8601, status codes",
            "A PostToolUse hook normalizes them BEFORE the agent reasons over them",
            "The model then sees one clean, consistent format" ],
            say: "First big use case: data normalization. Imagine your agent talks to several MCP tools and one returns Unix timestamps, another returns ISO eight-six-oh-one dates, another returns numeric status codes. If the model has to reconcile all that, it wastes reasoning and makes mistakes. So you put a PostToolUse hook in front: it normalizes every result into one clean format before the agent reasons over it. The model sees consistency, and your reliability jumps." },
          { kicker: "Use case 2", title: "Intercept policy-violating calls", bullets: [
            "Block outgoing calls that violate policy (e.g. refunds over $500)",
            "Redirect to an alternative workflow (e.g. human escalation)",
            "Deterministic - the action simply cannot happen" ],
            say: "Second use case: enforcing business rules by intercepting calls. Say refunds over five hundred dollars need a manager. A tool-call interception hook inspects the outgoing process-refund call, sees it exceeds five hundred, blocks it, and redirects to a human escalation workflow. The agent literally cannot push that refund through. That's the deterministic guarantee you reach for whenever the exam says a rule must be enforced - choose the hook over the prompt." },
          { center: true, kicker: "Remember", big: "PostToolUse normalizes results; call-interception blocks policy violations. Choose hooks when compliance must be guaranteed.",
            say: "Wrap-up: PostToolUse hooks normalize results before the model sees them, and call-interception hooks block policy-violating actions. Any time the exam wants a guarantee - clean data or enforced policy - reach for a hook. Onward to decomposition strategies!" }
        ],
        takeaways: [
          "**PostToolUse** hooks intercept tool results (normalize timestamps/formats) before the model reasons over them.",
          "**Call-interception** hooks block policy-violating outgoing calls (e.g. refunds > $500) and redirect.",
          "Hooks = deterministic guarantees; choose them over prompts when compliance must be guaranteed." ]
      },
      {
        id: "l1-6", task: "Task 1.6", title: "Task decomposition strategies", audioBase: "assets/audio/l1-6",
        subtitle: "Prompt chaining vs dynamic adaptive decomposition.",
        slides: [
          { kicker: "Two strategies", title: "Fixed vs adaptive", bullets: [
            "Prompt chaining: fixed sequential pipeline of predictable steps",
            "Dynamic decomposition: generate subtasks from what you discover at each step",
            "Match the strategy to how predictable the work is" ],
            say: "When a task is too big for one shot, you decompose it - and there are two strategies the exam wants you to choose between. Prompt chaining is a fixed, sequential pipeline: step one, then two, then three, all known in advance. Dynamic decomposition generates the next subtasks based on what you discover as you go. The whole skill is matching the strategy to how predictable the work is. Predictable and multi-aspect? Chain it. Open-ended investigation? Go dynamic." },
          { kicker: "Prompt chaining", title: "Great for predictable multi-aspect reviews", bullets: [
            "Break a code review into per-file analysis, then a cross-file integration pass",
            "Each step is well-defined and runs in sequence",
            "Splitting avoids attention dilution from doing everything at once" ],
            say: "Prompt chaining shines for predictable, multi-aspect work like a big code review. You analyze each file individually for local issues, then run a separate cross-file integration pass for how they interact. Each step is well-defined and sequential. And there's a bonus: splitting the work avoids attention dilution. When you ask a model to review fourteen files all at once, depth suffers and it contradicts itself. Focused passes keep quality consistent." },
          { kicker: "Dynamic decomposition", title: "Great for open-ended investigation", bullets: [
            "e.g. 'add comprehensive tests to a legacy codebase'",
            "First map structure, identify high-impact areas, then build a prioritized plan",
            "The plan adapts as dependencies are discovered" ],
            say: "Dynamic decomposition is for open-ended tasks where you can't know the steps up front - like add comprehensive tests to a legacy codebase. You can't pre-script that. Instead you first map the structure, identify the high-impact areas, and build a prioritized plan that adapts as you discover dependencies. The investigation generates its own next steps. When the exam describes an exploratory task with unknown shape, dynamic adaptive decomposition is your answer." },
          { center: true, kicker: "Remember", big: "Predictable multi-aspect work → prompt chaining. Open-ended investigation → dynamic decomposition.",
            say: "Simple decision rule to memorize: predictable, multi-aspect work gets prompt chaining; open-ended investigation gets dynamic decomposition. And remember the side benefit of splitting - it prevents attention dilution. Next up, session management." }
        ],
        takeaways: [
          "**Prompt chaining** = fixed sequential pipeline; best for predictable multi-aspect work (per-file then cross-file review).",
          "**Dynamic decomposition** = subtasks generated from discoveries; best for open-ended investigation (e.g. tests for legacy code).",
          "Splitting large work into focused passes prevents **attention dilution** and contradictory output." ]
      },
      {
        id: "l1-7", task: "Task 1.7", title: "Sessions: resume & fork", audioBase: "assets/audio/l1-7",
        subtitle: "Named resumption, fork_session, and when to start fresh.",
        slides: [
          { kicker: "Resuming", title: "Continue a specific conversation", bullets: [
            "--resume <session-name> continues a specific prior conversation",
            "Use named sessions to pick up long investigations across work sessions",
            "Inform the agent about file changes made since you paused" ],
            say: "Sessions let your work persist across time. To continue a specific prior conversation, you use resume with a session name. Name your sessions, and you can pick a long investigation right back up days later. One important habit: if you modified files after pausing, tell the agent what changed when you resume - otherwise it's reasoning over stale assumptions. Resume continues a named thread; just keep it honest about what's changed." },
          { kicker: "Forking", title: "Branch from a shared baseline", bullets: [
            "fork_session creates an independent branch from a shared analysis baseline",
            "Explore divergent approaches in parallel (e.g. two testing strategies)",
            "Each fork is isolated - experiments don't pollute each other" ],
            say: "Forking is the other superpower. fork_session creates an independent branch from a shared baseline. Say you've analyzed a codebase and now you want to compare two refactoring approaches. You fork from that shared analysis into two isolated branches and explore both in parallel without them contaminating each other. Resume is for continuing one line of work; fork is for branching into divergent experiments from a common starting point." },
          { kicker: "Judgment call", title: "Resume vs start fresh", bullets: [
            "Resume when prior context is mostly still valid",
            "Start a NEW session with an injected summary when prior tool results are stale",
            "A clean session + structured summary beats resuming with stale results" ],
            say: "Now the judgment the exam tests: resume versus start fresh. Resume when the prior context is mostly still valid. But when the prior tool results are stale - the code changed a lot, the data moved - it is more reliable to start a brand-new session and inject a structured summary of what matters, rather than resume on top of outdated tool outputs. A clean session with a good summary beats dragging stale results forward. Freshness over history when the history has gone bad." },
          { center: true, kicker: "Remember", big: "--resume continues a named session. fork_session branches from a baseline. Start fresh + summary when results are stale.",
            say: "Three to bank: resume with a session name continues a specific conversation, fork session branches from a shared baseline for divergent exploration, and when prior results are stale you start fresh with an injected summary. That closes out domain one's biggest module - amazing work. Take the domain quiz next while it's fresh!" }
        ],
        takeaways: [
          "`--resume <session-name>` continues a specific prior conversation; tell the agent about file changes since.",
          "`fork_session` branches from a shared baseline to explore divergent approaches in isolation.",
          "**Resume** when prior context is valid; **start fresh + injected summary** when prior tool results are stale." ]
      }
    ]
  },

  /* ===================== MODULE 2 — DOMAIN 2 ===================== */
  {
    id: "m2", num: 2, title: "Tool Design & MCP Integration", domain: 2, weight: 18, quizId: true,
    summary: "Tool descriptions, structured errors, tool distribution, MCP server config, and built-in tools.",
    lessons: [
      {
        id: "l2-1", task: "Task 2.1", title: "Designing effective tool interfaces", audioBase: "assets/audio/l2-1",
        subtitle: "Descriptions are how the model selects tools.",
        slides: [
          { kicker: "Core idea", title: "The description IS the selection mechanism", bullets: [
            "Tool descriptions are the primary way the model decides which tool to use",
            "Minimal descriptions → unreliable selection among similar tools",
            "Good descriptions include input formats, example queries, edge cases, boundaries" ],
            say: "Domain two opens with the single most important tool-design idea: the tool description is the mechanism the model uses to select a tool. The model reads your descriptions to decide what to call. So if your descriptions are thin - retrieves customer information, retrieves order details - the model can't reliably tell similar tools apart. A great description spells out input formats, example queries, edge cases, and the boundary between this tool and its neighbors. Description quality directly equals selection reliability." },
          { kicker: "The failure", title: "Ambiguous descriptions cause misrouting", bullets: [
            "analyze_content vs analyze_document with near-identical descriptions → misrouting",
            "System-prompt wording is keyword-sensitive and can override good descriptions",
            "First fix for misrouting: expand the descriptions, don't add a router" ],
            say: "Here's the classic failure: two tools with near-identical descriptions, like analyze content and analyze document. The model flips a coin and misroutes. There's a second subtlety too - keyword-sensitive wording in your system prompt can accidentally override even a well-written description. Now, the exam-critical part: when tool selection is unreliable because of minimal descriptions, the best FIRST step is to expand the descriptions. Not build a routing classifier - that's over-engineering. Fix the descriptions first." },
          { kicker: "Skills", title: "Differentiate, rename, split", bullets: [
            "Write descriptions that clearly differentiate purpose, inputs, outputs, when-to-use",
            "Rename to remove overlap (analyze_content → extract_web_results)",
            "Split a generic tool into purpose-specific tools with defined I/O contracts" ],
            say: "So what do you actually do? Three moves. One: write descriptions that clearly differentiate each tool's purpose, inputs, outputs, and when to use it versus a similar one. Two: rename tools to eliminate overlap - turn a vague analyze content into extract web results with a web-specific description. Three: split a generic tool into purpose-specific tools, each with a defined input-output contract - for example, split analyze document into extract data points, summarize content, and verify claim against source. Clear names, clear contracts, reliable selection." },
          { center: true, kicker: "Remember", big: "Misrouting from thin descriptions? Expand the descriptions first - don't reach for a router.",
            say: "The reflex to lock in: when tools get misrouted because of thin descriptions, the first fix is to expand the descriptions - and renaming or splitting if overlap remains. A routing classifier is over-engineering for this problem. Description quality is everything. Next: structured errors." }
        ],
        takeaways: [
          "Tool **descriptions are the primary selection mechanism** - minimal descriptions cause unreliable choice.",
          "Include input formats, example queries, edge cases, and when-to-use-vs-alternatives.",
          "Misrouting from thin descriptions ⇒ **expand descriptions first** (then rename/split); a router is over-engineering.",
          "Split generic tools into purpose-specific tools with defined I/O contracts." ] },
      {
        id: "l2-2", task: "Task 2.2", title: "Structured error responses for MCP tools", audioBase: "assets/audio/l2-2",
        subtitle: "isError, error categories, and retryable metadata.",
        slides: [
          { kicker: "The flag", title: "isError communicates failure", bullets: [
            "MCP uses the isError flag to signal a tool failure back to the agent",
            "Generic 'Operation failed' prevents the agent from recovering intelligently",
            "Structured metadata lets the agent choose the right recovery" ],
            say: "When an MCP tool fails, it tells the agent through the isError flag. But the flag alone isn't enough. If every failure just says operation failed, the agent has no idea what to do next - retry? give up? explain to the user? The fix is structured error metadata. Give the agent enough information to make a smart recovery decision instead of guessing. Generic errors are where reliability goes to die." },
          { kicker: "Categories", title: "Four kinds of error", bullets: [
            "Transient: timeouts, service unavailable - usually retryable",
            "Validation: invalid input - not retryable without changes",
            "Business: policy violations - explain to the user, don't retry",
            "Permission: access denied - retry won't help" ],
            say: "Know the four error categories cold. Transient errors - timeouts, service unavailable - those are usually worth a retry. Validation errors mean the input was bad, so retrying the same thing won't help. Business errors are policy violations - you explain them to the customer, you don't retry. And permission errors mean access denied - retrying changes nothing. Each category implies a different agent response, which is exactly why a single generic error is so harmful." },
          { kicker: "Skills", title: "Return rich, actionable errors", bullets: [
            "Include errorCategory, an isRetryable boolean, and a human-readable description",
            "Mark business-rule violations retriable:false with a customer-friendly explanation",
            "Distinguish access failures (retry decision) from valid empty results (success)" ],
            say: "So your tools should return structured errors: an error category, an is-retryable boolean, and a human-readable description. For a business-rule violation, set retryable to false and include a customer-friendly explanation so the agent can communicate it. And here's a subtle one the exam loves: distinguish a real access failure - like a timeout that needs a retry decision - from a valid empty result, which is a successful query that simply found no matches. Empty is not an error. Conflating them breaks recovery logic." },
          { center: true, kicker: "Remember", big: "Return errorCategory + isRetryable + a clear message. Empty results are success, not failure.",
            say: "Bank it: structured errors carry an error category, an is-retryable flag, and a clear message - and a valid empty result is a success, not a failure. That structure is what lets the agent retry transient errors locally and only escalate what it truly can't resolve. On to tool distribution." }
        ],
        takeaways: [
          "MCP signals failure via **isError**; generic errors block intelligent recovery.",
          "Four categories: **transient** (retry), **validation** (fix input), **business** (explain, don't retry), **permission** (no retry).",
          "Return `errorCategory`, `isRetryable`, and a human-readable message; business violations ⇒ `retriable:false` + friendly explanation.",
          "Distinguish **access failures** (need retry decision) from **valid empty results** (success with no matches)." ] },
      {
        id: "l2-3", task: "Task 2.3", title: "Tool distribution & tool_choice", audioBase: "assets/audio/l2-3",
        subtitle: "Scoping tools per agent and forcing tool selection.",
        slides: [
          { kicker: "Core principle", title: "Too many tools degrades selection", bullets: [
            "Giving an agent 18 tools instead of 4–5 degrades selection reliability",
            "More tools = more decision complexity = more mistakes",
            "Agents with out-of-role tools tend to misuse them" ],
            say: "Domain two's distribution lesson rests on one principle: more tools is not better. Give an agent eighteen tools when it needs four or five, and selection reliability drops - you've increased the decision complexity. And agents handed tools outside their specialization tend to misuse them. A synthesis agent with web search will start doing its own searches instead of synthesizing. Scope tightly: give each agent only what its role needs." },
          { kicker: "Scoping", title: "Right-size each agent's toolset", bullets: [
            "Restrict each subagent's tools to its role; prevent cross-specialization misuse",
            "Replace generic tools with constrained ones (fetch_url → load_document)",
            "Provide scoped cross-role tools for high-frequency needs (e.g. verify_fact)" ],
            say: "How do you scope well? Restrict each subagent's tool set to its role so it can't wander. Replace a generic tool with a constrained one - swap a raw fetch url for a load document tool that validates document URLs. And when one agent has a frequent cross-role need, give it a single scoped tool for that - like a verify fact tool for the synthesis agent - while routing the complex cases back through the coordinator. Tight by default, with deliberate exceptions." },
          { kicker: "tool_choice", title: "Three modes to control calling", bullets: [
            "'auto' — model may call a tool or return text",
            "'any' — model MUST call a tool, but chooses which",
            "Forced — {\"type\":\"tool\",\"name\":\"...\"} calls a specific named tool" ],
            say: "Now tool choice, which controls whether and which tool gets called. Auto means the model may call a tool or just return text. Any means the model must call some tool but picks which one - great when you need a tool call rather than chatter. And forced selection, where you pass type tool with a specific name, makes the model call that exact tool first. Knowing these three modes - auto, any, and forced - answers a reliable cluster of questions." },
          { kicker: "When to force", title: "Sequencing and guaranteeing calls", bullets: [
            "Force extract_metadata first, then process enrichment in follow-up turns",
            "Set tool_choice:'any' to guarantee a tool call instead of conversational text",
            "Use forced selection to lock in a required first step" ],
            say: "When do you force? Two cases. To guarantee ordering - force extract metadata to run first, then do enrichment in follow-up turns. And to guarantee you get a tool call at all - set tool choice to any when you must have structured action, not a conversational reply. Forced selection locks in a required first step; any guarantees some tool runs. Match the mode to the guarantee you need." },
          { center: true, kicker: "Remember", big: "Fewer, role-scoped tools = better selection. auto / any / forced give increasing control.",
            say: "Two takeaways: fewer, role-scoped tools mean better selection reliability, and tool choice gives you a dial - auto, any, or forced - for increasing control over calling. Right-size the toolbox, then control the calls. Next, configuring MCP servers." }
        ],
        takeaways: [
          "**Too many tools degrades selection** - scope each agent to ~4-5 role-relevant tools.",
          "Agents misuse out-of-role tools; replace generic tools with constrained ones (`fetch_url`→`load_document`).",
          "`tool_choice`: **auto** (may call), **any** (must call, model chooses), **forced** `{\"type\":\"tool\",\"name\":...}` (specific tool).",
          "Force a tool to guarantee ordering (metadata first) or use `any` to guarantee a call vs text." ] },
      {
        id: "l2-4", task: "Task 2.4", title: "Integrating MCP servers", audioBase: "assets/audio/l2-4",
        subtitle: "Project vs user scope, env-var expansion, and MCP resources.",
        slides: [
          { kicker: "Scoping", title: "Project vs user MCP servers", bullets: [
            "Project-level .mcp.json → shared team tooling (version-controlled)",
            "User-level ~/.claude.json → personal / experimental servers",
            "Tools from all configured servers are discovered at connection time" ],
            say: "Let's wire up MCP servers. There are two scopes. Project-level configuration lives in a dot-mcp-dot-json file in the repo - that's for shared team tooling, and it's version-controlled so everyone gets it. User-level configuration lives in your home directory's claude json - that's for personal or experimental servers that only you see. And remember: tools from every configured server are discovered at connection time and become available to the agent simultaneously." },
          { kicker: "Secrets", title: "Environment variable expansion", bullets: [
            ".mcp.json supports env expansion like ${GITHUB_TOKEN}",
            "Credentials stay out of version control",
            "Configure shared servers in project scope with expanded auth tokens" ],
            say: "How do you handle credentials without committing secrets? Environment variable expansion. In your dot-mcp-dot-json you reference something like dollar-brace GITHUB_TOKEN, and it expands from the environment at runtime. So you commit the config but never the secret. That's the pattern for shared, project-scoped servers that need authentication - expand the token, keep it out of git." },
          { kicker: "Resources", title: "MCP resources expose content catalogs", bullets: [
            "Resources expose catalogs: issue summaries, doc hierarchies, DB schemas",
            "They give the agent visibility WITHOUT exploratory tool calls",
            "Reduces wasted calls just to discover what data exists" ],
            say: "Don't forget MCP resources - a concept distinct from tools. Resources expose content catalogs to the agent: things like issue summaries, documentation hierarchies, or database schemas. The point is visibility. Instead of the agent burning tool calls just to discover what data exists, a resource hands it the map up front. Tools are for actions; resources are for exposing available content cheaply." },
          { kicker: "Skills", title: "Practical choices", bullets: [
            "Prefer existing community MCP servers for standard integrations (e.g. Jira)",
            "Reserve custom servers for team-specific workflows",
            "Enrich MCP tool descriptions so the agent prefers them over weaker built-ins" ],
            say: "A few practical calls. For standard integrations like Jira, prefer an existing community MCP server over building your own - reserve custom servers for genuinely team-specific workflows. And enrich your MCP tool descriptions in detail, because if they're vague the agent may fall back to a weaker built-in tool like Grep instead of your more capable MCP tool. Good descriptions make the agent reach for the right tool." },
          { center: true, kicker: "Remember", big: "Project .mcp.json = shared team tools; user ~/.claude.json = personal. Use ${ENV} for secrets. Resources expose catalogs.",
            say: "Lock these in: project-scoped mcp json is shared team tooling, user-scoped claude json is personal, environment variable expansion keeps secrets out of git, and resources expose content catalogs to cut exploratory calls. Strong domain-two material. One more: the built-in tools." }
        ],
        takeaways: [
          "**Project `.mcp.json`** = shared, version-controlled team tooling; **user `~/.claude.json`** = personal/experimental.",
          "Use **`${ENV_VAR}` expansion** for credentials so secrets stay out of version control.",
          "Tools from all configured servers are discovered at connection time and available simultaneously.",
          "**MCP resources** expose content catalogs (schemas, doc trees) to cut exploratory tool calls; enrich descriptions so agents prefer capable MCP tools." ] },
      {
        id: "l2-5", task: "Task 2.5", title: "Built-in tools: Read, Write, Edit, Bash, Grep, Glob", audioBase: "assets/audio/l2-5",
        subtitle: "Selecting the right built-in tool for the job.",
        slides: [
          { kicker: "Search tools", title: "Grep for content, Glob for paths", bullets: [
            "Grep: search file CONTENTS (function names, error strings, imports)",
            "Glob: find files by NAME / path pattern (e.g. **/*.test.tsx)",
            "Pick Grep to find usages; pick Glob to find files by pattern" ],
            say: "Closing domain two with the built-in tools - the exam tests when to use each. Start with the two search tools. Grep searches inside files - file contents - for things like a function name, an error string, or an import statement. Glob matches file paths by pattern - find me every file ending in dot test dot tsx. So: searching what's inside files, that's Grep; finding files by name pattern, that's Glob. Don't mix them up." },
          { kicker: "File ops", title: "Read, Write, and Edit", bullets: [
            "Read/Write: full-file operations",
            "Edit: targeted change using unique text matching",
            "When Edit fails on non-unique text → fall back to Read + Write" ],
            say: "Now the file operations. Read and Write handle whole files. Edit makes a targeted change by matching a unique snippet of text. The gotcha - and the exam asks this - is when Edit fails because the text you're matching isn't unique in the file. The reliable fallback is Read plus Write: read the full file, modify it, write it back. So when Edit can't find a unique anchor, drop down to Read and Write." },
          { kicker: "Skill", title: "Explore incrementally", bullets: [
            "Start with Grep to find entry points, then Read to follow imports and trace flows",
            "Don't read every file up front - build understanding incrementally",
            "Trace usage across wrappers: find exported names, then search each across the codebase" ],
            say: "Here's the workflow skill that shows up as questions. To understand a codebase, don't read everything up front - that wastes context. Start with Grep to find entry points, then Read to follow imports and trace the flow. Build understanding incrementally. And to trace how a function is used across wrapper modules, first identify all the exported names, then search for each name across the codebase. Grep to locate, Read to follow - lean and targeted." },
          { center: true, kicker: "Remember", big: "Grep = contents. Glob = file paths. Edit fails on non-unique text → Read + Write.",
            say: "Final domain-two reflexes: Grep searches contents, Glob matches file paths, and when Edit fails on non-unique text you fall back to Read plus Write. Beautiful - that's all of domain two. Go take the domain quiz, then we move into Claude Code." }
        ],
        takeaways: [
          "**Grep** searches file contents (functions, errors, imports); **Glob** matches file paths/patterns (`**/*.test.tsx`).",
          "**Read/Write** = full-file ops; **Edit** = targeted change via unique text match.",
          "When **Edit** fails on non-unique text, fall back to **Read + Write**.",
          "Explore codebases incrementally: **Grep to find entry points, Read to follow** imports - don't read everything up front." ] }
    ]
  },

  /* ===================== MODULE 3 — DOMAIN 3 ===================== */
  {
    id: "m3", num: 3, title: "Claude Code Configuration & Workflows", domain: 3, weight: 20, quizId: true,
    summary: "CLAUDE.md hierarchy, slash commands & skills, path rules, plan mode, iteration, and CI/CD.",
    lessons: [
      {
        id: "l3-1", task: "Task 3.1", title: "CLAUDE.md hierarchy & modular config", audioBase: "assets/audio/l3-1",
        subtitle: "User, project, and directory scope - plus @import and .claude/rules/.",
        slides: [
          { kicker: "The hierarchy", title: "Three levels of CLAUDE.md", bullets: [
            "User-level: ~/.claude/CLAUDE.md - applies only to you, NOT shared via git",
            "Project-level: .claude/CLAUDE.md or root CLAUDE.md - shared with the team",
            "Directory-level: CLAUDE.md in a subdirectory - scoped to that area" ],
            say: "Domain three is all about configuring Claude Code, and it starts with the CLAUDE.md hierarchy - three levels. User-level lives in your home claude folder and applies only to you; crucially it is not shared via version control. Project-level lives at the repo root or in dot-claude, and it IS shared with the whole team. And directory-level CLAUDE.md files scope instructions to a specific subdirectory. User is personal, project is shared, directory is local." },
          { kicker: "The classic bug", title: "New teammate isn't getting instructions", bullets: [
            "Symptom: a new team member's Claude ignores team standards",
            "Cause: those instructions live in USER-level config, not shared via git",
            "Fix: move shared standards to project-level configuration" ],
            say: "Here's the diagnostic question the exam asks. A new teammate joins and their Claude isn't following the team's standards. Why? Because those instructions were placed in user-level configuration, which doesn't travel through version control - so the new person never got them. The fix is to move shared standards into project-level configuration where git distributes them to everyone. Symptom: inconsistent behavior for a new member. Cause: user versus project scope." },
          { kicker: "Modularity", title: "@import and .claude/rules/", bullets: [
            "@import references external files to keep CLAUDE.md modular",
            ".claude/rules/ holds topic-specific rule files (testing.md, deployment.md)",
            "Use /memory to verify which memory files are actually loaded" ],
            say: "To keep configuration from becoming a monolith, you have two tools. The at-import syntax pulls in external files, so each package can import just the standards relevant to it. And the dot-claude-rules directory lets you split a giant CLAUDE.md into focused, topic-specific files like testing dot md and deployment dot md. If behavior seems inconsistent across sessions, use the slash-memory command to verify exactly which memory files are loaded. Modular config, plus a way to inspect it." },
          { center: true, kicker: "Remember", big: "User-level isn't shared via git. Team standards belong in project-level config.",
            say: "The reflex for this lesson: user-level CLAUDE.md is not shared through git, so anything the team needs goes in project-level config. And use at-import and dot-claude-rules to stay modular, with slash-memory to verify what loaded. Next: commands and skills." }
        ],
        takeaways: [
          "CLAUDE.md hierarchy: **user** (`~/.claude/`, not shared), **project** (root/`.claude/`, shared via git), **directory** (subdir-scoped).",
          "New teammate missing standards ⇒ they're in **user-level** config; move to **project-level**.",
          "Use **`@import`** to stay modular and **`.claude/rules/`** for topic-specific files; **`/memory`** verifies loaded files." ] },
      {
        id: "l3-2", task: "Task 3.2", title: "Custom slash commands & skills", audioBase: "assets/audio/l3-2",
        subtitle: "Project vs user scope, context: fork, allowed-tools, argument-hint.",
        slides: [
          { kicker: "Scope", title: "Where commands & skills live", bullets: [
            "Project commands: .claude/commands/ (shared via version control)",
            "User commands: ~/.claude/commands/ (personal)",
            "Skills: .claude/skills/ with SKILL.md frontmatter" ],
            say: "Slash commands and skills are how you package reusable workflows. Project-scoped commands live in dot-claude-commands and are shared via version control - everyone who clones the repo gets them. User-scoped commands live in your home directory and are personal. Skills live in dot-claude-skills, each defined by a SKILL.md file with frontmatter. So for a team-wide command, project scope; for your own, user scope." },
          { kicker: "Skill frontmatter", title: "Three options to know", bullets: [
            "context: fork → run the skill in an isolated sub-agent (output won't pollute the main chat)",
            "allowed-tools → restrict which tools the skill may use",
            "argument-hint → prompt the developer for required parameters" ],
            say: "Three frontmatter options the exam loves. Context fork runs a skill in an isolated sub-agent context, so its output - say a giant codebase analysis - doesn't pollute your main conversation. Allowed-tools restricts which tools the skill can use, which is how you stop a skill from doing something destructive. And argument-hint prompts the developer for required parameters when they invoke the skill without them. Fork for isolation, allowed-tools for safety, argument-hint for inputs." },
          { kicker: "Use cases", title: "Apply the options", bullets: [
            "Use context: fork for verbose or exploratory skills (analysis, brainstorming)",
            "Use allowed-tools to limit a skill to safe operations (e.g. read-only)",
            "Personal skill variants: name them differently in ~/.claude/skills/ to avoid clashing" ],
            say: "Putting it together: use context fork for skills that produce verbose output or do exploratory work, so the noise stays out of your main session. Use allowed-tools to limit a skill to safe operations - for instance, restricting it so it can't make destructive writes. And if you want a personal tweak of a team skill, create a variant under your home skills folder with a different name so you don't affect your teammates." },
          { kicker: "Skills vs CLAUDE.md", title: "On-demand vs always-on", bullets: [
            "Skills: on-demand invocation for task-specific workflows",
            "CLAUDE.md: always-loaded universal standards",
            "Choose based on whether the guidance is universal or situational" ],
            say: "And one clean distinction to carry into the exam: skills are invoked on demand for task-specific workflows, while CLAUDE.md is always loaded for universal standards. If the guidance should apply to everything, it's CLAUDE.md. If it's a specific workflow you trigger when needed, it's a skill. Universal versus situational - that's the deciding question." },
          { center: true, kicker: "Remember", big: "context: fork isolates output. allowed-tools restricts. argument-hint prompts for inputs. Project = shared, user = personal.",
            say: "Bank the frontmatter trio - context fork isolates, allowed-tools restricts, argument-hint prompts - plus project scope is shared and user scope is personal, and skills are on-demand while CLAUDE.md is always-on. Next, path-specific rules." }
        ],
        takeaways: [
          "Project commands/skills (`.claude/commands/`, `.claude/skills/`) are **shared via git**; user-scoped (`~/.claude/`) are personal.",
          "**`context: fork`** isolates a skill in a sub-agent (no main-context pollution); **`allowed-tools`** restricts tools; **`argument-hint`** prompts for params.",
          "**Skills** = on-demand task workflows; **CLAUDE.md** = always-loaded universal standards." ] },
      {
        id: "l3-3", task: "Task 3.3", title: "Path-specific rules", audioBase: "assets/audio/l3-3",
        subtitle: "Conditional convention loading with glob patterns.",
        slides: [
          { kicker: "Mechanism", title: ".claude/rules/ with YAML paths", bullets: [
            ".claude/rules/ files carry YAML frontmatter with a paths field (glob patterns)",
            "Rules load ONLY when you edit files matching the glob",
            "Less irrelevant context, lower token usage" ],
            say: "Path-specific rules are a precise, efficient way to apply conventions. In a dot-claude-rules file you add YAML frontmatter with a paths field containing glob patterns. The rule then loads only when you're editing files that match that glob. The payoff is efficiency: Claude isn't carrying irrelevant conventions, so you reduce noise and token usage. Conventions show up exactly when they're relevant and stay quiet otherwise." },
          { kicker: "The advantage", title: "Globs beat directory CLAUDE.md for cross-cutting files", bullets: [
            "Glob rules apply by file TYPE regardless of directory (**/*.test.tsx)",
            "Directory CLAUDE.md is bound to one directory tree",
            "Best when conventions span files spread across the codebase" ],
            say: "Why not just use a directory CLAUDE.md? Because directory configs are bound to one directory tree. But some conventions span the whole codebase - think test files sitting next to the code they test, scattered everywhere. A glob pattern like star-star slash star dot test dot tsx applies to every test file no matter where it lives. So when conventions follow a file TYPE spread across many directories, path-specific glob rules beat directory-bound CLAUDE.md files." },
          { kicker: "Exam scenario", title: "Conventions by file type across the tree", bullets: [
            "React components, API handlers, DB models each have different conventions",
            "Tests are spread throughout next to their code",
            "Answer: .claude/rules/ with glob paths - not subdirectory CLAUDE.md files" ],
            say: "This is a real sample question. A codebase has React components, API handlers, and database models, each with distinct conventions, and test files are spread throughout next to the code they test - and you want the right conventions applied automatically by file path. The answer is dot-claude-rules files with glob path scoping. Not subdirectory CLAUDE.md - those can't cleanly handle files scattered across many directories. Not skills - those need manual invocation. Glob-scoped rules give you automatic, path-based application." },
          { center: true, kicker: "Remember", big: "Conventions that follow file TYPE across the tree → .claude/rules/ with glob paths.",
            say: "Lock it in: when conventions follow a file type across the whole tree, reach for dot-claude-rules with glob path scoping - it's automatic and directory-independent, unlike directory CLAUDE.md or manually-invoked skills. Next up, one of the most-tested topics: plan mode." }
        ],
        takeaways: [
          "**`.claude/rules/`** files use YAML `paths` glob patterns; rules load only when editing matching files (saves tokens).",
          "Glob rules apply by **file type across directories** - better than directory-bound CLAUDE.md for scattered files (e.g. tests).",
          "Conventions spanning the tree by type ⇒ **`.claude/rules/` with globs**, not subdirectory CLAUDE.md or manual skills." ] },
      {
        id: "l3-4", task: "Task 3.4", title: "Plan mode vs direct execution", audioBase: "assets/audio/l3-4",
        subtitle: "When to explore-and-design before changing code.",
        slides: [
          { kicker: "Plan mode", title: "For complex, high-stakes changes", bullets: [
            "Large-scale changes, multiple valid approaches, architectural decisions, multi-file edits",
            "Enables safe codebase exploration & design BEFORE committing changes",
            "Prevents costly rework when dependencies surface late" ],
            say: "Plan mode versus direct execution is heavily tested, so let's be decisive. Plan mode is for complex, high-stakes work - large-scale changes, multiple valid approaches, architectural decisions, edits across many files. It lets Claude safely explore the codebase and design an approach before touching anything, which prevents expensive rework when a dependency surfaces halfway through. When the task has architectural weight, you plan first." },
          { kicker: "Direct execution", title: "For simple, well-scoped changes", bullets: [
            "Clear scope, single concern (add a date validation check to one function)",
            "A single-file bug fix with a clear stack trace",
            "No need to explore - just do it" ],
            say: "Direct execution is for the opposite: simple, well-scoped changes. Adding one validation check to a single function. Fixing a single-file bug that has a clear stack trace. There's nothing to explore and no architectural decision to make, so planning would just add overhead. Clear scope and a single concern means direct execution." },
          { kicker: "Exam signal", title: "Spot the complexity in the prompt", bullets: [
            "Monolith → microservices, library migration touching 45+ files → plan mode",
            "Complexity stated in requirements isn't something that 'might emerge later'",
            "You can combine: plan for investigation, then direct execution to implement" ],
            say: "Here's the exam signal. When a task says monolith to microservices, or a library migration touching forty-five-plus files, or choosing between integration approaches - that's plan mode, full stop. And watch for the distractor that says start direct and switch to plan only if complexity emerges. The complexity is already stated in the requirements; it isn't going to emerge - it's right there. One nice pattern: combine them - use plan mode for the investigation, then direct execution to carry out the planned approach." },
          { kicker: "Bonus", title: "The Explore subagent", bullets: [
            "Explore subagent isolates verbose discovery output",
            "Returns concise summaries to preserve main-conversation context",
            "Use it during multi-phase tasks to avoid context exhaustion" ],
            say: "A bonus concept that pairs with plan mode: the Explore subagent. It isolates verbose discovery output - all that file-reading noise - and returns just a concise summary, preserving your main conversation's context. During long multi-phase tasks, that's how you avoid context exhaustion. Explore for discovery, summary back to the main thread." },
          { center: true, kicker: "Remember", big: "Architectural / multi-file / multiple-approach = plan mode. Single clear-scope change = direct execution.",
            say: "The clean rule: architectural decisions, multi-file changes, or multiple valid approaches mean plan mode; a single, clear-scope change means direct execution. And if the complexity is already in the requirements, don't wait for it to emerge - plan now. Next, iterative refinement." }
        ],
        takeaways: [
          "**Plan mode**: large-scale/multi-file changes, multiple approaches, architectural decisions - explore & design before changing.",
          "**Direct execution**: simple, clear-scope, single-concern changes (one-file bug fix).",
          "If complexity is **stated in requirements**, choose plan mode now - reject 'switch later' distractors.",
          "**Explore subagent** isolates verbose discovery and returns summaries to preserve context." ] },
      {
        id: "l3-5", task: "Task 3.5", title: "Iterative refinement techniques", audioBase: "assets/audio/l3-5",
        subtitle: "Examples, test-driven iteration, the interview pattern.",
        slides: [
          { kicker: "Examples win", title: "Concrete I/O beats prose", bullets: [
            "Concrete input/output examples communicate transformations best",
            "Prose descriptions get interpreted inconsistently",
            "Provide 2–3 examples when natural language produces inconsistent results" ],
            say: "When you're refining Claude's output, the most effective lever is concrete examples. Prose descriptions of what you want get interpreted inconsistently, but a couple of input-output examples nail it down. So when a natural-language instruction is producing inconsistent results, give it two or three concrete examples of the transformation you want. Show, don't just tell - that's the highest-leverage refinement move." },
          { kicker: "Test-driven", title: "Write tests first, iterate on failures", bullets: [
            "Write the test suite first (behavior, edge cases, performance)",
            "Then iterate by sharing test failures to guide improvement",
            "Failures are precise, actionable feedback" ],
            say: "The second technique is test-driven iteration. Write your test suite first - covering expected behavior, edge cases, and performance - and then iterate by sharing the failing tests with Claude. Test failures are wonderfully precise feedback: they tell the model exactly what's wrong and where. Write tests first, then let the failures drive progressive improvement." },
          { kicker: "Interview pattern", title: "Surface considerations up front", bullets: [
            "Have Claude ASK questions before implementing in unfamiliar domains",
            "Surfaces cache invalidation, failure modes you hadn't considered",
            "Cheaper to surface design issues before code than after" ],
            say: "Third: the interview pattern. Before implementing in an unfamiliar domain, have Claude ask you questions first. It'll surface considerations you hadn't thought of - cache invalidation strategies, failure modes, edge conditions. It is far cheaper to surface a design issue through a question before any code is written than to discover it after. Let Claude interview you to de-risk the design." },
          { kicker: "One vs many", title: "Interacting vs independent fixes", bullets: [
            "Interacting problems → fix in a single detailed message",
            "Independent problems → fix sequentially",
            "Bundling interacting fixes lets the model reason about them together" ],
            say: "And one more judgment call: when issues interact - when fixing one affects another - put them all in a single detailed message so the model can reason about them together. When issues are independent, fix them sequentially. Bundle the interacting ones, sequence the independent ones. That distinction shows up as a question." },
          { center: true, kicker: "Remember", big: "Inconsistent output? Add 2–3 concrete examples. Use the interview pattern before coding in unfamiliar domains.",
            say: "Takeaways: inconsistent output gets fixed with two or three concrete examples, tests-first iteration uses failures as feedback, the interview pattern surfaces hidden design issues before coding, and you bundle interacting fixes but sequence independent ones. Last domain-three lesson: CI/CD." }
        ],
        takeaways: [
          "**Concrete I/O examples** (2-3) beat prose when output is inconsistent.",
          "**Test-driven iteration**: write tests first, then iterate by sharing failures.",
          "**Interview pattern**: have Claude ask questions before implementing in unfamiliar domains.",
          "Fix **interacting** problems in one message; fix **independent** problems sequentially." ] },
      {
        id: "l3-6", task: "Task 3.6", title: "Claude Code in CI/CD pipelines", audioBase: "assets/audio/l3-6",
        subtitle: "Headless mode, structured output, and review context.",
        slides: [
          { kicker: "Headless mode", title: "-p / --print for automation", bullets: [
            "The -p (--print) flag runs Claude Code non-interactively",
            "Without it, the job hangs waiting for interactive input",
            "Essential for any pipeline step" ],
            say: "Final domain-three lesson: running Claude Code inside CI/CD. The number-one fact: the dash-p flag, also written print, runs Claude Code in non-interactive mode. Without it, your pipeline job hangs forever waiting for interactive input - that's a real exam scenario where the build just stalls. The fix is always dash-p. Beware distractors inventing fake flags like batch or fake environment variables - the documented answer is dash-p." },
          { kicker: "Structured output", title: "JSON for machine parsing", bullets: [
            "--output-format json with --json-schema enforces structured output in CI",
            "Produces machine-parseable findings for posting as inline PR comments",
            "Pairs with the tool-use schema discipline from Domain 4" ],
            say: "For CI you usually need machine-readable output, not prose. The output-format json flag, combined with json-schema, enforces structured output so your pipeline can parse the findings and post them as inline pull-request comments automatically. This dovetails with the structured-output discipline we'll hit in domain four - same idea, applied to the pipeline." },
          { kicker: "Context matters", title: "Feed CLAUDE.md and prior findings", bullets: [
            "CLAUDE.md supplies project context (testing standards, review criteria) to CI runs",
            "Include prior review findings so re-runs report only new/unaddressed issues",
            "Provide existing tests so generation avoids duplicate scenarios" ],
            say: "Context is what makes CI runs good. Use CLAUDE.md to supply project context - testing standards, fixture conventions, review criteria - to the CI-invoked Claude. When you re-run a review after new commits, include the prior findings and instruct it to report only new or still-unaddressed issues, so you don't spam duplicate comments. And feed it the existing test files so test generation doesn't suggest scenarios you already cover. Context in, quality out." },
          { kicker: "Self-review limit", title: "Independent review beats self-review", bullets: [
            "The same session that generated code is worse at reviewing its own changes",
            "It retains reasoning context and is less likely to question itself",
            "Use a separate, independent review instance" ],
            say: "And a key reliability insight that recurs in domain four: the same Claude session that wrote the code is less effective at reviewing it, because it carries its own reasoning context and won't question its own decisions. So for code review in CI, spin up a separate, independent review instance without that prior context. Independent review catches what self-review misses." },
          { center: true, kicker: "Remember", big: "CI hangs? Add -p. Use --output-format json + --json-schema. Review with a fresh, independent instance.",
            say: "Domain-three close: a hanging CI job needs dash-p, structured CI output uses output-format json with json-schema, and you review with a fresh independent instance, not the one that wrote the code. That's all of domain three - excellent. Take the quiz, then we tackle prompt engineering and structured output." }
        ],
        takeaways: [
          "**`-p` / `--print`** runs Claude Code non-interactively - without it CI jobs hang (reject fake `--batch`/env-var answers).",
          "**`--output-format json` + `--json-schema`** produce machine-parseable findings for inline PR comments.",
          "Feed **CLAUDE.md** (standards), **prior findings** (report only new issues), and **existing tests** (avoid duplicates) into CI runs.",
          "Use a **separate independent instance** to review generated code - self-review is weaker." ] }
    ]
  },

  /* ===================== MODULE 4 — DOMAIN 4 ===================== */
  {
    id: "m4", num: 4, title: "Prompt Engineering & Structured Output", domain: 4, weight: 20, quizId: true,
    summary: "Explicit criteria, few-shot, tool_use schemas, validation loops, batch processing, multi-pass review.",
    lessons: [
      {
        id: "l4-1", task: "Task 4.1", title: "Explicit criteria reduce false positives", audioBase: "assets/audio/l4-1",
        subtitle: "Specific categorical criteria beat vague confidence instructions.",
        slides: [
          { kicker: "Core idea", title: "Explicit criteria over vague instructions", bullets: [
            "Specific: 'flag only when claimed behavior contradicts actual code behavior'",
            "Vague: 'check that comments are accurate' or 'be conservative'",
            "General instructions like 'only high-confidence findings' don't improve precision" ],
            say: "Domain four opens with precision. The big lesson: explicit, specific criteria dramatically outperform vague instructions. Telling the model flag a comment only when its claimed behavior contradicts the actual code behavior is precise and actionable. Telling it check that comments are accurate, or be conservative, or only report high-confidence findings - those are vague, and they do not actually improve precision. Specificity is the lever, not confidence language." },
          { kicker: "Why it matters", title: "False positives kill trust", bullets: [
            "High false-positive categories undermine confidence in the accurate ones",
            "Define which issues to report (bugs, security) vs skip (minor style)",
            "Temporarily disable a noisy category while you improve its prompt" ],
            say: "Why does this matter so much? Because false positives destroy developer trust. If one category of findings is noisy and wrong, developers stop trusting all your findings, even the accurate ones. So you define explicitly which issues to report - bugs, security - versus which to skip, like minor style. And a practical move the exam likes: temporarily disable a high false-positive category to restore trust while you fix that category's prompt. Protect trust by being precise about what counts." },
          { kicker: "Skill", title: "Severity by concrete example", bullets: [
            "Define explicit severity levels with concrete code examples for each",
            "Concrete anchors give consistent classification",
            "Replace 'be conservative' with categorical rules" ],
            say: "The skill to demonstrate: define explicit severity levels, and anchor each level with a concrete code example. When the model has a real example of what critical versus minor looks like, classification becomes consistent. So instead of vague hedging like be conservative, you give categorical rules with examples. Concrete anchors equal consistent output." },
          { center: true, kicker: "Remember", big: "Precision comes from specific categorical criteria - not 'be conservative' or 'high-confidence only'.",
            say: "The reflex: precision comes from specific, categorical criteria with concrete examples - never from vague instructions like be conservative or only high-confidence. Spot the vague distractor and reject it. Next, few-shot prompting." }
        ],
        takeaways: [
          "**Specific categorical criteria** beat vague instructions ('be conservative', 'high-confidence only') for precision.",
          "High false-positive categories **undermine trust** in accurate ones; define report-vs-skip explicitly.",
          "Define **severity levels with concrete code examples** for consistent classification.",
          "Temporarily disable a noisy category while improving its prompt." ] },
      {
        id: "l4-2", task: "Task 4.2", title: "Few-shot prompting", audioBase: "assets/audio/l4-2",
        subtitle: "Examples for ambiguous cases, format, and generalization.",
        slides: [
          { kicker: "When to use it", title: "The most effective consistency tool", bullets: [
            "Few-shot examples are the top technique when detailed instructions alone are inconsistent",
            "They demonstrate ambiguous-case handling and exact output format",
            "They reduce hallucination in extraction tasks" ],
            say: "Few-shot prompting is your go-to when detailed instructions alone still produce inconsistent results. Examples do three things instructions struggle with: they demonstrate how to handle ambiguous cases, they pin down the exact output format, and in extraction tasks they reduce hallucination. When a prompt is well-written but output still wobbles, the answer is usually add few-shot examples." },
          { kicker: "The power move", title: "Examples enable generalization", bullets: [
            "Good examples teach JUDGMENT, generalizing to novel patterns",
            "Not just matching the specific cases you showed",
            "Show reasoning for why one action was chosen over plausible alternatives" ],
            say: "Here's the insight that separates a passing answer from a distractor: well-crafted few-shot examples don't just teach the model to match the cases you showed - they teach judgment that generalizes to new, unseen patterns. The trick is to include the reasoning: show why one action was chosen over a plausible alternative. That reasoning is what generalizes. Examples with reasoning teach judgment, not memorization." },
          { kicker: "Skill", title: "How to build them", bullets: [
            "Create 2–4 targeted examples for ambiguous scenarios, with reasoning",
            "Demonstrate the desired output shape (location, issue, severity, fix)",
            "Distinguish acceptable patterns from genuine issues to cut false positives" ],
            say: "Concretely: create two to four targeted examples for the ambiguous scenarios, each showing the reasoning for the choice. Demonstrate the exact output shape you want - location, issue, severity, suggested fix. And include examples that distinguish acceptable code patterns from genuine issues, which cuts false positives while still letting the model generalize. A handful of sharp, reasoned examples goes a long way." },
          { center: true, kicker: "Remember", big: "Instructions inconsistent? Add 2–4 few-shot examples WITH reasoning to teach generalizable judgment.",
            say: "Lock it in: when detailed instructions are still inconsistent, add two to four few-shot examples - with reasoning - to teach judgment that generalizes. That's the fix for ambiguous cases, format consistency, and extraction hallucination alike. Next: enforcing structured output." }
        ],
        takeaways: [
          "**Few-shot examples** are the top technique when detailed instructions alone are inconsistent.",
          "Examples with **reasoning** teach generalizable judgment, not just matching shown cases.",
          "Use **2-4 targeted examples** for ambiguous scenarios; demonstrate exact output format.",
          "Show acceptable-vs-genuine-issue examples to reduce false positives while enabling generalization." ] },
      {
        id: "l4-3", task: "Task 4.3", title: "Structured output via tool_use & JSON schemas", audioBase: "assets/audio/l4-3",
        subtitle: "Guaranteed schema-compliant output and its limits.",
        slides: [
          { kicker: "The method", title: "tool_use with JSON schemas", bullets: [
            "tool_use with a JSON schema is the most reliable structured-output approach",
            "It guarantees schema-compliant output - eliminates JSON syntax errors",
            "Extract the structured data from the tool_use response" ],
            say: "For guaranteed structured output, the most reliable approach is tool use with a JSON schema. You define an extraction tool whose input schema is your desired structure, and the model's tool-use response is guaranteed to comply with that schema - which eliminates JSON syntax errors entirely. You then just read the structured data out of the tool-use block. Tool use plus schema equals no more broken JSON." },
          { kicker: "Critical limit", title: "Syntax is not semantics", bullets: [
            "Strict schemas eliminate SYNTAX errors - not SEMANTIC errors",
            "Line items that don't sum to the total still pass schema validation",
            "Values placed in the wrong field still pass schema validation" ],
            say: "But here's the limit the exam absolutely tests: a strict schema eliminates syntax errors, not semantic errors. The JSON will be perfectly well-formed and still be wrong. Line items that don't add up to the stated total - that passes schema validation. A value placed in the wrong field - passes validation. So schema compliance guarantees shape, not correctness. You still need semantic checks, which we cover in the validation lesson." },
          { kicker: "tool_choice recap", title: "Guarantee a tool call", bullets: [
            "'auto' - model may return text instead of calling a tool",
            "'any' - must call a tool, useful when document type is unknown",
            "Forced - call a specific tool (e.g. extract_metadata before enrichment)" ],
            say: "Quick tool-choice recap, because it pairs with this. Auto means the model might return text instead of extracting - risky for structured output. Any guarantees it calls some extraction tool, which is great when you have multiple schemas and don't know the document type. And forced selection calls a specific tool - use it to run, say, extract metadata before enrichment steps. For guaranteed structured output, you generally want any or forced, not auto." },
          { kicker: "Schema design", title: "Optional & nullable prevent fabrication", bullets: [
            "Make fields optional/nullable when the document may not contain them",
            "Required fields tempt the model to fabricate values to satisfy them",
            "Add enums like 'unclear', and 'other' + a detail string for extensibility" ],
            say: "Schema design itself matters. If a field might not exist in the source document, make it optional or nullable - because if you mark it required, the model will fabricate a value just to satisfy the schema. That's a subtle, dangerous failure. Also add enum values like unclear for ambiguous cases, and an other value paired with a detail string for extensible categories. Design the schema so honesty is possible." },
          { center: true, kicker: "Remember", big: "tool_use + schema = guaranteed shape, NOT guaranteed correctness. Nullable fields prevent fabrication.",
            say: "The two reflexes: tool use with a JSON schema guarantees the shape but not the semantic correctness, and nullable optional fields prevent the model from fabricating values for missing data. Strong stuff. Next, validation and retry loops to catch the semantic errors." }
        ],
        takeaways: [
          "**`tool_use` + JSON schema** is the most reliable structured output - eliminates JSON **syntax** errors.",
          "Schemas guarantee **shape, not semantics** - bad sums or wrong-field values still pass.",
          "`tool_choice`: **any** guarantees a call (unknown doc type), **forced** runs a specific tool first.",
          "Make uncertain fields **optional/nullable** to prevent fabrication; add `unclear`/`other`+detail enums." ] },
      {
        id: "l4-4", task: "Task 4.4", title: "Validation, retry & feedback loops", audioBase: "assets/audio/l4-4",
        subtitle: "Retry-with-error-feedback and the limits of retry.",
        slides: [
          { kicker: "The technique", title: "Retry with specific error feedback", bullets: [
            "On failure, append the SPECIFIC validation errors to the retry prompt",
            "Include the original document and the failed extraction",
            "Specific errors guide the model toward correction" ],
            say: "Schemas catch shape; validation catches meaning. The core technique is retry-with-error-feedback. When validation fails, you don't just retry blindly - you append the specific validation errors to the prompt, along with the original document and the failed extraction, so the model knows exactly what to fix. Specific feedback guides correction. Blind retries just reroll the dice." },
          { kicker: "The limit", title: "Retry can't conjure missing info", bullets: [
            "Retries help with FORMAT and STRUCTURAL errors",
            "Retries are useless when the info is simply ABSENT from the source",
            "Know when a retry will succeed vs when it will never succeed" ],
            say: "Now the critical limit. Retries work for format errors and structural errors - things the model can fix by trying again with feedback. But retries are useless when the required information is simply not in the source document. You can retry a thousand times; if the data isn't there, it isn't there. The exam tests this judgment: a retry will succeed for a format mismatch, but never for information that exists only in an external document you didn't provide. Don't retry into the void." },
          { kicker: "Semantic checks", title: "Catch what schemas miss", bullets: [
            "Extract calculated_total alongside stated_total to flag discrepancies",
            "Add conflict_detected booleans for inconsistent source data",
            "Track detected_pattern to analyze false-positive dismissals" ],
            say: "How do you catch the semantic errors schemas miss? Build the checks into the extraction. Extract a calculated total alongside the stated total, then flag any discrepancy - that catches line items that don't sum. Add a conflict-detected boolean for inconsistent source data. And add a detected-pattern field so that when developers dismiss findings, you can analyze which patterns trigger false positives. You design the schema to surface its own semantic problems." },
          { center: true, kicker: "Remember", big: "Retry with specific errors fixes format/structure - NOT missing source info. Add semantic self-checks.",
            say: "Bank it: retry-with-specific-error-feedback fixes format and structural problems but cannot conjure information missing from the source, and you catch semantic errors by extracting self-check fields like calculated versus stated total. Next, batch processing economics." }
        ],
        takeaways: [
          "**Retry-with-error-feedback**: append specific validation errors + original doc + failed extraction.",
          "Retries fix **format/structural** errors but **cannot recover info absent from the source**.",
          "Catch **semantic** errors with self-checks: `calculated_total` vs `stated_total`, `conflict_detected`.",
          "Track `detected_pattern` to analyze false-positive dismissals." ] },
      {
        id: "l4-5", task: "Task 4.5", title: "Batch processing strategies", audioBase: "assets/audio/l4-5",
        subtitle: "The Message Batches API and when to use it.",
        slides: [
          { kicker: "The API", title: "Message Batches API economics", bullets: [
            "50% cost savings vs synchronous calls",
            "Up to a 24-hour processing window; NO guaranteed latency SLA",
            "custom_id correlates each request with its response" ],
            say: "Batch processing is a cost-versus-latency decision. The Message Batches API gives you fifty percent cost savings, but it comes with a processing window of up to twenty-four hours and no guaranteed latency. You correlate requests and responses using a custom id field on each item. So it's cheaper, but slower and without timing guarantees. That tradeoff is the whole lesson." },
          { kicker: "When to use it", title: "Latency-tolerant, non-blocking work", bullets: [
            "Good: overnight reports, weekly audits, nightly test generation",
            "Bad: blocking workflows like pre-merge checks (developers wait)",
            "Match API to the workflow's latency tolerance" ],
            say: "So when do you batch? For latency-tolerant, non-blocking work: overnight reports, weekly audits, nightly test generation - jobs where nobody's waiting on the result right now. When do you NOT batch? Blocking workflows like a pre-merge check where a developer is sitting there waiting to merge. There, the up-to-twenty-four-hour window is a non-starter, so you use the synchronous API. Match the API to the workflow's latency tolerance - that's the exam's exact framing." },
          { kicker: "Limit", title: "No multi-turn tool calling", bullets: [
            "The batch API does NOT support multi-turn tool calling within a request",
            "It can't execute tools mid-request and continue",
            "So agentic loops don't run inside a batch" ],
            say: "One important limitation: the batch API does not support multi-turn tool calling within a single request. It can't execute a tool mid-request and continue the conversation. So you can't run a full agentic loop inside a batch job - batches are for one-shot completions, not interactive tool use. Keep that boundary in mind." },
          { kicker: "Skills", title: "Operate batches well", bullets: [
            "Compute submission frequency from your SLA (e.g. 4-hour windows for a 30-hour SLA)",
            "Handle failures by resubmitting only failed items (by custom_id), e.g. chunking oversized docs",
            "Refine the prompt on a sample set before batch-processing large volumes" ],
            say: "A few operational skills. Calculate your batch submission frequency from your SLA - if you need results within thirty hours and processing takes up to twenty-four, four-hour submission windows keep you safe. Handle failures by resubmitting only the failed items, identified by custom id, with fixes like chunking documents that exceeded context limits. And refine your prompt on a small sample first to maximize first-pass success before you batch a hundred thousand documents - that minimizes costly resubmissions." },
          { center: true, kicker: "Remember", big: "Batch = 50% cheaper, up to 24h, no SLA, no multi-turn tools. Use for overnight; never for blocking checks.",
            say: "Lock it in: the batch API is fifty percent cheaper with up to a twenty-four-hour window, no latency guarantee, and no multi-turn tool calling - perfect for overnight and weekly jobs, wrong for blocking pre-merge checks. Last domain-four lesson: multi-pass review." }
        ],
        takeaways: [
          "**Message Batches API**: 50% cheaper, up to 24h window, **no latency SLA**; `custom_id` correlates request/response.",
          "Use for **latency-tolerant** work (overnight reports); **never** for blocking workflows (pre-merge checks).",
          "Batch API has **no multi-turn tool calling** - agentic loops don't run inside a batch.",
          "Size submission frequency to your SLA; resubmit only failed items by `custom_id`; sample-refine prompts first." ] },
      {
        id: "l4-6", task: "Task 4.6", title: "Multi-instance & multi-pass review", audioBase: "assets/audio/l4-6",
        subtitle: "Independent review and splitting large reviews.",
        slides: [
          { kicker: "Self-review limit", title: "A model won't question its own work", bullets: [
            "A model retains reasoning context from generation",
            "So it's less likely to question its own decisions in the same session",
            "Self-review instructions and extended thinking don't fix this" ],
            say: "The final domain-four idea recurs across the exam: self-review is weak. When a model generates code, it retains the reasoning context behind its choices, so in the same session it's unlikely to question those decisions. And no, telling it to review carefully or turning on extended thinking doesn't fix it - the bias is structural. The model is invested in its own reasoning." },
          { kicker: "The fix", title: "Independent review instances", bullets: [
            "A separate Claude instance WITHOUT the generator's context catches more",
            "Independent review finds subtle issues self-review misses",
            "Use a fresh instance to review generated code" ],
            say: "The fix is independence. Spin up a separate Claude instance that does not have the generator's reasoning context, and have it review the code fresh. Without being attached to the original decisions, it catches subtle issues that self-review sails right past. So whenever the exam asks how to improve review quality, the answer is a fresh, independent review instance - not asking the original to try harder." },
          { kicker: "Multi-pass", title: "Split large reviews to avoid dilution", bullets: [
            "Per-file local analysis passes + a separate cross-file integration pass",
            "Avoids attention dilution and contradictory findings",
            "Single-pass over many files yields uneven depth and contradictions" ],
            say: "And for large reviews, split into multiple passes. Run per-file local analysis passes for issues within each file, then a separate cross-file integration pass for how the files interact. This avoids attention dilution - the thing where reviewing fourteen files at once gives deep feedback on some and superficial on others, and even contradicts itself by flagging a pattern in one file while approving identical code elsewhere. Focused passes keep depth consistent." },
          { kicker: "Calibration", title: "Confidence-aware routing", bullets: [
            "Run verification passes where the model self-reports confidence per finding",
            "Use that to route review attention (calibrated review routing)",
            "Pair with human review for low-confidence items" ],
            say: "Finally, a calibration technique: run verification passes where the model reports its confidence alongside each finding, then use that confidence to route review attention - high-confidence findings can flow through, low-confidence ones get human eyes. That's calibrated review routing, and it connects straight into domain five's human-review workflows. Confidence as a routing signal." },
          { center: true, kicker: "Remember", big: "Self-review is weak. Use a fresh independent instance. Split big reviews into per-file + cross-file passes.",
            say: "Domain-four close: self-review is structurally weak, so use a fresh independent instance, and split large reviews into per-file plus cross-file passes to avoid attention dilution. That completes domain four - fantastic. Take the quiz, then on to our final domain: context management and reliability." }
        ],
        takeaways: [
          "**Self-review is weak** - the model keeps its generation reasoning; 'review carefully' and extended thinking don't fix it.",
          "Use a **separate independent instance** (no generator context) to catch subtle issues.",
          "Split large reviews into **per-file local + cross-file integration passes** to avoid attention dilution.",
          "Run **confidence-scored verification passes** to route review attention (and human review for low confidence)." ] }
    ]
  },

  /* ===================== MODULE 5 — DOMAIN 5 ===================== */
  {
    id: "m5", num: 5, title: "Context Management & Reliability", domain: 5, weight: 15, quizId: true,
    summary: "Preserving context, escalation, error propagation, codebase exploration, human review, provenance.",
    lessons: [
      {
        id: "l5-1", task: "Task 5.1", title: "Preserving critical context", audioBase: "assets/audio/l5-1",
        subtitle: "Case facts, lost-in-the-middle, and trimming tool output.",
        slides: [
          { kicker: "Summarization risk", title: "Summaries blur the numbers", bullets: [
            "Progressive summarization condenses numbers, %, dates, expectations into vague text",
            "Critical transactional facts get lost in the blur",
            "The fix: a persistent 'case facts' block outside the summary" ],
            say: "Domain five is about keeping systems reliable over long interactions. First risk: progressive summarization. As a long conversation gets summarized to save space, the precise things - dollar amounts, percentages, dates, customer-stated expectations - get condensed into vague language and lost. The fix is to extract those transactional facts into a persistent case-facts block that's included in every prompt, outside the summarized history. Keep the hard facts hard." },
          { kicker: "Lost in the middle", title: "Position effects in long inputs", bullets: [
            "Models process the beginning and end of long inputs most reliably",
            "Findings buried in the MIDDLE can be omitted",
            "Put key findings at the START; use explicit section headers" ],
            say: "Second: the lost-in-the-middle effect. Models reliably process the beginning and the end of a long input, but information buried in the middle can get dropped. So you fight it with positioning - put your key findings at the beginning of an aggregated input, and organize detailed results with explicit section headers so nothing important hides in the murky middle. Position your most critical content where the model actually attends." },
          { kicker: "Token bloat", title: "Tool outputs accumulate", bullets: [
            "Tool results pile up and consume tokens disproportionately to relevance",
            "e.g. an order lookup returns 40+ fields when only 5 matter",
            "Trim verbose tool outputs to only relevant fields before they accumulate" ],
            say: "Third: tool-output bloat. Tool results accumulate in context and eat tokens out of all proportion to their relevance - an order lookup might return forty-plus fields when only five matter to the task. So trim verbose tool outputs down to the relevant fields before they pile up. A PostToolUse hook is a perfect place to do this. Keep context lean by trimming at the source." },
          { kicker: "Skill", title: "Structured facts for downstream agents", bullets: [
            "Persist structured issue data (order IDs, amounts, statuses) in a separate layer",
            "Have upstream agents return key facts + citations, not verbose reasoning chains",
            "Especially when downstream agents have limited context budgets" ],
            say: "Pulling it together: persist structured issue data - order I.D.s, amounts, statuses - in a separate context layer for multi-issue sessions. And when a downstream agent has a limited context budget, have the upstream agents return structured key facts and citations instead of verbose content and reasoning chains. Give the next agent the distilled facts, not the whole transcript. That's how you stay coherent across long, multi-agent work." },
          { center: true, kicker: "Remember", big: "Persist hard facts in a 'case facts' block. Key findings go at the START. Trim tool outputs to relevant fields.",
            say: "Reflexes to bank: persist hard transactional facts in a case-facts block outside the summary, place key findings at the start to beat lost-in-the-middle, and trim verbose tool outputs to only the relevant fields. Next, escalation and ambiguity resolution." }
        ],
        takeaways: [
          "**Progressive summarization** blurs numbers/dates - persist a **'case facts' block** outside the summary.",
          "**Lost-in-the-middle**: put key findings at the **start**; use explicit section headers.",
          "**Trim verbose tool outputs** (40+ fields to relevant 5) before they bloat context.",
          "Have upstream agents return **structured facts + citations**, not reasoning chains, for limited downstream budgets." ] },
      {
        id: "l5-2", task: "Task 5.2", title: "Escalation & ambiguity resolution", audioBase: "assets/audio/l5-2",
        subtitle: "When to escalate, and why sentiment is the wrong signal.",
        slides: [
          { kicker: "Triggers", title: "When to escalate", bullets: [
            "Customer explicitly requests a human → escalate immediately",
            "Policy exception or gap (not just 'complex') → escalate",
            "Inability to make meaningful progress → escalate" ],
            say: "Escalation is about knowing your limits. Three legitimate triggers. One: the customer explicitly asks for a human - you escalate immediately, no first attempt to talk them out of it. Two: the situation is a policy exception or the policy is silent on it - note that's different from merely complex. Three: the agent genuinely cannot make meaningful progress. Those are your escalation signals. Honor the human request, escalate policy gaps, and escalate true dead-ends." },
          { kicker: "The trap", title: "Sentiment & self-confidence are bad proxies", bullets: [
            "Sentiment-based escalation: frustration is not case complexity",
            "Self-reported confidence scores are poorly calibrated",
            "Neither reliably indicates whether escalation is needed" ],
            say: "Now the trap the exam sets repeatedly. Do not escalate based on sentiment - a frustrated customer does not mean a complex case; plenty of frustrated customers have simple, solvable problems. And do not route on the model's self-reported confidence score, because that confidence is poorly calibrated - the agent is often confidently wrong on exactly the hard cases. Sentiment and self-confidence are both bad proxies for whether escalation is actually needed. Reject those distractors." },
          { kicker: "The right fix", title: "Explicit criteria with examples", bullets: [
            "Add explicit escalation criteria + few-shot examples showing escalate vs resolve",
            "Acknowledge frustration but still resolve if it's within capability",
            "Escalate only if the customer reiterates the request" ],
            say: "So what's the right fix when escalation is miscalibrated? Add explicit escalation criteria to the system prompt, with few-shot examples demonstrating when to escalate versus resolve autonomously. Acknowledge the customer's frustration, but still resolve the issue if it's within the agent's capability - escalating only if they reiterate that they want a human. Explicit criteria plus examples - the same precision lever from domain four - calibrates escalation." },
          { kicker: "Ambiguity", title: "Ask, don't guess", bullets: [
            "Multiple customer matches → ask for additional identifiers",
            "Don't select by heuristic when results are ambiguous",
            "Escalate when policy is silent on the specific request (e.g. competitor price match)" ],
            say: "On ambiguity: when a tool returns multiple matching customers, the agent should ask for an additional identifier - not guess by some heuristic like picking the most recent. Asking is safer than guessing wrong on someone's account. And when the policy is silent on a specific request - say a competitor price match when policy only covers your own-site adjustments - that's a policy gap, so you escalate. Clarify ambiguity, escalate policy gaps." },
          { center: true, kicker: "Remember", big: "Escalate on explicit request, policy gaps, no-progress. NEVER on sentiment or self-confidence.",
            say: "The big one: escalate on an explicit human request, on policy gaps, and on genuine inability to progress - and never on sentiment or self-reported confidence. Fix miscalibration with explicit criteria plus examples. Next, error propagation." }
        ],
        takeaways: [
          "Escalate on: **explicit human request** (immediately), **policy exceptions/gaps**, **inability to progress**.",
          "**Never** escalate on **sentiment** (frustration is not complexity) or **self-reported confidence** (poorly calibrated).",
          "Fix miscalibration with **explicit criteria + few-shot examples**; acknowledge frustration but resolve if able.",
          "Multiple matches ⇒ **ask for more identifiers**, don't guess; escalate when policy is silent on the request." ] },
      {
        id: "l5-3", task: "Task 5.3", title: "Error propagation in multi-agent systems", audioBase: "assets/audio/l5-3",
        subtitle: "Structured error context for intelligent coordinator recovery.",
        slides: [
          { kicker: "The principle", title: "Errors must carry context", bullets: [
            "Return structured error context: failure type, attempted query, partial results, alternatives",
            "This enables the coordinator to make intelligent recovery decisions",
            "Generic 'search unavailable' hides the context the coordinator needs" ],
            say: "When a subagent fails, how that failure travels back matters enormously. The principle: return structured error context - the failure type, what was attempted, any partial results, and potential alternative approaches. That gives the coordinator what it needs to recover intelligently: retry with a modified query, try an alternative, or proceed with partial results. A generic search-unavailable status hides all of that and leaves the coordinator blind. Errors should inform, not just signal." },
          { kicker: "Key distinction", title: "Access failure vs valid empty result", bullets: [
            "Access failure (timeout) → coordinator may need to retry",
            "Valid empty result (no matches) → a SUCCESSFUL query, not an error",
            "Conflating them breaks recovery logic" ],
            say: "Here's the distinction the exam tests, and it echoes domain two: an access failure like a timeout is different from a valid empty result. A timeout might need a retry decision. An empty result - a successful query that found no matches - is not an error at all. If you report empty results as failures, the coordinator wastes effort retrying queries that already succeeded. Distinguish the two clearly in your error reporting." },
          { kicker: "Anti-patterns", title: "Two ways to get it wrong", bullets: [
            "❌ Silently suppressing errors (returning empty as success) → incomplete results, no recovery",
            "❌ Terminating the entire workflow on a single failure → throws away good work",
            "✅ Subagents recover locally; propagate only the unresolvable, with what was attempted" ],
            say: "Two anti-patterns to avoid. One: silently suppressing errors by marking a failure as a successful empty result - that hides the problem and risks incomplete output with no chance to recover. Two: terminating the entire workflow on a single subagent failure - that throws away all the good work the other agents did. The right pattern: subagents recover locally from transient failures and only propagate the errors they truly can't resolve, including what was attempted and any partial results. Local recovery, structured propagation." },
          { kicker: "Skill", title: "Coverage annotations", bullets: [
            "Structure synthesis output with coverage annotations",
            "Mark which findings are well-supported vs which topics have gaps due to unavailable sources",
            "Honest about what couldn't be covered" ],
            say: "A nice skill on top: structure the synthesis output with coverage annotations - explicitly mark which findings are well-supported and which topic areas have gaps because a source was unavailable. So even when something failed, the final report is honest about what it could and couldn't cover. That honesty is what makes a multi-agent system trustworthy. Annotate the gaps." },
          { center: true, kicker: "Remember", big: "Propagate structured error context, not generic statuses. Recover locally; never suppress or kill the whole workflow.",
            say: "Reflexes: propagate structured error context - failure type, attempt, partial results, alternatives - not a generic status; distinguish access failures from valid empty results; recover locally and never suppress errors or terminate the whole workflow on one failure. Next, context in big codebases." }
        ],
        takeaways: [
          "Return **structured error context** (failure type, attempted query, partial results, alternatives) for intelligent coordinator recovery.",
          "Distinguish **access failures** (may retry) from **valid empty results** (success, no matches).",
          "Anti-patterns: **silently suppressing** errors and **terminating the whole workflow** on one failure.",
          "Subagents **recover locally**, propagate only unresolvable errors; add **coverage annotations** to synthesis." ] },
      {
        id: "l5-4", task: "Task 5.4", title: "Context in large codebase exploration", audioBase: "assets/audio/l5-4",
        subtitle: "Scratchpads, subagent delegation, and crash recovery.",
        slides: [
          { kicker: "The problem", title: "Context degradation in long sessions", bullets: [
            "In extended sessions, answers drift and become inconsistent",
            "The model starts referencing 'typical patterns' instead of the specific classes it found",
            "A clear signal that context has degraded" ],
            say: "Exploring a large codebase over a long session has a characteristic failure: context degradation. As the session drags on, answers start to drift and contradict each other, and a telltale sign is the model referencing typical patterns instead of the specific classes it actually discovered earlier. When you see it fall back to generic descriptions, that's degraded context talking. The rest of this lesson is how to fight it." },
          { kicker: "Fix 1", title: "Scratchpad files", bullets: [
            "Have agents maintain scratchpad files recording key findings",
            "Reference them for subsequent questions to counteract degradation",
            "Findings persist outside the conversation window" ],
            say: "First fix: scratchpad files. Have the agent write key findings into a scratchpad file as it goes, and reference that file for later questions. Because the findings now live outside the conversation window, they survive context degradation - the agent reads its own durable notes instead of relying on fading memory. Externalize the important findings to a file." },
          { kicker: "Fix 2", title: "Subagent delegation", bullets: [
            "Spawn subagents to investigate specific questions ('find all test files', 'trace refund flow')",
            "The verbose exploration output stays isolated in the subagent",
            "The main agent keeps high-level coordination context clean" ],
            say: "Second fix: subagent delegation. Spawn a subagent to investigate a specific question - find all the test files, trace the refund flow dependencies - and let all that verbose exploration output stay isolated inside the subagent. The main agent just gets the summary, so its high-level coordination context stays clean. Isolate the noisy discovery in a subagent; keep the main thread tidy." },
          { kicker: "Fix 3", title: "Crash recovery via manifests", bullets: [
            "Each agent exports state to a known location",
            "On resume, the coordinator loads a manifest and injects it into prompts",
            "Structured state persistence enables recovery" ],
            say: "Third fix, for resilience: crash recovery using manifests. Have each agent export its state to a known location, and on resume, the coordinator loads a manifest of that state and injects it into the agent prompts. So a crash mid-exploration doesn't mean starting over - you reload structured state and continue. Persist state to known locations; recover via manifest." },
          { kicker: "Bonus", title: "/compact", bullets: [
            "Use /compact to reduce context usage in extended sessions",
            "Helpful when context fills with verbose discovery output",
            "Summarize-before-spawn: condense a phase before the next" ],
            say: "And a handy command: slash-compact reduces context usage during long sessions when things fill up with verbose discovery output. Pair it with a summarize-before-spawn habit - condense the findings from one exploration phase before spawning subagents for the next, injecting that summary into their initial context. Compact and summarize to keep extended sessions healthy." },
          { center: true, kicker: "Remember", big: "Degradation = referencing 'typical patterns'. Fight it: scratchpads, subagent delegation, manifests, /compact.",
            say: "Bank it: context degradation shows up as the model citing typical patterns instead of specifics, and you fight it with scratchpad files, subagent delegation for verbose discovery, manifest-based crash recovery, and slash-compact. Next, human review and confidence calibration." }
        ],
        takeaways: [
          "**Context degradation** shows as referencing 'typical patterns' instead of specific discovered classes.",
          "**Scratchpad files** persist findings outside the window; **subagent delegation** isolates verbose discovery.",
          "**Crash recovery**: agents export state to known locations; coordinator loads a **manifest** on resume.",
          "Use **`/compact`** and summarize-before-spawn to manage extended-session context." ] },
      {
        id: "l5-5", task: "Task 5.5", title: "Human review & confidence calibration", audioBase: "assets/audio/l5-5",
        subtitle: "Stratified sampling and accuracy by segment.",
        slides: [
          { kicker: "Aggregate trap", title: "97% overall can hide failures", bullets: [
            "Aggregate accuracy (e.g. 97%) can mask poor performance on specific types/fields",
            "A segment can be failing badly while the average looks great",
            "Validate accuracy BY document type and field before automating" ],
            say: "Human review is about spending limited reviewer attention wisely. First trap: aggregate accuracy lies. Ninety-seven percent overall sounds great, but it can hide a document type or a specific field that's failing badly - the average just drowns it out. So before you reduce human review or automate high-confidence extractions, you validate accuracy by document type and by field, not just overall. Segment the metric or you'll automate a hidden failure." },
          { kicker: "Sampling", title: "Stratified random sampling", bullets: [
            "Sample high-confidence extractions to measure ongoing error rates",
            "Stratify to detect novel error patterns across segments",
            "Catches drift the aggregate would miss" ],
            say: "The technique is stratified random sampling. You sample your high-confidence extractions across segments to measure the real error rate over time and to detect novel error patterns as they emerge. Stratifying - sampling within each document type or field group - is what catches a problem in one segment that the overall number would hide. Sample by stratum to see the truth." },
          { kicker: "Calibration", title: "Field-level confidence + validation sets", bullets: [
            "Have models output field-level confidence scores",
            "Calibrate review thresholds using LABELED validation sets",
            "Route low-confidence or ambiguous/contradictory items to humans" ],
            say: "For calibration, have the model output field-level confidence scores, then calibrate your review thresholds using labeled validation sets - real ground truth, not the model's self-assessment. Then route the low-confidence extractions, and anything from ambiguous or contradictory source documents, to human reviewers. That prioritizes your limited reviewer capacity exactly where it's needed. Calibrate against labels, route by calibrated confidence." },
          { center: true, kicker: "Remember", big: "Aggregate accuracy hides segment failures. Validate by type & field; calibrate with LABELED sets.",
            say: "Reflexes: aggregate accuracy hides per-segment failures, so validate by document type and field and use stratified sampling; calibrate confidence thresholds against labeled validation sets, and route low-confidence and ambiguous items to humans. One last lesson: information provenance." }
        ],
        takeaways: [
          "**Aggregate accuracy (97%) hides** poor performance on specific document types/fields - validate **by segment**.",
          "**Stratified random sampling** of high-confidence extractions measures error rates and detects novel patterns.",
          "Output **field-level confidence**; calibrate thresholds with **labeled validation sets** (not self-assessment).",
          "Route **low-confidence / ambiguous / contradictory** items to human review." ] },
      {
        id: "l5-6", task: "Task 5.6", title: "Provenance & uncertainty in synthesis", audioBase: "assets/audio/l5-6",
        subtitle: "Claim-source mappings, conflicts, and temporal data.",
        slides: [
          { kicker: "The problem", title: "Summarization loses attribution", bullets: [
            "Source attribution is lost when findings are compressed without claim-source mappings",
            "The synthesis agent must preserve and merge structured claim-source mappings",
            "Without it, you can't trace a claim back to its source" ],
            say: "Our final lesson: preserving provenance through synthesis. The problem is that summarization steps lose source attribution - when findings get compressed, the link between a claim and its source disappears. The fix is structured claim-source mappings that the synthesis agent must preserve and merge as it combines findings. Each claim keeps its source URL, document name, and relevant excerpt. Without that, you can't trace where anything came from. Keep claims welded to their sources." },
          { kicker: "Conflicts", title: "Annotate, don't arbitrarily pick", bullets: [
            "Conflicting statistics from credible sources: annotate the conflict with attribution",
            "Don't arbitrarily select one value",
            "Complete analysis with conflicts included and explicitly flagged" ],
            say: "When credible sources disagree - two different statistics for the same thing - do not just pick one and move on. You annotate the conflict, attributing each value to its source, and let the coordinator decide how to reconcile before synthesis. The right move is to complete the analysis with both conflicting values included and explicitly flagged, not silently resolved. Surface conflicts with attribution; don't hide them by choosing arbitrarily." },
          { kicker: "Temporal data", title: "Dates prevent false contradictions", bullets: [
            "Require publication/collection dates in structured outputs",
            "Otherwise temporal differences look like contradictions",
            "A 2021 figure vs a 2024 figure isn't a conflict - it's an update" ],
            say: "Temporal data needs special care. Require publication or collection dates in your structured outputs, because without them, a figure from twenty twenty-one and a figure from twenty twenty-four look like a contradiction when really it's just an update over time. Dates let the system interpret the difference correctly. Always carry the date so temporal change isn't mistaken for conflict." },
          { kicker: "Rendering", title: "Match format to content type", bullets: [
            "Render financial data as tables, news as prose, technical findings as structured lists",
            "Don't force everything into one uniform format",
            "Structure reports to separate well-established from contested findings" ],
            say: "And finally, presentation: render different content types appropriately - financial data as tables, news as prose, technical findings as structured lists - rather than flattening everything into one uniform format. And structure the final report to clearly separate well-established findings from contested ones, preserving the original sources' characterizations. Right format for the content, and honesty about certainty. That completes domain five!" },
          { center: true, kicker: "Remember", big: "Preserve claim-source mappings. Annotate conflicts with attribution. Carry dates. That's the whole blueprint - go pass it!",
            say: "Final reflexes: preserve claim-source mappings through synthesis, annotate conflicts with attribution instead of picking arbitrarily, and carry publication dates so temporal change isn't mistaken for contradiction. And that, my friend, is the entire blueprint - every domain, every task statement. You've done the hard part. Now take the domain quiz, walk the scenarios, do the labs, and crush the mock exam. I'll see you on the other side as a Claude Certified Architect. Go get it!" }
        ],
        takeaways: [
          "Preserve **structured claim-source mappings** (URL, doc, excerpt) through synthesis - summarization loses attribution.",
          "Conflicting credible sources: **annotate with attribution**, don't arbitrarily pick one value.",
          "Require **publication/collection dates** so temporal differences aren't read as contradictions.",
          "Render by content type (tables/prose/lists); separate **well-established from contested** findings." ] }
    ]
  },

  /* ===================== MODULE 6 — SCENARIO WALKTHROUGHS ===================== */
  {
    id: "m6", num: 6, title: "Scenario Walkthroughs", summary: "All six official exam scenarios worked end-to-end with the key decisions.",
    lessons: [
      { id: "s1", type: "page", tag: "Scenario 1", title: "Customer Support Resolution Agent",
        subtitle: "Agent SDK + MCP tools, targeting 80%+ first-contact resolution.",
        body: "**Setup.** You build a support agent on the Agent SDK with MCP tools `get_customer`, `lookup_order`, `process_refund`, `escalate_to_human`. Target: 80%+ first-contact resolution while knowing when to escalate.\n**Primary domains:** Agentic Architecture (1), Tool Design & MCP (2), Context Management & Reliability (5).\n\n## The decisions the exam will probe\n- **Ordering must be guaranteed → use a programmatic gate.** If the agent sometimes skips `get_customer` and refunds the wrong account, the fix is a *prerequisite gate* blocking `process_refund`/`lookup_order` until `get_customer` returns a verified ID. A better-worded prompt is **not** sufficient - prompts are probabilistic; money needs determinism.\n- **Misrouting between similar tools → expand the descriptions first.** If `get_customer` and `lookup_order` have thin descriptions and get confused, the *first* step is richer descriptions (inputs, examples, when-to-use), not a routing classifier (over-engineering).\n- **Escalation calibration → explicit criteria + few-shot, never sentiment/confidence.** If it escalates easy cases and tries to solve hard ones, add explicit escalation criteria with examples. Reject sentiment-based or self-confidence-based routing.\n- **Refund limits → an interception hook.** Block refunds over a threshold deterministically and redirect to human escalation.\n- **Multi-issue context → persist case facts.** Pull amounts, order IDs, statuses into a persistent facts block so summarization doesn't blur them.\n\n> Mental model: *deterministic enforcement for money and ordering; explicit criteria for judgment; structured facts for memory.*\n\n## Worked question\n**Agent skips `get_customer` 12% of the time and refunds wrong accounts. Best fix?** → **Programmatic prerequisite** that blocks `lookup_order`/`process_refund` until `get_customer` returns a verified ID. (Prompt/few-shot are probabilistic; a routing classifier solves tool *availability*, not *ordering*.)" },
      { id: "s2", type: "page", tag: "Scenario 2", title: "Code Generation with Claude Code",
        subtitle: "Custom slash commands, CLAUDE.md, plan mode vs direct execution.",
        body: "**Setup.** Your team uses Claude Code for generation, refactoring, debugging, and docs. You need slash commands, CLAUDE.md config, and to know when to use plan mode.\n**Primary domains:** Claude Code Config (3), Context Management (5).\n\n## Key decisions\n- **Team-wide `/review` command → `.claude/commands/` in the repo.** Project-scoped, version-controlled, available to everyone on clone. *Not* `~/.claude/commands/` (personal), *not* CLAUDE.md (that's context, not commands).\n- **New teammate ignores standards → user vs project scope bug.** The standards were in user-level config (not shared via git); move them to project-level.\n- **Conventions by file type across the tree → `.claude/rules/` with glob `paths`.** Beats subdirectory CLAUDE.md (directory-bound) and skills (manual).\n- **Architectural / multi-file change → plan mode.** Single clear-scope fix → direct execution. If complexity is *stated in requirements*, choose plan mode now.\n- **Verbose skills → `context: fork`.** Isolate noisy output from the main conversation; restrict with `allowed-tools`.\n\n## Worked question\n**Create a `/review` command available to every developer on clone. Where?** → **`.claude/commands/` in the project repo** (shared via version control)." },
      { id: "s3", type: "page", tag: "Scenario 3", title: "Multi-Agent Research System",
        subtitle: "Coordinator delegating to web-search, analysis, synthesis, and report subagents.",
        body: "**Setup.** A coordinator delegates to specialized subagents that search, analyze, synthesize, and report - producing cited research.\n**Primary domains:** Agentic Architecture (1), Tool Design & MCP (2), Context Management (5).\n\n## Key decisions\n- **Missing topic coverage, subagents all 'worked' → coordinator decomposed too narrowly.** Blame the *assignment*, not the workers.\n- **Subagents don't inherit context → pass findings explicitly** in each subagent's prompt; separate content from metadata (URLs, dates).\n- **Parallelism → emit multiple `Task` calls in one coordinator response.** `allowedTools` must include `\"Task\"`.\n- **Subagent timeout → return structured error context** (failure type, attempted query, partial results, alternatives), not a generic 'search unavailable'. Don't suppress; don't kill the whole workflow.\n- **Frequent simple verifications → scoped `verify_fact` tool** for the synthesis agent; route complex cases through the coordinator. Don't over-provision it with all web tools.\n- **Provenance → preserve claim-source mappings;** annotate conflicting stats with attribution; carry publication dates.\n\n## Worked question\n**Reports miss music/writing/film; logs show only visual-arts subtasks. Root cause?** → **Coordinator's task decomposition was too narrow.**" },
      { id: "s4", type: "page", tag: "Scenario 4", title: "Developer Productivity Tools",
        subtitle: "Built-in tools (Read, Write, Bash, Grep, Glob) plus MCP servers.",
        body: "**Setup.** An agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate, and automate tasks using built-in tools and MCP.\n**Primary domains:** Tool Design & MCP (2), Claude Code Config (3), Agentic Architecture (1).\n\n## Key decisions\n- **Find usages / error strings → Grep (contents).** Find files by name/type → **Glob** (`**/*.test.tsx`).\n- **Edit fails on non-unique text → Read + Write fallback.**\n- **Explore incrementally:** Grep to find entry points, Read to follow imports - don't read everything up front (context bloat).\n- **Agent prefers weak built-in over capable MCP tool → enrich the MCP tool's description** so the model reaches for it.\n- **Shared team MCP → project `.mcp.json` with `${ENV}` expansion;** personal/experimental → user `~/.claude.json`.\n- **Long exploration degrades → scratchpad files, subagent delegation, `/compact`.**\n\n## Worked question\n**Trace all callers of a function across wrapper modules. Best approach?** → Identify exported names, then **Grep each name across the codebase** (contents search), following with Read to confirm." },
      { id: "s5", type: "page", tag: "Scenario 5", title: "Claude Code for Continuous Integration",
        subtitle: "Automated review, test generation, and PR feedback with minimal false positives.",
        body: "**Setup.** Claude Code runs in CI: automated code reviews, test generation, PR feedback. You need actionable feedback and few false positives.\n**Primary domains:** Claude Code Config (3), Prompt Engineering & Structured Output (4).\n\n## Key decisions\n- **CI job hangs → add `-p` / `--print`** (non-interactive). Reject fake `--batch`/`CLAUDE_HEADLESS` distractors.\n- **Machine-parseable findings → `--output-format json` + `--json-schema`** for inline PR comments.\n- **Re-runs spam duplicate comments → include prior findings,** instruct to report only new/unaddressed issues.\n- **Test generation duplicates coverage → feed existing test files** in context.\n- **False positives erode trust → explicit categorical criteria,** temporarily disable noisy categories; add **few-shot** examples distinguishing acceptable patterns from genuine issues.\n- **Inconsistent multi-file review → split into per-file + cross-file passes** (attention dilution). For review quality, **use a separate independent instance** (self-review is weak).\n- **Cost: overnight tech-debt report vs blocking pre-merge check → batch only the non-blocking job.**\n\n## Worked question\n**`claude \"Analyze this PR\"` hangs in CI. Fix?** → **`claude -p \"Analyze this PR\"`** (the `-p`/`--print` non-interactive flag)." },
      { id: "s6", type: "page", tag: "Scenario 6", title: "Structured Data Extraction",
        subtitle: "JSON schemas, validation, edge cases, and downstream integration.",
        body: "**Setup.** Extract information from unstructured documents, validate with JSON schemas, maintain high accuracy, handle edge cases, integrate downstream.\n**Primary domains:** Prompt Engineering & Structured Output (4), Context Management & Reliability (5).\n\n## Key decisions\n- **Guaranteed structure → `tool_use` + JSON schema** (eliminates syntax errors). But **schemas don't catch semantics** - bad sums and wrong-field values still validate.\n- **Missing source fields → optional/nullable** so the model doesn't fabricate; add `unclear`/`other`+detail enums.\n- **Validation failure → retry with the *specific* errors,** the original doc, and the failed extraction. Retry fixes format/structure - **not info absent from the source.**\n- **Catch semantics → extract `calculated_total` vs `stated_total`,** `conflict_detected` booleans.\n- **Varied document formats → few-shot examples** (inline citations vs bibliographies, tables vs prose).\n- **Volume + latency-tolerant → Message Batches API** (50% cheaper, ≤24h, no SLA, no multi-turn tools); resubmit failures by `custom_id`.\n- **Accuracy claims → validate by document type & field** (97% aggregate hides segment failures); stratified sampling; route low-confidence to humans.\n\n## Worked question\n**Strict JSON schema is in place but totals are still wrong. Why?** → Schemas guarantee **shape, not semantics**; add a `calculated_total` self-check and flag discrepancies." }
    ]
  },

  /* ===================== MODULE 7 — HANDS-ON LABS ===================== */
  {
    id: "labs", num: 7, title: "Hands-on Labs", summary: "The four official preparation exercises, expanded into guided walkthroughs.",
    lessons: [
      { id: "lab1", type: "lab", tag: "Lab 1 · Domains 1, 2, 5", title: "Build a multi-tool agent with escalation logic",
        subtitle: "Agentic loop + tool integration + structured errors + a hook.",
        body: "**Objective.** Practice an agentic loop with tool integration, structured error handling, and escalation patterns.\n\n## Steps\n1. **Define 3-4 MCP tools** with detailed, differentiated descriptions (purpose, inputs, edge cases, boundaries). Include two *similar* tools that require careful descriptions to avoid selection confusion.\n2. **Implement the agentic loop:** check `stop_reason`; continue on `tool_use`, finish on `end_turn`. Never parse text to decide.\n3. **Add structured errors:** every tool returns `errorCategory` (transient/validation/permission/business), `isRetryable`, and a human-readable message. Verify the agent retries transient errors and explains business errors.\n4. **Add an interception hook** that blocks a business-rule violation (e.g. operations over a threshold) and redirects to escalation.\n5. **Test multi-concern messages:** verify the agent decomposes the request, handles each concern, and synthesizes one unified response.\n\n## Reference loop\n```\nwhile True:\n    resp = client.messages.create(model, messages, tools=tools)\n    if resp.stop_reason == \"tool_use\":\n        messages.append(assistant(resp.content))\n        messages.append(user(run_tools(resp.content)))   # tools return structured errors\n        continue\n    if resp.stop_reason == \"end_turn\":\n        break\n```\n\n## Checks\n- Does the loop terminate **only** on `end_turn`?\n- Do similar tools get selected correctly thanks to their descriptions?\n- Does the hook make the forbidden action **impossible** (not just discouraged)?\n\n**Domains reinforced:** 1 (Agentic Architecture), 2 (Tool Design & MCP), 5 (Context & Reliability)." },
      { id: "lab2", type: "lab", tag: "Lab 2 · Domains 3, 2", title: "Configure Claude Code for a team workflow",
        subtitle: "CLAUDE.md hierarchy, path rules, a forked skill, and MCP servers.",
        body: "**Objective.** Configure CLAUDE.md hierarchies, custom commands, path-specific rules, and MCP integration for a multi-developer project.\n\n## Steps\n1. **Project CLAUDE.md** with universal coding/testing standards. Verify instructions placed at project level apply for every team member (and that user-level wouldn't share via git).\n2. **`.claude/rules/`** files with YAML `paths` globs for different areas (e.g. `paths: [\"src/api/**/*\"]` for API conventions, `paths: [\"**/*.test.*\"]` for tests). Confirm rules load only when editing matching files.\n3. **A project skill** in `.claude/skills/` with `context: fork` and `allowed-tools` restrictions. Verify it runs isolated, without polluting the main conversation.\n4. **An MCP server** in `.mcp.json` using `${ENV}` expansion for credentials; add a personal experimental server in `~/.claude.json`. Verify both are available simultaneously.\n5. **Plan vs direct:** try a single-file bug fix, a multi-file library migration, and a feature with multiple valid approaches. Observe when plan mode earns its keep.\n\n## Checks\n- Use `/memory` to confirm which files actually loaded.\n- Do glob rules stay silent until you open a matching file?\n- Does the forked skill keep its verbose output out of the main thread?\n\n**Domains reinforced:** 3 (Claude Code Config), 2 (Tool Design & MCP)." },
      { id: "lab3", type: "lab", tag: "Lab 3 · Domains 4, 5", title: "Build a structured data extraction pipeline",
        subtitle: "JSON schema, validation-retry, few-shot, batch, and human routing.",
        body: "**Objective.** Practice JSON schemas, `tool_use` structured output, validation-retry loops, and batch strategy.\n\n## Steps\n1. **Define an extraction tool** whose JSON schema has required *and* optional/nullable fields, an enum with `\"other\"` + detail string, and nullable fields for info that may be absent. Process documents missing some fields - verify the model returns `null`, not fabricated values.\n2. **Validation-retry loop:** on schema/semantic failure, send a follow-up with the document, the failed extraction, and the *specific* error. Track which errors are resolvable by retry (format) vs not (absent info).\n3. **Few-shot for variety:** add examples covering inline citations vs bibliographies, narrative vs tabular - verify improved handling of structural variety.\n4. **Batch strategy:** submit 100 docs via the Message Batches API; handle failures by `custom_id` (e.g. chunk oversized docs); compute total processing time vs SLA.\n5. **Human routing:** output field-level confidence; route low-confidence extractions to review; analyze accuracy *by document type and field* (not just aggregate).\n\n## Semantic self-check pattern\n```\n{ \"line_items\": [...], \"stated_total\": 1240.00,\n  \"calculated_total\": 1180.00, \"conflict_detected\": true }\n```\n\n**Domains reinforced:** 4 (Prompt Engineering & Structured Output), 5 (Context & Reliability)." },
      { id: "lab4", type: "lab", tag: "Lab 4 · Domains 1, 2, 5", title: "Design & debug a multi-agent research pipeline",
        subtitle: "Coordinator, parallel subagents, error propagation, provenance.",
        body: "**Objective.** Orchestrate subagents, manage context passing, implement error propagation, and handle synthesis with provenance.\n\n## Steps\n1. **Coordinator + 2 subagents** (web search, document analysis). Ensure `allowedTools` includes `\"Task\"` and each subagent receives findings *directly in its prompt* (no automatic inheritance).\n2. **Parallel execution:** emit multiple `Task` calls in one coordinator response; measure the latency improvement vs sequential.\n3. **Structured subagent output:** each finding = claim + evidence excerpt + source URL/doc name + publication date. Verify the synthesis subagent preserves attribution.\n4. **Error propagation:** simulate a subagent timeout; verify the coordinator receives structured error context (failure type, attempted query, partial results) and proceeds with partial results, annotating coverage gaps.\n5. **Conflicting sources:** feed two credible sources with different statistics; verify synthesis preserves both with attribution (not arbitrary selection) and separates well-established from contested findings.\n\n## Debug checklist\n- Coverage gap in output? Check the coordinator's **decomposition**, not the subagents.\n- Synthesis vague/unsourced? Findings lost their **claim-source mappings**.\n- Whole pipeline dies on one failure? You're missing **local recovery + structured propagation.**\n\n**Domains reinforced:** 1 (Agentic Architecture), 2 (Tool Design & MCP), 5 (Context & Reliability)." }
    ]
  },

  /* ===================== MODULE 8 — EXAM STRATEGY ===================== */
  {
    id: "m8", num: 8, title: "Exam Strategy & Final Prep", summary: "Test-taking tactics, the high-yield cheat sheet, and your path to the mock exam.",
    lessons: [
      { id: "x-strategy", type: "page", tag: "Strategy", title: "Test-taking strategy & high-yield cheat sheet",
        subtitle: "How to think on exam day, plus the facts that earn the most points.",
        body: "## How to think on every question\n1. **Identify the scenario** (one of the six) - it primes the right domain and vocabulary.\n2. **Find the root cause** the question describes, not the symptom.\n3. **Eliminate over-engineering** - classifiers, extra ML, new infrastructure are usually distractors when a prompt/description/gate fix exists.\n4. **Eliminate probabilistic answers when a guarantee is required** - if a rule must hold, pick the hook/gate, not the prompt.\n5. **Prefer the simplest fix that targets the root cause.** When two answers work, the proportionate one wins.\n6. **Never leave blanks** - no guessing penalty.\n\n## The recurring distractor patterns\n- 'Train a classifier / sentiment model' when prompt or description tuning is the real fix.\n- 'Improve the system prompt' when a *deterministic guarantee* is required.\n- 'Use a bigger context window / model' when the issue is **attention dilution** (split into passes instead).\n- 'Self-review more carefully / extended thinking' when an **independent instance** is the fix.\n- Fake flags/features (`--batch`, `CLAUDE_HEADLESS`) - the real CI flag is **`-p`/`--print`**.\n\n## High-yield cheat sheet\n- Loop: continue on `tool_use`, stop on `end_turn`; never parse text.\n- Subagents: isolated context; spawn via **Task** (in `allowedTools`); **multiple Task calls in one response = parallel**.\n- Guarantees: **hooks / prerequisite gates**, not prompts.\n- Tool selection: **descriptions** are the mechanism; expand first, then rename/split. Fewer tools = better.\n- Errors: `isError` + `errorCategory` + `isRetryable`; **empty result = success**.\n- MCP: project `.mcp.json` (shared, `${ENV}`) vs user `~/.claude.json`; resources expose catalogs.\n- Built-ins: **Grep = contents, Glob = paths**; Edit fails on non-unique → Read+Write.\n- CLAUDE.md: user (not shared) / project (shared) / directory; `@import`, `.claude/rules/` globs.\n- Skills: `context: fork`, `allowed-tools`, `argument-hint`; project vs user scope.\n- Plan mode: architectural/multi-file/multiple-approach. Direct: single clear-scope.\n- Structured output: **`tool_use` + schema = shape not semantics**; nullable prevents fabrication.\n- `tool_choice`: auto / any / forced.\n- Retry: fixes format, **not absent info**; add `calculated_total` semantic checks.\n- Batch API: 50% cheaper, ≤24h, no SLA, **no multi-turn tools**; non-blocking only.\n- Review: **independent instance**; split per-file + cross-file.\n- Context: **case facts** block; lost-in-the-middle → key findings first; trim tool output.\n- Escalation: explicit request / policy gap / no-progress. **Never sentiment or self-confidence.**\n- Provenance: preserve **claim-source mappings**; annotate conflicts; carry dates.\n\n> Do the four labs, take every domain quiz, then sit the timed mock. Review every miss until you know *why* each distractor is wrong. That's a pass." }
    ]
  }

  ]
};

/* ===================== 12-WEEK STUDY PLAN ===================== */
window.STUDY_PLAN = [
  { week: 1, title: "Orientation & exam blueprint", detail: "Watch Module 0. Read the official Exam Guide once. Memorize the five domains and weights. Skim all six scenarios. Set a target exam date." },
  { week: 2, title: "Domain 1 — Agentic loops & orchestration (part 1)", detail: "Lessons 1.1-1.4: the agentic loop, coordinator-subagent patterns, Task/context passing, enforcement vs guidance. Build the **agentic loop** by hand (Lab 1, steps 1-2)." },
  { week: 3, title: "Domain 1 — Hooks, decomposition, sessions (part 2)", detail: "Lessons 1.5-1.7: hooks, decomposition strategies, sessions/forking. Finish Lab 1. Take the Domain 1 quiz; review every miss." },
  { week: 4, title: "Domain 2 — Tool design & MCP", detail: "All of Module 2. Practice writing differentiated tool descriptions and structured errors. Start Lab 2 (CLAUDE.md + MCP config). Domain 2 quiz." },
  { week: 5, title: "Domain 3 — Claude Code configuration", detail: "All of Module 3. Set up a real CLAUDE.md hierarchy, a `.claude/rules/` glob, and a forked skill. Finish Lab 2. Domain 3 quiz." },
  { week: 6, title: "Domain 4 — Prompt engineering & structured output (part 1)", detail: "Lessons 4.1-4.3: explicit criteria, few-shot, tool_use + JSON schema. Begin Lab 3 (extraction schema). Mid-course self-check on Domains 1-3." },
  { week: 7, title: "Domain 4 — Validation, batch, review (part 2)", detail: "Lessons 4.4-4.6: validation-retry, Message Batches API, multi-pass review. Finish Lab 3. Domain 4 quiz." },
  { week: 8, title: "Domain 5 — Context management & reliability", detail: "All of Module 5. Build Lab 4 (multi-agent pipeline with error propagation + provenance). Domain 5 quiz." },
  { week: 9, title: "Scenario mastery", detail: "Work all six scenario walkthroughs (Module 6). For each, state the root cause and the simplest correct fix out loud before reading the answer." },
  { week: 10, title: "Full question bank", detail: "Work the entire 60-question bank in practice mode. Keep an error log: for each miss, write the rule you forgot and the distractor pattern that fooled you." },
  { week: 11, title: "Timed mock exam + targeted review", detail: "Sit the full timed mock under exam conditions. Re-study the weakest domain from your results. Re-read the Module 8 cheat sheet daily." },
  { week: 12, title: "Final polish & exam", detail: "Retake the mock until you clear 720 comfortably. Skim all takeaways and the cheat sheet. Rest the day before. Then book it and pass." }
];
