import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  hidden?: boolean;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  hidden = false,
}: InputFieldProps) => {
  return (
    <div className="flex  flex-col gap-1">
      <div className="flex gap-2">
        <label className="text-xs text-gray-700">{!hidden && label}</label>
        {error?.message && (
          <p className="text-xs font-semibold text-red-400">
            ( {error.message.toString()} )
          </p>
        )}
      </div>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
        hidden={hidden}
      />
    </div>
  );
};

export default InputField;
