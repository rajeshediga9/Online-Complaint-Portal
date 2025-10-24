# Online Complaint Portal

## Project Overview
The **Online Complaint Portal** is a web-based application designed to allow users to register complaints, track their status, and provide feedback. The portal provides an organized platform for managing complaints efficiently and ensures timely resolution by administrators.

---

## Features
- **User Registration & Login:** Secure registration and login system for users.
- **Complaint Submission:** Users can submit complaints with relevant details.
- **Complaint Tracking:** Users can view the status of their complaints.
- **Admin Panel:** Administrators can view, update, and resolve complaints.
- **Feedback System:** Users can provide feedback after resolution.
- **Responsive UI:** Works seamlessly on both desktop and mobile devices.

---

## Tech Stack
- **Frontend:** React.js, HTML, CSS, JavaScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Other Tools:** Git, GitHub, npm

---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/online-complaint-portal.git
   cd online-complaint-portal
Backend Setup

bash
Copy code
cd backend
npm install
npm start
Frontend Setup

bash
Copy code
cd frontend
npm install
npm start
Database

Create a MySQL database named complaint_portal.

Import the provided database.sql file (if available) to set up tables.

Environment Variables

Create a .env file in the backend folder:

ini
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=complaint_portal
DB_PORT=3306
Usage
Open the frontend in your browser at http://localhost:3000.

Register as a new user or login.

Submit complaints and track their status.

Admins can login to view and manage all complaints.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch: git checkout -b feature-name

Make your changes and commit: git commit -m "Add new feature"

Push to the branch: git push origin feature-name

Create a Pull Request.

License
This project is licensed under the MIT License.

Author
E. Rajesh Goud
Email: rediga2@gitam.in
