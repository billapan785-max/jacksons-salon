import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { LOCATIONS } from "./src/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "database.sqlite");
const db = new Database(dbPath);

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS locations (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS vibes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    alt TEXT NOT NULL
  );
`);

// Seed data if empty
const stmt = db.prepare("SELECT COUNT(*) as count FROM locations");
const count = stmt.get() as { count: number };
if (count.count === 0) {
  const insertLoc = db.prepare("INSERT INTO locations (id, data) VALUES (?, ?)");
  for (const loc of LOCATIONS) {
    insertLoc.run(loc.id, JSON.stringify(loc));
  }

  const VIBE_IMAGES = [
    { url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772126902/Jackson_s_Salon_Style_12_ktoaab.jpg', alt: 'Jackson\'s Salon Style 1' },
    { url: 'https://i.postimg.cc/cLHsVWGF/Whats_App_Image_2026_02_28_at_6_00_25_PM.jpg', alt: 'Jackson\'s Salon Style 2' },
    { url: 'https://i.postimg.cc/nhPHxWnq/Whats_App_Image_2026_02_28_at_6_00_29_PM.jpg', alt: 'Jackson\'s Salon Style 3' },
    { url: 'https://i.postimg.cc/K8zZdbh9/Whats_App_Image_2026_02_28_at_6_00_30_PM.jpg', alt: 'Jackson\'s Salon Style 4' },
    { url: 'https://i.postimg.cc/mg5b4nTY/Whats_App_Image_2026_02_28_at_6_00_32_PM.jpg', alt: 'Jackson\'s Salon Style 5' },
    { url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127047/Jackson_s_Salon_Style_3_kzcqbm.jpg', alt: 'Jackson\'s Salon Style 6' },
    { url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127047/Jackson_s_Salon_Style_7_sv6nup.jpg', alt: 'Jackson\'s Salon Style 7' },
    { url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127045/Jackson_s_Salon_Style_9_jc5xxu.jpg', alt: 'Jackson\'s Salon Style 8' },
    { url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127046/Jackson_s_Salon_Style_8_mjjnc1.jpg', alt: 'Jackson\'s Salon Style 9' },
    { url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127046/Jackson_s_Salon_Style_6_qvbjj2.jpg', alt: 'Jackson\'s Salon Style 10' },
    { url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127045/Jackson_s_Salon_Style_10_fx90ig.jpg', alt: 'Jackson\'s Salon Style 11' },
    { url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127045/Jackson_s_Salon_Style_11_uorcq1.jpg', alt: 'Jackson\'s Salon Style 12' },
  ];

  const insertVibe = db.prepare("INSERT INTO vibes (url, alt) VALUES (?, ?)");
  for (const vibe of VIBE_IMAGES) {
    insertVibe.run(vibe.url, vibe.alt);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/locations", (req, res) => {
    const rows = db.prepare("SELECT * FROM locations").all() as { id: string, data: string }[];
    const locations = rows.map(r => JSON.parse(r.data));
    res.json(locations);
  });

  app.post("/api/locations", (req, res) => {
    const locations = req.body;
    const insert = db.prepare("INSERT OR REPLACE INTO locations (id, data) VALUES (?, ?)");
    const deleteStmt = db.prepare("DELETE FROM locations");
    
    db.transaction(() => {
      deleteStmt.run();
      for (const loc of locations) {
        insert.run(loc.id, JSON.stringify(loc));
      }
    })();
    res.json({ success: true });
  });

  app.get("/api/vibes", (req, res) => {
    const rows = db.prepare("SELECT * FROM vibes").all();
    res.json(rows);
  });

  app.post("/api/vibes", (req, res) => {
    const vibes = req.body;
    const insert = db.prepare("INSERT INTO vibes (url, alt) VALUES (?, ?)");
    const deleteStmt = db.prepare("DELETE FROM vibes");
    
    db.transaction(() => {
      deleteStmt.run();
      for (const vibe of vibes) {
        insert.run(vibe.url, vibe.alt);
      }
    })();
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
