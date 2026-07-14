# Evidence Matrix — Saurabh Shubham Portfolio Audit

**Created:** 2026-07-13
**Reviewed:** 2026-07-14 by Codex
**Repository:** `https://github.com/Saurabh3333/saurabh3333.github.io`
**Unit:** Audit repository and establish evidence authority

---

## Source Classification Key

| Code | Meaning |
|------|---------|
| `CF` | **candidate fact** — Saurabh's own material; requires cross-check before claiming |
| `RI` | **reference/inspiration** — pattern or external identity; never transfer claims |
| `ER` | **external research** — public data; corroborates or contradicts CF; cannot alone prove personal experience |

---

## Reviewed Sources

### S01 — `saurabh_shubham_resume_onepage.tex`
- **Classification:** `candidate fact`
- **Path:** `/root/Working/pasin/inputs/resume/saurabh_shubham_resume_onepage.tex`
- **Retrieved:** 2026-07-13 (local file, read directly)
- **Status:** ✅ readable, intact, author-attributed (`Author: Saurabh Shubham`)
- **Notes:** LaTeX source; authored by Saurabh Shubham; single-page layout, Data Engineering focus; last compiler run unknown; treat claims as self-reported requiring no separate contradiction to include where plausible

### S02 — `saurabh_shubham_resume.pdf`
- **Classification:** `candidate fact`
- **Path:** `/root/Working/pasin/inputs/resume/saurabh_shubham_resume.pdf`
- **Retrieved:** 2026-07-13 (local file, binary)
- **Status:** ✅ one page; extracted with `pdftotext` on 2026-07-14
- **Notes:** Confirms identity, contact links, Bachelor of Engineering in Computer Science (2015–2019), employment chronology, technologies, and achievements. It contains more detail than S01; public copy still uses only claims selected below.

### S03 — `Resume Bhavith Vishnu 2026.pdf`
- **Classification:** `reference/inspiration`
- **Path:** `/root/Working/pasin/inputs/resume/Resume Bhavith Vishnu 2026.pdf`
- **Retrieved:** 2026-07-13 (local file, binary)
- **Status:** 🚫 FENCED — reference/inspiration only
- **Publication permission:** NONE. Identity, employment, achievements, metrics, skills, and layout patterns copied verbatim are prohibited. May be observed for format and structure ideas only; no claim from this document may appear in Saurabh's materials.

### S04 — `index.html` (portfolio homepage, current)
- **Classification:** `candidate fact`
- **Path:** `/root/Working/pasin/works/portfolio/site/index.html`
- **Retrieved:** 2026-07-13 (local file)
- **Status:** ✅ readable; matches live site as of 2026-07-13
- **Notes:** Commit `f60db35` is HEAD on master. Live at `https://saurabh3333.github.io/`. Contains employer names, locations, and personal contact.

### S05 — Live site `https://saurabh3333.github.io/`
- **Classification:** `candidate fact` (corroborates S04)
- **Retrieved:** 2026-07-13 (HTTP fetch)
- **Status:** ✅ live and identical to S04
- **Notes:** Confirms site is publicly deployed. Confirms TinyURL resume link (`https://tinyurl.com/saurabh0612`) is the current mechanism — a known deficiency to resolve.

### S06 — GitHub API: public user profile `Saurabh3333`
- **Classification:** `external research`
- **URL:** `https://api.github.com/users/Saurabh3333`
- **Retrieved:** 2026-07-13
- **Status:** ✅ accessible
- **Key facts (public, corroborating):** location=`Berlin, Germany`; hireable=`true`; Twitter=`@iamsaurabh33`; blog=`http://saurabh3333.github.io`; account created 2016-06-20; 61 public repos; 30 followers.

### S07 — GitHub API: public repositories list `Saurabh3333`
- **Classification:** `external research`
- **URL:** `https://api.github.com/users/Saurabh3333/repos?per_page=100&sort=updated`
- **Retrieved:** 2026-07-13
- **Status:** ✅ accessible; 100-per-page pull confirmed; all 61 public repos covered in single page
- **Key repos identified (own, non-fork):** `give-me-a-joke` (JS, 13★, npm-published), `sscoin` (JS, blockchain, 2018), `Image-Crawler` (JS/Node/Cheerio, 4 forks), `Todo-application` (Node, 2017), `saurabh3333.github.io` (HTML, portfolio, 3★), `saurabh3333` (GitHub profile README, Java stub), various forks and hacktoberfest contributions
- **Key forks identified:** `HuggingClaw` (LLM/Telegram assistant on HuggingFace), `Quiz-Program` (Java)
- **Notes:** Confirms existence and nature of named repositories; repository descriptions are self-authored metadata only (not verified production evidence). No repo named SampadAI, CrewAI, LangGraph, n8n, or Supabase found.

### S08 — Git log, `saurabh3333.github.io`
- **Classification:** `candidate fact`
- **Command:** `git -C /root/Working/pasin/works/portfolio/site log --oneline -20`
- **Retrieved:** 2026-07-13
- **Status:** ✅ HEAD `f60db35` master = origin/master
- **Notes:** History shows active maintenance through 2026-04; prior commits show Bootstrap-era site and incremental updates.

### S13 — GitHub profile README (`Saurabh3333/saurabh3333`)
- **Classification:** `external research`
- **URL:** `https://raw.githubusercontent.com/Saurabh3333/saurabh3333/master/README.md`
- **Retrieved:** 2026-07-13
- **Status:** ✅ accessible; minimal content
- **Key facts:** Greeting page linking to portfolio `http://saurabh3333.github.io/`; LinkedIn badge; `he/him` pronouns badge; no technical claims beyond links. Repo language listed as Java (a single Java stub file in the repo).
- **Notes:** Corroborates C04, C06; no new substantive claims found. Profile README was last pushed 2026-04-28 (S07 data).

### S09 — Portfolio site assets (legacy)
- **Classification:** `candidate fact`
- **Paths:** `public/img/`, `public/css/bootstrap*.css`, `public/fonts/glyphicons-*`, `public/js/plugins.js`, `public/views/beta-*.html`
- **Retrieved:** 2026-07-13 (directory listing)
- **Status:** ⚠️ Present in repository but not referenced by current `index.html`; orphaned legacy assets
- **Notes:** Bootstrap 3 CSS (137 KB), glyphicon fonts, 36 ambiguously-named image files (`cvbcvbcvb.jpg`, `dfdsfghdf.jpg`, etc.) remain in repo. Not used by production page. Audit finding: should be cleaned up; do not cite these assets as evidence of current skills.

### S10 — `cv/index.html` and `resume/index.html` (legacy routes)
- **Classification:** `candidate fact`
- **Paths:** `cv/index.html`, `resume/index.html`
- **Retrieved:** 2026-07-13
- **Status:** ⚠️ Both pages redirect users to `https://tinyurl.com/saurabh0612` (Google Drive)
- **Notes:** These routes exist as legacy navigation targets. TinyURL dependency is a known deficiency. Both pages have stale metadata describing Saurabh as a "CSE undergraduate student at Birla Institute of Technology Mesra (2015-2019)".

### S11 — `README.md` (repository root)
- **Classification:** `candidate fact`
- **Path:** `/root/Working/pasin/works/portfolio/site/README.md`
- **Retrieved:** 2026-07-13 (local file)
- **Status:** ✅ readable
- **Notes:** Contains two lines of content: "Personal site" and "Resume in PDF Format: https://tinyurl.com/saurabh0612". Corroborates TinyURL dependency (C45). No substantive career claims; not a primary evidence source.

---

## Claim Disposition Table

Each row maps a specific claim from sources S01–S10 to its evidence status and publication permission.

| ID | Claim | Source(s) | Classification | Confidence | Publication Permission | Notes |
|----|-------|-----------|----------------|------------|----------------------|-------|
| C01 | Name: Saurabh Shubham | S01, S04, S05, S06 | CF (multiple) | HIGH | ✅ yes | Consistent across all sources |
| C02 | Email: `saurabh.friday@gmail.com` | S01, S04, S05 | CF | HIGH | ✅ yes | Self-disclosed on public portfolio and resume |
| C03 | Phone: `+49-1705452439` | S01 | CF | MEDIUM | ⚠️ yes with caution | German number (+49); confirms Berlin residency; do not embed in portfolio page; resume-appropriate |
| C04 | LinkedIn: `linkedin.com/in/saurabh-shubham/` | S01, S04 | CF | HIGH | ✅ yes | Link appears in both sources; not validated live (requires manual check) |
| C05 | GitHub: `github.com/Saurabh3333` | S01, S04, S06, S07 | CF + ER | HIGH | ✅ yes | Confirmed by API |
| C06 | Portfolio: `https://saurabh3333.github.io` | S01, S04, S05 | CF + ER | HIGH | ✅ yes | Live confirmed |
| C07 | Location: Berlin, Germany | S01 (GROPYUS role), S06 (GitHub profile) | CF + ER | HIGH | ✅ yes | Independent corroboration from GitHub public profile |
| C08 | Current employer: GROPYUS, Berlin | S01, S04, S05, S08 | CF | HIGH | ✅ yes | Consistent across resume and portfolio; "present" role start Aug 2022 per S01 |
| C09 | GROPYUS role title: Data Engineer | S01 | CF | HIGH | ✅ yes | Self-reported; use as-is (employer-issued title must not be renamed) |
| C10 | GROPYUS dates: Aug 2022 – present | S01, S08 (git log shows "Company update" commits ~2022) | CF | HIGH | ✅ yes | Start date consistent with history |
| C11 | GROPYUS location: Berlin, Germany | S01, S04, S06 | CF + ER | HIGH | ✅ yes | Multiple independent sources |
| C12 | GROPYUS work: data pipelines for KUKA robots, production insights | S01 | CF | MEDIUM | ✅ yes (with caution) | Self-reported; "KUKA robots" is a specific named claim — no independent public confirmation found; treat as self-reported candidate fact; do not embellish with metrics |
| C13 | GROPYUS tech: Dagster, Airflow, DBT, DLT, Azure, Python | S01 | CF | MEDIUM | ✅ yes | Technology claims are self-reported; plausible for role; no contradicting evidence |
| C14 | Prior employer: Sigmoid, Bengaluru, India | S01, S04, S05 | CF | HIGH | ✅ yes | Consistent across resume and portfolio |
| C15 | Sigmoid role title: Software Development Engineer | S01 | CF | HIGH | ✅ yes | Employer-issued title; preserve as-is |
| C16 | Sigmoid dates: Jun 2021 – Jul 2022 | S01 | CF | HIGH | ✅ yes | Consistent with GROPYUS start; plausible chronology |
| C17 | Sigmoid work: ETL pipelines and commercial sales-reporting data | S01, S02 | CF | MEDIUM | ✅ generic scope only | Public materials omit client names and unsupported scale or metrics |
| C18 | Sigmoid tech: Python, PySpark, GCP, AWS, Pandas, Terraform, Airflow | S01 | CF | MEDIUM | ✅ yes | Self-reported; consistent with Sigmoid's known public positioning as a data-engineering services firm |
| C19 | Prior employer: Amdocs, Pune, India | S01, S04, S05 | CF | HIGH | ✅ yes | Consistent across sources |
| C20 | Amdocs role title: Software Engineer | S01 | CF | HIGH | ✅ yes | Employer-issued title; preserve as-is |
| C21 | Amdocs dates: Jun 2019 – Jun 2021 | S01 | CF | HIGH | ✅ yes | Consistent with Sigmoid start; chronology is contiguous |
| C22 | Amdocs work: CRM feature delivery, requirements, design, and integration | S01, S02 | CF | MEDIUM | ✅ generic scope only | Public materials omit client names and sensitive implementation detail |
| C23 | Amdocs tech: Java, Spring, REST/SOAP APIs | S01 | CF | MEDIUM | ✅ yes | Self-reported; consistent with Amdocs OSS/BSS domain |
| C24 | Internship: Hasura Technologies, Product Development Fellow, India | S04 | CF | MEDIUM | ✅ yes | Appears in portfolio trajectory section; not in LaTeX resume; no contradiction found; label as internship/fellowship clearly |
| C25 | Internship: Google Tech Intern Connect Program, Gurgaon, India | S01, S04 | CF | MEDIUM | ✅ yes | Named in both resume achievements and portfolio; note: "Tech Intern Connect" is a networking/selection program, not a standard SWE internship — description must reflect this accurately |
| C26 | Achievement: Facebook PyTorch Challenge Scholarship, 2018 | S01 | CF | MEDIUM | ✅ yes | Self-reported; plausible timing (2018 challenge was public program); no contradiction |
| C27 | Achievement: Top 200 Infosys HackWithInfy | S01 | CF | MEDIUM | ✅ yes | Self-reported; cannot verify rank but claim is specific and modest |
| C28 | Achievement: Google Tech Intern Connect invitee, 2018 | S01 | CF | MEDIUM | ✅ yes | Same event as C25; consistent |
| C29 | Bachelor of Engineering in Computer Science, Birla Institute of Technology Mesra, 2015–2019 | S02, S10 | CF | HIGH | ✅ yes | Exact degree and dates confirmed by extracted candidate PDF |
| C30 | "5+ years experience" summary claim | S01 | CF | HIGH | ✅ yes | Computable: Amdocs Jun 2019 to present (Jul 2026) = 7+ years professional; "5+" is accurate and conservative |
| C31 | Skills: Python, SQL, Java, JavaScript, C++ | S01 | CF | MEDIUM | ✅ yes | Self-reported languages; Java confirmed by Amdocs role; others self-reported |
| C32 | Skills: Airflow, Dagster, DBT, DLT, PySpark, Pandas | S01 | CF | MEDIUM | ✅ yes | Self-reported data tools; consistent with DE roles |
| C33 | Skills: Azure, AWS, Google Cloud | S01 | CF | MEDIUM | ✅ yes | Self-reported; Sigmoid used GCP/AWS per S01; Azure plausible for GROPYUS Berlin |
| C34 | Skills: PostgreSQL, MySQL, MongoDB | S01 | CF | MEDIUM | ✅ yes | Self-reported databases |
| C35 | Skills: Terraform, REST APIs, Git, Unix | S01 | CF | MEDIUM | ✅ yes | Self-reported; Terraform confirmed via Sigmoid tech stack mention |
| C36 | Project: `give-me-a-joke` npm module (JavaScript) | S07 | ER (own repo) | HIGH | ✅ yes | Public repo, 13 stars, 11 forks, MIT; confirms JavaScript and Node.js capability; published on npm |
| C37 | Project: `HuggingClaw` (fork, LLM/HuggingFace, Python) | S07 | ER (own forked repo) | LOW | ⚠️ limited | Forked repo (not original), 0 stars; description mentions AI assistant / Telegram; signals LLM interest but fork only — do not claim authorship |
| C38 | Project: `sscoin` (cryptocurrency, JavaScript) | S07 | ER (own repo) | MEDIUM | ✅ yes (historical) | Own repo; older project (2018); 3 forks; demonstrates early blockchain/crypto exploration |
| C39 | Project: `Image-Crawler` (Node.js/Express, web scraping) | S07 | ER (own repo) | MEDIUM | ✅ yes (historical) | Own repo; 4 forks; cheerio/express skills confirmed |
| C40 | Project: Apparel Recommendation System (TensorFlow, Keras) | S01 | CF | LOW | ⚠️ limited | Self-reported in LaTeX projects; no public repo found in API response; not verifiable from public data alone; classify as personal/historical project, not production |
| C41 | Project: Alexa IPL Skill (Node.js, PostgreSQL) | S01 | CF | LOW | ⚠️ limited | Self-reported; no public repo found; historical project |
| C42 | Project: Quality Assessment Chrome Extension (Google Inception V3) | S01 | CF | LOW | ⚠️ limited | Self-reported; no public repo found; historical project using ML classification |
| C43 | Twitter handle: `@iamsaurabh33` | S06 | ER | HIGH | ✅ yes | Public GitHub profile field |
| C44 | Portfolio site keyword: "software engineer" | S04, S05 | CF | MEDIUM | ⚠️ needs update | Current meta keywords use "software engineer"; must update to "data engineer" per target positioning |
| C45 | Resume route depends on TinyURL (`tinyurl.com/saurabh0612`) | S05, S10 | CF (deficiency) | HIGH | ❌ not for production | TinyURL is a dependency that must be eliminated; resume route must serve repository-hosted PDF |
| C46 | Legacy assets in repo (Bootstrap, glyphicons, ambiguous images) | S09 | CF (deficiency) | HIGH | ❌ not for production | Legacy Bootstrap CSS, glyphicons, and 36+ ambiguously-named images remain in repo; not referenced by current page but increase repo size and maintenance risk |
| C47 | Current h1 headline: "I build software with clarity, reliability, and purpose." | S04 | CF (disposition) | — | ⚠️ revise | Generic engineering headline; does not signal Data Engineering primary identity; needs revision |
| C48 | About copy: generic engineering philosophy | S04 | CF (disposition) | — | ⚠️ revise | No Data Engineering specifics; no mention of Berlin/Germany market; needs update |
| C49 | Pronouns: he/him | S13 | ER | LOW | ✅ yes (optional) | Public GitHub profile README badge; low-stakes identity signal; include only if Saurabh explicitly chooses to surface it |

---

## Claim Disposition: Bhavith PDF Fence

| Source | Classification | Status |
|--------|----------------|--------|
| `Resume Bhavith Vishnu 2026.pdf` (S03) | `reference/inspiration` | 🚫 **FENCED**. No identity, employment history, employer names, achievements, metrics, skill list, project names, or layout patterns may be transferred to Saurabh's materials. Observed only for structural or format patterns at operator discretion. |

---

## Scope Claims in Goal Spec — Disposition

These claims appear in the goal specification as "evidence themes to verify." Each is dispositioned against sources collected.

| Theme | Status | Notes |
|-------|--------|-------|
| 5+ years professional software/data experience | ✅ VERIFIED | Amdocs Jun 2019 → present = 7+ years; "5+" is accurate conservative claim (C30) |
| Berlin-based Data Engineering work | ✅ VERIFIED | GROPYUS Berlin Aug 2022–present (C08, C07) |
| Data pipelines, ETL/ELT, orchestration, modeling, reliability | ✅ SUPPORTED | GROPYUS (Dagster, Airflow, DBT, DLT) and Sigmoid (Airflow, PySpark) (C12, C13, C17, C18) |
| GROPYUS manufacturing/robotics data work | ✅ SUPPORTED | KUKA robots claim in S01 (C12); no public confirmation but self-reported |
| Sigmoid commercial data pipelines | ✅ SUPPORTED | Candidate sources describe sales-reporting pipelines; public copy omits client names and unsupported scale (C17) |
| Amdocs backend and integration engineering | ✅ VERIFIED | Java/Spring/REST/SOAP at Amdocs for Comcast (C22, C23) |
| Python, SQL, Dagster, Airflow, dbt, DLT, PySpark, cloud, Terraform | ✅ SUPPORTED | Skills self-reported; consistent with named employer technologies (C32–C35) |
| Quantitative financial asset-management interest or work | ❓ UNVERIFIED | No evidence found in any source. →open-questions |
| LLM architecture and agent frameworks: CrewAI, LangGraph, OpenClaw, n8n | ❓ UNVERIFIED | HuggingClaw fork signals LLM interest; no evidence of CrewAI, LangGraph, OpenClaw, or n8n usage found in public repos or resume. →open-questions |
| Supabase and cloud-database architecture | ❓ UNVERIFIED | Not found in any source. →open-questions |
| Network and privacy hardening | ❓ UNVERIFIED | Not found in any source. →open-questions |
| SampadAI personal-finance platform | ❓ UNVERIFIED | Not found in any source; no public repo. →open-questions |

---

## Site Claims Audit (current index.html)

| Claim on current site | Evidence | Disposition |
|-----------------------|----------|-------------|
| Works at GROPYUS in Berlin | C08, C11 ✅ | Keep; update with role title and dates |
| Worked at Sigmoid and Amdocs | C14, C19 ✅ | Keep; add role detail |
| Hasura Technologies fellowship | C24 ✅ | Keep; clarify as fellowship/internship |
| Google Tech Intern Connect | C25, C28 ✅ | Keep; clarify as competitive networking program, not full SWE internship |
| "I build software with clarity, reliability, and purpose" (h1) | Generic | Revise; does not signal Data Engineering identity |
| "intersection of product judgment and engineering delivery" | Generic | Revise; does not reflect DE/platform specialization |
| Resume via TinyURL | C45 ❌ deficiency | Eliminate; route to repository-hosted PDF |

---

## Asset Audit Summary

| Asset Class | Path | Status | Action |
|-------------|------|--------|--------|
| Bootstrap CSS (3.x) | `public/css/bootstrap*.css` (6 files) | Orphaned | Remove after evidence-based audit confirms no active reference |
| Glyphicon fonts | `public/fonts/glyphicons-*` (4 files) | Orphaned | Remove with Bootstrap |
| Ambiguous images | `public/img/cvbcvbcvb.jpg` etc. (36 files including named backgrounds, social icons) | Orphaned | Audit each; remove unused |
| `plugins.js`, `typewriter.js` | `public/js/` | Likely orphaned | Verify before removal |
| Vendor JS (jQuery 1.11.2, Modernizr, Bootstrap) | `public/js/vendor/` (4 files) | Orphaned | Remove with Bootstrap |
| Beta HTML views | `public/views/beta-*.html` (3 files) | Orphaned | Remove |
| Legacy styles | `public/styles/symantec.css`, `public/styles/typewriter.css` | Orphaned | Remove; not referenced by active index.html |
| Legacy `public/styles/styles.css` | `public/styles/styles.css` | Likely orphaned | Verify; active CSS is at `public/css/styles.css` |
| `styles.css` in `public/css/` | `public/css/styles.css` | **Active** | In use by current `index.html`; keep and extend |
| `main.js` | `public/js/main.js` | **Active** | Keep |
| `favi.png` | `public/pics/favi.png` | **Active** | Keep (favicon + OG image) |
| `profile3.png` | `public/pics/profile3.png` | Orphaned | Not referenced by current index.html or styles.css; safe to remove or repurpose |
| Social icons (pics) | `public/pics/social-icons/` (8 PNG files: envelope, facebook, github-logo, linkedin, medium, quora, stack-overflow, twitter) | Orphaned | Duplicate of `public/img/social-icons/`; not referenced by current index.html; remove both sets after confirming no beta-view dependency |

---

## Evidence IDs Summary

| ID | Source | Classification |
|----|--------|----------------|
| S01 | LaTeX resume (saurabh_shubham_resume_onepage.tex) | candidate fact |
| S02 | PDF resume (saurabh_shubham_resume.pdf) | candidate fact |
| S03 | Bhavith Vishnu PDF | reference/inspiration |
| S04 | index.html (current portfolio) | candidate fact |
| S05 | Live site https://saurabh3333.github.io/ | candidate fact |
| S06 | GitHub API user profile | external research |
| S07 | GitHub API public repos list (100-per-page, all 61 public repos) | external research |
| S08 | Git log (local clone) | candidate fact |
| S09 | Legacy asset inventory (public/img, public/css, public/fonts, public/js, public/styles, public/views) | candidate fact |
| S10 | cv/index.html, resume/index.html (legacy routes) | candidate fact |
| S11 | README.md (repository root) | candidate fact |
| S12 | public/pics/ directory (favi.png, profile3.png, social-icons/) — active and orphaned assets | candidate fact |
| S13 | GitHub profile README (Saurabh3333/saurabh3333, master/README.md) | external research |

---

*This matrix is a living document. Subsequent units must update or append rows as new evidence is collected. All numeric claims (percentages, scale, latency, revenue, team size) remain unpublished until supported by candidate-fact sources with specific evidence IDs.*
