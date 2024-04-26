# ChatBot Maker

Welcome to ChatBot Maker, a MERN (MongoDB, Express.js, React.js, Node.js) stack application that allows users to create their own customized chatbots effortlessly. With ChatBot Maker, users can register, login, and train their chatbots by providing questions and answers. Whether you have a handful of Q&A pairs or an extensive list, ChatBot Maker streamlines the process by enabling users to import and export data using Excel files. Additionally, users can leverage web scraping capabilities to extract relevant data from websites and integrate it into their chatbot training.

## Features

- User authentication system for secure access to chatbot training functionalities.
- Import functionality using Excel files for easy bulk data management.
- Web scraping tool to extract data from websites for chatbot training purposes.
- Seamless integration into websites with provided installation code, allowing users to deploy their chatbots hassle-free.

## Environment Setup

**Backend:**
- **PORT:** Specify the port number for the backend server.
- **MONGO_URI:** MongoDB connection URI for database interaction.
- **JWT_SECRET_KEY:** Secret key for JWT token generation and authentication.
- **TOKEN:** Obtain from Hugging Face for additional NLP capabilities.

**Client:**
- **REACT_APP_API_URL:** URL of the backend API to establish communication between the client and server.

## Installation Steps

1. **Backend:**
   - Navigate to the backend directory: `cd backend`
   - Install dependencies: `npm install`
   - Start the server: `npm start` or `npm run dev` for development environment.

2. **Client:**
   - Navigate to the client directory: `cd client`
   - Install dependencies: `npm install`
   - Start the client application: `npm start`

## Demo

Check out the demo of ChatBot Maker [here](https://chatbot-website-five.vercel.app/).

## Getting Started

Once the backend and client are successfully set up and running, you can begin using ChatBot Maker to create your own chatbots. Simply register/login, input your Q&A pairs, import data from Excel files or websites, and deploy your customized chatbot seamlessly into your website using the provided installation code.

## Contributing

Contributions are welcome! If you have ideas for new features, find any bugs, or have suggestions for improvements, please feel free to open an issue or submit a pull request.

