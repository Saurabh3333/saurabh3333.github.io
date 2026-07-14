# Portfolio, resume, and engineering-story design research

**Retrieval date:** 2026-07-13  
**Source classification:** External research and reference/inspiration only

## Boundary

This research guides presentation. It proves no personal claim about Saurabh. Candidate facts must come from the separate evidence matrix; metrics, production status, ownership, security posture, and outcomes must never be inferred from these sources. Patterns are synthesised into an original direction, not copied from any portfolio, resume, or vendor page.

## Source-led findings

### Portfolio and repository evidence

[GitHub's resume guidance](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume) recommends highlighting a small relevant set of projects and making each easy to understand quickly through a concise overview, setup/run instructions, a demo or example, and tests. [GitHub's profile documentation](https://docs.github.com/en/account-and-profile/concepts/personal-profile) also frames pinned work, contribution context, and a concise profile README as controllable public evidence.

Useful pattern: a selective project index with direct source links and short evidence-rich case studies. Each case study should label professional work, personal project, or prototype, then cover problem, constraints, architecture, contribution, validation, and outcome. When employer confidentiality prevents detail, state the boundary instead of filling it with generic claims.

### Resume hierarchy and writing

[MIT CAPD's resume guide](https://capd.mit.edu/resources/resumes/) favours standard, consistent formatting; immediately visible relevant information; conservative type no smaller than 10pt; action-led descriptions; contextual technical detail; and factual accomplishments rather than responsibility lists. Its [resume checklist](https://capd.mit.edu/resources/resume-checklist/) checks organisation, title, location, dates, project/action/result, relevant industry terms, and evidence.

Useful pattern: conventional ATS-readable sections, reverse chronology, impact-first bullets, plain-text links, and technology embedded in demonstrated work. Quantify only when source evidence supplies the number. Keep a complete master resume separate from the concise application resume.

### Architecture communication

The official [C4 diagram guidance](https://c4model.com/diagrams) says not every zoom level is necessary; context and container views are enough for most teams. This supports small, purposeful diagrams over decorative “architecture wallpaper.”

Useful pattern: one labelled architecture view per case study only when it clarifies actors, system boundary, stores, flows, and external dependencies. Include a text description, identify trust boundaries where relevant, and avoid invented internal detail. Show decisions and trade-offs beside the diagram.

### Agentic systems and evaluation

[Anthropic's effective-agent guidance](https://www.anthropic.com/engineering/building-effective-agents) distinguishes fixed workflows from agents and reports that simple composable patterns often outperform unnecessary framework complexity. Its [agent-evaluation guidance](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) recommends defined tasks and success criteria, multiple trials for variable outputs, outcome and trace inspection, fit-for-purpose code/model/human graders, baselines, regression suites, production monitoring, and periodic human calibration.

Useful pattern: describe whether a system is a workflow or an agent; its tools, state, data boundary, permissions, stop conditions, human gates, failure modes, and fallback. Present evaluation set, grader type, baseline, regression checks, latency/cost/error measures, and known limitations only when implemented and evidenced. Framework names belong in implementation detail, not headline branding.

### Agent security and privacy

The [OWASP AI Agent Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html) stresses least-privilege tools, input validation, session isolation, human approval for high-risk actions, structured outputs, bounded retries/costs, adversarial testing, and avoiding plaintext sensitive logs. The [European Data Protection Board's Article 25 guidance](https://www.edpb.europa.eu/documents/guideline/guidelines-42019-on-article-25-data-protection-by-design-and-by-default_en) treats data protection by design and default as an engineering responsibility; GDPR principles include purpose limitation and data minimisation.

Useful pattern: for finance, healthcare, or personal-data systems, explain data minimisation, redaction/synthetic examples, access boundaries, retention assumptions, secret handling, and human approval points. Publish no raw personal records, credentials, private endpoints, employer data, or security-sensitive internal topology. “Privacy-conscious” needs concrete controls, not a lock icon.

### Reliability, operations, and validation

[Google's SRE monitoring guidance](https://sre.google/sre-book/monitoring-distributed-systems/) defines monitoring around quantitative system behaviour and distinguishes internal signals from user-visible checks. [Google Cloud's reliability guidance](https://cloud.google.com/architecture/framework/reliability/slo-and-alerts) recommends metrics, logs, and traces plus focused actionable alerts. [Google SRE testing guidance](https://sre.google/sre-book/testing-reliability/) treats testing and monitoring as complementary evidence, not proof by assertion.

Useful pattern: case studies should identify relevant correctness and operating signals: pipeline success/failure, freshness, completeness, latency, retries, cost, data-quality checks, recovery path, and alert destination. Show test method or validation artefact when public. Never turn an unmeasured design goal into a result.

### Data lineage and contracts

[OpenLineage](https://openlineage.io/) models datasets, jobs, and runs so teams can investigate root cause and change impact; its [facet model](https://openlineage.io/docs/spec/facets/) adds what ran, how it ran, inputs, and outputs.

Useful pattern: show source-to-consumer flow, transformations, ownership boundary, orchestration/run context, schema or contract checks, and the blast radius of change. A compact lineage view is useful only when backed by project evidence. Do not draw fictional production lineage from repository names.

### Accessibility

WCAG 2.2 guidance requires [visible keyboard focus](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible), establishes [minimum contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), and sets a [24 by 24 CSS-pixel minimum target or sufficient spacing](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum). MDN documents [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion) as a widely available way to reduce non-essential motion.

Useful pattern: semantic landmarks and headings, skip link, keyboard-operable navigation, persistent visible focus, descriptive link text, meaningful alt text, sufficient target size/spacing, responsive reflow, contrast checks, and a reduced-motion path. Diagrams require adjacent text; colour cannot carry status alone.

### Performance

[web.dev's Core Web Vitals overview](https://web.dev/performance) centres perceived load speed, visual stability, and interaction responsiveness. Its [LCP guidance](https://web.dev/articles/optimize-lcp) favours early-discoverable primary content, minimal render delay, and prerendered/static HTML where suitable. Its [CLS guidance](https://web.dev/articles/optimize-cls) calls out missing image dimensions, injected content, and fonts as common shift causes.

Useful pattern: retain static GitHub Pages delivery; render primary copy in HTML; minimise JavaScript and third-party requests; size images explicitly; use responsive, compressed assets; avoid lazy-loading the above-fold LCP asset; and measure desktop/mobile behaviour. Performance scores are validation results, never design decoration.

## Durable signals versus short-lived trends

| Durable professional signal | Why it lasts | Short-lived treatment to avoid |
|---|---|---|
| Verifiable contribution and outcome | Lets reviewers judge real engineering work | Unsupported “10x,” “at scale,” or production badges |
| Problem, constraints, decision, trade-off, validation | Demonstrates senior judgement across tool changes | Tool-logo walls and keyword clouds |
| Clear system boundary and compact architecture/lineage | Makes complexity inspectable | Dense agent “spaghetti” diagrams with no trust boundary |
| Tests, data-quality checks, observability, and recovery | Shows operability beyond a demo | Screenshots of fake dashboards or invented SLOs |
| Evaluation tasks, graders, baselines, and limitations | Makes agent behaviour falsifiable | Calling any LLM chain “autonomous” or “self-improving” |
| Privacy-by-design and least privilege | Relevant wherever systems touch sensitive data | Generic shields, locks, and “enterprise-grade security” claims |
| Semantic HTML, keyboard access, contrast, reduced motion | Broadens access and signals implementation quality | Scroll hijacking, cursor effects, autoplay, and motion-heavy reveals |
| Fast static delivery and restrained assets | Works on low-power/mobile devices and GitHub Pages | WebGL/particle backgrounds, heavy frameworks, and gratuitous dependencies |
| Conventional, selectable resume text | Human- and ATS-readable | Skill bars, star ratings, multi-column reading traps, and icon-only contact data |
| Explicit project classification and current status | Prevents prototypes from reading as production work | “Founder” or thought-leader framing unsupported by evidence |

## Adopted patterns

1. **Evidence-first opening.** Name target Data Engineering focus, location, and a short supported value statement. Follow with selected proof, not a broad biography.
2. **Selective case-study stack.** Use few strong cases. Structure each as classification, problem, constraints, architecture, contribution, validation, outcome, and evidence links.
3. **Operational detail strip.** Where evidenced, surface data mode, orchestration, storage/model, quality checks, observability, deployment, privacy boundary, and recovery approach.
4. **Purposeful architecture.** Use compact C4-like context/container or lineage views only where they improve understanding. Pair every visual with readable prose.
5. **Agentic work as data-system work.** Explain retrieval/data flow, tool contracts, state, evaluation, permission boundaries, and failure handling. Keep Data Engineering identity primary.
6. **Resume consistency.** Reuse one evidence-backed chronology and terminology across website, PDF, ATS text, GitHub, and LinkedIn drafts.
7. **Progressive disclosure.** Make role, outcomes, and decisions skimmable first; keep implementation detail available without hiding essential evidence behind interaction.
8. **Static, accessible implementation.** Semantic HTML, visible focus, reduced-motion handling, responsive layout, limited JavaScript, local optimised assets, and explicit dimensions.
9. **Truthful links and status.** Link repository, documentation, demo, or resume directly. Mark private/confidential, prototype, archived, planned, or unavailable rather than implying access or adoption.

## Rejected patterns

- Generic neon “AI engineer” branding, robot imagery, brain graphics, gradient mesh overload, and copied dashboard aesthetics.
- Prohibited target titles or branding that displaces Senior Data Engineer/Data Platform Engineer positioning.
- Framework-first hero copy listing CrewAI, LangGraph, OpenClaw, n8n, or other tools without evidenced system contribution.
- Chat widget, fake terminal, typing animation, particle canvas, 3D globe, scroll hijacking, horizontal project carousels, and hover-only disclosure.
- Skill percentages, star ratings, years-per-tool counters, contribution-graph decoration, vanity GitHub statistics, and unsupported numerical counters.
- Fabricated architecture, employer-confidential implementation detail, personal financial records, real customer data, private endpoints, secrets, and security claims that could aid misuse.
- Fake testimonials, client logos without permission, “trusted by” strips, copied portfolio sections, and unverified press or award claims.
- Resume photo, age, marital status, full street address, icon-only links, decorative charts, text embedded in images, and layouts that break PDF extraction order.
- Keyword stuffing or wholesale reuse of employer language. Market terms enter copy only when candidate evidence proves them and natural context makes them useful.
- Scores or badges presented without a reproducible date, tool, conditions, and artefact. Validation belongs in reports, not self-congratulating decoration.

## Original visual and content direction

Working concept: **an operational field notebook for data platforms**. This is a new synthesis, not a replica of a researched site.

- **Tone:** calm, exact, engineering-led. Short declarative copy; no inflated thought leadership.
- **Visual language:** high-contrast light canvas, deep ink/navy structure, and one restrained signal colour. Fine rules, monospace metadata labels, and readable text typography suggest runbooks and system records without pretending the site is a terminal.
- **Information architecture:** identity and target focus; selected engineering evidence; professional trajectory; case studies; operating principles; concise skill context; contact and repository-hosted resume.
- **Case-study surface:** classification and status first, then problem/constraint/decision/validation. Architecture uses accessible HTML/CSS or a lightweight labelled SVG with adjacent text.
- **Interaction:** ordinary links and in-page navigation, optional small details disclosures, no essential content gated by animation or hover. Motion limited to subtle state changes and removed under reduced-motion preference.
- **Mobile behaviour:** single reading column, no sideways diagrams or tables without a readable alternative, generous targets, stable header/navigation, and no horizontal overflow.
- **Performance posture:** static HTML/CSS, minimal deferred JavaScript, system or locally hosted fonts, responsive compressed images, and no third-party runtime widgets.

## Content prioritisation from research

Subject to candidate evidence, later units should prioritise:

1. End-to-end pipeline and data-platform contribution.
2. Modelling, orchestration, quality, reliability, and operations.
3. Cloud/IaC/CI/CD decisions in context.
4. Cross-functional requirements translation and senior engineering judgement.
5. Governance, privacy, and secure data handling where safely publishable.
6. Financial, manufacturing/robotics, or LLM/agentic domains as supported specialisations—not substitutes for core Data Engineering evidence.

Anything missing evidence becomes an operator question, not polished copy.
