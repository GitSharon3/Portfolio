# Sharon Kadariya - Portfolio

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, responsive portfolio website built with **React**, **Vite**, and **Tailwind CSS**. Features smooth animations, mobile-first design, and an elegant professional aesthetic.

🌐 **Live Demo**: [https://sharonkadariya.netlify.app](https://sharonkadariya.netlify.app)

## ✨ Features

- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop
- **🎨 Modern UI/UX** - Clean, professional design with smooth animations
- **⚡ Lightning Fast** - Powered by Vite for instant HMR and optimized builds
- **🎭 Smooth Animations** - Scroll-triggered animations using Framer Motion
- **⌨️ Typewriter Effect** - Dynamic text animation in hero section
- **🌌 Particle Background** - Animated connecting dots background
- **🔧 Easy to Customize** - Simple data files to update content
- **📧 Contact Section** - Ready-to-use contact information
- **⬆️ Back to Top** - Scroll progress indicator button

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 18](https://reactjs.org/) | UI Library |
| [Vite](https://vitejs.dev/) | Build Tool & Dev Server |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev/) | Icons |

## 📁 Project Structure

```
Portfolio/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Hero.jsx         # Hero section with typewriter
│   │   ├── About.jsx        # About me section
│   │   ├── Experience.jsx   # Work experience
│   │   ├── Skills.jsx       # Technical & soft skills
│   │   ├── Projects.jsx     # Project showcase
│   │   ├── ProjectCard.jsx  # Reusable project card
│   │   ├── Contact.jsx      # Contact section
│   │   ├── Footer.jsx       # Footer
│   │   ├── BackToTop.jsx    # Scroll to top button
│   │   └── ParticleBackground.jsx  # Animated background
│   ├── data/
│   │   ├── projects.js      # Projects data
│   │   └── skills.js        # Skills data
│   ├── hooks/
│   │   └── useTypewriter.js # Custom typewriter hook
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GitSharon3/Portfolio.git
   cd Portfolio
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
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 📝 Customization Guide

### Update Personal Information

**1. Hero Section** (`src/components/Hero.jsx`)
```javascript
// Update your name
<h1>Sharon Kadariya</h1>

// Update your titles for typewriter effect
const titles = [
  "Full-Stack Developer",
  "Mobile App Developer"
]

// Update contact info
<span>sharonkadariya@gmail.com</span>
<span>+977 9869785631</span>

// Update social links
<a href="https://github.com/GitSharon3">...</a>
<a href="https://linkedin.com/in/sharon-kadariya">...</a>
```

**2. About Section** (`src/components/About.jsx`)
```javascript
const achievements = [
  { icon: Briefcase, title: "Internship", desc: "EXOTRAC LLC - Yard Management System" },
  { icon: GraduationCap, title: "Education", desc: "CSIT Bachelor's Student" },
  { icon: Code, title: "Projects", desc: "BiruwaSmart AI - Plant Identification App" },
  { icon: Award, title: "Expertise", desc: "Flutter, Django, TensorFlow, React" },
]
```

**3. Experience** (`src/components/Experience.jsx`)
```javascript
const experiences = [
  {
    id: 1,
    role: "Full-Stack Developer",
    company: "Exotrac LLC",
    location: "Remote / USA",
    period: "6 months",
    description: "Your description here...",
    skills: ["React", ".Net", "JavaScript", "Database Design", "API Development", "PostgreSQL"]
  }
]
```

**4. Skills** (`src/data/skills.js`)
```javascript
export const techStack = [
  { name: "React", category: "Frontend", icon: "react", url: "https://react.dev/" },
  // Add more technical skills...
]

export const softSkills = [
  { name: "Problem Solving", icon: "Brain", color: "#FF6B6B" },
  // Add more soft skills...
]
```

**5. Projects** (`src/data/projects.js`)
```javascript
export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Project description",
    image: "/project-image.png",
    techStack: ["React", "Node.js"],
    github: "https://github.com/...",
    live: "https://..."
  }
]
```

**6. Contact** (`src/components/Contact.jsx`)
```javascript
const contactInfo = [
  { icon: Mail, label: 'Email', value: 'sharonkadariya@gmail.com', href: 'mailto:sharonkadariya@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+977 9869785631', href: 'tel:+9779869785631' },
  // ...
]
```

### Add Your Profile Photo

1. Add your photo to the `public/` folder
2. Update the reference in `src/components/Hero.jsx` or `src/components/About.jsx`:
   ```jsx
   <img src="/your-photo.jpg" alt="Sharon Kadariya" className="rounded-full" />
   ```

## 🌐 Deployment

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/GitSharon3/Portfolio)

**Manual deployment:**
1. Build the project: `npm run build`
2. Drag and drop the `dist/` folder to Netlify

Or use Netlify CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/GitSharon3/Portfolio)

**Manual deployment:**
```bash
npm i -g vercel
vercel --prod
```

### Deploy to GitHub Pages

1. Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/Portfolio/',  // Your repo name
     plugins: [react()],
   })
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## 📱 Responsive Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| `sm` | 640px | Small devices |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#3b82f6` | Links, buttons, accents |
| Slate-900 | `#0f172a` | Headings |
| Slate-600 | `#475569` | Body text |
| Slate-100 | `#f1f5f9` | Backgrounds |
| White | `#ffffff` | Cards, sections |

## 🐛 Troubleshooting

### Common Issues

**Issue**: `npm install` fails
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Issue**: Port 5173 is already in use
```bash
# Solution: Use a different port
npm run dev -- --port 3000
```

**Issue**: Images not loading after deployment
- Ensure images are in the `public/` folder
- Use relative paths: `/image-name.png`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sharon Kadariya**

- 📧 Email: [sharonkadariya@gmail.com](mailto:sharonkadariya@gmail.com)
- 💼 LinkedIn: [Sharon Kadariya](https://www.linkedin.com/in/sharon-kadariya-9009851b5/)
- 🐙 GitHub: [@GitSharon3](https://github.com/GitSharon3)

---

⭐ Star this repo if you find it helpful!
