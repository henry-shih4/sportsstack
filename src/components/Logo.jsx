export default function Logo() {
  return (
    <svg 
      className="w-10 h-10" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Custom Sports Stack Logo */}
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
      <path 
        d="M12 20C12 13.373 17.373 8 24 8C30.627 8 36 13.373 36 20" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      <path 
        d="M28 20C28 26.627 22.627 32 16 32C9.373 32 4 26.627 4 20" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      {/* Add more paths for a more complex logo */}
    </svg>
  );
} 