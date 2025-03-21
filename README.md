(# **Retail E-commerce Platform**  

## **Project Overview**  

The Retail E-commerce Platform is a full-stack web application simulating a retail shopping experience. It showcases expertise in Angular, Java (Spring Boot), Groovy, MongoDB, and IBM Cloud. The project highlights a real-world e-commerce solution with authentication, role-based access, and product management. 

---

## **Features**  

- **User Authentication**: Secure login and registration using JWT authentication.  
- **Role-Based Access**: Different access levels for users and admins.  
- **Product Management**: Admins can create, update, and delete products.  
- **Product Listing**: Users can browse, search, filter, and sort products.  
- **Pagination & Sorting**: Efficient backend pagination and sorting of product listings.  
- **Shopping Cart & Checkout**: Users can add products to a cart and proceed to checkout.  
- **Recommendations System**: Provides product recommendations based on user activity.  
- **Performance Monitoring**: Integrated with Spring Actuator for API monitoring.  
- **Cloud Deployment**: Hosted on IBM Cloud with MongoDB Atlas.  

---

## **Technologies Used**  

### **Frontend:**  
- **Angular** (TypeScript)  
- **SCSS / LESS** (Advanced styling)  

### **Backend:**  
- **Java (Spring Boot)**  
- **Groovy (for dynamic scripting)**  

### **Database:**  
- **MongoDB (NoSQL)**  

### **Cloud Services:**  
- **IBM Cloud**  
- **MongoDB Atlas**  

### **Security & Authentication:**  
- **JWT (JSON Web Token) Authentication**  
- **Role-based Authorization**  

### **Performance & Analytics:**  
- **Spring Actuator**  
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
- Install and start **MongoDB**.  
- Import initial data using scripts from `database/`.  

### **5. Environment Variables (Backend)**  
Create a `.env` file in the `backend/` directory and configure the following:  
```
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

### **6. Cloud Configuration (Optional)**  
Follow the instructions in `docs/cloud-setup.md` for IBM Cloud deployment.  

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
- Open **`http://localhost:4200`** in your browser.  

---

## **Usage**  

### **Admin Credentials** (For Testing)  
- **Username**: `admin`  
- **Password**: `admin123`  

### **Admin Dashboard Features:**  
- **View Analytics**: Track total sales, orders, and top categories.  
- **Manage Products**: Add, edit, or delete products.  
- **View User Orders**: Admins can track all user purchases.  

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
- `POST /api/auth/register` – User registration  
- `POST /api/auth/login` – User login  

### **Products**  
- `GET /api/products` – Get paginated product list  
- `GET /api/products/all` – Get all products (no pagination)  
- `GET /api/products/category/{category}` – Get products by category  
- `GET /api/products/search?query={query}` – Search for products  
- `POST /api/products` – **(Admin only)** Create a new product  
- `PUT /api/products/{id}` – **(Admin only)** Update product details  
- `DELETE /api/products/{id}` – **(Admin only)** Delete a product  

### **Orders & Cart**  
- `GET /api/cart/{userId}` – Get user cart  
- `POST /api/cart/{userId}/checkout` – Checkout user cart  

### **Recommendations**  
- `GET /api/recommendations/{userId}` – Get product recommendations  
- `GET /api/recommendations/{userId}/category/{category}` – Get recommendations by category  

---

## **Deployment Instructions**  

### **Frontend Deployment**  
1. Build frontend for production:  
   ```bash
   cd frontend
   ng build --configuration=production
   ```
2. Upload the `dist/` folder to **Netlify** or **Vercel**.  

### **Backend Deployment**  
1. Build the Spring Boot application:  
   ```bash
   cd backend
   ./gradlew bootJar
   ```
2. Deploy the `.jar` file to **Heroku** or **AWS EC2**.  

### **Database (MongoDB Atlas)**  
1. Create a free MongoDB Atlas account.  
2. Connect your backend by updating the `MONGODB_URI` in `.env`.  

---

## **Contributing**  

Contributions are welcome! Please follow these steps:  
1. **Fork the repository**.  
2. **Create a feature branch** (`git checkout -b feature/your-feature`).  
3. **Commit your changes** (`git commit -m 'Add new feature'`).  
4. **Push to your branch** (`git push origin feature/your-feature`).  
5. **Open a pull request**.  

---

## **License**  

This project is licensed under the [MIT License](LICENSE).  

---

## **Next Steps**
- Final deployment testing  
- API performance optimizations  
- Cloud security configurations  

---
