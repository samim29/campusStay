import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import MapView from "./pages/MapView";
import StudentDashboard from "./pages/StudentDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar visible on all pages */}
      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Listings */}
        <Route
          path="/listings"
          element={
            <ProtectedRoute>
              <Listings />
            </ProtectedRoute>
          }
        />

        {/* Listing Details */}
        <Route
          path="/listings/:id"
          element={
            <ProtectedRoute>
              <ListingDetails />
            </ProtectedRoute>
          }
        />

        {/* Map View */}
        <Route
          path="/map/:id"
          element={
            <ProtectedRoute>
              <MapView />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;