# 📸 My Clicks

A minimal photo gallery web app built with **Next.js**, **TypeScript**, and **Docker**. It allows image uploads (up to 10), auto-deletes the oldest photo when a new one is uploaded, and supports volume-mounting for persistent storage.

![My Clicks Screenshot](./public/preview.png) <!-- Optional screenshot -->

---

## ✨ Features

- 🔼 Upload image files (JPG, PNG, GIF, WEBP)
- 🧼 Auto-delete oldest image when upload limit (10) is reached
- 🚀 Instant auto-refresh after upload
- 🔐 Only owner can upload; all photos are publicly viewable
- 🐳 Dockerized setup for consistent deployment
- 📁 File names are saved as: `photo-YYYYMMDDHHMM-<random>.ext`

---

## 🛠️ Tech Stack

- **Next.js** (App Directory + SSR)
- **TypeScript**
- **Node.js**
- **Formidable** (file parsing)
- **Docker + Docker Compose**
- **Custom Express server for image serving**

---

## 🚀 Quick Start (Local)

1. **Clone the repo:**
```bash
git clone https://github.com/annkur-sharma-devops/my-clicks.git
cd my-clicks
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the dev server:**
```bash
npm run dev
```
```bash
Open http://localhost:3000
```
---

##🐳 Docker Usage

1. Build and run using Docker Compose:
```bash
docker compose up --build
```
2. Upload volume is mounted from ./public/uploads. This ensures uploads persist across rebuilds.

---

##📦 Project Structure
```ruby
my-clicks/
├── components/
│   └── UploadForm.tsx
├── pages/
│   └── index.tsx
│   └── api/
│       └── upload.ts
├── public/
│   └── uploads/       # Uploaded files (mounted volume)
├── styles/
│   └── Home.module.css
│   └── globals.css
├── Dockerfile
├── docker-compose.yml
├── server.js          # Custom image server
└── README.md
```
---

##📄 Upload API
- Endpoint: /api/upload
- Method: POST
- Payload: FormData with file field
- Response: JSON with upload status

---

##💡 Future Enhancements
- 🌐 Add user authentication (for upload access)
- 🖼️ Add preview thumbnails
- 🔍 Add search/filter/tag support
- ☁️ Integrate with Azure Blob Storage or S3
- 📊 Add GoatCounter / Plausible analytics

---

##👨‍💻 Author
Made by Annkur Sharma — feel free to ⭐ the repo or suggest improvements.