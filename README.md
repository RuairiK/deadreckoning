# Dead Reckoning

![Dead Reckoning Logo](https://img.shields.io/badge/Dead_Reckoning-Aviation_Risk_Calculator-blue)

A cheeky, aviation-themed "How Likely Are You To Die Flying?" calculator, built as a fun marketing tool for AeroBooker, an aircraft booking platform for flying clubs.

## 🛫 Overview

The "Dead Reckoning" calculator asks pilots for aviation-related information and uses a tongue-in-cheek formula to estimate their "chance of dying per flight hour." The calculator features:

- Darkly humorous, but respectful and fun content that pilots love
- Risk calculations loosely based on real-world general aviation accident data
- Shareable results with social media integration
- A survival probability graph showing chances over time
- A playful plug for AeroBooker at the end

## 🧮 How It Works

The calculator takes into account:

- Flight hours
- Instrument rating status
- Aircraft type
- Whether the pilot flies with an instructor
- Whether the pilot flies in mountains
- Whether the pilot owns or rents aircraft
- The pilot's self-assessment of skill

It then applies modifiers to a base accident rate (~1.05 fatal accidents per 100,000 hours) to calculate a personalized risk factor.

## 🛠️ Tech Stack

- React with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Recharts for data visualization
- React-Share for social sharing capabilities

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/dead-reckoning.git
   cd dead-reckoning
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory.

## 📝 Note

This is a humorous tool and not intended to provide actual safety risk assessments. All calculations are approximate and exaggerated for entertainment purposes.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Credits

Created by AeroBooker as a fun marketing tool for aviation enthusiasts and flying clubs.
