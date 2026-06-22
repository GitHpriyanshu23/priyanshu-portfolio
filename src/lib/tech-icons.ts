export const techIconMap: Record<string, string> = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  CSS: "css",
  HTML: "html5",
  Python: "python",
  React: "react",
  "Next.js": "nextdotjs",
  "Tailwind CSS": "tailwindcss",
  FastAPI: "fastapi",
  "Node.js": "nodedotjs",
  Git: "git",
  GitHub: "github",
  Docker: "docker",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  FAISS: "meta",
  Vercel: "vercel",
  Postman: "postman",
  Figma: "figma",
  LLMs: "huggingface",
  Agents: "langchain",
  Streamlit: "streamlit",
  ESP32: "espressif",
  MobileNetV2: "tensorflow",
  "Google Generative AI": "google",
  "GitHub API": "github",
};

export function getTechIcon(tech: string) {
  return techIconMap[tech] ?? null;
}
