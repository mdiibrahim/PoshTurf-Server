# PoshTurf-Server

This server repo is the version 2.0 of the [ Sports-Facility-Booking-Platform-Server ](https://github.com/mdiibrahim/Sports-Facility-Booking-Platform-Server)

## Introduction

PoshTurf Server is the backend service for the [PoshTurf application](https://github.com/mdiibrahim/PoshTurf-Client) and this server repo is the version 2.0 of the [ Sports-Facility-Booking-Platform-Server ](https://github.com/mdiibrahim/Sports-Facility-Booking-Platform-Server), built using Node.js and TypeScript. It handles API routes, data management, and server-side logic necessary for managing turf services, user authentication, and bookings.

## Project Description

This project provides the necessary backend infrastructure to support the PoshTurf application. It includes features such as secure user authentication, CRUD operations for turf facilities, and API endpoints to facilitate communication between the frontend and the backend.

## Live Demo

You can access the live demo of the application: [here](https://posh-turf-server.vercel.app/).

## Features

- **API Services:** RESTful APIs to support frontend-client operations.
- **Authentication:** Secure JWT-based authentication for users and administrators.
- **Facility Management:** CRUD operations for managing turf facilities.
- **Booking Management:** Handling of facility booking operations.
- **Deployment Ready:** Configurations for deploying on platforms like Vercel.
- **Real-Time Availability**: Check the availability of facilities for specific times.
- **Data Validation**: Strong data validation with Zod and Mongoose.
- **Centralized Error Handling**: Unified error handling across the application.

## Technologies Stack

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB & Mongoose**: Database and ORM for data storage and querying
- **TypeScript**: Typed JavaScript for safer and more predictable code
- **JWT**: JSON Web Token for secure authentication
- **Zod**: Schema validation for request bodies
- **Bcrypt**: Password hashing
- **Prettier & ESLint**: Code formatting and linting

## Installation Guideline

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mdiibrahim/PoshTurf-Server.git
   cd PoshTurf-Server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` file:**

   Add the following environment variables:

   ```env
   PORT=5000
   DATABASE_URL=<Your MongoDB Connection String>
   NODE_ENV=development
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET=Your Access JWT Secret>
   JWT_ACCESS_EXPIRES_IN=1d
   AAMARPAY_PAYMENT_URL="https://sandbox.aamarpay.com/jsonpost.php"
   AAMARPAY_STORE_ID="aamarpaytest"
   AAMARPAY_SIGNATURE_KEY="dbb74894e82415a2f7ff0ec3a97e4183"
   CLIENT_URL="<Your Client URL>"
   SERVER_URL="<Your Server URL>"
   PAYMENT_VERIFY_URL="https://sandbox.aamarpay.com/api/v1/trxcheck/request.php"
   ```

4. **Run the server:**

   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

   The server will run on `http://localhost:5000`.

## Configuration

Here is a description of the key environment variables:

- **PORT:** The port on which the server will run.
- **DATABASE_URL:** The connection string for your MongoDB database.
- **NODE_ENV:** The environment in which the application is running (`development`, `production`, etc.).
- **BCRYPT_SALT_ROUNDS:** The number of salt rounds to use with bcrypt for hashing passwords.
- **JWT_ACCESS_SECRET:** Secret key used to sign the JWT tokens.
- **JWT_ACCESS_EXPIRES_IN:** Expiration time for JWT access tokens.
- **AAMARPAY_PAYMENT_URL:** The URL for AamarPay payment processing.
- **AAMARPAY_STORE_ID:** Store ID for AamarPay integration.
- **AAMARPAY_SIGNATURE_KEY:** Signature key for AamarPay integration.
- **CLIENT_URL:** URL of the frontend client application.
- **SERVER_URL:** URL of the server application.
- **PAYMENT_VERIFY_URL:** URL for verifying payments via AamarPay.

## Usage

Once the server is running, it provides various API endpoints for managing turf services, user authentication, and bookings. These endpoints can be accessed and used by the frontend PoshTurf Client or any other consumers of the API.

## API Endpoints

### 1. Authentication API

- **Endpoints:**
  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Login a user.
  - `POST /api/auth/create-admin`: Create a admin. (Admin Only Route)

### 2. Booking API

- **Endpoints:**
  - `POST /api/bookings`: Create a new booking. (User Only Route)
  - `GET /api/bookings`: Get all bookings. (Admin Only Route)
  - `GET /api/bookings/user`: Get all bookings of a user. (User Only Route)
  - `DELETE /api/bookings/:id`: Cancel a booking. (User Only Route)
  - `GET /api/bookings/:id`: Get details of a specific booking. (User Only Route)
  - `GET /api/bookings/check-availability`: Get available time slots of a specific booking.

### 3. Facility API

- **Endpoints:**
  - `POST /api/facilities`: Create a new facility (Admin Only Route).
  - `PUT /api/facilities/:id`: Update an existing facility (Admin Only Route).
  - `DELETE /api/facilities/:id`: Delete a facility (Admin Only Route).
  - `GET /api/facilities`: Get all facilities.
  - `GET /api/facilities/featured`: Get top rated facilities.
  - `GET /api/facilities/:id`: Get details of a specific facility.

### 4. Payment API

- **Endpoints:**
  - `POST /api/payments`: Process a payment. (User Only Route)
  - `POST /api/payments/success`: Success payment message.
  - `POST /api/payments/fail`: Faile payment message.

### 5. Review API

- **Endpoints:**
  - `GET /api/reviews/:id`: Get all reviews for a specific facility.
  - `POST /api/reviews`: Create a new review. (User Only Route)
  - `GET /api/reviews`: Get all reviews.

### 6. User API

- **Endpoints:**
  - `GET /api/users/profile`: Get current user profile. (Admin, User Only Route)

## Notes:

- Replace `https://your-server-url` with the actual server URL where your API is hosted.
- Each of these functions can be used in a frontend application to interact with the backend server.
- Ensure that your frontend is handling JWT tokens correctly for authentication-protected routes.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## Acknowledgements

I would like to express my gratitude to all the open-source contributors who helped shape this project through their invaluable contributions, to the creators of React, Redux Toolkit, Tailwind CSS, Vite, DaisyUI, and Axios for providing the powerful tools and libraries that made this application possible. Special thanks to GitHub for offering a platform that facilitates collaboration and project management. I am also deeply thankful to my mentors, friends, and family for their unwavering support and encouragement throughout the development process. This project would not have been possible without the collective effort and dedication of everyone involved.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## Contact

For further information, please reach out to [E-mail](mailto:mdiibrahim549@gmail.com).
