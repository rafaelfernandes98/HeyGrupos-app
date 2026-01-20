# HeyGrupos

A React Native mobile application for real-time group chat messaging, built with Firebase.

## Features

- **Authentication**: Email/password sign-in and registration via Firebase Auth
- **Chat Rooms**: Create, view, and delete group chat rooms
- **Real-time Messaging**: Instant message delivery using Firestore listeners
- **Search**: Find and discover chat groups
- **User Profiles**: Display names and user identification

## Tech Stack

- **React Native** 0.71.8
- **TypeScript** 4.8
- **Firebase**
  - Authentication
  - Firestore (real-time database)
- **React Navigation** (Stack Navigator)
- **React Native Vector Icons**

## Project Structure

```
src/
├── components/
│   ├── ChatList/       # Chat room list display
│   ├── ChatMessage/    # Individual message rendering
│   ├── FabButton/      # Floating action button
│   └── ModalNewRoom/   # Modal for creating new rooms
├── pages/
│   ├── ChatRoom/       # Main chat rooms listing
│   ├── Messages/       # Chat conversation view
│   ├── Search/         # Group search screen
│   └── SignIn/         # Authentication screen
├── routes/             # Navigation configuration
└── types/              # TypeScript type definitions
```

## Prerequisites

- Node.js (check `.node-version` for specific version)
- npm or Yarn
- React Native development environment set up
- Firebase project configured

## Installation

1. Clone the repository:
```bash
git clone https://github.com/rafaelfernandes98/HeyGrupos-app.git
cd HeyGrupos-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (macOS only):
```bash
cd ios && pod install && cd ..
```

4. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication
   - Create a Firestore database
   - Add your `google-services.json` (Android) to `android/app/`
   - Add your `GoogleService-Info.plist` (iOS) to `ios/`

## Running the App

Start the Metro bundler:
```bash
npm start
```

Run on Android:
```bash
npm run android
```

Run on iOS:
```bash
npm run ios
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start React Native development server |
| `npm run android` | Run app on Android device/emulator |
| `npm run ios` | Run app on iOS device/simulator |
| `npm run lint` | Run ESLint for code quality |
| `npm test` | Run Jest test suite |

## Firebase Data Structure

```
threads/
├── {threadId}/
│   ├── name: string
│   ├── owner: string (userId)
│   ├── lastMessage/
│   │   ├── text: string
│   │   └── created_at: timestamp
│   └── messages/
│       └── {messageId}/
│           ├── text: string
│           ├── created_at: timestamp
│           └── user/
│               ├── _id: string
│               └── displayName: string
```

## License

This project is private and not licensed for public use.
