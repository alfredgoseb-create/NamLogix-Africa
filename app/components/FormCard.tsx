export default function FormCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="
      bg-white
      rounded-3xl
      border
      border-gray-100
      shadow-sm
      p-6
      md:p-8
    ">
      {children}
    </div>
  );
}