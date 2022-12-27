-- migrate:up
CREATE TABLE bids(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type_id INT NOT NULL,
  option_id INT NOT NULL,
  price DECIMAL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(type_id) REFERENCES types(id),
  FOREIGN KEY(option_id) REFERENCES options(id)
)

-- migrate:down
DROP TABLE bids