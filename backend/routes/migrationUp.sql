CREATE TABLE IF NOT EXISTS access
(
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(30) NOT NULL,
    login CHARACTER VARYING(30) NOT NULL UNIQUE,
    phone_number TEXT NOT NULL,
    password CHARACTER VARYING(30) NOT NULL,
    access_id INT REFERENCES access (id) DEFAULT 2,
    created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS auth
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    date  TIMESTAMP DEFAULT NOW(),
    token TEXT NOT NULL,
    expire TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories
(
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS adverts
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    created  TIMESTAMP DEFAULT NOW(),
    title TEXT NOT NULL,
    category_id INT REFERENCES categories (id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    price INT DEFAULT 0,
    img TEXT
);

INSERT INTO access (category) VALUES ('admin'), ('user'), ('manager');
INSERT INTO users (name, login, password, phone_number, access_id) VALUES ('Админ', 'admin', 'admin', '8 (800) 555-35-35', 1), ('Юзер', 'user', 'user', '+7 (920) 000-00-00', 2);
INSERT INTO categories (category) VALUES ('Товары'), ('Услуги');
INSERT INTO adverts (user_id, title, category_id, description, price, img) VALUES (1, 'MacBook', 1, 'Новый', 190000, 'https://avatars.mds.yandex.net/get-zen_doc/30229/pub_5d3aae8635ca3100ac1d33ff_5d3ab1e70ce57b00add77df5/scale_1200');