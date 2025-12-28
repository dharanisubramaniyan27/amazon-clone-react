const mysql = require('mysql2');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'Root@123',
};

const conn = mysql.createConnection(config);

conn.connect((err) => {
  if (err) {
    console.error('Connection error:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL server');

  conn.query('CREATE DATABASE IF NOT EXISTS amazon_db', (err) => {
    if (err) {
      console.error('Create DB error:', err.message);
      process.exit(1);
    }
    console.log('Database amazon_db ensured');

    // Use the newly created DB for table creation
    const db = mysql.createConnection({ ...config, database: 'amazon_db' });

    console.log('Dropping existing tables to ensure correct schema...');
    db.query('DROP TABLE IF EXISTS cart, products, reviews, orders', (err) => {
      if (err) console.error('Error dropping tables:', err.message);

      const usersSql = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        ) ENGINE=InnoDB;
      `;

      const productsSql = `
        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          image VARCHAR(255)
        ) ENGINE=InnoDB;
      `;

      const cartSql = `
        CREATE TABLE IF NOT EXISTS cart (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          product_id INT NOT NULL,
          qty INT NOT NULL DEFAULT 1,
          UNIQUE KEY (user_id, product_id)
        ) ENGINE=InnoDB;
      `;

      db.query(usersSql, (err) => {
        if (err) console.error('Create users table error:', err.message);
        else console.log('users table ensured');

        db.query(productsSql, (err) => {
          if (err) console.error('Create products table error:', err.message);
          else {
            console.log('products table ensured');

            // Seed products
            const products = [
              ['Apple iPhone 15', 79999.00, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800'],
              ['HP 15s Laptop', 58999.00, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800'],
              ['boAt Bluetooth Earphones', 1299.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'],
              ['Samsung S24 Ultra', 129999.00, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800'],
              ['Sony XM5 Headphones', 29990.00, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800'],
              ['Apple Watch Series 9', 41900.00, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800'],
              ['Kindle Paperwhite', 13999.00, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'],
              ['PlayStation 5', 54990.00, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800'],
              ['Apple MacBook Air M3', 114900.00, 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800'],
              ['Apple iPad Pro', 99900.00, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800'],
              ['Bose QC Headphones', 24900.00, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800'],
              ['Fujifilm Camera', 169999.00, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'],
              ['Dyson Vacuum', 65900.00, 'https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?auto=format&fit=crop&q=80&w=800']
            ];

            const seedSql = 'INSERT IGNORE INTO products (title, price, image) VALUES ?';
            db.query(seedSql, [products], (err) => {
              if (err) console.error('Seed products error:', err.message);
              else console.log('Products seeded');

              db.query(cartSql, (err) => {
                if (err) console.error('Create cart table error:', err.message);
                else console.log('cart table ensured');

                const reviewsSql = `
                  CREATE TABLE IF NOT EXISTS reviews (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    product_id INT NOT NULL,
                    user_id INT NOT NULL,
                    rating INT NOT NULL,
                    comment TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                  ) ENGINE=InnoDB;
                `;

                const ordersSql = `
                  CREATE TABLE IF NOT EXISTS orders (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    total DECIMAL(10,2) NOT NULL,
                    status VARCHAR(50) DEFAULT 'success',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                  ) ENGINE=InnoDB;
                `;

                db.query(reviewsSql, (err) => {
                  if (err) console.error('Create reviews table error:', err.message);
                  else console.log('reviews table ensured');

                  db.query(ordersSql, (err) => {
                    if (err) console.error('Create orders table error:', err.message);
                    else console.log('orders table ensured');

                    // Create Stored Procedures
                    // Note: mysql2 doesn't support multiple statements by default, so execute individually
                    db.query('DROP PROCEDURE IF EXISTS GetProducts', (err) => {
                      if (err) console.error("Error dropping procedure:", err.message);
                      db.query('CREATE PROCEDURE GetProducts() BEGIN SELECT * FROM products; END', (err) => {
                        if (err) console.error("Error creating procedure:", err.message);
                        else console.log("Stored procedures ensured");

                        db.end();
                        conn.end();
                        console.log('DB re-initialization complete');
                      });
                    });
                  });
                });
              });
            });
          }
        });
      });
    });
  });
});
