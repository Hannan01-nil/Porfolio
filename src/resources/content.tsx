import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Text } from "@once-ui-system/core";

const locationLabel = "Vaniyambadi, Tamil Nadu, India";
const phone = "+91 9365801662";

const resume = {
  path: "/resume",
  label: "Resume",
  title: "Resume",
  description: "Academic profile, skills, and project-focused experience. Download the latest PDF version of my resume.",
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: "Contact",
  description: "Feel free to connect anytime. I am usually quick to respond.",
};

const person: Person = {
  firstName: "Mohamed",
  lastName: "Hannan N",
  name: "Mohamed Hannan N",
  role: "Full Stack Developer",
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
  title: "Mohamed Hannan N | Software Portfolio",
  description: "Motivated BCA student passionate about software, AI tools, modern development and building real-world solutions.",
  headline: <>Mohamed Hannan N</>,
  featured: {
    display: true,
    title: <>Open to Opportunities</>,
    href: "/contact",
  },
  subline: (
    <>
      Motivated BCA student passionate about software, AI tools, modern development and building real-world solutions.
    </>
  ),
};

const homeRotatingSubtitles = [
  "Full Stack Developer",
  "Web Developer",
  "Software Developer",
  "AI/ML Engineer",
  "Problem Solver",
  "Tech Enthusiast"
];

const homeBadges = [
  "Based in Vaniyambadi",
  "Open to Opportunities",
  "Fast Learner",
  "Creative Thinker"
];

const about: About = {
  path: "/about",
  label: "About",
  title: "About",
  description: "I am Mohamed Hannan N, a BCA student at VIT with strong interest in software development, web technologies, machine learning, and modern tools.",
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
          I am Mohamed Hannan N, a BCA student at VIT with strong interest in software development, web technologies, machine learning, and modern tools. I enjoy learning fast, building useful projects, and continuously improving my technical skills.
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
        description: <>Bachelor of Computer Applications (BCA) <br/> 2024 - 2027 <br/> CGPA: 8.91</>,
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
        description: <>Python, Java, C, C++, JavaScript, PHP</>,
        tags: [
          { name: "Python" }, 
          { name: "Java" }, 
          { name: "C" }, 
          { name: "C++" }, 
          { name: "JavaScript", icon: "javascript" },
          { name: "PHP" }
        ],
      },
      {
        title: "Frontend",
        description: <>HTML, CSS, React.js, Next.js, Tailwind</>,
        tags: [
          { name: "HTML" },
          { name: "CSS" },
          { name: "React.js" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Tailwind" },
        ],
      },
      {
        title: "Backend",
        description: <>Node.js, Express.js, Flask</>,
        tags: [{ name: "Node.js" }, { name: "Express.js" }, { name: "Flask"}],
      },
      {
        title: "Database",
        description: <>MySQL, MongoDB, SQL, DBMS</>,
        tags: [{ name: "MySQL" }, { name: "MongoDB" }, { name: "SQL" }, {name: "DBMS"}],
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
        description: <>Git, GitHub, VS Code, Postman, Colab, Canva, Figma</>,
        tags: [
          { name: "Git" },
          { name: "GitHub", icon: "github" },
          { name: "VS Code" },
          { name: "Postman" },
          { name: "Colab" },
          { name: "Canva" },
          { name: "Figma" },
          { name: "Antigravity" },
        ],
      },
      {
        title: "Concepts",
        description: <>OOP, DSA, REST APIs, Problem Solving</>,
        tags: [
          { name: "OOP" },
          { name: "DSA" },
          { name: "REST APIs" },
          { name: "Problem Solving" }
        ],
      },
    ],
  },
};

const aboutTimeline = [
  { year: "2024", text: "Started BCA journey at VIT" },
  { year: "2025", text: "Built Track My Train project" },
  { year: "2025", text: "Strengthened coding, DBMS and development skills" },
  { year: "2025-2026", text: "Completed HCI full case study with low/high fidelity wireframes" },
  { year: "2026", text: "Built Stress Prediction (Streeiq) project" },
  { year: "2026", text: "Built Smart Attendance System IoT project" },
  { year: "NOW", text: "Exploring AI/ML, modern development, advanced tools" },
  { year: "FUTURE", text: "Becoming a skilled Software / AI / ML engineer and building impactful products" }
];

const aboutCreative = [
  "Photography",
  "Videography",
  "Video Editing",
  "Creative Framing",
  "Content Creation"
];

// Empty learning/tools because it's merged or unnecessary based on latest requirements 
// but we keep exports to prevent TS errors in unmodified downstream pages, just in case.
const aboutLearning: string[] = []; 
const aboutTools: string[] = [];

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
  description: "Selected software and machine learning projects.",
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Gallery",
  description: "Gallery.",
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
