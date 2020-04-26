const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

module.exports.selectImage = () => {
    return db.query(
        `SELECT url, username, title, description
        FROM images ORDER BY created_at DESC;`
    );
};

module.exports.insertEntry = (title, description, username, url) => {
    return db.query(
        `INSERT INTO images (title, description, username, url)
        VALUES ($1, $2, $3, $4) RETURNING *;`,
        [title, description, username, url]
    );
};

module.exports.getImage = (id) => {
    return db.query(`SELECT * FROM images WHERE id = $1;`, [id]);
};

module.exports.getComment = (id) => {
    return db.query(
        `SELECT * FROM comments WHERE image_id = $1 ORDER BY created_at DESC;`,
        [id]
    );
};
