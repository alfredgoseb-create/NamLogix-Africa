type Props = {
  placeholder?: string;
  value?: string;
  type?: string;
  onChange?: (e: any) => void;
};

export default function InputField({
  placeholder,
  value,
  type = "text",
  onChange,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
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
    />
  );
}