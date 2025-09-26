# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

RuralAarogya ("Nabha Healthcare Platform") is a React Native application built with Expo that provides telemedicine services for rural communities, specifically designed to connect 173 villages in the Nabha region with quality healthcare services.

The app serves multiple user types through dedicated portals:
- **Patients**: Rural patients accessing healthcare services
- **Hospital Staff**: Civil Hospital medical staff dashboard
- **ASHA Workers**: Community health workers (Accredited Social Health Activists)
- **Health Department**: Punjab Health Department oversight
- **Pharmacy**: Local pharmacy inventory management

## Development Commands

### Core Development Commands
```bash
# Start the development server (Expo Go)
npm start

# Run on Android emulator/device
npm run android

# Run on iOS simulator/device (macOS only)
npm run ios

# Run in web browser
npm run web
```

### Additional Useful Commands
```bash
# Install dependencies
npm install

# Clear Expo cache if needed
npx expo start --clear

# Generate APK for testing
npx expo build:android

# Check for Expo SDK compatibility
npx expo doctor
```

## Architecture Overview

### File Structure
- `App.js` - Main application component with authentication routing and dashboard rendering
- `components/` - Feature-specific components organized by user type
  - `auth/` - Authentication and login components
  - `patient/`, `hospital/`, `asha/`, `health-dept/`, `pharmacy/` - Role-specific dashboards and features
  - `ui/` - Reusable UI components (comprehensive component library)
- `styles/` - Theme system with light/dark mode support and typography
- `utils/` - Utility functions and Supabase integration

### Key Architectural Patterns

1. **Role-Based UI Routing**: The app uses a central routing system in `App.js` that renders different dashboards based on the authenticated user's type (`userType` field).

2. **Theme System**: Comprehensive theming system in `styles/` directory with:
   - `ThemeProvider` for context-based theme management
   - Support for light/dark themes
   - Themed styles and typography utilities
   - Global styles for layout, spacing, borders, shadows

3. **Authentication Flow**: Demo-based authentication using AsyncStorage for persistence:
   - Multi-portal selection screen
   - Form-based login with role selection
   - Session management with AsyncStorage

4. **Component Organization**: Components are organized by user role rather than by feature type, allowing for role-specific customization while maintaining shared UI components.

### State Management
- Uses React hooks and local state management
- AsyncStorage for user session persistence
- No external state management library (Redux/Zustand) - relies on React Context for theme management

### Data Layer
- Currently uses demo/mock data
- Prepared for Supabase integration (see `utils/supabase/`)
- AsyncStorage for local data persistence

## Technology Stack

- **Framework**: React Native with Expo SDK ~54.0.10
- **React Version**: 19.1.0
- **Key Dependencies**:
  - `@react-native-async-storage/async-storage` - Local data storage
  - `react-native-safe-area-context` - Safe area handling
  - `expo-status-bar` - Status bar management

### Platform Support
- **Primary**: Android and iOS mobile platforms
- **Secondary**: Web platform (Expo web support)
- **Architecture**: Expo New Architecture enabled (`newArchEnabled: true`)

## Development Notes

### User Type System
The application's core routing is based on five user types:
- `patient` - Rural patients
- `hospital` - Civil Hospital staff  
- `asha` - ASHA community health workers
- `health_dept` - Punjab Health Department
- `pharmacy` - Local pharmacies

When adding new features, ensure they are properly categorized and routed based on these user types.

### Theme Integration
When creating new components, use the theming system:
```javascript
import { useTheme, useThemedStyles } from '../styles';

const { currentTheme } = useTheme();
const styles = useThemedStyles((theme) => StyleSheet.create({
  // themed styles here
}));
```

### AsyncStorage Usage
User sessions are managed through AsyncStorage with the key `nabha_user`. The stored user object contains:
- `id`, `email`, `name`, `userType`, `accessToken`

### Demo Mode
The application currently operates in demo mode - any email/password combination works for authentication. This is clearly indicated in the UI and should be replaced with proper authentication when integrating with backend services.