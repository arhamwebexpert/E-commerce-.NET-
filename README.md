# 🛒 E-commerce Platform

This repository contains both the **backend API** (built with ASP.NET Core) and the **frontend application** (built with React and TypeScript) for a full-featured E-commerce platform.

---

## 📦 Technologies Used

### Backend
- ASP.NET Core 8.0
- Entity Framework Core
- SQL Server
- Docker
- Prometheus for monitoring

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- Redux Toolkit
- React Router
- Axios

---

## 🗂 Project Structure

```
E-commerce/
├── Controllers/         # Backend API Controllers
├── Models/              # Domain Models
├── Data/                # EF Core DbContext and configurations
├── Migrations/          # Database Migrations
├── Properties/          # Application Properties
├── wwwroot/             # Static Files
├── client-app/          # Frontend React App
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── store/       # Redux store configuration
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Utility functions
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
```

---

## 🚀 Getting Started

### Backend Setup

#### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- SQL Server (or Docker)
- Docker (optional for containerized deployment)

#### Steps

1. Clone the repository and navigate to the root:
   ```bash
   git clone <repo-url>
   cd E-commerce
   ```

2. Update the database connection string in `appsettings.json`.

3. Restore, build, and run the backend:
   ```bash
   dotnet restore
   dotnet build
   dotnet run
   ```

4. Run EF Core migrations to set up the database:
   ```bash
   dotnet ef database update
   ```

### Frontend Setup

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

#### Steps

1. Navigate to the frontend directory:
   ```bash
   cd client-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file with the following:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. The app will be available at: `http://localhost:3000`

---

## 🐳 Docker Deployment

To deploy both backend and database using Docker:

```bash
docker-compose up -d
```

Ensure your `Dockerfile` and `compose.yaml` are configured correctly for both the backend and the database.

---

## 📡 API Endpoints

- `GET /api/products` - Manage products  
- `GET /api/categories` - Manage categories  
- `GET /api/orders` - Manage orders  
- `GET /api/users` - Manage users  

Metrics available at `/metrics` (for Prometheus monitoring).

---

## 🎨 Features

- 🔐 User authentication & JWT-based authorization
- 🛍 Product browsing & filtering
- 🛒 Shopping cart & checkout
- 📦 Order management
- 👤 User profile & account settings
- 📱 Responsive UI
- 📊 Monitoring with Prometheus

---

## 🧪 Testing & Code Style

### Frontend

- Run tests:
  ```bash
  npm test
  ```

- Lint & format code:
  ```bash
  npm run lint
  npm run format
  ```

- Type checking:
  ```bash
  npm run type-check
  ```

---

## 🔧 Environment Configuration

### Backend (`appsettings.json`)

```json
"ConnectionStrings": {
  "DefaultConnection": "your_connection_string"
},
"Jwt": {
  "Key": "your_jwt_secret",
  "Issuer": "your_jwt_issuer",
  "Audience": "your_jwt_audience"
}
```

### Frontend (`.env`)

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/feature-name`)  
3. Make your changes  
4. Commit your changes (`git commit -m "Add feature"`)  
5. Push to your fork (`git push origin feature/feature-name`)  
6. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.
