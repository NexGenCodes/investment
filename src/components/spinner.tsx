export default function Spinner() {
  return (
    <div className="fixed top-0 w-full h-16 bg-gray-900/90 z-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-t-yellow-400 border-gray-700 rounded-full animate-spin" />
    </div>
  );
}
