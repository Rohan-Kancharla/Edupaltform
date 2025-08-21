# 🌊 Waves Learning Platform

A comprehensive, interactive web application for learning wave physics through simulations, animations, and interactive content.

## 🚀 Features

### **🎓 Educational Content**
- **Wave Fundamentals** - Complete theory and concepts
- **Transverse Waves** - Detailed explanations and simulations
- **Longitudinal Waves** - Comprehensive coverage with examples
- **Mathematical Foundation** - Wave equations and formulas
- **Real-World Applications** - Practical examples and use cases

### **🧪 Interactive Simulations**
- **Single Wave Simulation** - Adjustable amplitude, frequency, phase, and speed
- **Two-Wave Interference** - Visualize wave superposition
- **Standing Wave Simulation** - Explore harmonic patterns
- **Real-time Controls** - Interactive parameter adjustment
- **Visual Features** - Grid, markers, and animation controls

### **📚 Learning Tools**
- **Comprehensive Quiz System** - 10 questions with detailed explanations
- **Side Navigation** - Easy topic switching
- **Responsive Design** - Works on all devices
- **Professional UI/UX** - Clean, modern interface

### **🔐 User Authentication**
- **Secure Login System** - Email and password validation
- **Persistent Sessions** - Stay logged in across page reloads
- **Protected Routes** - Secure access to course content

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS3 with CSS Variables
- **Canvas API**: HTML5 Canvas for simulations
- **State Management**: React Hooks
- **Package Manager**: npm

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rohan-Kancharla/Edupaltformractice.git
   cd Edupaltformractice/waves-waves
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🚀 Usage

### **Getting Started**
1. **Login** with your credentials (email must contain '@', password: 8+ chars, 1 uppercase, 1 number)
2. **Access Dashboard** to view available courses
3. **Click on Waves Course** to start learning
4. **Navigate Topics** using the sidebar navigation
5. **Use Simulations** to experiment with wave parameters
6. **Take Quiz** to test your understanding

### **Interactive Features**
- **Adjust Wave Parameters**: Use sliders to modify amplitude, frequency, phase, and speed
- **Switch Simulation Modes**: Choose between single wave, interference, and standing waves
- **Control Animation**: Pause/resume, show/hide grid and markers
- **Real-time Feedback**: See immediate changes in wave behavior

## 📁 Project Structure

```
waves-waves/
├── src/
│   ├── components/
│   │   ├── Login.tsx          # Authentication component
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── WavesCourse.tsx    # Course content and navigation
│   │   └── WaveLab.tsx        # Interactive simulations
│   ├── App.tsx                # Main application component
│   ├── App.css                # Global styles
│   └── main.tsx               # Application entry point
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🎯 Key Components

### **WaveLab Component**
- **Canvas-based Rendering** - High-performance wave visualization
- **Multiple Simulation Modes** - Single, interference, and standing waves
- **Real-time Parameter Control** - Live adjustment of wave properties
- **Responsive Design** - Adapts to different screen sizes

### **WavesCourse Component**
- **Tabbed Interface** - Content and Quiz sections
- **Side Navigation** - Topic switching with persistent state
- **Rich Content Panels** - Theory, examples, and applications
- **Interactive Elements** - Embedded simulations throughout content

### **Authentication System**
- **Form Validation** - Client-side email and password validation
- **Local Storage** - Persistent login sessions
- **Protected Routes** - Secure access to course content
- **User State Management** - Global authentication state

## 🔧 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint

## 🌐 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deploy Options**
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Use GitHub Actions
- **Any Static Host**: Upload `dist/` contents

## 📚 Learning Objectives

### **Wave Fundamentals**
- Understand wave properties (amplitude, frequency, wavelength, phase)
- Learn wave equations and mathematical relationships
- Explore wave behavior and phenomena

### **Simulation Skills**
- Manipulate wave parameters to observe effects
- Visualize wave interference and superposition
- Understand standing wave formation

### **Real-World Applications**
- Connect theory to practical examples
- Explore applications in various fields
- Understand wave phenomena in nature

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of an educational internship assignment focused on creating interactive learning platforms.

## 👨‍💻 Author

**Rohan Kancharla** - [GitHub Profile](https://github.com/Rohan-Kancharla)

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vite Team** - For the fast build tool
- **Educational Community** - For inspiration in interactive learning

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Contact the author through GitHub
- Check the documentation in the code comments

---

**⭐ Star this repository if you find it helpful!**

**�� Happy Learning!**