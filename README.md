# Express.js API with MongoDB Integration

This is an Express.js API server that integrates with MongoDB to store and retrieve data. It provides various endpoints for handling different resources.

## Prerequisites

- Node.js (version X.X.X or higher)
- MongoDB (version X.X.X or higher)

## Getting Started

1. Clone the repository:

   git clone https://github.com/programming-hero-web-course1/b712-summer-camp-client-side-shojol021


2. Install the dependencies:


3. Set up environment variables:
- Create a `.env` file in the root directory of the project.
- Provide the following environment variables in the `.env` file:
  ```
  DB_USER=<your-mongodb-username>
  DB_PASS=<your-mongodb-password>
  PAYMENT_SECRET_KEY=<your-stripe-payment-secret-key>
  PORT=<optional-port-number>
  ```

4. Start the server:

The server will start running on the specified port (default is 5000).

5. You can now access the API using the base URL: `http://localhost:<port>`

## API Endpoints

- **GET** `/instructors`: Get all instructors.
- **GET** `/classes`: Get all classes.
- **POST** `/select`: Add a selected class.
- **GET** `/select`: Get selected classes by email.
- **GET** `/user-classes`: Get classes by instructor email.
- **GET** `/users`: Get a user by email.
- **GET** `/allclasses`: Get all classes.
- **POST** `/users`: Add a new user.
- **POST** `/class`: Add a new class.
- **POST** `/instructor`: Add a new instructor.
- **PATCH** `/user`: Update a user's role.
- **PATCH** `/make-approved/:id`: Mark a class as approved.
- **PATCH** `/deny/:id`: Mark a class as denied.
- **PATCH** `/make-instructor`: Update a user's role to instructor.
- **GET** `/allusers`: Get all users.
- **POST** `/payment-intent`: Create a payment intent for Stripe.
- **DELETE** `/instructor/:email`: Delete an instructor.

## Environment Variables

- `DB_USER`: MongoDB username.
- `DB_PASS`: MongoDB password.
- `PAYMENT_SECRET_KEY`: Stripe payment secret key.
- `PORT`: (Optional) The port number for the server. Defaults to 5000 if not provided.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or a pull request.

## License

This project is licensed under the [MIT License](LICENSE).