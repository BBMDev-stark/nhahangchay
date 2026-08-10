from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "public" / "images" / "signature-dishes"

ASSETS = (
    "com-cung-dinh",
    "vit-hoang-kim-banh-bao",
    "banh-xeo-nam-thap-cam",
    "nam-bao-ngu-dut-lo",
    "goi-hoang-cung",
    "met-banh-que",
    "che-sen-long-nhan",
)

# Match the original Signature Dishes photography: every transparent dish used
# a 1536 x 1024 canvas and occupied an almost identical, slightly flattened
# 2.5D presentation area.  Keeping this geometry in the assets (rather than
# special-casing individual cards in CSS) makes the carousel visually stable.
CANVAS_SIZE = (1536, 1024)
SUBJECT_SIZE = (1260, 820)
SUBJECT_ORIGIN = (138, 95)


def connected_dark_background(rgb: np.ndarray) -> np.ndarray:
    """Return only dark pixels connected to the canvas edge.

    This preserves every pixel inside the plate/tray silhouette, including dark
    food and shadows, while removing the photographed black backdrop.
    """

    luminance = (
        rgb[..., 0].astype(np.float32) * 0.2126
        + rgb[..., 1].astype(np.float32) * 0.7152
        + rgb[..., 2].astype(np.float32) * 0.0722
    )
    border = np.concatenate((luminance[0], luminance[-1], luminance[:, 0], luminance[:, -1]))
    threshold = min(72.0, max(28.0, float(np.percentile(border, 98)) + 16.0))
    removable = luminance <= threshold

    height, width = removable.shape
    visited = np.zeros((height, width), dtype=np.bool_)
    queue: deque[tuple[int, int]] = deque()

    def seed(y: int, x: int) -> None:
        if removable[y, x] and not visited[y, x]:
            visited[y, x] = True
            queue.append((y, x))

    for x in range(width):
        seed(0, x)
        seed(height - 1, x)
    for y in range(height):
        seed(y, 0)
        seed(y, width - 1)

    while queue:
        y, x = queue.popleft()
        if y > 0:
            seed(y - 1, x)
        if y + 1 < height:
            seed(y + 1, x)
        if x > 0:
            seed(y, x - 1)
        if x + 1 < width:
            seed(y, x + 1)

    return visited


def process(stem: str) -> None:
    source_path = ASSET_DIR / f"{stem}.png"
    output_path = ASSET_DIR / f"{stem}-cutout.png"
    source = Image.open(source_path).convert("RGB")
    rgb = np.asarray(source)
    background = connected_dark_background(rgb)

    hard_alpha = np.where(background, 0, 255).astype(np.uint8)
    alpha = Image.fromarray(hard_alpha, mode="L").filter(ImageFilter.GaussianBlur(radius=1.15))

    rgba = source.convert("RGBA")
    rgba.putalpha(alpha)

    bbox = alpha.getbbox()
    if bbox is None:
        raise RuntimeError(f"No foreground detected in {source_path}")

    subject = rgba.crop(bbox).resize(SUBJECT_SIZE, Image.Resampling.LANCZOS)
    normalized = Image.new("RGBA", CANVAS_SIZE, (0, 0, 0, 0))
    normalized.alpha_composite(subject, dest=SUBJECT_ORIGIN)
    normalized.save(output_path, optimize=True)
    print(f"created {output_path.relative_to(ROOT)}")


if __name__ == "__main__":
    for asset in ASSETS:
        process(asset)
