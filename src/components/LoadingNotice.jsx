function LoadingNotice({ show, children = "Loading data…" }) {
  if (!show) return null;

  return (
    <div className="d-flex align-items-center gap-2 text-secondary small mb-3" role="status">
      <span className="spinner-border spinner-border-sm" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export default LoadingNotice;
