***

# SpendWise API

Backend API for managing expenses and generating summaries. Built with Node.js, Express, and PostgreSQL.

---

## Setup & Run Instructions

### 1. **Clone the repository**
```bash
git clone https://github.com/developersajadur/Backend-SpendWise-Personal-Expense-Tracker-API.git
cd Backend-SpendWise-Personal-Expense-Tracker-API
```

### 2. **Install dependencies**
```bash
npm install
# or
yarn install
```

### 3. **Configure environment variables**
Create a `.env` file in the root directory and add the following variables:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/spend_wise?schema=public
PASSWORD_SALT_ROUNDS=12
JWT_TOKEN_SECRET=d9de923640386f5adbe8fc20897dfdfdfwklfjmeklwrjfkldjmnfklerdf
JWT_TOKEN_EXPIRES_IN=30d


```

### 4. **Start the server**
```bash
npm run dev
# or
yarn dev
```
The API will run at **http://localhost:5000/api/v1**.

---

## API Endpoints

### 1. Register User
**Endpoint:** `POST /users/register`

**Request Body:**
```json
{
    "name": "Sajadur Rahman Sojib",
    "email": "itzmesojib@gmail.com",
    "password": "Password@123"
}
```

**Response:**
```json
{
    "success": true,
    "statusCode": 201,
    "message": "User created successfully",
    "data": {
    "id": "394503e4-db68-4819-98ae-48b1b67b7ef1",
    "name": "Sajadur Rahman Sojib",
    "email": "itzmesojib@gmail.com",
    "password": "Sojib@123"
    "isDeleted": false,
    "isBlocked": false,
    "createdAt": "2025-10-22T18:03:28.938Z",
    "updatedAt": "2025-10-22T18:03:28.938Z",
    }
}
```


### 2. Login User
**Endpoint:** `POST /users/auth/login`

**Request Body:**
```json
{
    "email": "itzmesojib@gmail.com",
    "password": "Password@123"
}
```

**Response:**
```json
{
    "success": true,
    "statusCode": 200,
    "message": "Logged in user successfully",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0MDQ2YThiLWJmNTYtNDcwZC1hODk0LWE0ZmY4NGIxZTdhNiIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJpdHptZXNvamliQGdtYWlsLmNvbSIsImlhdCI6MTc2MTE2MDk5NSwiZXhwIjoxNzYzNzUyOTk1fQ.pcWzFv4DcBG5ljlRyt-EZOCU1d4L9oQ4cMJ51O7mgYc"
    }
}
```


### 3. Get Expense Summary
**Endpoint:** `GET /expenses/summary`

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Expense summary fetched successfully",
  "data": {
    "totalIncome": 440,
    "totalExpense": 120.5,
    "balance": 319.5,
    "balanceStatus": "Positive"
  }
}
```

### 4. Get All Expenses
**Endpoint:** `GET /expenses`

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Expenses fetched successfully",
  "data": [
    {
      "_id": "64f0c0e2f1b0a7a1c8d9f123",
      "title": "Groceries",
      "amount": 50,
      "date": "2025-10-22T00:00:00.000Z",
      "category": "Food"
    }
  ]
}
```

### 5. Add Expense
**Endpoint:** `POST /expenses/create`

**Request Body:**
```json
{
  "title": "Grocery Shopping",
  "amount": 120.50,
  "category": "FOOD",
  "type": "EXPENSE",
  "note": "Bought weekly groceries from the local market"
}
```

**Response:**
```json
{
    "success": true,
    "statusCode": 201,
    "message": "Expense created successfully",
    "data": {
        "id": "394503e4-db68-4819-98ae-48b1b67b7ef1",
        "title": "Grocery Shopping",
        "amount": 120.5,
        "category": "FOOD",
        "type": "EXPENSE",
        "note": "Bought weekly groceries from the local market",
        "isLarge": false,
        "isDeleted": false,
        "createdAt": "2025-10-22T18:03:28.938Z",
        "updatedAt": "2025-10-22T18:03:28.938Z",
        "userId": "54046a8b-bf56-470d-a894-a4ff84b1e7a6"
    }
}
```

### 6. Update Expense
**Endpoint:** `PATCH /expenses/update/:id`

**Request Body:**
```json
{
  "title": "Grocery Shopping Pro",
}
```

**Response:**
```json
{
    "success": true,
    "statusCode": 201,
    "message": "Expense Updated successfully",
    "data": {
        "id": "394503e4-db68-4819-98ae-48b1b67b7ef1",
        "title": "Grocery Shopping Pro",
        "amount": 120.5,
        "category": "FOOD",
        "type": "EXPENSE",
        "note": "Bought weekly groceries from the local market",
        "isLarge": false,
        "isDeleted": false,
        "createdAt": "2025-10-22T18:03:28.938Z",
        "updatedAt": "2025-10-22T18:03:28.938Z",
        "userId": "54046a8b-bf56-470d-a894-a4ff84b1e7a6"
    }
}
```


### 7. Delete Expense
**Endpoint:** `DELETE /expenses/delete/:id`

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Expense deleted successfully"
}
```

# Known Issues or Trade-offs
1. API rate-limiting may cause 416 Too many requests errors if refreshed too quickly.
