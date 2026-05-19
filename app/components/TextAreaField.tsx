type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
};

export default function TextAreaField({
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        min-h-[140px]
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
    />
  );
}