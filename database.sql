CREATE DATABASE IF NOT EXISTS store;

USE store;

CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(7,2) NOT NULL,
    inventory_count INT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO `products` (`title`, `price`, `inventory_count`)
VALUES ("T-Shirt", 9.99, 10),
       ("Shorts", 45.99, 5),
       ("Jeans", 99.49, 25),
       ("Sweater", 25.00, 2),
       ("Hoodie", 35.67, 1),
       ("Belt", 999.99, 0);