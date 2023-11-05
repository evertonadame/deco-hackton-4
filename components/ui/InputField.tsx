import type { JSX } from "preact";

export type Props = JSX.IntrinsicElements["input"] & {
  label?: string;
  readonly?: boolean;
  error?: boolean
};

function InputField({ label, readOnly, error, ...props }: Props) {
  const inputClass = readOnly
    ? "min-h-[48px] input-disabled pl-4 w-full bg-white"
    : "input input-bordered join-item min-h-[48px] w-full";

  return (
    <div className="flex flex-col relative">
      <label className="text-sm text-slate-600 font-semibold">{label}</label>
      <input disabled={readOnly} class={inputClass} {...props} />
      {error ? (
        <p className="text-red-500 text-xs absolute -bottom-5">{error}</p>
      ): null}
    </div>
  );
}

export default InputField;
