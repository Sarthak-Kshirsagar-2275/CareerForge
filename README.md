# CareerForge

CareerForge is an AI-powered career guidance platform that helps students and professionals discover suitable career paths based on their education, interests, skills, and goals.

The platform analyzes user input and generates:

- Personalized career recommendations
- Step-by-step career roadmaps
- Recommended skills to learn
- Curated learning resources

---

# Features

## Career Recommendation System

Users enter:

- Education Level
- Interests
- Existing Skills
- Career Goals

CareerForge uses Google's Gemini API to analyze the information and suggest a suitable career path.

---

## Personalized Roadmap

The platform generates a structured roadmap that guides users through:

- Skills to learn
- Technologies to study
- Learning progression
- Career growth path

---

## Resource Hub

The Resources page provides learning resources categorized by field.

Users can click resource cards that automatically open Google searches with pre-built search prompts, helping them quickly find relevant tutorials, courses, and documentation.

---

## Modern User Interface

- Responsive design
- Animated hero section
- Interactive loading screen
- Clean card-based layout
- Local storage support for saved results

---

# Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Node.js
- Express.js

## AI Integration

- Google Gemini API (Gemini 2.5 Flash)

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/Sarthak-Kshirsagar-2275/CareerForge.git
cd CareerForge
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

This project requires a Gemini API key.

Create a file named:

```text
.env
```

in the root directory of the project.

Add the following:

```env
API_KEY=YOUR_GEMINI_API_KEY
```

Example:

```env
API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
```

---

# Obtaining a Gemini API Key

1. Visit Google AI Studio
2. Create a Gemini API key
3. Copy the generated key
4. Paste it into your `.env` file

---

# Running the Project

Start the server:

```bash
node server.js
```

You should see:

```text
Server running on http://localhost:3000
```

Open:

```text
http://localhost:3000
```

in your browser.

---

# Project Structure

```text
CareerForge
│
├── index.html
├── about.html
├── resources.html
│
├── styles.css
├── script.js
│
├── server.js
│
├── package.json
├── package-lock.json
│
├── .gitignore
├── .env
│
└── node_modules
```

---

# Important Files

## server.js

Backend server built using:

- Node.js
- Express.js

Responsibilities:

- Receives prompts from the frontend
- Sends requests to Gemini API
- Returns AI-generated career recommendations

---

## index.html

Main page containing:

- User input form
- Career generation system
- Results display section

---

## resources.html

Provides educational resources and search shortcuts for various career paths.

---

## about.html

Contains project information, purpose, and contributor details.

---

# Local Development Notes

Before running locally, ensure:

- Node.js is installed
- npm is installed
- `.env` file exists
- Valid Gemini API key is provided

---

# Security

The following files should NEVER be committed to GitHub:

```text
.env
node_modules/
```

Current `.gitignore` should include:

```gitignore
.env
node_modules/
```

---

# Contributors

## Sarthak Kshirsagar

### Frontend

- Home Page HTML
- Home Page CSS
- Resources Page HTML
- Resources Page CSS

### Backend

- Node.js Server Setup
- Express.js Integration
- Gemini API Integration

---

## Aditya

### JavaScript Development

- Home Page JavaScript
- Resources Page JavaScript

---

## Darsh

### Frontend

- About Page HTML
- About Page CSS

---

# Future Improvements

Potential future additions:

- User authentication
- Career history tracking
- PDF export for roadmaps
- More detailed resource recommendations
- Career comparison system
- Dark mode
- AI-powered career trend analysis
- User dashboard

---

# License

This project was developed for educational and learning purposes.

---

# Acknowledgements

- Google Gemini API
- Node.js
- Express.js
- Open-source web development community
