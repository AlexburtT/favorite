import jsonServer from 'json-server';
import multer from 'multer';
import path from 'path';
import express from 'express';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router('./db.json');

const middleware = jsonServer.defaults({
    options: {
        noCors: true
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'posters'));
    },
    filename: (req, file, cb) => {
        const id = nanoid();
        cb(null, id + '--' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage, 
});

server.use(middleware);

server.use('/posters', express.static(path.join(__dirname, 'posters')));

server.post('/posters', upload.single('poster'), (req, res) => {
    res.jsonp({
        path: `/posters/${req.file.filename}`
    });
});

server.use(router);
server.listen(3000, () => {
    console.info('JSON Server запущен на http://localhost:3000');
});
