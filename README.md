# 📱 FinancePro – Personal Finance Dashboard

FinancePro is a mobile-friendly Personal Finance Dashboard built using **HTML, CSS, and JavaScript**. The same codebase is used for both the **web application** and the **Android APK** using **Capacitor** and **GitHub Actions**.

---

# 📂 Project Structure

```text
Personal-Finance-Dashboard-FinancePro/
│
├── .github/
│   └── workflows/
│       └── android.yml          # GitHub Actions workflow
│
├── Website/                     # Optional website source files
│
├── www/                         # Mobile app web assets
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── capacitor.config.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

# 🚀 Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Capacitor 8
- Node.js
- Git
- GitHub
- GitHub Actions

---

# 📋 Prerequisites

Install the following software:

- Node.js (v22 or later recommended)
- Git
- GitHub Account

No Android Studio is required because APKs are built using GitHub Actions.

---

# ⚙️ Initial Project Setup

## 1. Initialize npm

```bash
npm init -y
```

---

## 2. Install Capacitor

```bash
npm install @capacitor/core
npm install --save-dev @capacitor/cli
npm install @capacitor/android
```

---

## 3. Initialize Capacitor

```bash
npx cap init
```

Example:

```
App Name:
FinancePro

Package ID:
com.aarti.financepro

Web Asset Directory:
www
```

---

# 📂 Web Asset Directory

All application files should be placed inside the `www` folder.

Example:

```text
www/
│
├── index.html
├── style.css
└── app.js
```

These files are used for:

- Web Version
- Android Application

---

# 📦 Install Dependencies

```bash
npm install
```

---

# 🔄 GitHub Repository Setup

## Initialize Git

```bash
git init
```

---

## Add Remote Repository

```bash
git remote add origin https://github.com/AartiPardeshi23/Personal-Finance-Dashboard-FinancePro.git
```

---

## Commit Project

```bash
git add .
git commit -m "Initial App Version"
```

---

## Push to GitHub

```bash
git branch -M main
git push -u origin main
```

---

# 🤖 GitHub Actions

The project uses GitHub Actions to automatically build an Android APK.

Workflow location:

```text
.github/workflows/android.yml
```

Whenever code is pushed to the **main** branch, GitHub automatically:

- Installs Node.js
- Installs Java
- Installs Dependencies
- Syncs Capacitor
- Builds Android APK
- Uploads APK as an Artifact

---

# 📱 Building APK

Every push to GitHub automatically triggers:

```
GitHub Actions
        ↓
Install Dependencies
        ↓
Build Android APK
        ↓
Upload APK Artifact
```

---

# 📥 Download APK

1. Open GitHub Repository.
2. Click **Actions**.
3. Open the latest successful workflow.
4. Scroll to **Artifacts**.
5. Download the APK ZIP.
6. Extract the ZIP.
7. Install `app-debug.apk` on your Android device.

---

# 🔄 Updating the Application

Whenever changes are made to:

```
www/index.html
www/style.css
www/app.js
```

Run:

```bash
git add .
git commit -m "Update Application"
git push
```

GitHub will automatically generate a new APK.

---

# 🌐 Website Version

The same source code inside the `www` folder can also be used as a website.

Deployment options include:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Any web hosting service

This means one codebase serves both:

```
Website
        ↑
        │
 Shared HTML/CSS/JS
        │
        ↓
Android App
```

---

# 📁 .gitignore

```gitignore
node_modules/
android/
ios/
build/
dist/
*.log
```

---

# 📦 package.json

Main Capacitor packages:

```json
{
  "dependencies": {
    "@capacitor/android": "^8.4.1",
    "@capacitor/core": "^8.4.1"
  },
  "devDependencies": {
    "@capacitor/cli": "^8.4.1"
  }
}
```

---

# 📱 App Information

| Property | Value |
|----------|-------|
| App Name | FinancePro |
| Package ID | com.aarti.financepro |
| Framework | HTML, CSS, JavaScript |
| Mobile Framework | Capacitor |
| APK Build | GitHub Actions |
| Repository | Private GitHub Repository |

---

# 📌 Current APK Type

Current builds generate:

```
Debug APK
```

Suitable for:

- Testing
- Development
- Internal Distribution

---

# 🚀 Future Release APK

When preparing the app for users or the Google Play Store:

- Generate a signing keystore.
- Store signing credentials securely (preferably as GitHub Secrets).
- Update the GitHub Actions workflow to produce a signed Release APK or Android App Bundle (AAB).
- Test the signed build on multiple devices.
- Publish the Release APK/AAB to the Google Play Console.

Benefits of a Release APK:

- Smaller application size
- Better performance
- Properly signed
- Suitable for production use
- Play Store compatible

---

# 🔄 Development Workflow

```
Edit HTML/CSS/JS
        ↓
Test Website
        ↓
Commit Changes
        ↓
Push to GitHub
        ↓
GitHub Actions
        ↓
Generate APK
        ↓
Download APK
        ↓
Install on Android
```

---

# 👨‍💻 Author

**Aarti Pardeshi**

Project:
**FinancePro – Personal Finance Dashboard**

Built using HTML, CSS, JavaScript, Capacitor, and GitHub Actions.
