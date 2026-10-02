import type { InputHTMLAttributes } from "react";

/** Text input with an Apple-style floating label. */
export function Field({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; error?: string }) {
  const id = `f-${props.name}`;
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          {...props}
          className={`peer h-14 w-full rounded-xl border bg-field px-4 pt-5 text-[17px] outline-none transition-shadow focus:ring-4 ${
            error ? "border-[#e30000] focus:ring-[#e30000]/15" : "border-line focus:border-cta focus:ring-cta/20"
          }`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[17px] text-fg-2 transition-all duration-200 peer-focus:top-4 peer-focus:text-[12px] peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[12px]"
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 px-1 text-[13px] text-[#e30000] dark:text-[#ff6961]">
          {error}
        </p>
      )}
    </div>
  );
}
