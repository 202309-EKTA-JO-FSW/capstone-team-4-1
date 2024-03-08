import React from 'react';
import ReactStars from "react-rating-stars-component";

const Stars = ({ rating }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <ReactStars
      count={5}
      value={rating}
      onChange={ratingChanged}
      size={24}
      isHalf={true}
      edit={false}
      activeColor="#ffd700"
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
    />
  );
};

export default Stars;
