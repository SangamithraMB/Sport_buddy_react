# SportBuddy Frontend

SportBuddy is a web application that helps users find fitness buddies and local sports activities. This repository contains the frontend built using React.

## Features
- User authentication (Login/Logout)
- Interactive map for discovering playdates
- Real-time chat using WebSockets
- Responsive and modern UI with Tailwind CSS

## Tech Stack
- **Frontend:** React, JavaScript, Tailwind CSS
- **State Management:** React Context API
- **Real-time Communication:** WebSockets
- **Map Integration:** Leaflet
- **Authentication:** JWT
- **Deployment:** Render (Free Tier)

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.0.0)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sportbuddy-frontend.git
   ```
2. Navigate to the project folder:
   ```bash
   cd sport_buddy_react
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the necessary environment variables:
   ```env
   sport_buddy_APP_BACKEND_URL=http://localhost:5000
   REACT_APP_MAPBOX_ACCESS_TOKEN=your_mapbox_token
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:5173` in your browser.

## Folder Structure
```
.
├── public          # Static assets
├── src
│   ├── components # Reusable UI components
│   ├── Sevices    # Service components
│   ├── styles     # Global styles
│   ├── App.jsx    # Root component
│   └── main.jsx   # Entry point
├── .env           # Environment variables
├── package.json   # Project dependencies
└── README.md      # Project documentation
```

## Deployment
This project is deployed on Render. To deploy manually:
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder to your hosting provider.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries or feedback, feel free to reach out!

