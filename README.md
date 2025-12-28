# Metal Calculator

A comprehensive web application designed for metal import-export companies to accurately calculate net metal weight by automatically deducting bag weight and mixed metal content. This application streamlines weight calculations, reduces manual errors, and provides an intuitive interface for data input and visualization.

## 🎯 Project Overview

Metal Calculator is a full-stack web application that helps metal trading companies calculate the actual net weight of metal shipments. The application automatically accounts for:

- **Bag weights** (Jumbo bags and Small bags)
- **Wastage** (handling and processing losses)
- **Mixed metal content** (other metals found in the shipment)

This ensures accurate weight calculations for billing, inventory management, and business operations.

## ✨ Features

- **Intuitive User Interface**: Clean and user-friendly interface built with modern web technologies
- **Accurate Weight Calculations**: Automatically calculates net metal weight by deducting:
  - Jumbo bag weight (calculated as: number of bags × 3 kg)
  - Small bag weight (calculated as: number of bags ÷ 5)
  - Manual wastage input
  - Mixed/other metal weights
- **Multiple Metal Types**: Support for 39+ different metal types including:
  - Various Copper grades
  - Brass types
  - Aluminium variants
  - Stainless Steel grades 
  - Lead, Zinc, and Battery types
  - And more
- **Real-time Summary**: Displays grand weight, grand wastage, and net metal weight in real-time
- **Entry Management**: Add, view, and delete metal entries with detailed information
- **Other Metals Tracking**: Track multiple mixed metals within a single entry
- **Data Persistence**: Backend API with database integration for data storage

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework for production
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Material-UI (MUI)** - React component library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **TypeScript** - Type-safe backend code

## 📁 Project Structure

```
MetalCal/
├── my-app/                 # Frontend Next.js application
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   │   ├── Accordion.tsx
│   │   ├── MetalEntryField.tsx
│   │   ├── SummaryField.tsx
│   │   └── ...
│   ├── context/           # React context for state management
│   ├── data/              # Static data (metal list)
│   ├── functions/         # Utility functions
│   └── Type/              # TypeScript type definitions
│
└── backend/               # Express.js backend
    ├── controllers/       # Request handlers
    ├── routes/            # API routes
    ├── lib/               # Utility libraries (Prisma client)
    ├── prisma/            # Prisma schema and migrations
    └── data/              # Data files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MetalCal
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd my-app
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up Environment Variables**

   Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL="postgresql://username:yourPassword@localhost:5432/yourDB"
   PORT=8000
   NODE_ENV=development
   ```

5. **Set up the Database**
   ```bash
   cd backend
   npx prisma generate
   npx prisma migrate dev
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:8000`

2. **Start the Frontend Development Server**
   ```bash
   cd my-app
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to use the application

## 📊 How It Works

### Weight Calculation Logic

1. **Input**: User enters the gross weight of metal shipment
2. **Bag Weight Deduction**:
   - Jumbo Bag Weight = Number of Jumbo Bags × 3 kg
   - Small Bag Weight = Number of Small Bags ÷ 5
3. **Other Metals**: Subtract weights of any mixed metals found
4. **Wastage**: Subtract manually entered wastage
5. **Output**: Net Metal Weight = Gross Weight - (Bag Weights + Wastage + Other Metals)

### Example Calculation

```
Gross Weight: 1000 kg
Jumbo Bags: 10 (10 × 3 = 30 kg)
Small Bags: 50 (50 ÷ 5 = 10 kg)
Wastage: 5 kg
Other Metals: 20 kg

Net Metal Weight = 1000 - (30 + 10 + 5 + 20) = 935 kg
```

## 🔌 API Endpoints

### Entry List API

- `GET /api/entryList` - Get all entries
- `GET /api/entryList/:id` - Get a single entry by ID
- `POST /api/entryList` - Create a new entry
- `DELETE /api/entryList/:id` - Delete an entry by ID
- `DELETE /api/entryList` - Delete all entries

### Metal List API

- `GET /api/metalList` - Get list of available metals

## 🧪 Development

### Build for Production

**Frontend:**
```bash
cd my-app
npm run build
npm start
```

**Backend:**
```bash
cd backend
npm start
```


## 👨‍💻 Development

Developed for metal import-export companies to streamline weight calculation processes and reduce manual calculation errors.

---

For questions or support, please contact the development team.

