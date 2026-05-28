# Jiva Health - User Management Dashboard

A comprehensive User Management Dashboard built for Jiva Health, satisfying all requirements of the frontend engineering assignment. This application provides a pixel-perfect, responsive interface to manage users, their orders, payments, family members, and personal details.

## 🚀 Setup & Run

**Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS (v4), Zustand, React Router v6, Lucide Icons

To run this project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## ✨ Features Implemented

### 1. User Management (List View)
- **Summary Cards**: Real-time calculated metrics for Total Users, Prime Users, Non-Prime Users, and Total Family Members.
- **Data Table**: Displays users with their Name, Role, Status, Joined Date, Last Active, and Appointments count.
- **Search & Filter**: Real-time filtering by Name, Email, or Phone, alongside Status and Role dropdown filters.
- **Actions**: Add a new user via a modal, upgrade to Prime, and quickly jump to View/Edit pages.

### 2. User Detail Profile
- **Global Dark Mode**: Full support for Dark/Light mode seamlessly via a toggle in the header.
- **Core Metrics**: Displays Total Orders, Total Bookings, Total Family Members, and Total Spent at a glance.
- **Personal Information**: Editable fields for Email, Phone, DOB, Gender, and Blood Group.
- **Address Management**: Full CRUD capability for user addresses, including setting a Default Address and specifying Home/Work tags.

### 3. Order & Payment Tracking
- **Order History**: Lists all orders with item details, amounts, and statuses (Pending, Processing, Delivered, Cancelled). Order statuses can be updated dynamically.
- **Order Details Modal**: Clicking on any order opens an expanded modal showing full breakdown (shipping address, itemized list, date, and payment info).
- **Payment History**: Tabular view of all user transactions including Method (Card/UPI/Cash), date, and amount.

### 4. Family Member Management
- **Add / Edit / Delete**: Dedicated tab to manage a user's family members (Name, Relationship, DOB, Phone).
- **Dynamic Counters**: The overall family member metrics update synchronously when members are added or removed.

## 🛠 Architecture & Design Decisions
- **Zustand for State Management**: Opted for Zustand to maintain a lightweight, scalable, and boilerplate-free global store simulating a robust backend database in memory.
- **Tailwind CSS v4**: Utilized the latest Tailwind engine for rapid, pixel-perfect styling mimicking the exact Figma designs provided.
- **Component Modularity**: High reusability achieved through abstracted UI components (`Modal`, `Badge`, `FilterDropdown`, `Avatar`).

## 📝 Notes
- All data is currently mock/in-memory, meaning changes (add, edit, delete) persist during the session but will reset upon page reload.
