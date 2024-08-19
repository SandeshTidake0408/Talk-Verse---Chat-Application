

# Talk Verse

**Talk Verse** is a modern chat application built with React and Tailwind CSS, leveraging Firebase's powerful features for user authentication, real-time data storage, and file management.

## Features

- **User Authentication**: Secure and seamless sign-up and login functionality powered by Firebase Authentication.
- **Real-Time Chat**: Engage in real-time conversations with friends and colleagues using Firestore.
- **Profile Management**: Users can upload and manage profile pictures with Firebase Storage.
- **Design**: The UI is designed with Tailwind CSS, ensuring a great experience .

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Firebase Authentication, Firebase Storage, Firestore
- **Deployment**: https://talk-verse-beta.vercel.app/
## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js installed on your local machine
- Firebase account for setting up your project

### Installation Steps

1. **Clone the repository**

    ```bash
    clone using git clone repo_url_here
    cd talk-verse
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Firebase Setup**

    - Go to [Firebase Console](https://console.firebase.google.com/).
    - Create a new project.
    - Set up Firebase Authentication, Firestore, and Firebase Storage in your Firebase project.
    - Copy your Firebase config from the Firebase Console and paste it into a `.env` file in your project directory.

    ```env
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    ```

4. **Run the app**

    ```bash
    npm start
    ```

5. **Deployment**
 https://talk-verse-beta.vercel.app/

## Usage

- Sign up with an email and password.
- Upload a profile picture.
- Search for other users by their display name.
- Start a chat and exchange messages in real-time.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License


