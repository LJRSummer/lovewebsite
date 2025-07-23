export const runtime = "nodejs";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const albumsDir = path.join(process.cwd(), "public/albums");
  const files = await fs.promises.readdir(albumsDir);
  const images = files
    .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map((file) => ({
      url: "/albums/" + file,
      title: file.replace(/\.[^/.]+$/, ""),
    }));
  return NextResponse.json(images);
}