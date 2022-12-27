-- migrate:up
CREATE TABLE options(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  size VARCHAR(50),
  product_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
)

-- migrate:down
DROP TABLE options