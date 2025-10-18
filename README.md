---

# **Retail E-commerce Platform**

## **Project Overview**

The Retail E-commerce Platform is a full-stack web application simulating a complete retail shopping experience. It showcases expertise in Angular, Java (Spring Boot), Groovy, MongoDB, IBM Cloud, and secure JWT-based authentication. The project highlights real-world e-commerce features like product management, secure login, role-based access control, recommendations, and admin analytics.

---

## **Features**

- **User Authentication**: Secure login, registration, and refresh token handling using JWT.
- **Role-Based Access**: Different access levels for users and admins.
- **Product Management**: Admins can create, update, and delete products.
- **Product Listing**: Users can browse, search, filter, and sort products with pagination.
- **Shopping Cart & Checkout**: Users can add products to a cart and place orders.
- **Recommendations System**: AI-like suggestions based on user orders and preferences.
- **JWT Refresh Tokens**: Seamless session continuation without frequent logins.
- **Performance Monitoring**: Integrated with Spring Boot Actuator and Prometheus metrics.
- **Cloud Deployment**: Hosted on IBM Cloud, backend and frontend connected to MongoDB Atlas.
- **Production-Ready Security**: CORS policies, API rate limiting, environment-based configuration.

---

## **Technologies Used**

### **Frontend**
- **Angular** (TypeScript)
- **SCSS / LESS** (Advanced Styling)

### **Backend**
- **Java (Spring Boot)**
- **Groovy (Dynamic Scripting)**

### **Database**
- **MongoDB (NoSQL)** (Managed via MongoDB Atlas)

### **Cloud Services**
- **IBM Cloud**
- **MongoDB Atlas**
- **Cloudinary (for product image uploads)**

### **Security & Authentication**
- **JWT Authentication + Refresh Tokens**
- **Role-Based Authorization**
- **API Rate Limiting**

### **Performance & Analytics**
- **Spring Actuator**
- **Prometheus Monitoring**
- **Akamai mPulse**

---

## **Installation Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/Dominick1998/Retail-Ecommerce-Platform.git
cd Retail-Ecommerce-Platform
```

### **2. Setup Frontend**
```bash
cd frontend
npm install
```

### **3. Setup Backend**
```bash
cd ../backend
./gradlew build
```

### **4. Database Setup**
- Install and start **MongoDB** locally or use **MongoDB Atlas**.
- Import initial seed data using provided `database/` scripts.

### **5. Environment Variables (Backend)**
Create a `.env` file inside `backend/` directory:
```
MONGODB_URI=your-mongodb-connection-uri
JWT_SECRET=your-secure-jwt-secret
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-email-password
CORS_ALLOWED_ORIGINS=http://localhost:4200
SPRING_PROFILES_ACTIVE=development
```

### **6. Cloud Configuration (Optional)**
- Follow `docs/cloud-setup.md` to deploy to IBM Cloud, Netlify, and Heroku.

### **7. Run the Application**

#### **Start Backend**
```bash
cd backend
./gradlew bootRun
```

#### **Start Frontend**
```bash
cd ../frontend
ng serve
```

#### **Access the Application**
- Visit **http://localhost:4200** in your browser.

---

## **Usage**

### **Admin Credentials (Testing)**
- **Username**: `admin`
- **Password**: `admin123`

### **Admin Dashboard Features**
- View analytics: Total sales, popular products, top categories.
- Manage products: Add, edit, and delete products.
- View all customer orders and activities.

---

## **Role-Based Access**

| Feature                      | User | Admin |
|------------------------------|------|-------|
| View Products                | ✅   | ✅    |
| Search, Filter, and Sort     | ✅   | ✅    |
| Add Products to Cart         | ✅   | ✅    |
| Checkout                     | ✅   | ✅    |
| View Order History           | ✅   | ✅    |
| Add, Edit, Delete Products   | ❌   | ✅    |
| Access Admin Dashboard       | ❌   | ✅    |

---

## **API Endpoints**

### **Authentication**
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — User login
- `POST /api/auth/refresh-token` — Get new access token (refresh flow)

### **Products**
- `GET /api/products` — Get paginated product list
- `GET /api/products/all` — Get all products
- `GET /api/products/category/{category}` — Filter products by category
- `GET /api/products/search?query={query}` — Search products
- `POST /api/products` — **(Admin only)** Create a new product
- `PUT /api/products/{id}` — **(Admin only)** Update a product
- `DELETE /api/products/{id}` — **(Admin only)** Delete a product

### **Orders & Cart**
- `GET /api/cart/{userId}` — Retrieve user cart
- `POST /api/cart/{userId}/checkout` — Checkout user cart

### **Recommendations**
- `GET /api/recommendations/{userId}` — Personalized recommendations
- `GET /api/recommendations/{userId}/category/{category}` — Category-based recommendations

---

## **Deployment Instructions**

### **Frontend Deployment**
1. Build frontend:
   ```bash
   cd frontend
   ng build --configuration=production
   ```
2. Deploy `dist/` folder to **Netlify** or **Vercel**.

### **Backend Deployment**
1. Build the backend:
   ```bash
   cd backend
   ./gradlew bootJar
   ```
2. Deploy `.jar` file to **Heroku**, **Render**, or **AWS EC2**.

### **Database**
- Set up **MongoDB Atlas** and update the environment variables accordingly.

---

## **Contributing**

Contributions are welcome!  
Please follow the steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Next Steps**
- Stripe payment integration.
- Docker containerization for backend/frontend/MongoDB.
- PWA (Progressive Web App) support for mobile users.
- Role-based multi-language (i18n) support.
- Full Admin Analytics dashboard using Chart.js.

--- 