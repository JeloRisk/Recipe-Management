/** @format */

// app/api/upload/route.js (for App Router)
import multer from "multer";
import path from "path";
import { NextResponse } from "next/server";

// Configure multer storage to save images in the `public/images` folder
const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "public", "images"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Wrapper to make multer compatible with Next.js API routes
export const config = {
  api: {
    bodyParser: false,
  },
};

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(req, res) {
  const multerMiddleware = upload.single("image"); // 'image' is the field name expected from the form

  await runMiddleware(req, res, multerMiddleware);

  // Get file info
  const filePath = `/images/${req.file.filename}`;

  // Return the image path as a response (or save it to your database if necessary)
  return NextResponse.json({ imagePath: filePath });
}
