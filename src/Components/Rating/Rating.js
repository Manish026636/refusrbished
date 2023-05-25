import React, { useState } from 'react'
import ReactStars from "react-stars";
const Rating = () => {
    const [ratings, setRatings] = useState(0);
    const ratingChanged = (newRating) => {
        setRatings(newRating);
        console.log(ratings);
      };
  return (
    <div className="w-full justify-center mx-auto">
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      value={ratings}
      color2={"#ffd700"}
    />
  </div>
  )
}

export default Rating