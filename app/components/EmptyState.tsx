type EmptyStateProps = {
  title: string;
  message: string;
  icon?: string;
};

export default function EmptyState({
  title,
  message,
  icon = "📭",
}: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden text-center border border-dashed border-blue-200 rounded-2xl p-10 bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-orange-200/40 blur-2xl" />
      <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-blue-200/40 blur-2xl" />

      <div className="relative">
        <div className="text-5xl mb-4">{icon}</div>

        <h3 className="text-xl font-bold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto leading-6">
          {message}
        </p>
      </div>
    </div>
  );
}