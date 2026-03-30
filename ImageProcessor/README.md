# ImageProcessor — High-Performance Native Image Editor

A premium React Native mobile application built for high-performance image filtering and intelligent location-based contextualization. This project was developed as a technical machine test submission, focusing on **native engine performance**, **modular architecture**, and **premium user experience**.

---

## 🚀 Key Features

### 1. High-Performance Live Filtering (Native Skia Engine)

Instead of processing images on the JavaScript thread (which can be slow and laggy), this app utilizes the **@shopify/react-native-skia** native engine.

- Filters are rendered directly on the GPU for instant, lag-free previews.
- **Filters included**: Original, Grayscale, Blur, and Sepia.
- **Technical Excellence**: Implemented a stable "Underlay Rendering Strategy" to overcome common JSI/Hermes thread conflicts when transitioning between standard Image and Skia Canvas components.

### 2. Intelligent Contextual Location Awareness

The app automatically detects the user's location and performs **reverse geocoding** (via OpenStreetMap/Nominatim) to provide a descriptive title for the image.

- Dynamically translates raw coordinates into human-readable city/country names.
- Contextual image titles that update based on geographic data.

### 3. Premium Design System

- **Rich Aesthetics**: A dark-mode first design with a violet-to-cyan color palette.
- **Glassmorphism**: Translucent UI elements with background blur for a high-end, premium feel.
- **Micro-animations**: Smooth transitions and interactive filter chips for an engaging user experience.

---

## 🛠️ Tech Stack & Architecture

- **Core**: React Native (0.73.6) with TypeScript.
- **Engine**: @shopify/react-native-skia (for GPU-accelerated graphics).
- **Navigation**: Structured as a clean single-screen application with modular components.
- **State Management**: Optimized React Hooks for predictable UI state.
- **Image Handling**: react-native-image-picker for seamless gallery access.
- **Location**: @react-native-community/geolocation for precise GPS data.

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (>= 18)
- Xcode (for iOS) or Android Studio (for Android)
- CocoaPods (`sudo gem install cocoapods`)

### Steps

1. **Clone and Install**

   ```bash
   npm install
   ```

2. **Setup iOS Native Modules**

   ```bash
   cd ios && pod install && cd ..
   ```

3. **Start the Development Server**

   ```bash
   npx react-native start --reset-cache
   ```

4. **Run on Emulator/Device**
   ```bash
   npx react-native run-ios   # For iOS
   npx react-native run-android # For Android
   ```

Developed by Mohamed Akmal
