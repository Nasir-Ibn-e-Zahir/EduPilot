import { NextApiRequest, NextApiResponse } from "next";
import archiver from "archiver";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=All_Files.zip");

  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.on("error", (err) => {
    res.status(500).send({ error: err.message });
  });

  archive.pipe(res);

  // You might want to pull this from `filterData.files` dynamically if needed
  const files = [
    "Introduction to Information Security.pdf",
    "names.pdf",
    "Professional Practices.pdf",
    "Screenshot 2025-06-05 204302.png",
    "Software Project Management.pdf"
  ];

  const dirPath = path.join(process.cwd(), "public", "files");

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: file });
    }
  });

  archive.finalize();
}
