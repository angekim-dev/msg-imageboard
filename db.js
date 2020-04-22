const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

module.exports.selectImage = () => {
    return db.query(`SELECT url, username, title, description FROM images;`);
};
