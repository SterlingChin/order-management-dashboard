# Team B Order Management API

## Overview
API service for managing customer orders.

## Quick Start

### Prerequisites
- Node.js >= 16.0.0
- MongoDB

### Installation
```bash
npm install
```

### Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

Update the environment variables as needed.

### Running the API
Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Documentation
API specification is available in `openapi.yaml`

## Available Endpoints

### Orders
- GET /api/orders - Get all orders
- POST /api/orders - Create a new order
- GET /api/orders/:id - Get order by ID
- PUT /api/orders/:id - Update an order

### Authentication
- POST /api/auth/login - Login user
- POST /api/auth/refresh - Refresh token

## Error Codes
- 200: Success
- 500: Internal Server Error

## Testing
```bash
npm test
```