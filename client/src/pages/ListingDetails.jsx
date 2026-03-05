import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const ListingDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingMsg, setBookingMsg] = useState("");

  useEffect(() => {

    const fetchListing = async () => {

      try {

        const { data } = await API.get(`/listings/${id}`);

        setListing(data);

      } catch (err) {

        setError("Listing not found");

      } finally {

        setLoading(false);

      }

    };

    fetchListing();

  }, [id]);

  const handleBooking = async () => {

    try {

      await API.post("/bookings", {
        listingId: listing._id
      });

      setBookingMsg("Booking request sent successfully!");

    } catch (err) {

      setBookingMsg(
        err.response?.data?.message || "Booking failed"
      );

    }

  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center py-20">Loading listing...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-500 py-20">
          {error}
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">

        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
          alt="PG"
          className="w-full h-64 object-cover"
        />

        <div className="p-6">

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">
            {listing.title}
          </h1>

          <p className="text-gray-600 mb-4">
            {listing.address}
          </p>

          {/* Description */}
          <p className="mb-6">
            {listing.description}
          </p>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-gray-700">

            <p>
              💰 Price: ₹{listing.price} / month
            </p>

            <p>
              🛏 Room Type: {listing.roomType}
            </p>

            <p>
              🍽 Food: {listing.foodAvailable ? "Available" : "Not Available"}
            </p>

            <p>
              📍 Distance: {listing.distanceFromCollege} km
            </p>

          </div>

          {/* Buttons */}
          <div className="flex gap-4">

            <button
              onClick={handleBooking}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Book Now
            </button>

            <button
              onClick={() => navigate(`/map/${listing._id}`)}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              View on Map
            </button>

          </div>

          {/* Booking Message */}
          {bookingMsg && (
            <p className="mt-4 text-green-600">
              {bookingMsg}
            </p>
          )}

        </div>

      </div>

    </MainLayout>
  );
};

export default ListingDetails;