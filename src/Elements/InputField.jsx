import { useState } from "react";
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi";

const InputField = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="max-w-xl mx-auto">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {props.label}
      </label>
      <div className="relative mb-4">
        <div className="absolute text-xl  inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          {props.icon}
        </div>
        <input
          type={showPassword ? "text" : props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder={props.placeholder}
        />
        {props.type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
            onClick={handleTogglePassword}
          >
            {showPassword ? <PiEyeDuotone /> : <PiEyeSlashDuotone />}
          </div>
        )}
      </div>
    </div>
  );
};
export default InputField;
