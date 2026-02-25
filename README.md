# Quantum Academy - School Management Dashboard

Quantum Academy is a modern, full-stack School Management System built to streamline administrative tasks and enhance the educational experience for students, teachers, parents, and administrators.

## 🚀 Overview

This dashboard provides a comprehensive suite of tools for managing a modern educational institution. With a focus on user experience and real-time data, Quantum Academy ensures that all stakeholders have the information they need at their fingertips.

## 🛠 Tech Stack

### Frontend & Framework

- **Next.js 14**: Utilizing App Router, Server Components, and Server Actions.
- **React 18**: For building a responsive and interactive UI.
- **TypeScript**: Ensuring type safety and better developer experience.
- **Tailwind CSS**: For modern, utility-first styling.

### Backend & Database

- **Prisma ORM**: Type-safe database access and schema management.
- **PostgreSQL**: Robust relational database for structured data storage.
- **Clerk**: Secure and scalable authentication and user management.

### Libraries & Tools

- **Recharts**: Dynamic data visualization for academy statistics.
- **React Big Calendar**: Comprehensive scheduling for lessons and events.
- **React Hook Form & Zod**: Robust form management and schema-based validation.
- **Lucide React**: Beautiful and consistent iconography.
- **Cloudinary**: Efficient storage and delivery of user profile images.
- **React Toastify**: Sleek notifications for user feedback.

## ✨ Key Features

- **Role-Based Access Control**: Specialized dashboards and permissions for Admins, Teachers, Students, and Parents.
- **Academic Management**:
  - Manage Subjects, Classes, and Lessons.
  - Schedule Exams and Assignments.
  - Track Attendance and Grades.
- **Interactive Dashboards**:
  - Visual insights into student performance and attendance.
  - Real-time announcements and event notifications.
- **Organization Tools**:
  - Comprehensive profiles for Teachers and Students.
  - Parent-Student associations.
  - Grade-level and class-level grouping.
- **Scheduling**: Fully integrated calendar for tracking daily lessons, exams, and academy-wide events.

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- PostgreSQL database
- Clerk Account (for authentication)
- Cloudinary Account (for image uploads)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vinaysenadev/Quantum-Academy.git
   cd Quantum-Academy
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your credentials:

   ```env
   DATABASE_URL="your_postgresql_url"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_pub_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   NEXT_PUBLIC_CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```

4. **Initialize Database:**

   ```bash
   npx prisma generate
   npx prisma db push
   # Optional: Seed the database
   npm run seed
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

---

Built with ❤️ by [Vinay Sena](https://github.com/vinaysenadev)
