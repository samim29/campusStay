import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

import ListingCard from "../components/ListingCard";
import Sidebar from "../components/Sidebar";

const Listings = () => {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const fetchListings = async (filters = {}) => {

    try {

      setLoading(true);

      const search = searchParams.get("search");

      const query = new URLSearchParams({
        ...filters,
        search
      }).toString();

      const { data } = await API.get(`/listings?${query}`);

      setListings(data);

    } catch (err) {

      setError("Failed to load listings");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchListings();

  }, [searchParams]);

  return (
    <MainLayout>

      <div className="flex gap-8">

        {/* Sidebar */}
        <Sidebar onFilter={fetchListings} />

        {/* Listings Section */}
        <div className="flex-1">

          <h1 className="text-3xl font-bold mb-6">
            Available PG & Hostels
          </h1>

          {/* Loading */}
          {loading && (
            <p className="text-gray-600">
              Loading listings...
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {/* Empty State */}
          {!loading && listings.length === 0 && (
            <div className="text-center py-20">

              <h2 className="text-xl font-semibold mb-2">
                No PG Found
              </h2>

              <p className="text-gray-500">
                Try adjusting your filters.
              </p>

            </div>
          )}

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {listings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
              />
            ))}

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default Listings;