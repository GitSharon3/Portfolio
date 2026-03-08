// Web project images
import yardImg from '../assets/images/yard.png'
import todoImg from '../assets/images/todo.png'
import biruwaWebsiteImg from '../assets/images/biruwa-website.png'
import weatherAppImg from '../assets/images/weather-app.png'

// Mobile project media (BiruwaSmart App)
import biruwaSmartCover from '../assets/images/BiruwaSmart/BiruwaSmart.png'
import biruwaSmartShot1 from '../assets/images/BiruwaSmart/image.png'
import biruwaSmartShot2 from '../assets/images/BiruwaSmart/image copy.png'
import biruwaSmartShot3 from '../assets/images/BiruwaSmart/image copy 2.png'
import biruwaSmartShot4 from '../assets/images/BiruwaSmart/image copy 3.png'
import biruwaSmartShot5 from '../assets/images/BiruwaSmart/image copy 4.png'
import biruwaSmartShot6 from '../assets/images/BiruwaSmart/image copy 5.png'
import biruwaSmartShot7 from '../assets/images/BiruwaSmart/image copy 6.png'
import biruwaSmartShot8 from '../assets/images/BiruwaSmart/image copy 7.png'
import biruwaSmartVideo from '../assets/images/BiruwaSmart/IMG_0989.MOV'

export const projects = [
  // Web Projects
  {
    id: 1,
    title: "Yard Management System",
    description: "A comprehensive yard management solution built during internship at EXOTRAC LLC. Streamlines logistics operations with real-time tracking and management features.",
    image: yardImg,
    type: "web",
    techStack: ["React JS", ".NET", "SQL Server", "REST API"],
    github: "https://github.com/GitSharon3/YMS-YardManagementSystem",
    live: "https://yard-management-demo.netlify.app",
    category: "Web Application"
  },
  {
    id: 3,
    title: "ToDo App",
    description: "A clean, intuitive task management application with features like task categorization, due dates, and progress tracking.",
    image: todoImg,
    type: "web",
    techStack: ["React JS", "LocalStorage", "CSS3"],
    github: "https://github.com/GitSharon3/TODO_APP",
    live: "https://todoappsharon.netlify.app",
    category: "Web Application"
  },
  {
    id: 4,
    title: "Biruwa Website",
    description: "Full-stack e-commerce website for Birwa with user authentication, product management, and payment integration.",
    image: biruwaWebsiteImg,
    type: "web",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "Laravel", "SQLite"],
    github: "https://github.com/GitSharon3/Biruwa",
    live: "https://biruwa-demo.netlify.app",
    category: "Web Application"
  },
  {
    id: 5,
    title: "Weather App",
    description: "A responsive React weather application that fetches real-time weather data using the OpenWeatherMap API. Search any city to view temperature, humidity, wind speed, and current conditions.",
    image: weatherAppImg,
    type: "web",
    techStack: ["React JS", "OpenWeatherMap API", "Responsive UI"],
    github: "https://github.com/GitSharon3/Weather_App",
    live: "https://weather-app-demo-net.netlify.app",
    category: "Web Application"
  },

  // Mobile Projects
  {
    id: 2,
    title: "BiruwaSmart App",
    description: "AI-powered plant identifier mobile application with integrated e-commerce functionality. Features image recognition for plant species identification.",
    image: biruwaSmartCover,
    type: "mobile",
    techStack: ["Flutter", "Django", "Python", "SQLite", "TensorFlow"],
    github: "https://github.com/GitSharon3/final_year_project_biruwaSmart",
    live: "#",
    category: "Mobile App",
    media: {
      screenshots: [
        biruwaSmartShot1,
        biruwaSmartShot2,
        biruwaSmartShot3,
        biruwaSmartShot4,
        biruwaSmartShot5,
        biruwaSmartShot6,
        biruwaSmartShot7,
        biruwaSmartShot8,
      ],
      video: biruwaSmartVideo,
    }
  }
];
