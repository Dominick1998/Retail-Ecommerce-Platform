# Retail E-commerce Platform

## Project Overview

The Retail E-commerce Platform is a full-stack web application simulating a retail platform, designed to demonstrate expertise in Angular, Java, Groovy, MongoDB, and IBM Cloud. The project highlights a real-world scenario of an e-commerce solution, showcasing a range of skills relevant to modern enterprise development environments.

---

## Features

- **User-Friendly Interface**: Built with Angular for dynamic, responsive, and interactive UI.
- **Backend Services**: Developed using Java and Groovy, leveraging IBM WebSphere for robust and scalable server-side operations.
- **Database Management**: Utilizes MongoDB for efficient NoSQL database management.
- **Cloud Deployment**: Hosted on IBM Cloud, demonstrating knowledge of cloud-based solutions.
- **Performance Monitoring**: Integrated with Akamai mPulse for application performance analytics.
- **Data Analytics**: Generates business intelligence reports using IBM Cognos.
- **Security Compliance**: Ensures user data security and privacy using OneTrust for cookie compliance.
- Product listing with category filtering and pagination.
- Shopping cart and checkout system.
- Role-based access control (Admin and User roles).
- Analytics dashboard for admin users.
- Performance monitoring with Spring Actuator.
- Product Search
- Category Filtering
- Admin Dashboard with Product Management
- User Order History

---

## Technologies Used

### Frontend:
- Angular
- LESS/SCSS for advanced styling
- TypeScript and JavaScript

### Backend:
- Java
- Groovy
- IBM WebSphere

### Database:
- MongoDB

### Cloud Services:
- IBM Cloud

### Performance & Analytics:
- Akamai mPulse
- IBM Cognos

### Security:
- OneTrust

---

## Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dominick1998/Retail-Ecommerce-Platform.git
   cd Retail-Ecommerce-Platform
   ```

2. **Set Up Frontend:**
   ```bash
   cd frontend
   npm install
   ```

3. **Set Up Backend:**
   ```bash
   cd ../backend
   ./gradlew build
   ```

4. **Database Setup:**
   - Install and start MongoDB.
   - Use the provided scripts in the `database` folder to import initial data.

5. **Cloud Configuration:**
   - Follow the instructions in `docs/cloud-setup.md` for IBM Cloud integration.

6. **Start the Application:**
   - **Backend**:
     ```bash
     ./gradlew bootRun
     ```
   - **Frontend**:
     ```bash
     cd ../frontend
     ng serve
     ```

7. **Access the Application:**
   - Open your browser and navigate to `http://localhost:4200`.

---

## Usage

- Default admin credentials for testing:
  - **Username**: `admin`
  - **Password**: `admin123`
- Refer to the `docs/user-guide.md` for detailed instructions.

## Admin Dashboard
- **View Analytics**: Displays total sales, orders, and top categories.
- **Manage Products**: Add, edit, or delete products.

---

## Contributing

Contributions are welcome! Please adhere to the following guidelines:
- Fork the repository.
- Create a feature branch (`git checkout -b feature/your-feature`).
- Commit your changes (`git commit -m 'Add your feature'`).
- Push to the branch (`git push origin feature/your-feature`).
- Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).
