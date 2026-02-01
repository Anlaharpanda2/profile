const projects = [
  {
    slug: "sita-bi",
    title: "SITA-BI Academic Portal",
    tagline: "Sistem Informasi Tugas Akhir Jurusan Bahasa Inggris Politeknik Negeri Padang",
    year: 2025,
    image: "/sita-bi.webp",
    stack: ["Next.js", "Express.js", "TypeScript", "PostgreSQL", "Docker", "RESTful API"],
    problem: "Jurusan Bahasa Inggris Politeknik Negeri Padang membutuhkan sistem terintegrasi untuk mengelola tugas akhir mahasiswa, mulai dari pengajuan proposal hingga sidang akhir.",
    role: "Full-Stack Developer",
    impact: [
      "Mengembangkan 204 API endpoint untuk mengelola seluruh proses tugas akhir",
      "Membangun sistem dengan arsitektur monorepo menggunakan Express.js backend dan Next.js frontend",
      "Mengimplementasikan fitur manajemen bimbingan, penilaian, dan penjadwalan sidang"
    ],
    demoLink: "https://sitabi.vercel.app",
    githubLink: "https://github.com/itsanla/sita-bi",
    featured: true,
    experienceLevel: "Expert" as const,
    projectDuration: "Ongoing",
    metrics: {
      performance: "204 API endpoints",
      users: 235
    },
    learnings: ["Monorepo architecture", "Complex API design", "Academic workflow automation", "Docker containerization"]
  },
  {
    slug: "microservice-2025",
    title: "Microservices Architecture 2025",
    tagline: "Enterprise-grade Microservices System dengan Kubernetes Orchestration",
    year: 2025,
    image: "/microservice.webp",
    stack: ["Spring Boot", "Kubernetes", "AWS EC2", "Docker", "RabbitMQ", "MongoDB", "PostgreSQL", "Prometheus", "Grafana", "ELK Stack"],
    problem: "Membutuhkan sistem enterprise-grade dengan arsitektur microservices untuk Library Management dan E-Commerce Marketplace dengan skalabilitas tinggi.",
    role: "DevOps & Backend Engineer",
    impact: [
      "Membangun 22 services yang berjalan dalam cluster Kubernetes dengan 16 URL endpoint",
      "Mengimplementasikan CQRS pattern dengan event sourcing menggunakan H2 dan MongoDB",
      "Mengelola infrastruktur 5 × AWS EC2 m7i.large dengan total 10 vCPU dan 40 GB RAM",
      "Mengintegrasikan observability stack: Prometheus, Grafana, dan ELK Stack"
    ],
    demoLink: "https://microservice.dedyn.io",
    githubLink: "https://github.com/itsanla/microservice-2025",
    featured: true,
    experienceLevel: "Expert" as const,
    projectDuration: "3 months",
    metrics: {
      performance: "22 microservices",
      users: 5
    },
    learnings: ["Kubernetes orchestration", "CQRS pattern", "Event-driven architecture", "Cloud infrastructure management", "Microservices monitoring"]
  },
  {
    slug: "vocalink-kmipn",
    title: "VocaLink - 🥇 Juara 1 Nasional KMIPN VII 2025",
    tagline: "Platform Bootcamp Berbasis AI Interaktif untuk Pengembangan Talenta Digital Indonesia",
    year: 2025,
    image: "/vocalink.webp",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "AI/ML", "IoT Integration"],
    problem: "Indonesia membutuhkan platform bootcamp yang dapat mendukung pengembangan talenta digital menuju visi Indonesia Emas 2045 dengan pendekatan AI interaktif.",
    role: "Team Lead & Full-Stack Developer",
    impact: [
      "Meraih Juara 1 Nasional Kompetisi Inovasi Politeknik Nasional (KMIPN VII 2025) bidang Perencanaan Bisnis IoT",
      "Mengembangkan platform bootcamp berbasis AI interaktif untuk meningkatkan kualitas pembelajaran",
      "Berkontribusi dalam perencanaan bisnis dan pengembangan produk IoT terintegrasi"
    ],
    demoLink: "",
    githubLink: "https://github.com/itsanla/3dpnp-kmipn2025",
    featured: true,
    experienceLevel: "Expert" as const,
    projectDuration: "4 months",
    metrics: {
      performance: "1st Place National",
      users: 0
    },
    learnings: ["AI-powered education platforms", "IoT business planning", "National competition experience", "Team leadership"]
  },
  {
    slug: "pepsikuburger",
    title: "PEPSIKUBURGER - Platform Pemerintah",
    tagline: "Platform Layanan Masyarakat DP3AP2KB Provinsi Sumatera Barat",
    year: 2025,
    image: "/pepsikuburger.webp",
    stack: ["Laravel", "Vue.js", "MySQL", "TailwindCSS", "REST API"],
    problem: "DP3AP2KB Sumatera Barat membutuhkan platform digital terintegrasi untuk pelayanan publik yang cepat, transparan, dan mendukung program pemberdayaan perempuan.",
    role: "Project Manager & Full-Stack Developer",
    impact: [
      "Memimpin tim 4 pengembang dalam pembuatan website resmi pemerintah",
      "Melayani lebih dari 5.000 peserta perempuan dalam program pelatihan pemberdayaan ekonomi",
      "Mengembangkan 11 fitur CRUD dan 16 tools interaktif untuk dashboard admin",
      "Mengimplementasikan fitur pelaporan kasus kekerasan dan sistem pre-test/post-test pelatihan"
    ],
    demoLink: "https://agile-d3-2025.vercel.app",
    githubLink: "https://github.com/itsanla/AgileD3_2025",
    featured: true,
    experienceLevel: "Expert" as const,
    projectDuration: "5 months",
    metrics: {
      performance: "5,000+ users served",
      users: 5000
    },
    learnings: ["Government platform development", "Project management", "Team coordination", "Public service digitalization", "Laravel + Vue.js integration"]
  }
];

export default projects;
