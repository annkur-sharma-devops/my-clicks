import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const uploadDir = path.join(process.cwd(), 'public/uploads');

  // Ensure upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({ uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }

    let file: File | undefined;

    const uploaded = files.file;
    if (Array.isArray(uploaded)) {
      file = uploaded[0];
    } else {
      file = uploaded;
    }

    if (!file || !file.filepath) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ext = path.extname(file.originalFilename || '');
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const newName = `${timestamp}-${random}${ext}`;
    const newPath = path.join(uploadDir, newName);

    // Move uploaded file
    fs.renameSync(file.filepath, newPath);

    // Clean up old files (keep only 5)
    let allFiles = fs.readdirSync(uploadDir)
      .map(name => {
        const fullPath = path.join(uploadDir, name);
        try {
          const stat = fs.statSync(fullPath);
          return { name, time: stat.birthtimeMs };
        } catch {
          return null;
        }
      })
      .filter(Boolean) as { name: string, time: number }[];

    allFiles.sort((a, b) => a.time - b.time);

    if (allFiles.length > 5) {
      const toDelete = allFiles.slice(0, allFiles.length - 5);
      for (const f of toDelete) {
        try {
          fs.unlinkSync(path.join(uploadDir, f.name));
        } catch (err) {
          console.warn(`Failed to delete ${f.name}:`, err);
        }
      }
    }

    return res.status(200).json({ success: true, filename: newName });
  });
}
