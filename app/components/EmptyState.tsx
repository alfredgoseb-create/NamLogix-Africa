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
    <div className="text-center border border-dashed border-gray-300 rounded-xl p-10 bg-gray-50">
      <div className="text-4xl mb-3">{icon}</div>

      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
        {message}
      </p>
    </div>
  );
}