import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createFileRoute } from "@tanstack/react-router";
import { getPictureFolder } from "@/lib/menu-pictures";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function getPicturesRoot(): string {
  const cwd = process.cwd();
  const inWebApp = path.join(cwd, "public", "pictures");
  const inMonorepo = path.join(cwd, "apps", "web", "public", "pictures");
  if (existsSync(path.join(cwd, "public"))) return inWebApp;
  if (existsSync(path.join(cwd, "apps", "web", "public"))) return inMonorepo;
  return inWebApp;
}

function safeFilename(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase() || ".jpg";
  const base = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  return base + ext;
}

export const Route = createFileRoute("/api/upload/$")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const contentType = request.headers.get("content-type") ?? "";
          if (!contentType.includes("multipart/form-data")) {
            return new Response(JSON.stringify({ error: "Expected multipart/form-data" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const formData = await request.formData();
          const file = formData.get("file");
          const categoryId = formData.get("categoryId");

          if (!file || !(file instanceof File)) {
            return new Response(JSON.stringify({ error: "Missing file" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (!ALLOWED_TYPES.includes(file.type)) {
            return new Response(
              JSON.stringify({ error: "Invalid type. Use JPEG, PNG, GIF or WebP." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          if (file.size > MAX_SIZE) {
            return new Response(JSON.stringify({ error: "File too large (max 5MB)" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const folder = typeof categoryId === "string" ? getPictureFolder(categoryId) : "multi_plates";
          const root = getPicturesRoot();
          const dir = path.join(root, folder);
          await mkdir(dir, { recursive: true });

          const filename = safeFilename(file.name);
          const filepath = path.join(dir, filename);
          const buffer = Buffer.from(await file.arrayBuffer());
          await writeFile(filepath, buffer);

          return new Response(JSON.stringify({ filename }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("Upload error:", err);
          return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "Upload failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
