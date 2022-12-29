-- migrate:up
CREATE TABLE categories(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
)

-- migrate:down
DROP TABLE categories