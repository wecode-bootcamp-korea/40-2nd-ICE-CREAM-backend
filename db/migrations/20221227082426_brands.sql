-- migrate:up
CREATE TABLE brands(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20)
)

-- migrate:down
DROP TABLE brands