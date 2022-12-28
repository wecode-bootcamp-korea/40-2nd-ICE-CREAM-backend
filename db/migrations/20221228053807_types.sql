-- migrate:up
CREATE TABLE types(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50)
)

-- migrate:down
DROP TABLE types