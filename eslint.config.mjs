import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // react-three-fiber's useFrame chạy trong render-loop riêng của R3F (không
    // phải render phase của React) — mutate trực tiếp camera/mesh/ref bên
    // trong đó là pattern chuẩn, được khuyến nghị bởi chính R3F để đạt 60fps
    // (đi qua setState mỗi frame sẽ chậm không dùng được). react-hooks/immutability
    // và react-hooks/refs chưa nhận diện được useFrame nên báo false-positive
    // ở đúng những chỗ intentional này — tắt riêng cho 2 file R3F, không ảnh
    // hưởng phần còn lại của project.
    files: [
      "src/components/intro/intro-scene.tsx",
      "src/components/intro/intro-background.tsx",
    ],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
    },
  },
]);

export default eslintConfig;
