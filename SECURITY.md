# Security Policy

## 🔐 Overview

This file server is part of MITPA's infrastructure for delivering practice exams (SEs) and is designed with security and privacy in mind.

We care about protecting:
- User access
- File delivery integrity
- Backend secrets and configurations

---

## ✅ Security Measures in Place

### 1. **Environment-Based Credentials**
- All secrets (keys, bucket names, etc.) are loaded securely using `.env`.
- Secrets are **never hardcoded** or committed.

### 2. **Scoped Access**
- Only `.pdf` files are listed and downloadable.
- No file uploads are allowed through this service.

### 3. **Input Validation**
- File names are checked to avoid malformed queries or path traversal.
- Only files with valid `.pdf` extensions are exposed.

### 4. **Error Monitoring**
- Integrated with [Sentry](https://sentry.io/) to track and respond to runtime exceptions.

### 5. **Production Recommendation**
- All production instances should run **behind HTTPS**.

---

## 🧪 Secure Development Tips

- Never log secrets or credentials.
- Sanitize and encode all file input/output paths.
- Rotate your DO Spaces access keys periodically.
- Keep dependencies updated via `npm audit`.

---

## 🚨 Reporting Vulnerabilities

If you find a potential vulnerability or bug in the MITPA file server:

1. Please **do not** open a public GitHub issue.
2. Contact us directly and privately via:

📧 **security@mitpa.tech**

We will investigate and respond within **48 hours**.

---

## 🔒 Future Security Goals

- Add signed URLs for download links (expiring access).
- Enforce token-based access for file listings.
- Log file downloads and access patterns.
- Add reCAPTCHA or basic auth layer if abuse is detected.

---

Thank you for helping keep MITPA safe and secure.