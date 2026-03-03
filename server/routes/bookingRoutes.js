const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createBooking,
  getStudentBookings,
  getOwnerBookings,
  updateBookingStatus,
  cancelBooking,
} = require("../controllers/bookingController");

router.post("/", protect, authorizeRoles("student"), createBooking);

router.get("/student", protect, authorizeRoles("student"), getStudentBookings);

router.get("/owner", protect, authorizeRoles("owner"), getOwnerBookings);

router.put("/:id", protect, authorizeRoles("owner"), updateBookingStatus);

router.put("/cancel/:id", protect, authorizeRoles("student"), cancelBooking);

module.exports = router;