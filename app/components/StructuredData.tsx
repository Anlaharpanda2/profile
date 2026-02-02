// Server Component - renders static JSON-LD for SEO

interface PersonStructuredDataProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  email: string;
  sameAs: string[];
}

interface ProjectStructuredDataProps {
  name: string;
  description: string;
  url: string;
  image: string;
  author: string;
  dateCreated: string;
  programmingLanguage: string[];
  keywords: string[];
}

export function PersonStructuredData({
  name,
  jobTitle,
  description,
  url,
  image,
  email,
  sameAs,
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url,
    image,
    email,
    sameAs,
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Python Programming",
      "JavaScript",
      "React",
      "Next.js",
      "Full-Stack Development",
      "API Development",
      "Cloud Computing",
      "LangChain",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: jobTitle,
      occupationLocation: {
        "@type": "Place",
        name: "Remote",
      },
      skills: [
        "Python",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "AI/ML",
        "LangChain",
        "API Development",
        "Cloud Computing",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ProjectStructuredData({
  name,
  description,
  url,
  image,
  author,
  dateCreated,
  programmingLanguage,
  keywords,
}: ProjectStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    image,
    author: {
      "@type": "Person",
      name: author,
    },
    dateCreated,
    programmingLanguage,
    keywords,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Anla Harpanda Portfolio",
    description: "Full Stack Web Developer & UI/UX Designer specializing in Express.js, Next.js, Laravel, and Vue.js",
    url: "https://anla.my.id",
    author: {
      "@type": "Person",
      name: "Anla Harpanda",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://anla.my.id/projects?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}