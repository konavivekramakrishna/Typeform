import { Link } from "raviger";

export default function Error() {
  return (
    <div className="flex flex-col justify-between h-full">
      <main className="flex-1 bg-white">
        <div className="container mx-auto">
          <picture className="flex flex-col px-4 pt-5 items-center">
            <img
              className="md:w-3/5"
              src="https://assets.pupilfirst.com/assets/layouts/errors/error-404-08c5164253e472a31d5a3207fe6086db80b42c7bfbd7dca08363e55c5945d17b.svg"
              alt="Page not found"
            />
          </picture>
          <div className="max-w-3xl mx-auto text-center px-4 pb-4">
            <h5 className="text-l font-medium text-gray-600">
              The page you were looking for doesn't exist!
            </h5>
            <p className="mt-3 text-sm text-gray-500 leading-normal">
              You may have mistyped the address, or the page may have moved.
            </p>
            <p className="mt-1 mb-3 text-sm text-gray-500 leading-normal">
              Try heading back to our homepage?
            </p>
          </div>
        </div>

        <footer>
          <div className="container mx-auto px-4 text-center">
            <Link className="text-blue-600 hover:text-blue-500" href="/">
              Home
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
