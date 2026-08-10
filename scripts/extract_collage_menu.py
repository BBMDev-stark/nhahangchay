"""Extract the real dish photographs from the four Hương Sen collage sheets.

The crop coordinates are stored in the 1536 x 1664 reference space used by the
provided layouts, then scaled to the source file's actual resolution.  Output is
standardised for the website without synthesising or replacing any food.
"""

from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "generated" / "menu-collage"
OUT.mkdir(parents=True, exist_ok=True)

SOURCES = [
    Path(r"C:\Users\binhb\AppData\Local\Temp\codex-clipboard-a8d5ac02-4815-4e05-9b67-d66bbe4290fd.png"),
    Path(r"C:\Users\binhb\AppData\Local\Temp\codex-clipboard-ef8b0fc6-dae7-431c-b267-0b5328ee0114.png"),
    Path(r"C:\Users\binhb\AppData\Local\Temp\codex-clipboard-422e836c-596d-4032-bb7f-fbe9de2d5d8d.png"),
    Path(r"C:\Users\binhb\AppData\Local\Temp\codex-clipboard-82f867ab-b272-4dc6-a494-d58bf3b944c9.png"),
]

# (source index, filename, crop in the 1536 x 1664 reference coordinate space)
CROPS = [
    # Sheet 1
    (0, "com-cung-dinh-goi-la-sen", (52, 430, 468, 900)),
    (0, "com-chien-trai-thom", (498, 247, 714, 510)),
    (0, "banh-it-tran", (724, 247, 941, 510)),
    (0, "nam-bao-ngu-dut-lo", (951, 247, 1168, 510)),
    (0, "banh-hoi-la-lot", (1178, 247, 1395, 510)),
    (0, "goi-cuon", (498, 639, 714, 855)),
    (0, "vit-hoang-kim-banh-bao", (724, 639, 941, 855)),
    (0, "banh-hoi-nem-nuong", (951, 639, 1168, 855)),
    (0, "vit-hoang-kim-xoi", (1178, 639, 1395, 855)),
    (0, "goi-hoang-cung", (40, 1034, 258, 1315)),
    (0, "lau-nam-moi", (270, 1034, 714, 1315)),
    (0, "dau-nau-tieu-xanh-banh-mi", (724, 1034, 941, 1315)),
    (0, "bong-cai-xao-nam", (951, 1034, 1168, 1315)),
    (0, "che-hat-sen-long-nhan", (1178, 1034, 1395, 1315)),
    # Sheet 2
    (1, "goi-huong-sen", (130, 420, 535, 950)),
    (1, "salad-rau-cu", (565, 246, 781, 482)),
    (1, "cha-gio", (790, 246, 1008, 482)),
    (1, "banh-xeo-nam-moi", (1018, 246, 1235, 482)),
    (1, "nem-vuong", (1245, 246, 1462, 482)),
    (1, "sup-hat-sen", (565, 640, 781, 899)),
    (1, "com-nieu", (790, 640, 1008, 899)),
    (1, "bong-bi-xao-nam-moi", (1018, 640, 1235, 899)),
    (1, "canh-chua-bac-ha", (1245, 640, 1462, 899)),
    (1, "goi-rau-cau-nam-tuyet", (108, 1033, 327, 1276)),
    (1, "pizza-pho-mai", (337, 1033, 553, 1276)),
    (1, "pizza-rau-cu", (563, 1033, 781, 1276)),
    (1, "met-banh-que", (790, 1033, 1008, 1276)),
    (1, "banh-khot", (1018, 1033, 1235, 1276)),
    (1, "lau-mam", (1245, 1033, 1462, 1363)),
    # Sheet 3
    (2, "pasta-dut-lo", (150, 310, 525, 920)),
    (2, "banh-pho-cuon", (557, 246, 775, 484)),
    (2, "bo-cuon-pho-mai", (784, 246, 1001, 484)),
    (2, "mi-y-chua-cay", (1011, 246, 1228, 484)),
    (2, "goi-cu-hu-dua", (1238, 246, 1455, 484)),
    (2, "com-vit-hoang-kim", (557, 639, 775, 871)),
    (2, "canh-kho-qua-nhoi-dau", (784, 639, 1001, 871)),
    (2, "sup-toc-tien", (1011, 639, 1228, 871)),
    (2, "goi-mit-non-tron", (1238, 639, 1455, 871)),
    (2, "goi-chuoi-xanh", (101, 1033, 318, 1298)),
    (2, "sa-ke-lan-bot-chien", (328, 1033, 552, 1298)),
    (2, "com-ngu-sac", (560, 1033, 776, 1298)),
    (2, "che-ngu-qua", (784, 1033, 1001, 1298)),
    (2, "yaourt-hat-dac", (1011, 1033, 1228, 1298)),
    (2, "che-dau-van", (1238, 1033, 1455, 1298)),
    # Sheet 4
    (3, "mi-xao-gion", (45, 620, 490, 990)),
    (3, "ca-ri-nam-dau-hu", (503, 247, 720, 466)),
    (3, "mi-y-sot-ca", (729, 247, 946, 466)),
    (3, "com-ga-roti", (956, 247, 1173, 466)),
    (3, "canh-ga-chien-mam", (1183, 247, 1400, 466)),
    (3, "rau-xao-thap-cam", (503, 639, 720, 899)),
    (3, "banh-hoi-cha-gio", (729, 639, 946, 899)),
    (3, "mi-xao-thap-cam", (956, 639, 1173, 899)),
    (3, "mien-xao-thap-cam", (1183, 639, 1400, 899)),
    (3, "kho-qua-don-dau-kho", (275, 1034, 492, 1295)),
    (3, "nam-moi-kho-tieu-xanh", (502, 1034, 720, 1295)),
    (3, "bo-bia", (729, 1034, 946, 1295)),
    (3, "bi-cuon", (956, 1034, 1173, 1295)),
    (3, "lau-nam-thai", (1183, 1034, 1400, 1295)),
]


def scaled_box(image: Image.Image, box: tuple[int, int, int, int]) -> tuple[int, int, int, int]:
    sx, sy = image.width / 1536, image.height / 1664
    return tuple(round(value * (sx if i % 2 == 0 else sy)) for i, value in enumerate(box))


def polish(crop: Image.Image) -> Image.Image:
    # Remove the thin cream/brown separators belonging to the collage layout.
    crop = ImageOps.crop(crop, border=(5, 5, 5, 5))
    crop = ImageOps.fit(crop.convert("RGB"), (1200, 750), Image.Resampling.LANCZOS)
    crop = ImageEnhance.Contrast(crop).enhance(1.045)
    crop = ImageEnhance.Color(crop).enhance(1.03)
    crop = ImageEnhance.Brightness(crop).enhance(1.015)
    return crop.filter(ImageFilter.UnsharpMask(radius=1.25, percent=115, threshold=3))


def main() -> None:
    images = [Image.open(path) for path in SOURCES]
    try:
        for source_index, filename, box in CROPS:
            source = images[source_index]
            crop = source.crop(scaled_box(source, box))
            polish(crop).save(OUT / f"{filename}.webp", "WEBP", quality=91, method=6)
    finally:
        for image in images:
            image.close()
    print(f"Exported {len(CROPS)} real dish images to {OUT}")


if __name__ == "__main__":
    main()
