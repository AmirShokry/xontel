Note that this project depends on pnpm workspaces.. So ensure that pnpm is installed.

# Xontel - HR Feedback System & one-one chat

A monorepo featuring web and mobile applications built with React and React Native. Designed for handling conversations and collecting structured feedback with real-time capabilities powered by Firebase.


 
## 🏗️ Monorepo Structure

This project uses **pnpm workspaces** and **Turbo** for efficient monorepo management:

```
xontel/
├── apps/                    # Application packages
│   ├── web/                # React + Vite web application
│   └── mobile/             # React Native + Expo mobile application
├── packages/               # Shared libraries & utilities
│   ├── firebase/           # Firebase configuration & utilities
│   ├── shared/             # Shared types & constants
│   └── typescript-config/  # Shared TypeScript configurations
├── turbo.json             # Turbo build orchestration config
├── pnpm-workspace.yaml    # pnpm workspaces configuration
└── package.json           # Root package configuration
```

## 🎯 Applications & Packages

### Applications

#### **Web Application** (`apps/web`)

**Key Features:**

- Responsive chat interface with message listings and sending capabilities
- Feedback analytics with chart visualizations
- Real-time message subscriptions
- Search and filter capabilities

**Tech Stack:**

- React 19 - Vite
- React Router 7
- TypeScript
- Tailwindcss & Shadcn
- Rechart.js

---

#### **Mobile Application** (`apps/mobile`)

**Key Features:**

- Real-time messaging interface
**Tech Stack:**

- React native & expo
- NativeWind 4 (Tailwind for React Native)

---

### Packages

#### **Firebase Package** (`packages/firebase`)

Centralized Firebase configuration and utilities for backend integration.

**Purpose:**

- Unified Firebase initialization and management

**Used by:** Web and Mobile applications

---

#### **Shared Package** (`packages/shared`)

Centralized location for shared types and constants across applications.

**Purpose:**

- TypeScript type definitions for chat and feedback domains
- Environment constants and configuration
- Shared utility types to ensure consistency

**Contents:**

- `types/chat.ts` - Chat and conversation type definitions
- `constants/index.ts` - Shared application constants

**Used by:** Web and Mobile applications

## 📦 Key Dependencies

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **NativeWind** - Bridges Tailwind CSS to React Native
- **shadcn/ui** - Copy-paste component library based on Radix UI and Tailwind CSS
- **Lucide React** - Beautiful icon library

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher
- **pnpm** 8.15.6 or higher (included as workspace dependency)
  ```bash
  npm install -g pnpm@8.15.6
  ```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

This command installs dependencies for all packages and applications in the monorepo using pnpm's efficient workspace linking.

### 2. Set Up Environment Variables

Create `.env` files at the root of each application

```bash
# apps/web/.env
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
... so on
# apps/mobile/.env
EXPO_FIREBASE_API_KEY=your_key_here
EXPO_FIREBASE_AUTH_DOMAIN=your_domain_here

```

### Development

```bash
# Run all applications in development mode
pnpm run dev

# Run only the web application
pnpm run web

# Run only the mobile application (Expo)
pnpm run mobile
```
