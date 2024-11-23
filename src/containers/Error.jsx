import { Link } from "react-router-dom";
import GreenError from "@img/404-green.webp";
const Error = () => {
  return (
    <main
      className="grid min-h-full place-items-center 
    bg-white
    px-6 py-24 sm:py-32 lg:px-8 dark:bg-dark"
    >
      <div className="text-center">
        <h2 className="sr-only mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Error 404
        </h2>
        <img src={GreenError} alt="error 404" className="green-error dark:bg-lime-600/50 rounded-2xl" />
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-white">
          The requested page doesn&apos;t exist...
        </p>
        <p className="mt-6 mb-6 text-base leading-7 text-gray-600 dark:text-white">
          Please return to homepage
        </p>
        <Link to="/">
          <button
            className="rounded-md bg-green-600 px-3.5 py-2.5 
            text-sm font-semibold text-white shadow-sm hover:bg-green-500 
            focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-green-600 dark:bg-violet-950 "
          >
            Back to the homepage
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Error;
