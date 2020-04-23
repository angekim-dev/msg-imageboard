const express = require("express");
const app = express();
const db = require("./db");

app.use(express.static("public"));

// let cities = [
//     { name: "Berlin", country: "DE" },
//     { name: "Sheffield", country: "UK" },
//     { name: "London", country: "UK" },
// ];

app.get("/images", (req, res) => {
    console.log("images route has been hit");
    return db
        .selectImage()
        .then((result) => {
            console.log("***result of insertImage", result);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("Error in insertImage: ", err);
        });
});

app.listen(8080, () => console.log("IB server is listening..."));
