#!/usr/bin/env python3
"""Fetch PR TIMES company news and export it as JSON for the site."""

import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

SOURCE_URL = "https://prtimes.jp/main/html/searchrlp/company_id/44738"
API_BASE_URL = "https://prtimes.jp/api/company_content.php/companies/44738/press_releases"
PAGE_SIZE = 100
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "assets" / "data" / "prtimes-news.json"


def fetch_json(url: str) -> dict:
    request = Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; PegasusNewsBot/1.0)",
            "Accept": "application/json, text/plain, */*",
        },
    )

    with urlopen(request, timeout=30) as response:
        if response.status != 200:
            raise RuntimeError(f"Failed to fetch source page: HTTP {response.status}")
        return json.loads(response.read().decode("utf-8", errors="ignore"))


def fetch_items() -> list:
    items = []
    skip = 0

    while True:
        query = urlencode({"skip": skip, "limit": PAGE_SIZE})
        payload = fetch_json(f"{API_BASE_URL}?{query}")

        if payload.get("status") != 200:
            raise RuntimeError(f"API error: {payload.get('message')}")

        data = payload.get("data") or {}
        batch = data.get("data") or []

        if not batch:
            break

        for item in batch:
            title = (item.get("title") or "").strip()
            raw_url = (item.get("url") or "").strip()
            if not title or not raw_url:
                continue

            url = raw_url if raw_url.startswith("http") else f"https://prtimes.jp{raw_url}"
            date_value = (item.get("release_comple_date") or "").strip()
            date = date_value[:10] if date_value else ""
            items.append({"title_ja": title, "url": url, "date": date})

        if len(batch) < PAGE_SIZE:
            break

        skip += PAGE_SIZE

    return items


def main() -> int:
    items = fetch_items()

    if not items:
        raise RuntimeError("No news items found. Page structure may have changed.")

    payload = {
        "source": SOURCE_URL,
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "items": items,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"Updated {len(items)} items: {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # pragma: no cover
        print(exc, file=sys.stderr)
        raise SystemExit(1)
