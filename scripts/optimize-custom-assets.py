"""Convert the raster-in-SVG hero assets into browser-friendly WebP files.

The source SVGs contain a grayscale PNG mask and a full-resolution RGB PNG.
They are not vector artwork, so serving the SVG makes the browser download and
decode the original 4K-6K PNG payloads. This script preserves the SVG mask and
placement while rasterizing at the SVG's declared output size.
"""

from __future__ import annotations

import argparse
import base64
import io
import re
from pathlib import Path

from PIL import Image


DEFAULT_ASSETS = ("12", "4", "7", "5", "321", "8")


def _attribute(svg_tag: str, name: str) -> float:
    match = re.search(rf'{name}="([0-9.]+)"', svg_tag)
    if not match:
        raise ValueError(f"Missing {name} in SVG tag")
    return float(match.group(1))


def render_asset(source: Path, destination: Path, quality: int) -> None:
    svg = source.read_text(encoding="utf-8")
    svg_tag = re.search(r"<svg[^>]+>", svg)
    if not svg_tag:
        raise ValueError(f"Invalid SVG: {source}")

    output_width = round(_attribute(svg_tag.group(0), "width"))
    output_height = round(_attribute(svg_tag.group(0), "height"))
    view_box = re.search(r'viewBox="([0-9. -]+)"', svg_tag.group(0))
    if not view_box:
        raise ValueError(f"Missing viewBox: {source}")
    _, _, view_width, view_height = map(float, view_box.group(1).split())

    payloads = re.findall(r'data:image/png;base64,([^"\']+)', svg)
    if len(payloads) != 2:
        raise ValueError(f"Expected mask and RGB payloads in {source}")

    mask = Image.open(io.BytesIO(base64.b64decode(payloads[0]))).convert("L")
    color = Image.open(io.BytesIO(base64.b64decode(payloads[1]))).convert("RGB")
    color.putalpha(mask)

    transforms = re.findall(r'transform="matrix\(([^)]+)\)"', svg)
    if not transforms:
        raise ValueError(f"Missing image transform in {source}")
    a, b, c, d, e, f = map(float, transforms[-1].split(","))
    if abs(b) > 1e-7 or abs(c) > 1e-7:
        raise ValueError(f"Unsupported rotated/skewed transform in {source}")

    scale_x = output_width / view_width
    scale_y = output_height / view_height
    rendered_width = max(1, round(color.width * a * scale_x))
    rendered_height = max(1, round(color.height * d * scale_y))
    rendered = color.resize((rendered_width, rendered_height), Image.Resampling.LANCZOS)

    has_opaque_white_background = bool(re.search(r'<rect[^>]+fill="#ffffff"', svg))
    background = (255, 255, 255, 255) if has_opaque_white_background else (0, 0, 0, 0)
    canvas = Image.new("RGBA", (output_width, output_height), background)
    position = (round(e * scale_x), round(f * scale_y))
    canvas.alpha_composite(rendered, position)

    destination.parent.mkdir(parents=True, exist_ok=True)
    if has_opaque_white_background:
        canvas = canvas.convert("RGB")
    canvas.save(destination, "WEBP", quality=quality, method=6)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("assets", nargs="*", default=DEFAULT_ASSETS)
    parser.add_argument("--quality", type=int, default=84)
    args = parser.parse_args()

    source_dir = Path("public/images/custom")
    output_dir = source_dir / "optimized"
    for name in args.assets:
        source = source_dir / f"{name}.svg"
        destination = output_dir / f"{name}.webp"
        render_asset(source, destination, args.quality)
        print(f"{source} -> {destination} ({destination.stat().st_size / 1024:.1f} KiB)")


if __name__ == "__main__":
    main()
