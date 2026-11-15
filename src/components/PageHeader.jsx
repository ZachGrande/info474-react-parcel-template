function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <header className="page-header">
      {eyebrow && <div className="page-eyebrow mb-1">{eyebrow}</div>}
      <h1 className="display-6 fw-semibold mb-2">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
      {children}
    </header>
  );
}

export default PageHeader;
