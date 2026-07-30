import sharp from "sharp";

const input = "public/images/intro/intro-fork-loader-v3.png";
const output = "public/images/intro/fork-real-transparent-v1.png";

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let index = 0; index < data.length; index += 4) {
  const luminance =
    data[index] * 0.2126 + data[index + 1] * 0.7152 + data[index + 2] * 0.0722;
  data[index + 3] = Math.max(0, Math.min(255, (210 - luminance) * 25));
}

await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
})
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({
    top: 24,
    right: 24,
    bottom: 24,
    left: 24,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(output);
