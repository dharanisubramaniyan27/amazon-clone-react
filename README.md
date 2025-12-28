# 🛒 Amazon Clone – Full Stack E-Commerce Application

A full-stack Amazon-like e-commerce web application built using **React, Node.js, Express, and MySQL**.
This project demonstrates real-world **frontend–backend integration**, **secure authentication**, and **database-driven cart management**.

---

## 🚀 Features

* User authentication (Register & Login)
* Secure JWT-based authorization
* Product listing with search & filtering
* Add / remove items from cart
* Quantity-based cart management
* MySQL stored procedures for optimized queries
* Modular and scalable project structure

---

## 🏗️ System Architecture

The application follows a **3-Tier Architecture**:

1. **Frontend (React)** – User Interface
2. **Backend (Node.js + Express)** – REST API & business logic
3. **Database (MySQL)** – Persistent data storage

```
React (UI)
   ↓
Express REST API
   ↓
MySQL Database
```

This separation ensures **maintainability, scalability, and security**.

---

## 🛠️ Technology Stack

### Frontend

* **React.js (18+)**
* **React Router DOM** – SPA routing
* **CSS (BEM methodology)** – Maintainable styling
* **Hooks** – `useState`, `useEffect`, `useContext`

### Backend

* **Node.js**
* **Express.js**
* **JWT (JSON Web Token)** – Authentication
* **Bcrypt.js** – Password hashing
* **Dotenv** – Environment variable management

### Database

* **MySQL 8.0+**
* **Stored Procedures** for optimized database operations
* **Relational schema** for users, products, and cart

---

## 🔐 Security Implementation

* Passwords are hashed using **Bcrypt** (salt rounds: 10)
* JWT tokens secure protected routes
* Sensitive credentials stored using **environment variables**
* Stateless authentication for better scalability

---

## ⚙️ Stored Procedure Example

### Stored Procedure Definition

```sql
CREATE PROCEDURE GetProducts()
BEGIN
    SELECT * FROM products;
END;
```

### Backend Usage

```javascript
const sql = "CALL GetProducts()";
db.query(sql, (err, results) => {
    res.json(results[0]);
});
```

**Why Stored Procedures?**

* Better performance
* Reduced SQL injection risk
* Cleaner backend code

---

## 🗄️ Database Design

### Tables

* **Users** – Authentication & profile data
* **Products** – Product details & pricing
* **Cart** – User-product relationship with quantity

### Cart Logic

* Uses `ON DUPLICATE KEY UPDATE` to handle quantity updates atomically
* Ensures data consistency and integrity

---

## 📂 Project Structure

```
amazon-clone/
│
├── amazon-backend/
│   ├── config/          # Database & environment configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # JWT authentication
│   ├── routes/          # API routes
│   ├── init_db.js       # Database setup & seeding
│   └── server.js        # Express server entry point
│
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application pages
│   ├── services/        # API service layer
│   └── context/         # Global state management
│
└── README.md
```

## 🏁 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/amazon-clone.git
cd amazon-clone
```

### 2️⃣ Backend Setup

```bash
cd amazon-backend
npm install
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=amazon_db
JWT_SECRET=your_secret_key
```

Initialize database:

```bash
node init_db.js
```

Start backend:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd ..
npm install
npm start
```

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:5000`

---

## 📈 Future Enhancements

* [ ] Redis caching for cart & sessions
* [ ] Payment gateway integration
* [ ] Role-based access (Admin/User)
* [ ] TypeScript migration
* [ ] Docker deployment

---