# Next.js Event Tracking Sample Application

This is a sample Next.js application for tracking events using Firebase and MongoDB. It provides a basic structure for creating and managing events.

### Prerequisites

Before running this application, make sure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager
- [MongoDB](https://www.mongodb.com/) account
- [Firebase](https://firebase.google.com/) account with Firebase Realtime Database enabled

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/iamvedran/next_events
   ```

2. Change to the project directory:

   ```bash
   cd next_events
   ```

3. Install the project dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Configure Firebase and MongoDB:

   - Create a Firebase project in your Firebase console and enable the Firebase Realtime Database.
   - Set up a MongoDB database and make sure you have the connection URI.

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. The application should now be running locally. Access it in your web browser at `http://localhost:3000`.

## Usage

1. Register for an account or log in if you already have one.
2. Create, view, update, or delete events.
3. The application will read event data in Firebase Realtime Database and write in MongoDB.

## Features

- Real-time event tracking and synchronization with Firebase Realtime Database.
- Data storage in MongoDB for long-term event persistence.
- Responsive design for various screen sizes.

## Technologies Used

- [Next.js](https://nextjs.org/) - The React framework for building web applications.
- [Firebase](https://firebase.google.com/) - Authentication and real-time database.
- [MongoDB](https://www.mongodb.com/) - NoSQL database for event storage.
