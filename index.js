// angekim-imageboard
const express = require("express");
const app = express();
const db = require("./db");
const s3 = require("./s3");
const config = require("./config");
app.use(express.static("public"));
app.use(express.json());
////////////// IMAGE UPLOAD BOILERPLATE ///////////////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
////////////////////////////////////////////
app.get("/images", (req, res) => {
    // here /images relates to axios, not the url
    // because SPA single page application
    console.log("images route has been hit");
    return db
        .getInfos()
        .then((result) => {
            // console.log("***result of insertImage", result);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("Error in getInfos: ", err);
        });
});

app.post("more", (req, res) => {
    return db
        .getMoreImages(req.body.id)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("Error in getMoreImages in POST more", err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("file: ", req.file); // file we just uploaded
    // console.log("input: ", req.body); // input fields from the client
    // console.log("***hallo s3", config.s3Url);
    // console.log("***hallo url", config.s3Url + req.file.filename);
    let url = config.s3Url + req.file.filename;
    req.body.url = url;
    if (req.file) {
        // you'll want to eventually make a db insert here for all the info
        return db
            .insertEntry(
                req.body.title,
                req.body.description,
                req.body.username,
                req.body.url
            )
            .then((result) => {
                // console.log("***hello body", req.body);
                // console.log("***hello result", result);
                res.json(result.rows[0]); //needs to be an object
            })
            .catch((err) => {
                console.log("Error in insertEntry: ", err);
            });
    } else {
        res.json({
            success: false,
        });
    }
});
app.post("/one-image", (req, res) => {
    var reqId = req.body.id;
    return db
        .getImage(reqId)
        .then((result) => {
            console.log(
                "**** result.rows of getImage in index.js",
                result.rows
            );
            res.json(result.rows);
        })
        .then(() => {
            return db.getComment(req.body.id).then((results) => {
                console.log("results in getComment", results);
                // results.rows is an empty array
            });
        })
        .catch((err) => {
            console.log("Error in POST /one-image: ", err);
        });
});

app.post("/comment", (req, res) => {
    return db
        .insertComment(req.body.username, req.body.comment, req.body.image_id)
        .then((result) => {
            console.log("result in POST comment", result);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("Error in POST /comment: ", err);
        });
});

app.listen(8080, () => console.log("IB server is listening..."));
