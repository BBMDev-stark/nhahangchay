from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OLD = sorted((ROOT / "public/generated/dishes").glob("*.webp"))
NEW = sorted((ROOT / "public/images/signature-dishes").glob("*-cutout.png"))
OUT = ROOT / "tmp/signature-assets-comparison.png"


def preview(path: Path, size: tuple[int, int]) -> Image.Image:
    image = Image.open(path).convert("RGBA")
    image.thumbnail(size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", size, "#f4efe5")
    canvas.paste(image, ((size[0] - image.width) // 2, (size[1] - image.height) // 2), image)
    return canvas


def main() -> None:
    width, height = 360, 260
    sheet = Image.new("RGB", (width * 7, height * 2), "white")
    draw = ImageDraw.Draw(sheet)
    for row, paths in enumerate((OLD, NEW)):
        for column, path in enumerate(paths[:7]):
            x, y = column * width, row * height
            sheet.paste(preview(path, (width, height - 28)), (x, y))
            draw.text((x + 8, y + height - 24), path.stem, fill="#163d2b")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(OUT)


if __name__ == "__main__":
    main()
