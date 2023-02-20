require("dotenv").config();

const { DataSource } = require("typeorm");
const dotenv = require('dotenv')
const fs = require("fs");
const path = require("path");
const FILE_NAME = "productsData - products.csv";
const csvPath = path.join(__dirname, '..', FILE_NAME);
const csv = fs.readFileSync(csvPath, "utf-8");

const appDataSource = new DataSource({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
});

// console.log(csv)
// console.log(rows)

  appDataSource
    .initialize()
    .then(() => {
      const rows = csv.split("\r\n");
  if(rows[rows.length -1] === ''){
      rows.pop();
    }
  let results = [];
  let columnTitle = [];
    for(const i in rows){
      const row = rows[i]
      const data = row.split(",")
      if(i === "0") {
          columnTitle = data
      } else {
        let row_data = {}
        for(const index in columnTitle) {
          const title = columnTitle[index]
          row_data[title] = data[index]
        }
        results.push(row_data)
      }
    }
    console.log(results)
    
  for(const i in results){
    const result = results[i]
    let productBrand = result.brand_id
    let productEnName = result.en_name
    let productKrName = result.kr_name
    let thumbnail_image_url = result.thumbnail_image_url
    let tradePrice = result.recent_trade_price
    let productNumber = result.model_number
    let releaseDate = result.release_date
    let productColor = result.color
    let productCate = result.category_id
    let originalPrice = result.original_price
    
    appDataSource
      .query(
        `
        INSERT INTO products (
          brand_id,
          en_name,
          kr_name,
          thumbnail_image_url,
          recent_trade_price,
          model_number,
          release_date,
          color,
          category_id,
          original_price
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [productBrand,
         productEnName,
         productKrName,
         thumbnail_image_url,
         tradePrice,
         productNumber,
         releaseDate,
         productColor,
         productCate,
         originalPrice]
        )
        .then(() => console.log('done!'))
  }
    })
    .catch(() => {
      console.log("Error: Data Source initialization has been failed");
    })