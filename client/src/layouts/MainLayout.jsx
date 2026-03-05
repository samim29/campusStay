import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const MainLayout = ({ children }) => {

  const { loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-6">

        {children}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-10">

        <div className="container mx-auto px-6 py-4 flex justify-between items-center text-sm text-gray-600">

          <p>© {new Date().getFullYear()} CampusStay</p>

          <div className="flex gap-4">

            <a
              href="#"
              className="hover:text-blue-600"
            >
              Privacy
            </a>

            <a
              href="#"
              className="hover:text-blue-600"
            >
              Terms
            </a>

            <a
              href="#"
              className="hover:text-blue-600"
            >
              Contact
            </a>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default MainLayout;