const Review = require("../models/review");
const Listing = require("../models/listing"); 


module.exports.createeReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", " New Review Created");

  res.redirect(`/listings/${listing._id}`);
};


module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
  
    // Pull the review from the listing's reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  
    // Delete the review itself from the Review collection
    await Review.findByIdAndDelete(reviewId);
  
    // Redirect to the correct listings page
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
  };
