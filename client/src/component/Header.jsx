import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold
    
    dark:text-white
    "
      >
        <span
          className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 
      to-pink-500
      "
        >
          SHRI
        </span>
        Blog
      </Link>
    </Navbar>
  );
};

export default Header;
