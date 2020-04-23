const express = require("express");
const app = express();
const db = require("./db");

app.use(express.static("public"));

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

// let cities = [
//     { name: "Berlin", country: "DE" },
//     { name: "Sheffield", country: "UK" },
//     { name: "London", country: "UK" },
// ];

app.get("/images", (req, res) => {
    // here /images relates to axios, not the url
    // because SPA single page application
    console.log("images route has been hit");
    return db
        .selectImage()
        .then((result) => {
            // console.log("***result of insertImage", result);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("Error in insertImage: ", err);
        });
});

app.post("upload", uploader.single("file"), (req, res) => {
    console.log("file: ", req.file); // file we just uploaded
    console.log("input: ", req.body); // input fields from the client

    if (req.file) {
        // you'll want to eventually make a db insert here for all the info
        res.json({
            success: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.listen(8080, () => console.log("IB server is listening..."));
