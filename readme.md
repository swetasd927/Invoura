```md
# AI Invoice Generator SaaS (MERN + Gemini AI)

A full-stack SaaS application that generates professional invoices from plain text prompts using Google Gemini AI, built with the MERN stack (MongoDB, Express, React, Node.js).

Users can create invoices, manage clients, track payments, and monitor invoice status in a secure dashboard.

---

## Features

- AI Invoice Generation
  - Generate complete invoices using plain text prompts via Google Gemini AI
  - Smart extraction of client details, items, quantity, and pricing

- Authentication & Security
  - JWT-based authentication
  - Secure user login & registration
  - Protected routes & role-based access

- Interactive Dashboard
  - Modern UI built with React + Tailwind CSS
  - View all invoices in one place
  - Filter by status: Paid / Unpaid / Overdue

- Invoice Management
  - Create, update, delete invoices
  - Track invoice payment status
  - Auto-calculate totals & taxes

- Client Management
  - Store client details
  - Link clients to multiple invoices

- Payment Tracking
  - Mark invoices as paid/unpaid
  - Track overdue invoices automatically

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- JWT Authentication
- RESTful APIs

### Database
- MongoDB + Mongoose

### AI Integration
- Google Gemini AI API

---
## Project Structure

root/
├── client/                  # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── utils/
│       └── App.js
│
├── server/                  # Node + Express Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── User.js
│   │   ├── Client.js
│   │   ├── Invoice.js
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── .env
├── package.json
└── README.md
---

## Database Schema

### User
- name
- email
- password (hashed)
- createdAt

### Client
- name
- email
- phone
- address
- userId (reference)

### Invoice
- clientId
- items (name, quantity, price)
- totalAmount
- status (Paid / Unpaid / Overdue)
- dueDate
- createdAt

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-invoice-saas.git
cd ai-invoice-saas
````

---

### 2. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

### 3. Setup Environment Variables

Create `.env` file in `/server`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

---

### 4. Run the application

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

```bash
cd client
npm start
```

---

## API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Clients

* GET `/api/clients`
* POST `/api/clients`
* DELETE `/api/clients/:id`

### Invoices

* GET `/api/invoices`
* POST `/api/invoices`
* PUT `/api/invoices/:id`
* DELETE `/api/invoices/:id`

### AI Invoice Generation

* POST `/api/ai/generate-invoice`

---

## Gemini AI Usage

Example prompt:

```
Create an invoice for John Doe for 3 web development services at $200 each, due in 7 days.
```

Expected response:

```json
{
  "client": "John Doe",
  "items": [
    { "name": "Web Development", "qty": 3, "price": 200 }
  ],
  "total": 600,
  "dueDate": "2026-04-21"
}
```

---

## Future Improvements

* Email invoice sending
* Analytics dashboard
* PDF invoice export

---

## Security

* Password hashing using bcrypt
* JWT authentication
* Protected API routes
* Input validation & sanitization

---

## Author

Sweta Dahal
Full-Stack Developer

```

---

