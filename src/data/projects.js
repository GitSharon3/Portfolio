import yardImg from '../images/yard.png'
import biruwasmartImg from '../images/biruwasmart.png'
import todoImg from '../images/todo.png'
import biruwaWebsiteImg from '../images/biruwa-website.png'

// Projects portfolio data
export const projects = [
  {
    id: 1,
    title: "Yard Management System",
    description: "A comprehensive yard management solution built during internship at EXOTRAC LLC. Streamlines logistics operations with real-time tracking and management features.",
    image: yardImg,
    type: "fullstack",
    techStack: ["React JS", ".NET", "SQL Server", "REST API"],
    github: "https://github.com/GitSharon3/YMS-YardManagementSystem",
    live: "https://yard-management-demo.netlify.app",
    category: "Web Application"
  },
  {
    id: 2,
    title: "BiruwaSmart App",
    description: "AI-powered plant identifier mobile application with integrated e-commerce functionality. Features image recognition for plant species identification.",
    image: biruwasmartImg,
    type: "mobile",
    techStack: ["Flutter", "Django", "Python", "SQLite", "TensorFlow"],
    github: "https://github.com/GitSharon3/final_year_project_biruwaSmart",
    live: "#",
    category: "Mobile App"
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
    type: "fullstack",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "Laravel", "SQLite"],
    github: "https://github.com/GitSharon3/Biruwa",
    live: "https://biruwa-demo.netlify.app",
    category: "Web Application"
  }
];
