import { useEffect, useState } from "react";
import API from "../services/api";

const StudentDashboard = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const fetchBookings = async () => {

      const { data } = await API.get("/bookings/student");

      setBookings(data);

    };

    fetchBookings();

  }, []);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.map((booking) => (

        <div
          key={booking._id}
          className="border p-4 rounded mb-4"
        >

          <h2 className="text-xl font-semibold">
            {booking.listing.title}
          </h2>

          <p>Status: {booking.status}</p>

          <p>Price: ₹{booking.listing.price}</p>

        </div>

      ))}

    </div>
  );
};

export default StudentDashboard;