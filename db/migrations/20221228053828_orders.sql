-- migrate:up
CREATE TABLE orders(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status_id INT NOT NULL,
  buyer_id INT NOT NULL,
  seller_id INT NOT NULL,
  bid_id INT NOT NULL,
  amount DECIMAL,
  FOREIGN KEY(status_id) REFERENCES statuses(id),
  FOREIGN KEY(buyer_id) REFERENCES users(id),
  FOREIGN KEY(seller_id) REFERENCES users(id),
  FOREIGN KEY(bid_id) REFERENCES bids(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

-- migrate:down
DROP TABLE orders