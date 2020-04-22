const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/petition"
);

module.exports.insertImage = (url, username, title, description) => {
    return db.query(
        `INSERT INTO images (url, username, title, description)
    VALUES ($1, $2, $3, $4);`,
        [url, username, title, description]
    );
};
