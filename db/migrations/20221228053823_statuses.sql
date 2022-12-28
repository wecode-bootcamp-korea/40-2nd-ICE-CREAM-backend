-- migrate:up
CREATE TABLE statuses(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200)
)

-- migrate:down
DROP TABLE statuses