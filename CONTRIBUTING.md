# Contributing a real REA build

Thanks for improving a carefully labeled collection of implementations, studies, research and integrations. We reject fabricated examples and unsupported claims.

## What qualifies?

A public implementation, study, REA integration or documented experiment where the relationship to REA is traceable. For actual Build Passports, we require a meaningful published implementation. Examples: a native program reconstructed after REA-assisted binary analysis, a game rebuilt with analyzed mechanics, an interoperability client derived from documented protocol research, or a clearly labeled tool integrating with REA.

## Submission checklist

- [ ] Direct repository link and project title
- [ ] Clear proof of REA involvement (maintainer docs, source, commands or analysis notes)
- [ ] Actual output or evidence; classify notes and official showcases as cases, **not** finished builds
- [ ] Original subject and independently implemented scope explained
- [ ] Platforms, language and run steps described without inventing tests
- [ ] Known limitations included
- [ ] License, redistribution, trademark and sensitive-data risks considered
- [ ] No secrets, copyrighted assets or third-party binaries added to this catalog
- [ ] `python scripts/build.py` passes validation

## How to contribute

Edit [`data/builds.json`](data/builds.json) with a unique `id`, adhering to existing objects. Keep notes short but concrete and avoid promotional claims. New records should use `featured: false` until editorial review. Never claim independent replication without a pinned run report. Your contribution should cite an upstream URL (not another directory's summary).

For a more substantial case study, add Markdown under `docs/` with:

1. Target and REA tool version.
2. Exact source/provenance and authorized inputs.
3. Commands and analysis observations.
4. Independent implementation decisions and documented outputs.
5. Failure conditions, known gaps and legal notes.

## Conduct and safety

Respect upstream maintainers and applicable laws. Do not submit stolen assets, unauthorized access instructions, malware, private credentials or confidential application dumps. We support lawful interoperability, preservation and security education. Project inclusion is not a security endorsement.

## Reviewer checklist

- Match evidence to actual claim (e.g. README says “REA used” vs proof of full execution).
- Do not upgrade execution status without a reproducible test report.
- Verify that `repo` and `evidence` refer to relevant, accessible sources.
- Confirm tool integrations, learning materials, official showcases and research are classified separately from reconstructed apps.
- Confirm no third-party code or media were copied into this repository.