# 🌤️ Weather App

A beautiful, modern weather application built with HTML, CSS, and JavaScript that provides real-time weather information for cities around the world.

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions from OpenWeatherMap API
- **Global City Search**: Search for any city worldwide with country filtering
- **Dynamic Weather Icons**: Icons change based on actual weather conditions
- **Detailed Weather Information**: 
  - Current temperature
  - High/Low temperatures
  - Humidity percentage
  - Wind speed
  - Visibility
  - Atmospheric pressure
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: User-friendly error messages
- **Keyboard Navigation**: Full keyboard accessibility

## 🚀 How to Use

### Method 1: Local Development Server
1. Open your terminal/command prompt
2. Navigate to the project directory
3. Run the local server:
   ```bash
   python -m http.server 8000
   ```
4. Open your browser and go to: `http://localhost:8000`

### Method 2: Direct File Opening
1. Simply double-click the `index.html` file
2. It will open in your default web browser

## 📱 Usage Instructions

1. **Search for a City**:
   - Type a city name in the search box
   - Optionally select a country from the dropdown for more precise results
   - Press Enter or click the search button

2. **View Weather Information**:
   - Current temperature and weather condition
   - High and low temperatures for the day
   - Additional details like humidity, wind speed, visibility, and pressure

3. **Navigation**:
   - Use Tab to navigate between elements
   - Press Enter to search
   - Use arrow keys for dropdown selection

## 🎨 Design Features

- **Glassmorphism Effect**: Semi-transparent backgrounds with blur effects
- **Smooth Animations**: Fade-in effects and hover transitions
- **Responsive Layout**: Adapts to different screen sizes
- **Modern Typography**: Clean, readable fonts
- **Color-coded Icons**: Weather icons with appropriate colors

## 🔧 Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: OpenWeatherMap Weather API
- **Icons**: FontAwesome 6.4.0
- **Fonts**: Google Fonts (Montserrat)
- **No Dependencies**: Pure vanilla JavaScript

## 📁 File Structure

```
weather-app/
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── script.js           # JavaScript functionality
├── background.gif      # Background animation
├── weather.png         # Favicon
└── README.md           # This file
```

## 🌍 Supported Countries

The app includes a dropdown with popular countries:
- United States, United Kingdom, India, Canada, Australia
- Germany, France, Japan, Brazil, Mexico
- Italy, Spain, Russia, China, South Korea
- Netherlands, Sweden, Norway, Denmark

## 🔑 API Key

The app uses a free OpenWeatherMap API key. For production use, consider:
1. Getting your own API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replacing the key in `script.js` line 2
3. Implementing proper API key security measures

## 🐛 Troubleshooting

**Weather data not loading?**
- Check your internet connection
- Verify the city name spelling
- Try selecting a specific country

**Icons not showing?**
- Ensure you have an internet connection (FontAwesome is loaded from CDN)
- Check browser console for any errors

**Background not displaying?**
- Make sure `background.gif` is in the same directory as `index.html`

## 📱 Mobile Compatibility

The app is fully responsive and works great on:
- 📱 Smartphones (iOS/Android)
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large displays

## 🎯 Future Enhancements

Potential features for future versions:
- 5-day weather forecast
- Weather alerts and notifications
- Location-based weather (GPS)
- Multiple units (Celsius/Fahrenheit)
- Weather maps integration
- Dark/Light theme toggle

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy checking the weather! ☀️🌧️❄️** 