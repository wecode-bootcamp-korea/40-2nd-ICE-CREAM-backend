-- migrate:up
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  brand_id INT NOT NULL,
  en_name VARCHAR(100),
  kr_name VARCHAR(100),
  thumbnail_image_url VARCHAR(1000),
  recent_trade_price DECIMAL,
  model_number VARCHAR(100),
  release_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  color VARCHAR(100),
  category_id INT NOT NULL,
  original_price DECIMAL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
)

-- migrate:down
DROP TABLE products