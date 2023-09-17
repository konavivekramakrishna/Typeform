import { Link } from "raviger";

export default function Error() {
  return (
    <div className="flex flex-col justify-between h-full">
      <main className="flex-1 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center px-4 pb-4">
            <h5 className="text-l font-medium text-gray-600">
              Please login to access this page!
            </h5>
            <p className="mt-3 text-sm text-gray-500 leading-normal">
              You may have mistyped the address, or the page may have moved.
            </p>
            <p className="mt-1 mb-3 text-sm text-gray-500 leading-normal">
              Login to access this page!
            </p>
          </div>
        </div>

        <footer>
          <div className="container mx-auto px-4 text-center">
            <Link className="text-blue-600 hover:text-blue-500" href="/login">
              Login
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
