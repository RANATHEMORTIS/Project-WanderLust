const mongoose = require("mongoose");
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });




module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  console.log(listing.geometry.coordinates);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {

   let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  }).send();
    
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;

  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};


module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  
  let originalImageUrl = null; // Initialize with null
  
  if (listing.image && listing.image.url) {
    originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");
  }

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.iamge = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res, next) => {
  try {
    let { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", "Invalid Listing ID format");
      return res.redirect("/listings"); // Return immediately after redirect
    }

    // Find the listing by ID
    const listing = await Listing.findById(id);

    // Check if the listing exists
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings"); // Return immediately after redirect
    }

    // Check if the current user is the owner of the listing
    if (!listing.owner.equals(req.user._id)) {
      req.flash("error", "You do not have permission to delete this listing");
      return res.redirect(`/listings/${id}`); // Return immediately after redirect
    }

    // If the user is the owner, delete the listing
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted");
    return res.redirect("/listings"); // Return immediately after redirect
  } catch (err) {
    console.error("Error deleting listing:", err);
    return next(err); // Pass error to error-handling middleware
  }
};
