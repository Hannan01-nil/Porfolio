import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Text } from "@once-ui-system/core";

const locationLabel = "Vaniyambadi, Tamil Nadu, India";
const phone = "+91 9365801662";

const resume = {
  path: "/resume",
  label: "Resume",
  title: "Resume",
  description: "Academic profile, technical skills, and project-focused experience.",
};

const contact = {
  path: "/contact",
  label: "Contact Me",
  title: "Contact",
  description: "Feel free to connect anytime.",
};

const person: Person = {
  firstName: "Mohamed",
  lastName: "Hannan N",
  name: "Mohamed Hannan N",
  role: "BCA Student @ VIT | Full Stack Developer | Machine Learning Enthusiast",
  avatar: "/images/hannan.jpg",
  email: "mohamedhannan01@gmail.com",
  location: "Asia/Kolkata",
  languages: ["English", "Tamil", "Hindi", "Urdu"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Stay in the loop</>,
  description: <>Updates are currently disabled.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Hannan01-nil",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mohamed-hannan-9703763a0/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/md_hannan_0001",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: "Mohamed Hannan N | Full Stack Developer",
  description: "Motivated BCA student passionate about technology, modern development, AI tools, and building useful real-world solutions.",
  headline: <>Mohamed Hannan N</>,
  featured: {
    display: true,
    title: <>Open to Opportunities</>,
    href: "/contact",
  },
  subline: (
    <>
      Motivated BCA student passionate about technology, modern development, AI tools, and building useful real-world solutions.
    </>
  ),
};

const homeRotatingSubtitles = [
  "BCA Student @ VIT",
  "Full Stack Developer",
  "Web Developer",
  "Software Developer",
  "Machine Learning Enthusiast",
  "AI/ML Explorer",
  "Backend Learner",
  "Future Engineer"
];

const homeBadges = [
  "Open to Opportunities",
  "Based in Tamil Nadu",
  "Passionate Learner"
];

const about: About = {
  path: "/about",
  label: "About Me",
  title: "About",
  description: "I am Mohamed Hannan N, a BCA student at VIT with strong interest in software development, web technologies, and machine learning.",
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "About Me",
    description: (
      <>
        <Text as="p" variant="body-default-l" marginBottom="16">
          I am Mohamed Hannan N, a BCA student at VIT with strong interest in software development, web technologies, and machine learning. I enjoy learning modern tools, building useful applications, and improving my technical skills through practical work.
        </Text>
      </>
    ),
  },
  work: {
    display: false,
    title: "Experience",
    experiences: [],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Vellore Institute of Technology (VIT)",
        description: <>Bachelor of Computer Applications (AI & ML) <br/> 2024 - 2027 <br/> CGPA: 8.91</>,
      },
      {
        name: "Islamiah Boys Higher Secondary School",
        description: <>Completed 2023 <br/> 12th Grade: 88% <br/> 10th Grade: 79%</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Programming",
        description: <>Python, Java, C++, JavaScript</>,
        tags: [{ name: "Python" }, { name: "Java" }, { name: "C++" }, { name: "JavaScript", icon: "javascript" }],
      },
      {
        title: "Frontend",
        description: <>HTML, CSS, React.js, Next.js, Tailwind CSS</>,
        tags: [
          { name: "HTML" },
          { name: "CSS" },
          { name: "React.js" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Tailwind CSS" },
        ],
      },
      {
        title: "Backend",
        description: <>Node.js, Express.js, Flask, REST APIs</>,
        tags: [{ name: "Node.js" }, { name: "Express.js" }, { name: "Flask"}, {name: "REST APIs"}],
      },
      {
        title: "Database",
        description: <>MySQL, MongoDB, DBMS, SQL</>,
        tags: [{ name: "MySQL" }, { name: "MongoDB" }, { name: "DBMS" }, {name: "SQL"}],
      },
      {
        title: "Machine Learning",
        description: <>Scikit-learn, Pandas, NumPy, Matplotlib, XGBoost</>,
        tags: [
          { name: "Scikit-learn" },
          { name: "Pandas" },
          { name: "NumPy" },
          { name: "Matplotlib" },
          { name: "XGBoost" },
        ],
      },
      {
        title: "Tools",
        description: <>Git, GitHub, VS Code, Postman, Colab</>,
        tags: [
          { name: "Git" },
          { name: "GitHub", icon: "github" },
          { name: "VS Code" },
          { name: "Postman" },
          { name: "Colab" }
        ],
      },
    ],
  },
};

const aboutTimeline = [
  { year: "2024", text: "Started BCA journey at VIT and entered the world of programming." },
  { year: "2025", text: "Built TrackMyTrain project using Python, MySQL and DBMS concepts." },
  { year: "2025", text: "Strengthened coding fundamentals, databases, and web development skills." },
  { year: "2025 - 2026", text: "Completed HCI full case study project with low-fidelity and high-fidelity wireframes, focusing on user-centered design and usability." },
  { year: "2026", text: "Developed Student Stress Prediction (Streeiq) using Machine Learning concepts." },
  { year: "2026", text: "Built AI-Based Smart Attendance System using IoT technologies." },
  { year: "NOW", text: "Exploring AI & ML technologies, improving development skills, and learning modern tools." },
  { year: "FUTURE", text: "Working towards becoming a skilled Software / AI / ML Engineer and building impactful real-world solutions." }
];

const aboutCreative = [
  "Photography",
  "Videography",
  "Video Editing",
  "Creative Framing",
  "Content Creation"
];

const aboutLearning = [
  "Full Stack Development",
  "Machine Learning Basics to Advanced",
  "Clean UI/UX",
  "Deployment",
  "AI Productivity Tools"
];

const aboutTools = [
  "VS Code",
  "GitHub",
  "Chrome",
  "Postman",
  "MongoDB Compass",
  "Colab",
  "Canva",
  "Figma"
];

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Blog",
  description: "Articles and notes.",
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: "Projects",
  description: "Selected software and machine learning projects by Mohamed Hannan.",
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Gallery",
  description: "Gallery of Mohamed Hannan.",
  images: [],
};

export {
  person,
  social,
  newsletter,
  home,
  homeRotatingSubtitles,
  homeBadges,
  about,
  aboutTimeline,
  aboutCreative,
  aboutLearning,
  aboutTools,
  blog,
  work,
  gallery,
  resume,
  contact,
  locationLabel,
  phone,
};
