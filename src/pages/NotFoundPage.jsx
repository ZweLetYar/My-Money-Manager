export default function NotFoundPage() {
  return (
    <div className="mt-30 w-[60%] ml-auto mr-auto bg-white flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-teal-600">404</h1>
      <h2 className="text-2xl mt-4 font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-500 text-sm text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}
