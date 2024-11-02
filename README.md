# Membership Management System

⚠️ **Disclaimer**: This project is a learning and hobby exercise developed to explore the capabilities of NestJS. It is
not intended for production use as it has not undergone rigorous security testing and may contain vulnerabilities or
incomplete features. Use it at your own risk, and feel free to adapt and improve it as needed.

A membership management system built with NestJS and PostgreSQL, allowing users to register, login, manage their
profiles, and subscribe to various membership plans. The system is designed to be secure, scalable, and extendable for
future features such as subscription payments and admin management.

## Features

- **User Registration & Login**: Users can register with email and password, and login to access their profile.
- **JWT Authentication**: Protected routes with JWT tokens for secure user access.
- **User Profile Management**: Users can view and update their profile information.
- **Membership Plans**: Admins can create and manage membership plans.
- **Subscription Payments**: Integration with Stripe/Paddle for recurring subscription management.
- **Admin Dashboard**: Admins can view user data and manage memberships.

## Technologies Used

- **NestJS**: Backend framework for building efficient, reliable applications.
- **PostgreSQL**: Database for secure and scalable data management.
- **JWT**: JSON Web Token for secure user authentication.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ozardali/NestMembership.git
   cd NestMembership
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```
    - Don’t forget to open the .env file and update it with your own credentials.


4. Run the migrations (if applicable) or initialize the database:

   ```bash
   # Adjust based on migration tool used
   npm run migration:run
   ```

5. Start the application:
   ```bash
   npm run start:dev
   ```

## Future Features

- **Subscription Payments**: Integration Paddle for recurring subscription management.
- **Frontend**:

