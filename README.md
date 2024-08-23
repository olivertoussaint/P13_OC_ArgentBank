# Vite + React
<div align="center">
    <img src="./src/assets/img/logo_vite_react.png" alt="Vite and React logo" style="max-width: 100%; height: auto;">
</div>

![Node.js Version](https://img.shields.io/badge/Node.js-14.0.0-339933?logo=node.js)
![React Version](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.4-06B6D4?logo=tailwind-css)
![Redux](https://img.shields.io/badge/Redux-5.0.1-764ABC?logo=redux)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4.6-47A248?logo=mongodb)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?logo=githubactions)
![License](https://img.shields.io/badge/License-MIT-yellow?logo=open-source-initiative)
![Dependencies](https://img.shields.io/badge/Dependencies-Up%20to%20date-brightgreen?logo=npm)


# Argent Bank
<div align="center">
<img src="./src/assets/img/argentBankLogo.png" alt="argent-bank logo" style="max-width: 100%; height: auto;">
</div>

<p>Argent Bank is a modern, front-end web application developed using React and Vite, with state management handled by Redux Toolkit. The application allows users to manage their bank accounts with features such as transaction history, transfers, and account details.</p>

## Table of Contents

- [Vite + React](#vite--react)
- [Argent Bank](#argent-bank)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
  - [Backend Setup](#backend-setup)
    - [Backend Prerequisites](#backend-prerequisites)
    - [Installation](#installation-1)
  - [Populated Database](#populated-database)
  - [API Documentation](#api-documentation)

## Project Overview

Argent Bank is designed to provide a simple and intuitive interface for users to manage their banking needs. It is built with modern web technologies, ensuring a smooth user experience and easy maintenance.

## Features

- **User Authentication**: Secure login and account management.
- **Account Overview**: View balances, recent transactions, and account details.
- **Transfer Funds**: Move money between accounts.
- **Responsive Design**: Mobile-friendly and responsive layout.

## Tech Stack

- **Frontend**: React, React DOM, React Router DOM, Redux Toolkit
- **State Management**: Redux, Redux Thunk
- **Build Tool**: Vite
- **Styling**: TailwindCSS, PostCSS, Autoprefixer
- **Linting**: ESLint, ESLint Plugins (React, React Hooks, React Refresh)
- **HTTP Client**: Axios

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repo:
    ```sh
    git clone https://github.com/olivertoussaint/P13_OC_ArgentBank.git
    ```
2. Navigate to the project directory:
    ```sh
    cd argent-bank
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
```
## Backend Setup

The backend for the Argent Bank project is a Node.js application with an Express server, responsible for handling API requests and connecting to a database. To get the backend up and running locally, follow these steps.

### Backend Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (You need a MongoDB instance running locally or in the cloud)

### Installation

1. **Clone the Backend Repository**:

   First, you need to clone the backend repository:

   ```sh
   git clone https://github.com/olivertoussaint/ArgentBank-Backend.git
    ```

```sh
cd ArgentBank-Backend
```

```sh
npm install
```
or
```sh
yarn install
```
## Populated Database

The database comes pre-populated with the following user accounts for testing purposes:

| **Name**      | **Email**           | **Password**   |
|---------------|---------------------|----------------|
| `Tony Stark`   | `tony@stark.com`       | `password123`    |
| `Steve Rogers` | `steve@rogers.com `    | `password456`    |

Use these credentials to log in and explore the application features.


## API Documentation

The API for Argent Bank is documented using Swagger. The `swagger.yaml` file, which contains the complete API documentation, is located in the root directory of the project.

To view the API documentation, follow these steps:

1. Open the Swagger Editor at [Swagger Editor](https://editor.swagger.io/).
2. In the root directory of the project, locate the `swagger.yaml` file.
3. Open the `swagger.yaml` file in a text editor, and copy its entire content.
4. In the Swagger Editor, paste the copied content into the left-hand editing pane.

The Swagger Editor will render the API documentation on the right-hand side, providing a visual and interactive way to explore the API endpoints, request parameters, and responses.

Alternatively, if the backend server is running and serves the Swagger UI, you can view the documentation directly by navigating to:

```sh
http://localhost:3001/api-docs
```

This URL provides a direct view of the API documentation served by the backend application.
