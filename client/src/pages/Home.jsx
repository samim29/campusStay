import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Home = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {

    if (!search.trim()) {
      return setError("Please enter a location or property name");
    }

    setError("");

    navigate(`/listings?search=${search}`);

  };

  return (
    <MainLayout>

      {/* Hero Section */}
      <div className="text-center py-16">

        <h1 className="text-4xl font-bold mb-4">
          Find Affordable PG & Hostels Near Your College
        </h1>

        <p className="text-gray-600 mb-8">
          Search verified student accommodations easily.
        </p>

        {/* Search Box */}
        <div className="flex justify-center gap-2">

          <input
            type="text"
            placeholder="Enter location or PG name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 w-80 rounded"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>

        </div>

        {error && (
          <p className="text-red-500 mt-3">
            {error}
          </p>
        )}

      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mt-16">

        <div className="bg-white p-6 shadow rounded-lg text-center">

          <h3 className="text-xl font-semibold mb-2">
            Verified Listings
          </h3>

          <p className="text-gray-600">
            Find trusted PGs and hostels listed by verified owners.
          </p>

        </div>

        <div className="bg-white p-6 shadow rounded-lg text-center">

          <h3 className="text-xl font-semibold mb-2">
            Easy Booking
          </h3>

          <p className="text-gray-600">
            Send booking requests directly to property owners.
          </p>

        </div>

        <div className="bg-white p-6 shadow rounded-lg text-center">

          <h3 className="text-xl font-semibold mb-2">
            Map View
          </h3>

          <p className="text-gray-600">
            See the PG location on an interactive map.
          </p>

        </div>

      </div>

      {/* Call to Action */}
      <div className="text-center mt-20">

        <h2 className="text-2xl font-bold mb-4">
          Ready to find your next stay?
        </h2>

        <button
          onClick={() => navigate("/listings")}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Browse Listings
        </button>

      </div>

    </MainLayout>
  );
};

export default Home;