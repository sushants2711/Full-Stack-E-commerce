export const Input = ({ value, onChange, id }) => {
  return (
    <input
      type="text"
      maxLength="1"
      className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={onChange}
      id={id}
    />
  );
};