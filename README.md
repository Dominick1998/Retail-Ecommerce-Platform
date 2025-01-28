# Retail E-commerce Platform

## Project Overview

The Retail E-commerce Platform is a full-stack web application simulating a retail platform, designed to demonstrate expertise in Angular, Spring Boot, Groovy, MongoDB, and cloud deployment. The project highlights a real-world scenario of an e-commerce solution, showcasing a range of skills relevant to modern enterprise development environments.

---

## Features

### User Features:
- **Personalized Recommendations**: Dynamic product suggestions based on user preferences and purchase history.
- **Trending Products**: Highlights globally popular products.
- **Product Search and Filtering**: Category filtering, price range selection, and product sorting (price, name).
- **Shopping Cart and Checkout**: Manage cart items and process orders.
- **Order History**: View past purchases with detailed summaries.

### Admin Features:
- **Admin Dashboard**: Manage products, view sales analytics, and monitor performance.
- **Role-Based Access Control**: Separate admin and user functionalities for enhanced security.

### Application-Wide:
- **Responsive UI**: Built with Angular and SCSS for an interactive and responsive design.
- **Data Visualization**: Real-time performance monitoring and analytics.
- **Cloud Integration**: Hosted on cloud platforms to demonstrate scalability and reliability.

---

## Technologies Used

### Frontend:
- **Framework**: Angular
- **Styling**: SCSS for advanced styling
- **Languages**: TypeScript and JavaScript

### Backend:
- **Framework**: Spring Boot
- **Languages**: Java and Groovy

### Database:
- MongoDB (NoSQL)

### Hosting:
- **Frontend**: Netlify or Vercel
- **Backend**: Heroku, AWS, or Azure

### Additional Tools:
- **Performance Monitoring**: Spring Actuator
- **Security**: Role-based authentication and user session management

---

## Installation Instructions

### Clone the Repository
```bash
git clone https://github.com/Dominick1998/Retail-Ecommerce-Platform.git
cd Retail-Ecommerce-Platform
```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```
2. Build and run the application:
   ```bash
   ./gradlew bootRun
   ```

### Database Setup
1. Ensure MongoDB is installed and running.
2. Import initial data using the scripts in the `database` folder:
   ```bash
   mongoimport --db retail --collection products --file database/products.json
   ```

### Access the Application
- Open your browser and navigate to `http://localhost:4200`.

---

## Usage

### User Account
- **Browse Products**: Search, filter, and sort available products.
- **Personalized Recommendations**: View dynamically generated suggestions.
- **Trending Products**: Discover the most popular items.
- **Shopping Cart**: Add, remove, and manage cart items.

### Admin Account
- **Manage Products**: Add, update, or delete products.
- **Analytics Dashboard**: View sales, orders, and popular categories.
- **Role-Based Security**: Access to admin features is restricted to authorized users.

---

## Deployment

### Frontend
1. Build the production-ready files:
   ```bash
   ng build --prod
   ```
2. Upload the `dist` folder to **Netlify** or **Vercel**.

### Backend
1. Build the Spring Boot application:
   ```bash
   ./gradlew bootJar
   ```
2. Deploy the `.jar` file to **Heroku**, **AWS**, or **Azure**.

### Database
- Host MongoDB on **MongoDB Atlas** or another cloud provider.
- Update backend configuration to point to the hosted database.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add your feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---
