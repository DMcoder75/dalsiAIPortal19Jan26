# DalSi AI Portal - Setup Summary

## Project Overview

The **DalSi AI Portal** is a comprehensive AI-powered web application featuring text and vision AI models, user authentication, chat management, and subscription-based services. The project has been successfully cloned and configured.

---

## ✅ Completed Setup Steps

### 1. Repository Cloned
- **Source**: `https://github.com/DMcoder75/dalsiAIPortal17Nov25`
- **Location**: `/home/ubuntu/dalsiAIPortal17Nov25`
- **Status**: ✅ Successfully cloned (426 objects, 84.46 MiB)

### 2. Environment Configuration
- **File Created**: `.env`
- **Database Credentials**: Configured with Supabase
  - URL: `https://uhgypnlikwtfxnkixjzp.supabase.co`
  - Anon Key: Configured ✅
  - Database URL: PostgreSQL connection string configured
  - API Base URL: `https://api.neodalsi.com`

### 3. Firebase Configuration
- **Service Account**: `innate-temple-337717-firebase-adminsdk-fbsvc-7f004c6c72.json` ✅
- **Project ID**: `innate-temple-337717`
- **Firebase Config**: Already configured in `src/lib/firebase.js`

### 4. Dependencies Installed
- **Main Project**: ✅ 564 packages installed (using `--legacy-peer-deps`)
- **Firebase Functions**: ✅ 526 packages installed
- **Note**: Minor peer dependency conflicts resolved

### 5. Development Server
- **Status**: ✅ Tested and working
- **Port**: 5173 (or 5174 if 5173 is occupied)
- **Framework**: Vite + React 18

---

## 📁 Project Structure

```
dalsiAIPortal17Nov25/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ChatInterface.jsx
│   │   ├── AuthModal.jsx
│   │   └── Navigation.jsx
│   ├── contexts/           # React contexts (AuthContext)
│   ├── lib/                # Utility libraries
│   │   ├── auth.js
│   │   ├── dalsiAPI.js
│   │   ├── supabase.js
│   │   ├── firebase.js
│   │   └── usageTracking.js
│   ├── pages/              # Page components
│   ├── services/           # API services
│   └── main.jsx
├── functions/              # Firebase Functions (email verification)
├── public/                 # Static assets
├── .env                    # Environment variables ✅
├── package.json
└── vite.config.js
```

---

## 🔧 Configuration Files

### Environment Variables (`.env`)
```env
VITE_SUPABASE_URL=https://uhgypnlikwtfxnkixjzp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL="postgresql://postgres:D@lveer@123@db.uhgypnlikwtfxnkixjzp.supabase.co:5432/postgres"
DB_USER=postgres.uhgypnlikwtfxnkixjzp
DB_PASSWORD=D@lveer@123
DB_HOST=aws-1-ap-southeast-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
VITE_API_BASE_URL=https://api.neodalsi.com
```

### Firebase Configuration
- **Project**: innate-temple-337717
- **Hosting**: Firebase Hosting
- **Functions**: Email verification service
- **Service Account**: Configured ✅

---

## 📊 Database Information

### Supabase Database
- **URL**: `https://uhgypnlikwtfxnkixjzp.supabase.co`
- **Region**: Asia South 2
- **Connection Type**: PostgreSQL

### Key Tables (from schema)
- `users` - User accounts and authentication
- `chats` - Chat conversations
- `messages` - Chat messages
- `ai_models` - AI model configurations
- `subscription_plans` - Subscription tiers (5 plans: Free, Starter, Explorer, Pro, Enterprise)
- `api_keys` - API key management
- `api_usage_logs` - Usage tracking
- `billing_invoices` - Billing and invoices

### Subscription Plans Available
1. **Free** - $0/month (5 queries/day)
2. **Starter** - $29/month (1,000 queries/month)
3. **Explorer** - $89/month (10,000 queries/month, includes Vision AI)
4. **Pro** - $199/month (50,000 queries/month, full suite)
5. **Enterprise** - Custom pricing (unlimited)

---

## 🚀 Available Commands

### Development
```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Firebase Functions
```bash
cd functions
npm install          # Install function dependencies
```

### Deployment
```bash
npm run build                    # Build the project
firebase deploy --only hosting  # Deploy to Firebase Hosting
firebase deploy --only functions # Deploy Firebase Functions
```

---

## 🔐 Authentication System

### Features
- User registration with email verification
- Secure login with persistent sessions
- Guest user support with message migration
- Password reset functionality
- Session management via Supabase

### Email Service
- **Provider**: Firebase Functions + Gmail SMTP
- **Email**: dalsiainoreply@gmail.com
- **Function**: Email verification

---

## 🤖 AI Models

### DalSi AI (Text Model)
- **Endpoint**: `https://dalsiai-106681824395.asia-south2.run.app`
- **Access**: Free tier available
- **Features**: Text generation, conversation

### DalSi AI-Vi (Vision Model)
- **Endpoint**: `https://dalsiaivi-service-594985777520.asia-south2.run.app`
- **Access**: Subscription required (Explorer tier and above)
- **Features**: Image analysis, multimodal processing

---

## 📚 Additional Documentation

### Uploaded Files
1. **pasted_content.txt** - Complete database schema (722 lines)
2. **subscription_plans_rows(1).sql** - Subscription plan data
3. **PORTAL_INTEGRATION_GUIDE.md.pdf** - Backend API documentation (33 pages)
   - Friction Management APIs
   - Priority Queue APIs
   - Conversion Analytics APIs
   - Authentication with X-API-Key header
4. **innate-temple-337717-firebase-adminsdk-fbsvc-7f004c6c72.json** - Firebase service account

### API Integration Guide Highlights
- **Base URL**: `https://api.neodalsi.com`
- **Authentication**: X-API-Key header required
- **Demo Key**: `demo_key_UID1` (for testing)
- **Endpoints**:
  - `/api/friction/check` - Check if friction UI should show
  - `/api/friction/action` - Log friction actions
  - `/api/queue/status` - Queue status
  - Analytics endpoints for conversion tracking

---

## ⚠️ Known Issues & Notes

### Dependency Warnings
- ESLint peer dependency conflict (resolved with `--legacy-peer-deps`)
- 4 vulnerabilities in main project (3 moderate, 1 high)
- 3 vulnerabilities in functions (2 moderate, 1 high)
- Node version warning in functions (requires Node 18, current is 22.13.0)

### Recommendations
1. Run `npm audit fix` to address security vulnerabilities
2. Consider downgrading Node to v18 for Firebase Functions compatibility
3. Review and update ESLint configuration for v9 compatibility

---

## 🎨 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- shadcn/ui components
- Lucide React icons
- React Router for navigation

### Backend & Services
- Supabase (PostgreSQL database)
- Firebase Hosting (deployment)
- Firebase Functions (email verification)
- DalSi AI APIs (text & vision models)

### Key Dependencies
- `@supabase/supabase-js` - Database client
- `firebase` - Firebase SDK
- `react-router-dom` - Routing
- `recharts` - Analytics charts
- `bcryptjs` - Password hashing

---

## 🔗 Important URLs

- **Production**: https://innate-temple-337717.web.app
- **API Base**: https://api.neodalsi.com
- **Supabase**: https://uhgypnlikwtfxnkixjzp.supabase.co
- **Text AI**: https://dalsiai-106681824395.asia-south2.run.app
- **Vision AI**: https://dalsiaivi-service-594985777520.asia-south2.run.app

---

## ✅ Next Steps

1. **Start Development Server**
   ```bash
   cd /home/ubuntu/dalsiAIPortal17Nov25
   npm run dev
   ```

2. **Test the Application**
   - Open browser to `http://localhost:5173`
   - Test user registration and login
   - Test chat interface with AI models
   - Verify database connections

3. **Review Integration Guide**
   - Check PORTAL_INTEGRATION_GUIDE.md.pdf for API details
   - Implement friction management if needed
   - Set up conversion analytics

4. **Deploy to Production**
   ```bash
   npm run build
   firebase deploy
   ```

5. **Database Setup**
   - Verify all tables exist in Supabase
   - Run subscription_plans_rows(1).sql if needed
   - Check user permissions and RLS policies

---

## 📞 Support

- **Email**: info@neodalsi.com
- **Website**: https://innate-temple-337717.web.app

---

**Setup completed successfully! ✅**

*Generated: November 20, 2025*
