const express = require('express');
const AWS = require('aws-sdk');
const path = require('node:path');
const Sentry = require('./config/sentryConfig');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = 8000;

console.log('DO_SPACES_ENDPOINT:', process.env.DO_SPACES_ENDPOINT);

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);

const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
});

const bucketName = process.env.DO_SPACES_BUCKET;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', async (req, res) => {
    try {
        const params = { Bucket: bucketName };
        const data = await s3.listObjectsV2(params).promise();

        const pdfs = data.Contents.filter(file => file.Key.endsWith('.pdf'));

        const html = pdfs.map(file => {
            const sizeKB = (file.Size / 1024).toFixed(2);
            return `<a href="/download?file=${encodeURIComponent(file.Key)}">${file.Key}</a> <span style="color: gray;">(${sizeKB} KB)</span>`;
        }).join('<br>');

        const warning = `
            <div style="border: 1px solid red; padding: 10px; margin-bottom: 20px;">
                <p><strong>We strongly recommend using the Simulated Exams (SEs) as practice tools and friendly challenges among members of the MITPA community.</strong></p>
                <p>These exams are not intended to be a guarantee of full content mastery. While SEs may help with preparation for standardized tests such as the SAT and ACT, we consider platforms like Khan Academy more appropriate for in-depth, official study.</p>
                <p><a href="https://dashboard.mitpa.tech/public/docs/se">Learn More</a></p>
            </div>
        `;

        res.send(`<html><body>${warning}<h1>Avaliable SEs</h1>${html}</body></html>`);
    } catch (err) {
        Sentry.captureException(err);
        console.error(err);
        res.status(500).send('Error listing files');
    }
});

app.get('/files', async (req, res) => {
    try {
        const params = { Bucket: bucketName };
        const data = await s3.listObjectsV2(params).promise();

        const pdfs = data.Contents.filter(file => file.Key.endsWith('.pdf'));

        const files = pdfs.map(file => ({
            name: file.Key,
            size: `${(file.Size / 1024).toFixed(2)} KB`,
            url: `http://files.mitpa.tech/download?file=${encodeURIComponent(file.Key)}`
        }));

        res.json(files);
    } catch (err) {
        Sentry.captureException(err);
        console.error(err);
        res.status(500).send('Error fetching files');
    }
});

app.get('/download', async (req, res) => {
    try {
        const fileKey = req.query.file;
        if (!fileKey) return res.status(400).send('File not specified');

        const params = {
            Bucket: bucketName,
            Key: fileKey,
        };

        const fileStream = s3.getObject(params).createReadStream();

        res.setHeader('Content-Disposition', `attachment; filename="${fileKey}"`);
        res.setHeader('Content-Type', 'application/pdf');

        fileStream.pipe(res);
    } catch (err) {
        Sentry.captureException(err);
        console.error(err);
        res.status(500).send('Error downloading file');
    }
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
