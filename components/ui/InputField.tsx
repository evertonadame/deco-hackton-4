import type { JSX } from "preact";

export type Props =
  & JSX.IntrinsicElements["input"]
  & {
    label?: string;
    readonly?: boolean;
  };

function InputField({ label, readOnly, ...props }: Props) {
  const inputClass = readOnly
    ? "min-h-[48px] input-disabled pl-4"
    : "input input-bordered join-item min-h-[48px]";

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 font-semibold ">
        {label}
      </label>
      <input
        disabled={readOnly}
        class={inputClass}
        {...props}
      />
    </div>
  );
}

export default InputField;
