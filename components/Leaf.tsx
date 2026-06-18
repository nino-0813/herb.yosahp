export default function Leaf({ className = "logo__leaf" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M28 4C16 5 7 11 5 22c-1 5 0 6 0 6s4-9 11-13"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M27 5c-1 6-4 10-9 12M22 6c-1 4-3 6-6 8M16 8c-1 3-2 5-5 7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}
