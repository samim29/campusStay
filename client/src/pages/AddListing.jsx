import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

const AddListing = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    roomType: "single",
    foodAvailable: false,
    distanceFromCollege: "",
    address: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");
    setSuccess("");

    const {
      title,
      description,
      price,
      distanceFromCollege,
      address
    } = formData;

    // Validation
    if (!title || !description || !price || !distanceFromCollege || !address) {
      return setError("All fields are required");
    }

    if (price < 0) {
      return setError("Price cannot be negative");
    }

    if (distanceFromCollege < 0) {
      return setError("Distance cannot be negative");
    }

    try {

      await API.post("/listings", formData);

      setSuccess("Listing created successfully!");

      setFormData({
        title: "",
        description: "",
        price: "",
        roomType: "single",
        foodAvailable: false,
        distanceFromCollege: "",
        address: ""
      });

    } catch (err) {

      setError(
        err.response?.data?.message || "Failed to create listing"
      );

    }

  };

  return (
    <DashboardLayout>

      <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg">

        <h1 className="text-2xl font-bold mb-6">
          Add New Listing
        </h1>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1">Price / month</label>
            <input
              type="number"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block mb-1">Room Type</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="triple">Triple</option>
            </select>
          </div>

          {/* Food */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="foodAvailable"
              checked={formData.foodAvailable}
              onChange={handleChange}
            />
            <label>Food Available</label>
          </div>

          {/* Distance */}
          <div>
            <label className="block mb-1">
              Distance from College (km)
            </label>
            <input
              type="number"
              name="distanceFromCollege"
              min="0"
              value={formData.distanceFromCollege}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Listing
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
};

export default AddListing;