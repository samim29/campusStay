const Booking = require("../models/Booking");
const Listing = require("../models/Listing");

// Student creates booking
exports.createBooking = async (req, res) => {
  try {
    const { listingId } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    const existingBooking = await Booking.findOne({
        student: req.user._id,
        listing: listingId,
        status: "pending",
    });

    if (existingBooking) {
        return res.status(400).json({ message: "You already have a pending booking for this listing" });
    }

    if (!listing.availability) {
        return res.status(400).json({ message: "Listing is not available" });
    }
    
    const booking = await Booking.create({
      student: req.user._id,
      listing: listingId,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student view own bookings
exports.getStudentBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.user._id })
      .populate("listing")
      .populate("student", "name email");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Owner view booking requests for their listings
exports.getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "listing",
        match: { owner: req.user._id },
      })
      .populate("student", "name email");

    const filtered = bookings.filter((b) => b.listing !== null);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Owner approves/rejects booking
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id).populate("listing");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Cannot cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};