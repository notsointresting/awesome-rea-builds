# REA research, prompts and learning resources

> **Scope:** These are curated external resources for learning, investigating and discovering REA cases. **They are not additional verified builds**, and they do not change the 44-case count. External tool, prompt, training and research links may have independent dependencies, licenses and risks. This directory was source-reviewed on **2026-11-11**; linked projects were not independently installed or tested.

## Source collections and credits

- **[REA Investigation Prompts (REAP)](https://github.com/JoasASantos/REA-Prompts)** — Copy-ready task-focused prompts and agent skills, including evidence-first feature tracing and clean-room reconstruction.
- **[Awesome-REA](https://github.com/reacher-z/Awesome-REA)** — Broad REA and reverse-engineering discovery portal with cases, tools, papers and an API. Its large index is not the same as verified builds.
- **[Awesome Reverse Engineering](https://github.com/morluto/awesome-reverse-engineering)** — General-purpose reverse-engineering tools and learning materials from the REA creator. Most entries are not REA projects.
- **[Awesome Reverse Engineer Anything](https://github.com/AIshihzong/awesome-reverse-engineer-anything)** — REA vs other AI-reversing attribution checks, compatible projects, and a weekly digest. Assess claims against their primary sources.

These four repositories are credited as discovery and learning sources. Individual linked tools retain their respective authorship and licenses. We link to source pages rather than mirroring prompt libraries, README contents or scraped datasets.

## Curated links

### Workflows & prompts

- **[Start safely with REA](https://github.com/JoasASantos/REA-Prompts#0-install--verify)** — Installation/verification prompt; review the setup plan before changing an agent's configuration. *[REA-specific; via JoasASantos/REA-Prompts]*
- **[Trace one feature with evidence](https://github.com/JoasASantos/REA-Prompts#2-feature-tracing-any-program)** — Find entry points, data flow and observable effects while separating facts from hypotheses. *[REA-specific; via JoasASantos/REA-Prompts]*
- **[Investigate native binaries](https://github.com/JoasASantos/REA-Prompts#3-native-binary-exploration)** — Prompts for executable triage and function-level research; start with static analysis. *[REA-specific; via JoasASantos/REA-Prompts]*
- **[Specify clean-room reconstructions](https://github.com/JoasASantos/REA-Prompts#4-software--feature-cloning)** — Write behavior specifications without redistributing proprietary code or assets. *[REA-specific; via JoasASantos/REA-Prompts]*
- **[Plan a game-to-WASM port](https://github.com/JoasASantos/REA-Prompts#6-game-portability-to-wasm)** — Prompts to separate a game's platform dependencies, simulation and browser porting tasks. *[REA-specific; via JoasASantos/REA-Prompts]*
- **[Inspect Electron and JavaScript behavior](https://github.com/JoasASantos/REA-Prompts#11-electron--javascript)** — Workflow ideas for inspecting app bundles, preload bridges and UI feature behavior. *[REA-specific; via JoasASantos/REA-Prompts]*
- **[Evidence-first prompt-writing tips](https://github.com/JoasASantos/REA-Prompts#prompt-writing-tips-why-these-work)** — How to narrow a hypothesis, request reproducible evidence and keep unknowns visible. *[REA-specific; via JoasASantos/REA-Prompts]*

### Discovery & evaluation

- **[Awesome-REA case explorer](https://awesomerea.org/cases/)** — Broad searchable catalog of reverse-engineering cases; apply this atlas's inclusion rules before adding candidates. *[Broader RE ecosystem; via reacher-z/Awesome-REA]*
- **[Awesome-REA resource index](https://awesomerea.org/resources/)** — Cross-domain tools, protocols, websites, games, binary and firmware resources. *[Broader RE ecosystem; via reacher-z/Awesome-REA]*
- **[Awesome-REA papers](https://awesomerea.org/papers/)** — Research-paper discovery index; papers are supporting references, not build passports. *[Broader RE ecosystem; via reacher-z/Awesome-REA]*
- **[Did it really use REA?](https://github.com/AIshihzong/awesome-reverse-engineer-anything/blob/main/docs/is-it-rea.md)** — Case-by-case attribution checks distinguishing direct REA use from other AI-assisted reversing. *[REA-specific; via AIshihzong/awesome-reverse-engineer-anything]*
- **[Reimplementations organized by target app](https://github.com/AIshihzong/awesome-reverse-engineer-anything/blob/main/docs/by-app.md)** — Find alternatives by the application they replace; verify tool attribution separately. *[Broader RE ecosystem; via AIshihzong/awesome-reverse-engineer-anything]*
- **[New REA and AI-reversing cases](https://github.com/AIshihzong/awesome-reverse-engineer-anything/blob/main/docs/new-this-week.md)** — A dated discovery feed; new entries are candidates, not automatic additions. *[Broader RE ecosystem; via AIshihzong/awesome-reverse-engineer-anything]*
- **[What is REA?](https://github.com/AIshihzong/awesome-reverse-engineer-anything/blob/main/docs/what-is-rea.md)** — Background FAQ, terminology and distinctions between REA and other agent-assisted approaches. *[REA-specific; via AIshihzong/awesome-reverse-engineer-anything]*

### Tools & foundations

- **[Ghidra](https://github.com/NationalSecurityAgency/ghidra)** — Decompilation, disassembly and headless native binary analysis. A standalone tool, not itself an REA implementation. *[General reverse engineering; via morluto/awesome-reverse-engineering]*
- **[Cutter](https://github.com/rizinorg/cutter)** — Open-source graphical reverse-engineering environment based on Rizin. *[General reverse engineering; via morluto/awesome-reverse-engineering]*
- **[JADX](https://github.com/skylot/jadx)** — Decompile and inspect Android APK and DEX files; behavior recovery still needs validation. *[General reverse engineering; via morluto/awesome-reverse-engineering]*
- **[Frida](https://github.com/frida/frida)** — Dynamic instrumentation and call tracing for authorized targets. *[General reverse engineering; via morluto/awesome-reverse-engineering]*
- **[Detect It Easy](https://github.com/horsicq/Detect-It-Easy)** — Executable format, compiler and packer identification before deeper analysis. *[General reverse engineering; via morluto/awesome-reverse-engineering]*
- **[radare2](https://github.com/radareorg/radare2)** — Command-line binary analysis and debugging toolkit with scripting support. *[General reverse engineering; via morluto/awesome-reverse-engineering]*

### Learning & practice

- **[OpenSecurityTraining2](https://ost2.fyi/)** — Training in assembly, architecture, debugging and fundamental reverse engineering. *[General reverse engineering; via morluto/awesome-reverse-engineering]*
- **[pwn.college](https://pwn.college/)** — Browser-accessible security and reversing challenges, with appropriate authorized lab targets. *[General reverse engineering; via morluto/awesome-reverse-engineering]*
- **[Reverse Engineering for Beginners](https://beginners.re/)** — Free book connecting C/C++ source, compiler output and assembly across architectures. *[General reverse engineering; via morluto/awesome-reverse-engineering]*

## Inclusion and verification boundaries

- **Build Passports** belong in `data/builds.json` only when direct evidence supports a concrete REA-assisted build or bounded study.
- **Resources** belong in `data/resources.json`: tutorials, toolchains, prompts, directories, papers and attribution checks are not standalone build evidence.
- General-purpose reverse-engineering tools such as Ghidra or JADX are *not* automatically REA-powered.
- A project appearing in a third-party directory is a discovery lead, **not independent verification**. Check the project README, code, release artifacts and direct REA evidence before promoting it.
- Research software only where you have the right or authorization to do so; avoid copying proprietary code, trademarks, protected data or assets.
- Report stale links, attribution errors or exclusion concerns with primary-source citations via an issue or PR.

## Contribute

Propose a resource with its URL, category, why it helps, original source and limitations. For implementation submissions, use [CONTRIBUTING.md](../CONTRIBUTING.md) instead.
