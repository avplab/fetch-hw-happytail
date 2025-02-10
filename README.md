# Project: HappyTail

Welcome to **HappyTail** – a web application built with **React (Vite)**, TailwindCSS, and Material Symbols.

## About HappyTail
HappyTail is a platform for dog lovers to find and adopt shelter dogs in need of a home. Users can log in, browse available dogs, apply filters (such as breed), sort results, and favorite their top choices. Once they’ve found their favorites, they can generate a match based on their selected dogs. The goal of HappyTail is to make it easy for dog lovers to connect with and adopt their perfect furry companion.

## Installation and Setup

### 1. Clone the Repository
```sh
git clone https://github.com/avplab/fetch-hw-happytail.git
cd fetch-hw-happytail
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start Development Server
```sh
npm run dev
```
The application will be available at **http://localhost:5173/**

### 4. Build for Production
```sh
npm run build
```
The production-ready files will be located in the `dist/` folder.

### 5. Preview Production Build
```sh
npm run preview
```

## Running with Docker

### 1. Build the Docker image
```sh
docker build -t happytail .
```

### 2. Run the container
```sh
docker run -p 8080:80 happytail
```
The application will be available at **http://localhost:8080/**.

## Technologies Used
- **React Router** – Client-side routing for seamless navigation
- **Vite** – Fast development build tool
- **React** – Library for building user interfaces
- **TailwindCSS** – Utility-first CSS framework
- **Material Symbols** – Google icons
- **Docker** – Containerization for deployment

## Project Structure

### Folder Structure
```
happytail
├── public         # Static files (favicon, fonts)
├── src            # Source code
│   ├── api        # API service functions
│   ├── utils      # Utility functions
│   ├── hooks      # Custom React hooks
│   ├── components # UI components
│   ├── pages      # Application pages
│   ├── assets     # images, config
│   ├── main.tsx   # Entry point
│   ├── App.tsx    # Root component (with routes configuration)
├── package.json   # Project dependencies
├── vite.config.ts # Vite configuration
├── tailwind.config.js # TailwindCSS configuration
├── tsconfig.json  # TypeScript configuration
├── Dockerfile     # Docker container setup
```

## Additional Commands

### Lint Code
```sh
npm run lint
```

## License
This project is licensed under the **MIT** license.
