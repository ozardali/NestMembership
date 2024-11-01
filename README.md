# Membership Management System

A membership management system built with NestJS and PostgreSQL, allowing users to register, login, manage their profiles, and subscribe to various membership plans. The system is designed to be secure, scalable, and extendable for future features such as subscription payments and admin management.

## Features

- **User Registration & Login**: Users can register with email and password, and login to access their profile.
- **JWT Authentication**: Protected routes with JWT tokens for secure user access.
- **User Profile Management**: Users can view and update their profile information.
- **Password Security**: Passwords are hidden in responses and securely hashed in the database.

## Technologies Used

- **NestJS**: Backend framework for building efficient, reliable applications.
- **PostgreSQL**: Database for secure and scalable data management.
- **JWT**: JSON Web Token for secure user authentication.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory and add the following:
     ```plaintext
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=your_db_username
     DB_PASSWORD=your_db_password
     DB_DATABASE=membership_management
     JWT_SECRET=your_jwt_secret
     ```

4. Run the migrations (if applicable) or initialize the database:

   ```bash
   # Adjust based on migration tool used
   npm run migration:run
   ```

5. Start the application:
   ```bash
   npm run start:dev
   ```

## Usage

- **Register**: `POST /auth/register`
  - Body: `{ "email": "user@example.com", "password": "yourpassword", "name": "John Doe" }`
- **Login**: `POST /auth/login`
  - Body: `{ "email": "user@example.com", "password": "yourpassword" }`
- **View Profile**: `GET /user/profile` (Requires Authorization: Bearer `<access_token>`)
- **Update Profile**: `PUT /user/profile` (Requires Authorization: Bearer `<access_token>`)

## Future Features

- **Membership Plans**: Admins can create and manage membership plans.
- **Subscription Payments**: Integration with Stripe/Paddle for recurring subscription management.
- **Admin Dashboard**: Admins can view user data and manage memberships.

## Contributing

Feel free to open issues or submit pull requests to improve this project. Please make sure to follow the code style and add appropriate documentation for new features.
