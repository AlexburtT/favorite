import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";

const server = createServer((req, res) => {
    let filePath;
    
    // Если запрос идет к корню сайта, то отдаем index.html
    if (req.url === "/") {
        filePath = path.join(process.cwd(), "index.html");
    } else {
        filePath = path.join(process.cwd(), req.url);
    }

    const ext = path.extname(filePath);
    const contentType = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".wav": "audio/wav",
    }[ext] || "application/octet-stream";

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end("Not Found");
        } else {
            res.setHeader("Content-Type", contentType);
            res.end(data);
        }
    });
});

server.listen(8000, () => {
    console.log("Сервер запущен на http://localhost:8000");
});
