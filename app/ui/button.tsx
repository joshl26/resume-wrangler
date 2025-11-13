// app/ui/button.tsx
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      {...rest}
      className={clsx(
        "flex w-full mx-auto h-10 items-center rounded-lg px-4 text-sm font-medium focus-visible:outline focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}
