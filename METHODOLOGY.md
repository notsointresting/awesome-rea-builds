# Editorial methodology — Awesome REA Builds

**Snapshot:** 2026-11-11. **Coverage:** 44 public REA cases, not 44 independently reproduced applications.

## Case types

- **Reconstructed application**: an independent desktop/web/game implementation with public code, not necessarily equivalent to the original.
- **Interoperability implementation**: an unofficial client, driver, helper, or compatibility layer. Device-specific functionality may need additional hardware to check.
- **Tool built for REA**: a service, UI, harness, or agent integration that calls REA; it is *not* necessarily a reverse-engineered product.
- **Official case study**: an upstream showcase investigating a bounded function/feature, not necessarily an entire recreated application.
- **Research & analysis**: notes, measurements, teardowns, exercises or partial prototypes; these are not described as finished apps.
- **Learning material**: training fixtures and implementation walkthroughs.

## Evidence dimensions — never merge them

1. **Attribution**: Does a named primary source document REA's actual role? Attribution can be a maintainer statement, a checked-in REA command, a case-study source, or an externally indexed Discussion. A reference to REA alone is not a claim that REA performed all implementation work.
2. **Artifact**: What was actually published—full source, partial source, a release, a demo, a technical walkthrough or a case study? A screenshot and a case study are not full applications.
3. **Execution**: Did the original author claim tests? Have *we* independently built/tested it? Nothing here currently carries our independent reproduction claim. An independently reproduced label requires a pinned upstream SHA, environment, commands and recorded observed outputs.

## November 11, 2026 source-audit results

- **44** distinct cases from the previously researched ecosystem list; **42** linked sources were fetchable via the connected GitHub read integration, **2** GitHub Discussions were not retrievable through our tools.
- The two community-discussion items have `evidenceType: Discussion link not retrieved` and remain explicitly tentative.
- A working URL is only a provenance link, not a security assessment or proof of reproduction. Where primary-source docs state REA usage, it remains an *author attribution* unless independent analysis is recorded.
- See [SOURCE_AUDIT.md](docs/SOURCE_AUDIT.md) for source and classification details.

## Rules for adding records

Each record must have a unique `id`, project or case URL, public evidence URL, exact target and claimed scope, concise limitations, review date, kind, platforms and languages (or `Not confirmed` / `Unknown`), and execution status. Include attribution nuance (REA tool run vs merely citing REA) in `evidenceNote`.

We exclude unsupported product claims, private exploits, stolen binary distributions, proprietary assets, arbitrary vulnerability claims and fabricated measurements. Contributors must respect software licenses and authorization. External code and user-submitted JSON are untrusted.

## Review and reproduction process

1. Inspect the primary README, file-level notes, commit or evidence artifact; record its precise URL.
2. Identify the target and whether REA materially aided the investigation or was only credited as a reference.
3. Separate finished applications from experiments, guides, showcase snippets and integrations.
4. Verify what source/demo artifacts exist without guessing platform support.
5. Run any reproduction test only in an isolated environment with authorized inputs and no secrets; save pinned SHA, commands and expected/observed results.
6. Recheck sensitive attribution and third-party assets before publishing media or downloadable binaries.
7. Mark corrections and outdated claims in PRs, with clear dates.

## Corrections

Maintainers can request updates or removals through issues and pull requests. Unproven claims are downgraded, not silently promoted.