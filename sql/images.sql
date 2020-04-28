DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS images CASCADE;

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://angekim-imageboard.s3.amazonaws.com/Sik54GhiNoLScJo-aUEyAX5iLRvCJRbn.jpg',
    'user1',
    'Look at my clock!',
    'This photo brings back so many great memories.'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://angekim-imageboard.s3.amazonaws.com/VRMJH07snlK4-vU-Dcm1nkuJR982wdSY.jpg',
    'user2',
    'Look at my lightbulb!',
    'We can''t go on together with suspicious minds.'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://angekim-imageboard.s3.amazonaws.com/XquGi6VQ19TCWUc4lhgGsCD4k-IVhVsd.jpg',
    'user3',
    'Look at my car!',
    'Oh being young again...'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://angekim-imageboard.s3.amazonaws.com/oq2JwnktNj--DsqZD_uoFgiPfBKC2LzM.jpg',
    'user4',
    'Look at my bags!',
    'Materialism gives me joy'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://angekim-imageboard.s3.amazonaws.com/pMrWv-MW5UY048GaT_0qpT975Dkq3S41.jpg',
    'user5',
    'Look at my flower!',
    'Can you smell it? mhh yummy'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://angekim-imageboard.s3.amazonaws.com/kzs0bpljCcAaQ8xW7yjTZEBGRz_MMfRd.jpg',
    'user6',
    'Look at my headphones!',
    'Can you hear the music?'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://angekim-imageboard.s3.amazonaws.com/tMrjdjQa0HSKMm8xOrp2G9pG61bJDjIo.jpg',
    'user7',
    'Finally some human interaction!',
    'Soo needed during social distancing time <3'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://angekim-imageboard.s3.amazonaws.com/4rWaz-_5qJc7pmGsHlFcUd3Gjv4uW_nP.jpg',
    'user8',
    'Stay realistic!',
    'This is the current state of affairs..'
);
INSERT INTO images (url, username, title, description) VALUES (
    'https://angekim-imageboard.s3.amazonaws.com/-4VgEqt6b0LBXyQEBlss_py2HiZezdRq.jpg',
    'user9',
    'What a joy!',
    'I could look at it forever!'
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    comment TEXT,
    image_id INTEGER NOT NULL REFERENCES images(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO comments (username, comment, image_id) VALUES (
    'alwaysLate',
    'This is stressing me out..',
    1
); 
INSERT INTO comments (username, comment, image_id) VALUES (
    'curiousMe',
    'What is your biggest dream?',
    7
); 
INSERT INTO comments (username, comment, image_id) VALUES (
    'doggyLover',
    'awww so cuuute!',
    9
); 