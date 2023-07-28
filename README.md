# Smart Brain

## Table of Contents

- [Introduction](#Introduction)
- [Images](#Images)
- [Features](#Features)
- [Getting Started](#GettingStarted)
  - [Prerequisites](#Prerequisites)
  - [Installation](#Installation)
- [Usage](#Usage)
- [Technologies Used](#Tech)
- [Contributing](#Contributing)

<a name="Introduction"/>

## Introduction

The Smart Brain project is a full-stack web application designed to detect faces in images provided by the user. It uses React for the frontend, Node.js for the backend, and PostgreSQL for the database. Users can register or log in to their accounts, submit an image URL, and the application will display the image with a bounding box around the detected face.

<a name="Images"/>

## Images
  Register
    ![sb_register](https://github.com/huzaifaghazali/smart-brain/assets/63412385/741c5684-1f81-4794-9ca6-1a5d253fff0c)
    
  Signin
    ![sb_signin](https://github.com/huzaifaghazali/smart-brain/assets/63412385/1924dc37-d425-4b97-81de-fa2dbfa90654)

  Home
    ![home](https://github.com/huzaifaghazali/smart-brain/assets/63412385/1a06179e-6b3f-4f67-ad5f-d67d61cb9ee3)

  Detect Face
    ![home_pic](https://github.com/huzaifaghazali/smart-brain/assets/63412385/d2cb0740-3005-4078-8d4a-b81b67d91b03)

  Detect Multiple Faces
    ![multiple faces](https://github.com/huzaifaghazali/smart-brain/assets/63412385/adb10717-3c57-460a-b4f6-663a8099dc79)

  Profile
    ![Profile](https://github.com/huzaifaghazali/smart-brain/assets/63412385/8a6de9da-16e5-4a4b-a4e5-219a17d6d751)

<a name="Features"/>

## Features

- User authentication and account creation.
- Face detection in images using the Clarifai API.
- User-friendly interface with smooth animations (using particles-bg).
- Real-time notifications. (using react-toastify).

<a name="GettingStarted"/>

## Getting Started

<a name="Prerequisites"/>

### Prerequisites

- Node.js and npm must be installed on your machine.
- PostgreSQL database with the required credentials (host, port, user, password).

<a name="Installation"/>

### Installation

1. Clone the repository to your local machine

   ```
   git clone https://github.com/huzaifaghazali/smart-brain.git
   ```

2. Install the dependencies for both frontend and backend:

   ```
   cd ../client
   npm install

   cd ../server
   npm install
   ```

3. Set up the environment variables:
   ```
   DATABASE_HOST=your_database_host
   DATABASE_PORT=your_database_port
   DATABASE_USER=your_database_user
   DATABASE_PASSWORD=your_database_password
   CLARIFAI_PAT=your_clarifai_pat
   CLARIFAI_USER_ID=your_clarifai_user_id
   CLARIFAI_APP_ID=your_clarifai_app_id
   CLARIFAI_API_KEY=your_clarifai_api_key
   ```

Replace the placeholders with your actual database and Clarifai API credentials.

<a name="Usage"/>

## Usage

1. Start the backend server:

   ```
   cd ../server
   npm start
   ```

2. Start the frontend development server:
   ```
   cd ../client
   npm start
   ```
3. Visit http://localhost:3000 in your web browser to use the application.

<a name="Tech"/>

## Technologies Used

- Frontend: React, particles-bg, react-toastify, Tachyons CSS toolkit
- Backend: Node.js, Express, PostgreSQL, Knex, bcrypt, cors, dotenv
- External API: Clarifai

<a name="Contributing"/>

## Contributing

We welcome contributions to improve Smart Brain. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request.
6. Please ensure your pull requests adhere to the project's coding standards and pass any tests you have in place.
