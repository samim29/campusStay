import { useState } from "react";

const FilterSidebar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    roomType: "",
    foodAvailable: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    const { minPrice, maxPrice } = filters;

    if (minPrice < 0 || maxPrice < 0) {
      return setError("Price cannot be negative");
    }

    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      return setError("Min price cannot be greater than Max price");
    }

    setError("");

    onFilter(filters);
  };

  return (
    <div className="w-64 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {/* Min Price */}
      <div className="mb-4">
        <label className="block mb-1">Min Price</label>
        <input
          type="number"
          name="minPrice"
          min="0"
          value={filters.minPrice}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Max Price */}
      <div className="mb-4">
        <label className="block mb-1">Max Price</label>
        <input
          type="number"
          name="maxPrice"
          min="0"
          value={filters.maxPrice}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Room Type */}
      <div className="mb-4">
        <label className="block mb-1">Room Type</label>
        <select
          name="roomType"
          value={filters.roomType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Any</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="triple">Triple</option>
        </select>
      </div>

      {/* Food */}
      <div className="mb-4">
        <label className="block mb-1">Food</label>
        <select
          name="foodAvailable"
          value={filters.foodAvailable}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Any</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
