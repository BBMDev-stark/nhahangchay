import os
from PIL import Image, ImageDraw, ImageFont

BASE = "/home/claude/restaurant-luxury/public/images"

PALETTE = [
    ("#1F5133", "#F7F6F2"),  # green bg, cream text
    ("#0F1611", "#B08D57"),  # dark bg, gold text
    ("#2E6B46", "#FFFFFF"),
    ("#B08D57", "#0F1611"),
    ("#F7F6F2", "#1F5133"),
]

def make_image(path, label, size=(1200, 1500), idx=0):
    bg, fg = PALETTE[idx % len(PALETTE)]
    img = Image.new("RGB", size, bg)
    draw = ImageDraw.Draw(img)

    # subtle diagonal texture lines
    step = max(size) // 14
    line_color = tuple(min(255, c + 12) if bg != "#F7F6F2" else max(0, c - 8)
                        for c in Image.new("RGB", (1, 1), bg).getpixel((0, 0)))
    for x in range(-size[1], size[0], step):
        draw.line([(x, 0), (x + size[1], size[1])], fill=line_color, width=1)

    # center label
    try:
        font = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", size=int(size[0] * 0.045)
        )
        font_small = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", size=int(size[0] * 0.022)
        )
    except Exception:
        font = ImageFont.load_default()
        font_small = font

    text = label.upper()
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((size[0] - tw) / 2, (size[1] - th) / 2 - 10), text, fill=fg, font=font)

    sub = "LOTUS & EARTH"
    bbox2 = draw.textbbox((0, 0), sub, font=font_small)
    tw2, th2 = bbox2[2] - bbox2[0], bbox2[3] - bbox2[1]
    draw.text(((size[0] - tw2) / 2, (size[1] - th2) / 2 + th + 20), sub, fill=fg, font=font_small)

    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "JPEG", quality=78)

count = 0

# Dishes (30)
for i in range(1, 31):
    make_image(f"{BASE}/dishes/dish-{i:02d}.jpg", f"Dish {i:02d}", (1000, 1000), i)
    count += 1

# Gallery space (20)
for i in range(1, 21):
    h = 1500 if i % 3 == 0 else 900
    make_image(f"{BASE}/gallery/space-{i:02d}.jpg", f"Space {i:02d}", (1200, h), i)
    count += 1

# Gallery ingredients (10)
for i in range(1, 11):
    make_image(f"{BASE}/gallery/ingredient-{i:02d}.jpg", f"Ingredient {i:02d}", (900, 700), i)
    count += 1

# Team avatars (12 generic + 10 chef-specific)
for i in range(1, 13):
    make_image(f"{BASE}/team/avatar-{i}.jpg", f"Guest {i}", (600, 600), i)
    count += 1
for i in range(1, 11):
    make_image(f"{BASE}/team/chef-{i:02d}.jpg", f"Chef {i:02d}", (700, 700), i)
    count += 1

# Hero / special images
HERO_NAMES = [
    "hero-main", "brand-story", "dining-experience", "reservation",
    "about-story", "about-vision", "menu-header", "gallery-header",
    "contact-header", "og-cover",
]
for i, name in enumerate(HERO_NAMES, start=1):
    size = (1920, 1080) if name != "og-cover" else (1200, 630)
    make_image(f"{BASE}/hero/{name}.jpg", name.replace('-', ' '), size, i)
    count += 1

print("Generated", count, "placeholder images")
