import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

import personData from "@/data/person.json";
import socialData from "@/data/social.json";
import homeData from "@/data/home.json";
import aboutData from "@/data/about.json";
import skillsData from "@/data/skills.json";
import blogData from "@/data/blog.json";
import workData from "@/data/work.json";
import galleryData from "@/data/gallery.json";
import contactData from "@/data/contact.json";
import resumeData from "@/data/resume.json";
import newsletterData from "@/data/newsletter.json";

const locationLabel = personData.locationLabel;
const phone = personData.phone;

const resume = {
  path: resumeData.path,
  label: resumeData.label,
  title: resumeData.title,
  description: resumeData.description,
};

const contact = {
  path: contactData.path,
  label: contactData.label,
  title: contactData.title,
  description: contactData.description,
};

const person: Person = {
  firstName: personData.firstName,
  lastName: personData.lastName,
  name: personData.name,
  role: personData.role,
  avatar: personData.avatar,
  email: personData.email,
  location: personData.location as Person["location"],
  languages: personData.languages,
};

const newsletter: Newsletter = {
  display: newsletterData.display,
  title: <MarkdownRenderer content={newsletterData.title} />,
  description: <MarkdownRenderer content={newsletterData.description} />,
};

const social: Social = socialData.map((s: { name: string; icon: string; link: string; essential?: boolean }) => ({
  name: s.name,
  icon: s.icon as Social[number]["icon"],
  link: s.link,
  essential: s.essential,
}));

const home: Home = {
  path: homeData.path as Home["path"],
  image: homeData.image as Home["image"],
  label: homeData.label,
  title: homeData.title,
  description: homeData.description,
  headline: <MarkdownRenderer content={homeData.headline} />,
  featured: {
    display: homeData.featured.display,
    title: <MarkdownRenderer content={homeData.featured.title} />,
    href: homeData.featured.href,
  },
  subline: <MarkdownRenderer content={homeData.subline} />,
};

const homeRotatingSubtitles: string[] = homeData.rotatingTitles;
const homeBadges: string[] = homeData.badges;

const about: About = {
  path: aboutData.path as About["path"],
  label: aboutData.label,
  title: aboutData.title,
  description: aboutData.description,
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
    display: aboutData.intro.display,
    title: aboutData.intro.title,
    description: <MarkdownRenderer content={aboutData.intro.description} />,
  },
  work: {
    display: aboutData.work.display,
    title: aboutData.work.title,
    experiences: [],
  },
  studies: {
    display: aboutData.studies.display,
    title: aboutData.studies.title,
    institutions: aboutData.studies.institutions.map((inst: { name: string; description: string }) => ({
      name: inst.name,
      description: <MarkdownRenderer content={inst.description} />,
    })),
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: skillsData.map((skill: { title: string; description?: string; tags?: { name: string; icon?: string }[] }) => ({
      title: skill.title,
      description: skill.description ? <MarkdownRenderer content={skill.description} /> : undefined,
      tags: skill.tags,
    })),
  },
};

const aboutTimeline = aboutData.timeline.map(
  (t: { year: string; text: string }) => ({ year: t.year, text: t.text }),
);

const aboutCreative: string[] = aboutData.creative;
const aboutLearning: string[] = [];
const aboutTools: string[] = [];

const blog: Blog = {
  path: blogData.path as Blog["path"],
  label: blogData.label,
  title: blogData.title,
  description: blogData.description,
};

const work: Work = {
  path: workData.path as Work["path"],
  label: workData.label,
  title: workData.title,
  description: workData.description,
};

const gallery: Gallery = {
  path: galleryData.path as Gallery["path"],
  label: galleryData.label,
  title: galleryData.title,
  description: galleryData.description,
  images: galleryData.images,
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
