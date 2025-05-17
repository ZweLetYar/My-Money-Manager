export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-100">
      <div className="flex space-x-2">
        <span className="w-3 h-3 rounded-full bg-teal-600 animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-3 h-3 rounded-full bg-teal-600 animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-3 h-3 rounded-full bg-teal-600 animate-bounce"></span>
      </div>
    </div>
  );
}
