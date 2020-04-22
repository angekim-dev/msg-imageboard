const express = require("express");
const app = express();
const db = require("./db");

app.use(express.static("public"));

let cities = [
    {
        url:
            "https://s3.amazonaws.com/spicedling/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg",
        username: "funkychicken",
        title: "Welcome to Spiced and the Future!",
        description: "This photo brings back so many great memories.",
    },
    {
        url:
            "https://s3.amazonaws.com/spicedling/wg8d94G_HrWdq7bU_2wT6Y6F3zrX-kej.jpg",
        username: "discoduck",
        title: "Elvis",
        description: "We can't go on together with suspicious minds.",
    },
    {
        url:
            "https://s3.amazonaws.com/spicedling/XCv4AwJdm6QuzjenFPKJocpipRNNMwze.jpg",
        username: "discoduck",
        title: "To be or not to be",
        description: "That is the question.",
    },
];

app.get("/cities", (req, res) => {
    console.log("cities route has been hit");
    db.insertImage(
        cities.url,
        cities.username,
        cities.title,
        cities.description
    )
        .then((result) => {
            console.log("***result of insertImage", result);
            return result;
        })
        .catch((err) => {
            console.log("Error in insertImage: ", err);
        });
    res.json(cities);
});

app.listen(8080, () => console.log("IB server is listening..."));
