"use client";

import { Rating, Star } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const ProductRatingViewer = ({ rating }: { rating: number }) => {
  console.log(rating);

  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };

  return (
    <Rating
      style={{ maxWidth: 120 }}
      value={rating}
      readOnly
      itemStyles={myStyles}
    />
  );
};

export default ProductRatingViewer;
