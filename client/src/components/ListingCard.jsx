import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      {/* Image */}
      <img
        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
        alt="room"
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4">

        <h2 className="text-lg font-semibold mb-1">
          {listing.title}
        </h2>

        <p className="text-gray-600 text-sm mb-2">
          {listing.address}
        </p>

        <div className="text-sm text-gray-700 space-y-1">

          <p>💰 ₹{listing.price} / month</p>

          <p>🛏 {listing.roomType} Room</p>

          <p>
            🍽 {listing.foodAvailable ? "Food Available" : "No Food"}
          </p>

          <p>📍 {listing.distanceFromCollege} km away</p>

        </div>

        {/* Button */}
        <Link
          to={`/listings/${listing._id}`}
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default ListingCard;