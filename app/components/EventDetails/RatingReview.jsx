"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../ui/Button';
import { FaAngleDoubleDown } from "react-icons/fa";
import { fetchEventReviewData } from '../../store/slice/eventReview/eventReviewSlice ';

const ReviewPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.eventReview);
  const [visibleReviews, setVisibleReviews] = useState(4);

  // Fetch reviews for event ID 4 (or make eventId a prop)
  useEffect(() => {
    dispatch(fetchEventReviewData(4));
  }, [dispatch]);

  // Use fetched reviews or fallback to empty array
  const reviews = data.reviews || [];

  // Calculation of overall rating
  const calculateOverallRating = () => {
    if (!reviews.length) return "0.0";
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`text-xl ${index < rating ? '__accent_color' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  // Handle see more functionality
  const handleSeeMore = () => {
    setVisibleReviews(prev => Math.min(prev + 2, reviews.length));
  };

  // Calculate rating percentage
  const calculateRatingPercentage = () => {
    const overallRating = parseFloat(calculateOverallRating());
    return (overallRating / 5) * 100;
  };

  // Rating count by star
  const getRatingCounts = () => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      counts[review.rating - 1]++;
    });
    return counts.reverse();
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6 text-left text-white __text">Event Reviews</h2>
      
      {isLoading ? (
        <div className="text-white __text">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-white __text">No reviews available.</div>
      ) : (
        <>
          {/* Overall Rating Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="text-center md:mr-8 mb-4 md:mb-0 w-full md:w-auto">
              <div className="text-5xl font-bold __primaryColor __heading">{calculateOverallRating()}</div>
              <div className="flex justify-center mt-2">
                {renderStars(Math.round(parseFloat(calculateOverallRating())))}
              </div>
              <div className="text-sm text-white mt-1 __text">
                {data.total_reviews || 0} Reviews
              </div>
              
              {/* Rating Percentage Visualization */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="__accent_bg h-2.5 rounded-full" 
                  style={{width: `${data.positive_percentage || 0}%`}}
                ></div>
              </div>
              <div className="text-xs text-white mt-1 __text">
                {data.positive_percentage || 0}% Positive Reviews
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-grow w-full md:w-auto">
              {Object.entries(data.rating_breakdown || {}).reverse().map(([stars, count], index) => (
                <div key={index} className="flex items-center mb-1">
                  <div className="w-8 text-right mr-2 text-sm text-white __text">{stars} <span className='__accent_color text-lg'>★</span></div>
                  <div className="flex-grow bg-white h-2 mr-2 rounded-full overflow-hidden">
                    <div 
                      className="__accent_bg h-2 rounded-full" 
                      style={{width: `${(count / (data.total_reviews || 1)) * 100}%`}}
                    ></div>
                  </div>
                  <div className="w-8 text-left text-sm text-white">{count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-4">
            {reviews.slice(0, visibleReviews).map((review, index) => (
              <div key={index} className="border-b border-[#FFE100]/40 pb-4 last:border-b-0">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-bold __text">
                      {review.profile_letter || review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-white __heading">{review.name}</div>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-white font-[12px] __text">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="mb-3 text-white __text">{review.review}</p>
              </div>
            ))}
          </div>

          {/* See More Button */}
          {visibleReviews < reviews.length && (
            <div className="mt-6">
              <Button
                variant="fill" 
                onClick={handleSeeMore}
                className="!px-6 !py-2.5 flex items-center justify-between gap-1"
              >
                <span>See More Reviews</span>
                <FaAngleDoubleDown />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewPage;