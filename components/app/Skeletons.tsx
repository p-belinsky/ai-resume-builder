export function DashboardSkeleton() {
  return (
    <div aria-label="Loading workspace" className="skeleton-page">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-subtitle" />
      <div className="skeleton-grid"><div /><div /><div /></div>
      <div className="skeleton-card" />
    </div>
  );
}

export function EditorSkeleton() {
  return <div aria-label="Loading resume editor" className="editor-skeleton"><div className="skeleton-card" /><div className="skeleton-card" /></div>;
}