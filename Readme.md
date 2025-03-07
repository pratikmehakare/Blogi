# Blog App

The Blog App is a robust platform designed to provide a seamless blogging experience. It offers a user-friendly interface for authors to create, edit, and publish blog posts while enabling readers to explore, share content across social networks.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contact](#contact)

## Features

- **User Authentication:** Secure login system with role-based access for authors and readers.
- **Post Management:** Create, edit, delete, and manage blog posts effortlessly.
- **Responsive Design:** Mobile-friendly interface ensuring accessibility across all devices.
- **SEO Friendly:** Optimized for search engines to improve content visibility.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **Deployment:** Vercel, Render
- **Other Tools:** Tailwind CSS

## Installation

### Prerequisites

- Node.js (v14 or higher recommended)
- A MongoDB database
- Git

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/pratikmehakare/Blogi.git
   cd Blogi
2. **Install Frontend Dependencies:**

   ```bash
   npm install
3. **Install Backend Dependencies:**

   ```bash
    cd backend
    npm install
4. **Configure Environment Variables:**

    Create a .env file in the backend and add the necessary configurations:

        PORT= 4000
        MONGO_URI = Enter your url
        JWT_SECRET = Enter your jwt_scret

    Create a .env file in the project root and add the necessary configurations: 

        REACT_APP_API_URL  = YOUR_BACKEND_URL/api/v1

5. **Run the Application:**

    For development:

        npm run dev

    For production:

        npm start

## Contact
For questions or support, please contact:

    Maintainer: Pratik Mehakare
    GitHub Repository: https://github.com/pratikmehakare/Blogi.git