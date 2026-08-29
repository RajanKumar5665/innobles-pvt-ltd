// Simple centered spinner shown while data is loading.
const Loader = ({ size = "md", className = "" }) => {
  const sizeClass = size === "lg" ? "h-12 w-12 border-4" : size === "sm" ? "h-5 w-5 border-2" : "h-8 w-8 border-[3px]";
  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label="Loading">
      <span className={`${sizeClass} inline-block animate-spin rounded-full border-primary border-t-transparent`} />
    </div>
  );
};

export default Loader;

