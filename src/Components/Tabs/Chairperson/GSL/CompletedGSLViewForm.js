import React, { useState } from 'react';
import ReactStars from 'react-stars';

const CompletedGSLViewForm = ({ 
    openingStatements, 
    closingStatements, 
    foreignPolicy, 
    poi, 
    notes, 
    overallRating 
  }) => {
    const [openingRating, setOpeningRating] = useState(openingStatements);
    const [closingRating, setClosingRating] = useState(closingStatements);
    const [foreignPolicyRating, setForeignPolicyRating] = useState(foreignPolicy);
    const [poiRating, setPoiRating] = useState(poi);
  
    const handleOpeningRatingChange = (value) => setOpeningRating(value);
    const handleClosingRatingChange = (value) => setClosingRating(value);
    const handleForeignPolicyRatingChange = (value) => setForeignPolicyRating(value);
    const handlePoiRatingChange = (value) => setPoiRating(value);
  
    return (
      <div className="p-4 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Rating System</h2>
  
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Opening Statements</h3>
          <ReactStars
            count={10}
            value={openingRating}
            size={24}
            color1={'#e4e5e9'}
            color2={'#ffd700'}
            onChange={handleOpeningRatingChange}
          />
        </div>
  
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Closing Statements</h3>
          <ReactStars
            count={10}
            value={closingRating}
            size={24}
            color1={'#e4e5e9'}
            color2={'#ffd700'}
            onChange={handleClosingRatingChange}
          />
        </div>
  
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Foreign Policy</h3>
          <ReactStars
            count={10}
            value={foreignPolicyRating}
            size={24}
            color1={'#e4e5e9'}
            color2={'#ffd700'}
            onChange={handleForeignPolicyRatingChange}
          />
        </div>
  
        {poi && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">POI</h3>
            <ReactStars
              count={10}
              value={poiRating}
              size={24}
              color1={'#e4e5e9'}
              color2={'#ffd700'}
              onChange={handlePoiRatingChange}
            />
          </div>
        )}
  
    </div>
    )
        };
export default CompletedGSLViewForm