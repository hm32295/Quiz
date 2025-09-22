import { FaSpinner } from "react-icons/fa";

type LoadingButtonProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function LoadingButton({
  children,
  isLoading,
  onClick,
  className,
}: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 
        ${isLoading ? "opacity-70 cursor-not-allowed" : ""} ${className}`}
    >
      {isLoading && <FaSpinner className="animate-spin h-5 w-5" />}
      {children}
    </button>
  );
}
