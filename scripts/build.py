#!/usr/bin/env python3
"""Build the self-contained static GitHub Pages site from source and catalog."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "website" / "src"
DATA = ROOT / "data" / "builds.json"
DIST = ROOT / "dist"

def build():
    projects = json.loads(DATA.read_text(encoding="utf-8"))
    assert isinstance(projects, list) and len(projects) == 44, "Expected 44 case records"
    ids = [p["id"] for p in projects]
    assert len(ids) == len(set(ids)), "Duplicate project ID"
    kinds = {"Reconstructed application", "Interoperability implementation", "Tool built for REA", "Official case study", "Research & analysis", "Learning material"}
    required = {"id", "name", "repo", "evidence", "kind", "category", "reviewed", "execution", "limitations"}
    for p in projects:
        assert required <= p.keys(), f"Incomplete case: {p.get('id')}"
        assert p["kind"] in kinds, f"Unknown case kind: {p['kind']}"
        assert p["repo"].startswith("https://") and p["evidence"].startswith("https://")
        assert p["execution"] != "Independently reproduced", "No independent reproductions in this snapshot"
    resource_data = json.loads((DATA.parent / "resources.json").read_text(encoding="utf-8"))
    resource_records = resource_data["resources"]
    assert len(resource_records) > 0 and len({r["id"] for r in resource_records}) == len(resource_records), "Invalid resource records"
    assert all(r["url"].startswith("https://") for r in resource_records), "Resource links must be HTTPS"
    template = (SRC / "index.template.html").read_text(encoding="utf-8")
    css = (SRC / "styles.css").read_text(encoding="utf-8")
    js = (SRC / "app.js").read_text(encoding="utf-8")
    payload = json.dumps(projects, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    resource_payload = json.dumps(resource_data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    output = template.replace("/* INLINE_STYLES */", css).replace("/* INLINE_DATA */", payload).replace("/* INLINE_RESOURCES */", resource_payload).replace("/* INLINE_APP */", js)
    assert "/* INLINE_" not in output
    DIST.mkdir(exist_ok=True)
    (DIST / "index.html").write_text(output, encoding="utf-8")
    (DIST / ".nojekyll").touch()
    print(f"Built {len(projects)} cases + {len(resource_records)} resources into dist/index.html ({len(output)} characters)")

if __name__ == "__main__":
    build()
