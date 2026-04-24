export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="ft">© {new Date().getFullYear()} Anla Harpanda</div>
      <div className="ft" style={{ display: "flex", gap: 20 }}>
        <a
          href="https://github.com/itsanla"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/anlaharpanda"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a href="/blog">Blog</a>
      </div>
    </footer>
  );
}
