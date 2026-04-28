export function Card({ children, className = "", hover = false }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`bg-white rounded-xl shadow p-6 ${hover ? "hover:shadow-lg transition cursor-pointer" : ""} ${className}`}>
      {children}
    </div>
  );
}
