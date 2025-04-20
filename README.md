# MITPA SE File Server

This is a simple Express.js server that connects to a DigitalOcean Spaces bucket to list and serve PDF files — primarily used to distribute Simulated Exams (SEs) for the MITPA community.

> 📝 This service provides a **user-friendly interface** and a **JSON API** to access available SEs.
> 
> ⚠️ All SEs are for practice and should not be considered official content.
> 
> 🔗 Visit: [https://files.mitpa.tech](https://files.mitpa.tech)

---

## 🚀 Endpoints

### 1. `/`
- **Method:** `GET`
- **Description:** Renders an HTML page listing all SEs (.pdf files).
- **Includes:** File sizes and a friendly MITPA usage warning.

### 2. `/files`
- **Method:** `GET`
- **Description:** Returns a JSON array of all available SEs with:
  - `name`
  - `size`
  - `url`

- **Example Response:**
```json
[
  {
    "name": "MITPA_SE_Math1.pdf",
    "size": "324.56 KB",
    "url": "http://files.mitpa.tech/download?file=MITPA_SE_Math1.pdf"
  }
]
```

### 3. `/download`
- **Method:** `GET`
- **Query Param:** `file` (required)
- **Description:** Downloads the specified file directly from the bucket.
- **Example:**  
  `http://files.mitpa.tech/download?file=MITPA_SE_Math1.pdf`

---

## 🌱 Environment Variables

You must create a `.env` file in the root with the following:

```
DO_SPACES_ENDPOINT=nyc3.digitaloceanspaces.com
DO_SPACES_KEY=your-access-key
DO_SPACES_SECRET=your-secret-key
DO_SPACES_BUCKET=mitpa-se-files
```

> ⚠️ Never commit your `.env` file to version control.

---

## 🛠️ Installation & Running

```bash
# 1. Clone the repo
git clone https://github.com/MITPAcademy/files.mitpa.tech.git

# 2. Navigate into project
cd se-file-server

# 3. Install dependencies
npm install

# 4. Start the server
npm start
```

---

## 📦 Built With

- [Express](https://expressjs.com/)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/)
- [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces)
- [Sentry](https://sentry.io/) for error monitoring

---

## 🤝 Contributing

We welcome your contributions to improve this server and make SE access even better for MITPA members!

- Fork the repo
- Create a branch (`fix/se-listing`, `feat/download-logging`, etc.)
- Commit your changes
- Open a pull request

For major changes, please open an issue first.

---

## 📫 Contact

- [MITPA Website](https://mitpa.tech)
- Email: [support@mitpa.tech](mailto:support@mitpa.tech)