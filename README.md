# API Integration Demo Project

## Overview
This repository demonstrates a common scenario in API integration: Team A needs to integrate with Team B's API, but faces challenges with documentation, error handling, and consistency.

### Team Structure
- **Team A**: Frontend team building a customer dashboard
  - Modern React/TypeScript stack
  - Uses React Query for data management
  - Implements extensive error handling

- **Team B**: Backend team providing the Order Management API
  - Express/Node.js API
  - MongoDB database
  - Basic authentication implementation

## The Integration Challenge
Team B's API has several issues that make integration difficult:
1. Inconsistent error handling
2. Incorrect HTTP status codes
3. Missing or outdated documentation
4. Generic error messages
5. Authentication edge cases

## Project Structure
- `/team-a-frontend`: Team A's React application
- `/team-b-order-api`: Team B's Express API
- `/team-b-order-api/openapi.yaml`: API specification

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB
- npm or yarn

### Running Team B's API
```bash
cd team-b-order-api
npm install
npm run dev
```

### Running Team A's Frontend
```bash
cd team-a-frontend
npm install
npm run dev
```

### Environment Setup
Copy the example environment files and update as needed:

```bash
cp team-b-order-api/.env.example team-b-order-api/.env
cp team-a-frontend/.env.example team-a-frontend/.env
```

## API Documentation
The OpenAPI specification can be found in `team-b-order-api/openapi.yaml`

## Development Process
1. Team B maintains the API in the `team-b-order-api` directory
2. Team A develops the frontend in `team-a-frontend`
3. Integration issues are tracked through GitHub Issues

## Contributing
1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

## License
MIT