import { clsx } from "clsx";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error: string | null | undefined;
  name: string;
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, label, error = "", ...props }, ref) => {
    return (
      <div className="formInput">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          className={clsx(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <p>{error}</p>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
