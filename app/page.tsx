import Cursor from "@/components/ui/Cursor";
import HomeNav from "@/components/ui/HomeNav";
import MobileDock from "@/components/ui/MobileDock";
import Footer from "@/components/ui/Footer";
import RevealEffects from "@/components/ui/RevealEffects";
import PageEffects from "@/components/ui/PageEffects";
import { getAllProjects, getAllPosts, formatDate } from "@/lib/data";

const TECHS = [
  "Next.js",
  "Express.js",
  "TypeScript",
  "React",
  "Vue.js",
  "Laravel",
  "PostgreSQL",
  "MySQL",
  "AWS EC2",
  "Docker",
  "Kubernetes",
  "TailwindCSS",
  "Figma",
  "Node.js",
  "Spring Boot",
  "MongoDB",
  "Prometheus",
  "Grafana",
  "REST APIs",
];

const BLOG_TAG_PALETTE: Record<string, string> = {
  AI: "oklch(0.92 0.06 268/.8)",
  Tech: "oklch(0.92 0.06 145/.8)",
  Business: "oklch(0.92 0.06 40/.8)",
  Social: "oklch(0.92 0.06 198/.8)",
  Opinion: "oklch(0.92 0.06 320/.8)",
};
const BLOG_TAG_COLOR: Record<string, string> = {
  AI: "oklch(0.40 0.18 268)",
  Tech: "oklch(0.38 0.16 145)",
  Business: "oklch(0.38 0.16 40)",
  Social: "oklch(0.35 0.16 198)",
  Opinion: "oklch(0.42 0.16 320)",
};

function blogTagStyle(tag: string) {
  const bg = BLOG_TAG_PALETTE[tag];
  const color = BLOG_TAG_COLOR[tag];
  if (!bg) return undefined;
  return {
    background: bg,
    color,
    border: `1px solid ${bg.replace(".8", ".3").replace(".7", ".25")}`,
  };
}

export default function HomePage() {
  const allProjects = getAllProjects();
  const projects = allProjects.filter((p) => p.featured).slice(0, 2);
  const posts = getAllPosts().slice(0, 3);

  const totalProjects = allProjects.length;
  const totalUsersServed = allProjects.reduce(
    (sum, p) => sum + (p.metrics?.users || 0),
    0,
  );

  return (
    <>
      <Cursor />
      <HomeNav />
      <MobileDock active="hero" />

      {/* HERO */}
      <section id="hero">
        <div className="hero-mesh" />
        <div className="hero-mesh-mid" />
        <div className="hero-grid" />

        <div className="hero-inner">
          <div className="hero-text">
            <div className="h-badge">
              <div className="badge-pulse" /> Available for opportunities
            </div>
            <h1 className="h-name">
              Anla
              <br />
              <em>Harpanda</em>
            </h1>
            <p className="h-role">
              Full Stack Developer & UI/UX Designer
            </p>
            <p className="h-desc">
              Building scalable web applications and user-centered experiences —
              from infrastructure to interface.
            </p>
            <div className="h-btns">
              <a className="btn-p magnetic" href="#projects">
                View My Work
              </a>
              <a
                className="btn-g magnetic"
                href="/CVPersonal.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV →
              </a>
            </div>
            <div className="h-meta">
              <div className="h-stat">
                <span
                  className="h-stat-n"
                  data-count={Math.max(totalProjects, 300)}
                  data-suffix="+"
                >
                  —
                </span>
                <span className="h-stat-l">Projects Done</span>
              </div>
              <div className="h-stat">
                <span
                  className="h-stat-n"
                  data-count={5}
                  data-suffix="K+ Users"
                >
                  —
                </span>
                <span className="h-stat-l">Served</span>
              </div>
              <div className="h-stat">
                <span className="h-stat-n" data-count={4} data-suffix="+ Yrs">
                  —
                </span>
                <span className="h-stat-l">Experience</span>
              </div>
            </div>
          </div>

          <div className="hero-card-wrap">
            <div className="h-card" id="hcard">
              <div className="pfp-ring">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pfp.webp" alt="Anla" className="pfp" />
              </div>
              <div className="c-name">Anla Harpanda</div>
              <div className="c-role">Full Stack Dev · UI/UX</div>
              <div className="c-stats">
                <div className="c-stat">
                  <div className="c-stat-n">300+</div>
                  <div className="c-stat-l">Projects</div>
                </div>
                <div className="c-stat">
                  <div className="c-stat-n">
                    {totalUsersServed > 0
                      ? `${Math.round(totalUsersServed / 1000)}K+`
                      : "5K+"}
                  </div>
                  <div className="c-stat-l">Users</div>
                </div>
                <div className="c-stat">
                  <div className="c-stat-n">AWS</div>
                  <div className="c-stat-l">Certified</div>
                </div>
                <div className="c-stat">
                  <div className="c-stat-n">4+</div>
                  <div className="c-stat-l">Years</div>
                </div>
              </div>
            </div>
            <div className="h-card h-badge-mini">
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "oklch(0.68 0.20 142)",
                  flexShrink: 0,
                  animation: "pulse 2.2s ease-in-out infinite",
                }}
              />
              Open to full-time & freelance roles
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...TECHS, ...TECHS].map((t, i) => (
            <div className="m-item" key={i}>
              <span>{t}</span>
              {i < TECHS.length * 2 - 1 && <span className="m-dot" />}
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <section id="projects" style={{ background: "#fff" }}>
        <div className="sec">
          <div className="rv">
            <div className="sec-label">Case Studies</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
              marginBottom: 0,
            }}
          >
            <div className="rv">
              <h2 className="sec-title">Latest work.</h2>
              <p className="sec-sub">
                Hand-picked projects built with care, clean code, and real-world
                impact.
              </p>
            </div>
            <a className="view-all rv" href="/projects">
              All Projects <span className="va-arrow">→</span>
            </a>
          </div>
          <div className="proj-grid">
            {projects.map((p, idx) => (
              <a
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="gw proj-card rv tilt-card"
                style={
                  idx > 0 ? { transitionDelay: `${idx * 0.1}s` } : undefined
                }
              >
                <div className="proj-accent" />
                <div className="proj-num">{p.num}</div>
                <h3 className="proj-name">{p.title}</h3>
                <div className="proj-role">{p.role}</div>
                <p className="proj-desc">{p.problem}</p>
                <div className="proj-tech">
                  {p.stack.slice(0, 5).map((s) => (
                    <span className="tc" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                <span className="proj-link">
                  View Case Study →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" style={{ background: "#f5f5f7" }}>
        <div className="sec">
          <div className="rv">
            <div className="sec-label">Writing</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
              marginBottom: 0,
            }}
          >
            <div className="rv">
              <h2 className="sec-title">
                Latest from
                <br />
                the blog.
              </h2>
              <p className="sec-sub">
                Thoughts on AI, web development, and the tech industry.
              </p>
            </div>
            <a className="view-all rv" href="/blog">
              All Articles <span className="va-arrow">→</span>
            </a>
          </div>
          <div className="blog-grid" style={{ marginTop: 52 }}>
            {posts.map((post, idx) => (
              <a
                key={post.slug}
                className="gg blog-card rv"
                href={`/blog/${post.slug}`}
                style={
                  idx > 0 ? { transitionDelay: `${idx * 0.1}s` } : undefined
                }
              >
                <div className="blog-img-wrap">
                  {post.thumbnail ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      className="blog-img"
                      src={post.thumbnail}
                      alt={post.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="blog-img" />
                  )}
                </div>
                <div className="blog-body">
                  <div className="blog-tags">
                    {post.tags.slice(0, 2).map((t) => (
                      <span className="btag" key={t} style={blogTagStyle(t)}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="blog-date">{formatDate(post.date)}</div>
                  <div className="blog-title">{post.title}</div>
                  <div className="blog-excerpt">{post.description}</div>
                  <div className="blog-read">Read Article →</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: "#fff" }}>
        <div className="sec">
          <div className="about-grid">
            <div className="rl" id="about-img">
              <div className="gw about-img-card tilt-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pfp.webp" alt="Anla Harpanda" className="about-img" />
                <div className="about-ov" />
                <div className="about-qt">
                  &ldquo;I build web applications that turn ideas into products
                  people actually use.&rdquo;
                </div>
              </div>
            </div>

            <div className="rr">
              <div className="sec-label">About Me</div>
              <h2 className="sec-title">
                Engineer &<br />
                Designer.
              </h2>
              <p className="about-body">
                I&apos;m a Full Stack Developer & UI/UX Designer passionate
                about building scalable web applications and cloud-optimized
                solutions. My expertise spans Express.js, Next.js, Laravel,
                Vue.js, and React.
              </p>
              <p className="about-body">
                Most recently, I led a team of four as Project Manager for a
                government platform under DP3AP2KB West Sumatra Province
                serving 5,000+ women. As founder of anla.id, I&apos;ve completed
                300+ illustration projects. Currently studying Information
                Technology at Politeknik Negeri Padang.
              </p>

              <div id="skills">
                <div className="sg sg-cards">
                  <div className="sg-l">Frontend</div>
                  <div className="sg-c">
                    {["React", "Vue.js", "Next.js", "TailwindCSS", "UI/UX"].map(
                      (s) => (
                        <span className="schip" key={s}>
                          {s}
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <div
                  className="sg sg-cards"
                  style={{ transitionDelay: ".12s" }}
                >
                  <div className="sg-l">Backend</div>
                  <div className="sg-c">
                    {[
                      "Express.js",
                      "Laravel",
                      "TypeScript",
                      "PostgreSQL",
                      "MySQL",
                    ].map((s) => (
                      <span className="schip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="sg sg-cards"
                  style={{ transitionDelay: ".24s" }}
                >
                  <div className="sg-l">Cloud & DevOps</div>
                  <div className="sg-c">
                    {[
                      "AWS EC2",
                      "Docker",
                      "Kubernetes",
                      "Prometheus",
                      "ELK",
                    ].map((s) => (
                      <span className="schip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#fff" }}>
        <div className="sec">
          <div className="ct-card rs">
            <div className="ct-mesh" />
            <div className="ct-grid" />
            <h2 className="ct-title">
              Let&apos;s build something
              <br />
              <em>impactful.</em>
            </h2>
            <p className="ct-sub">
              Open to full-time roles, freelance projects & collaborations.
              <br />
              Usually respond within 24 hours.
            </p>
            <div className="ct-links">
              <a className="cl primary" href="mailto:anlaharpanda@gmail.com">
                ✉️ Send an Email
              </a>
              <a
                className="cl"
                href="https://github.com/itsanla"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="cl"
                href="https://www.linkedin.com/in/anlaharpanda"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="cl"
                href="/CVPersonal.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <RevealEffects />
      <PageEffects
        enableMagnetic
        enableCounter
        enableRipple
        tiltSelectors={[
          { selector: "#hcard", depth: 9 },
          { selector: "#about-img", depth: 6 },
          { selector: ".tilt-card", depth: 5 },
        ]}
      />
    </>
  );
}
