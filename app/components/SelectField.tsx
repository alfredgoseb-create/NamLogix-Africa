type Props = {
  value?: string;
  onChange?: (e: any) => void;
  children?: React.ReactNode;
};

export default function SelectField({
  value,
  onChange,
  children,
}: Props) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="
        w-full
        rounded-2xl
        border
        border-gray-200
        bg-white
        px-4
        py-3
        text-gray-900
        shadow-sm
        outline-none
        transition
        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-100
      "
    >
      {children}
    </select>
  );
}