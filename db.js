const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

module.exports.getInfos = () => {
    return db.query(
        `SELECT *
        FROM images ORDER BY id DESC
        LIMIT 6;`
    );
};

module.exports.insertEntry = (title, description, username, url) => {
    return db.query(
        `INSERT INTO images (title, description, username, url)
        VALUES ($1, $2, $3, $4) RETURNING *;`,
        [title, description, username, url]
    );
};

exports.getMoreImages = (lastId) => {
    return db.query(
        `SELECT *, (
        SELECT id FROM images
        ORDER BY id ASC
        LIMIT 1
        ) AS lowest_id FROM images
        WHERE id < $1
        ORDER by id DESC
        LIMIT 6;`,
        [lastId]
    );
};

module.exports.getImage = (id) => {
    return db.query(
        `SELECT * FROM images
        WHERE id = $1
        ORDER BY id DESC;`,
        [id]
    );
};
module.exports.getComment = (id) => {
    return db.query(
        `SELECT * FROM comments WHERE image_id = $1 ORDER BY id DESC;`,
        [id]
    );
};

module.exports.insertComment = (username, comment, image_id) => {
    return db.query(
        `INSERT INTO comments (username, comment, image_id)
        VALUES ($1, $2, $3) RETURNING *;`,
        [username, comment, image_id]
    );
};
