# 📸 My Clicks

A minimal photo gallery web app built with **Next.js**, **TypeScript**, and **Docker**. It allows image uploads (up to 10), auto-deletes the oldest photo when a new one is uploaded, and supports volume-mounting for persistent storage.

![My Clicks Screenshot](./public/preview.png) <!-- Optional screenshot -->

---

## ✨ Features

- 🔼 Upload image files (JPG, PNG, GIF, WEBP)
- 🧼 Auto-delete oldest image when upload limit (10) is reached
- 🚀 Instant auto-refresh after upload
- 🔐 User can upload; all photos are publicly viewable
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

**Clone the repo:**
```bash
git clone https://github.com/annkur-sharma-devops/my-clicks.git
cd my-clicks
```
---
## 🐳 Docker Usage

**Build and run using Docker Compose:**
```bash
docker compose build --no-cache
docker compose up
```
---
## Access the application

- **http://localhost:3000**
- **http://<VM_IP>:3000**
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
