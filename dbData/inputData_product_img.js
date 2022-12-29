require("dotenv").config();

const { DataSource } = require("typeorm");
const dotenv = require('dotenv')
const fs = require("fs");
const path = require("path");
const FILE_NAME = "productsData - product_images.csv";
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
    let productImage = result.image_url
    let productId = result.product_id
    
    appDataSource
      .query(
        `
        INSERT INTO product_images (
          image_url,
          product_id
        ) VALUES (?, ?);
        `,
        [productImage, productId]
        )
        .then(() => console.log('done!'))
  }
    })
    .catch(() => {
      console.log("Error: Data Source initialization has been failed");
    })