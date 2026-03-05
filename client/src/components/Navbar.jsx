import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const { user, logout } = useAuth();

  return (
    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        CampusStay
      </Link>

      {/* Navigation */}
      <div className="flex gap-6 items-center">

        <Link to="/listings">Listings</Link>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Register
            </Link>
          </>
        )}

      </div>

    </div>
  );
};

export default Navbar;