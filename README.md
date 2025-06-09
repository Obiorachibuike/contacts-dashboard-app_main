# Contacts Dashboard App

A React Native application built with Expo that allows users to manage contacts, mark favorites, and view usage statistics.

## Features

- **Contacts List**: Fetch and display 10 random users from randomuser.me API
- **Contact Details**: View detailed information and toggle favorite status
- **Favorites Management**: Persistent storage of favorite contacts using AsyncStorage
- **Statistics Dashboard**: Visual representation of favorite actions over time
- **Search Functionality**: Filter contacts by name
- **Export Feature**: Export favorites to JSON file
- **Responsive Design**: Works on both iOS and Android

## Tech Stack

- React Native (Expo)
- TypeScript
- React Navigation (Bottom Tabs + Stack)
- AsyncStorage for persistent data
- Expo File System for file operations
- Custom SVG-like charts

## Project Structure

\`\`\`
contacts-dashboard-app/
├── screens/
│   ├── ContactsListScreen.tsx
│   ├── ContactDetailScreen.tsx
│   ├── FavoritesScreen.tsx
│   └── StatsScreen.tsx
├── components/
│   ├── ContactCard.tsx
│   └── Graph.tsx
├── utils/
│   ├── storage.tsx
│   └── timestampTracker.ts
├── App.tsx
├── package.json
├── app.json
├── tsconfig.json
├── codemagic.yml
└── README.md
\`\`\`

## Installation & Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd contacts-dashboard-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npx expo start
   \`\`\`

4. **Run on device/simulator**
   - For iOS: Press \`i\` in the terminal or scan QR code with Camera app
   - For Android: Press \`a\` in the terminal or scan QR code with Expo Go app

## Building APK

### Using Expo EAS

1. **Install EAS CLI**
   \`\`\`bash
   npm install -g @expo/eas-cli
   \`\`\`

2. **Login to Expo**
   \`\`\`bash
   eas login
   \`\`\`

3. **Configure build**
   \`\`\`bash
   eas build:configure
   \`\`\`

4. **Build APK**
   \`\`\`bash
   eas build --platform android --profile preview
   \`\`\`

### Using Codemagic CI/CD

This project includes a `codemagic.yml` configuration file for automated builds:

1. Set up a Codemagic account and connect your repository
2. Configure the environment variables:
   - `EXPO_USERNAME`
   - `EXPO_PASSWORD`
   - `EXPO_PROJECT_ID`
3. Set up Android signing keys in Codemagic
4. Trigger a build manually or on push to the main branch

## Key Features Implementation

### 1. Contacts List Screen
- Fetches 10 users from randomuser.me API
- Displays profile picture, name, and email
- Includes search functionality
- Navigation to contact details

### 2. Contact Detail Screen
- Shows full contact information
- Toggle favorite status with persistent storage
- Tracks timestamp for statistics
- Visual feedback for favorite status

### 3. Favorites Screen
- Loads favorites from AsyncStorage independently
- No props or global state used
- Export functionality to JSON file
- Real-time updates when screen is focused

### 4. Stats Screen
- Bar chart showing favorites added per hour (last 6 hours)
- Custom chart component built with React Native Views
- Hourly breakdown table
- Real-time data updates

### 5. Persistent Storage
- AsyncStorage for favorites and timestamps
- File system integration for export feature
- No Redux or Context API used as per requirements

## API Integration

The app uses the Random User API:
- Endpoint: \`https://randomuser.me/api/?results=10\`
- Fetches 10 random users with complete profile information
- Handles loading states and error scenarios

## Data Persistence

### Favorites Storage
- Stored in AsyncStorage with key 'favorites'
- JSON format with complete contact objects
- Independent loading in each screen

### Timestamp Tracking
- Records hour and full timestamp for each favorite action
- Used for generating hourly statistics
- Filters data for last 6 hours

## Navigation Structure

\`\`\`
Bottom Tab Navigator
├── Contacts Tab
│   └── Stack Navigator
│       ├── Contacts List Screen
│       └── Contact Detail Screen
├── Favorites Tab
│   └── Favorites Screen
└── Stats Tab
    └── Stats Screen
\`\`\`

## Performance Considerations

- Efficient FlatList rendering for contact lists
- Optimized image loading with thumbnail/large variants
- Minimal re-renders with proper state management
- Async operations with proper error handling

## Future Enhancements

- Dark mode support
- Pull-to-refresh functionality
- Contact synchronization
- Advanced filtering options
- Push notifications for favorites

## Dependencies

- \`@react-navigation/native\`: Navigation framework
- \`@react-navigation/bottom-tabs\`: Bottom tab navigation
- \`@react-navigation/stack\`: Stack navigation
- \`@react-native-async-storage/async-storage\`: Local storage
- \`expo-file-system\`: File operations
- \`@expo/vector-icons\`: Icon library

## CI/CD

The project uses Codemagic for continuous integration and delivery:
- Automated builds for Android and iOS
- Multiple workflow configurations
- Environment variable management
- Artifact publishing

## License

This project is created for assessment purposes.
\`\`\`
