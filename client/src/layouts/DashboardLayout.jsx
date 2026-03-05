import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Prevent unauthorized access
  if (!user) {
    navigate("/login");
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">

        <h2 className="text-xl font-bold mb-6 text-blue-600">
          CampusStay
        </h2>

        <nav className="flex flex-col gap-4">

          <Link
            to="/dashboard"
            className="hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/listings"
            className="hover:text-blue-600"
          >
            Browse Listings
          </Link>

          {user?.role === "owner" && (
            <>
              <Link
                to="/owner/add-listing"
                className="hover:text-blue-600"
              >
                Add Listing
              </Link>

              <Link
                to="/owner/listings"
                className="hover:text-blue-600"
              >
                My Listings
              </Link>
            </>
          )}

          <button
            onClick={handleLogout}
            className="text-left text-red-500"
          >
            Logout
          </button>

        </nav>

      </aside>

      {/* Main Content */}
      <div className="flex-1">

        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">

          <h1 className="text-xl font-semibold">
            Dashboard
          </h1>

          <div className="text-sm text-gray-600">
            Welcome, {user?.name}
          </div>

        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;