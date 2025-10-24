import React, { useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { useNotifications } from '../../context/NotificationContext/NotificationProvider';
import { toast } from 'react-toastify';

const ReviewForm = ({ tutorId, onReviewSubmitted }) => {
  const { user } = React.useContext(AuthContext);
  const { addNotification } = useNotifications();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({
          tutorId,
          rating,
          comment: comment.trim(),
          tutorName: '', // Will be filled by backend
          tutorEmail: '' // Will be filled by backend
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        // Store the submitted review to show below the form
        setSubmittedReview({
          rating,
          comment: comment.trim(),
          reviewerName: user?.displayName || user?.email,
          createdAt: new Date()
        });

        // Add notification
        addNotification({
          type: 'success',
          title: 'Review Published! 📝',
          message: 'Your review has been published and will help other students!',
          action: 'view'
        });

        toast.success('Review submitted successfully!');
        setRating(0);
        setComment('');
        onReviewSubmitted();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, onRatingChange, readonly = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readonly && onRatingChange(star)}
            className={`text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } ${!readonly ? 'hover:text-yellow-400 cursor-pointer' : 'cursor-default'}`}
            disabled={readonly}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment *
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this tutor..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              setRating(0);
              setComment('');
            }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>

      {/* Show submitted review below the form */}
      {submittedReview && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
              {submittedReview.reviewerName ? submittedReview.reviewerName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="font-medium text-green-800">
                {submittedReview.reviewerName || 'You'}
              </p>
              <div className="flex items-center">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${
                        star <= submittedReview.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-xs text-green-600">
                  Just now
                </span>
              </div>
            </div>
          </div>
          <p className="text-green-700 text-sm">{submittedReview.comment}</p>
          <div className="mt-2 text-xs text-green-600 font-medium">
            ✅ Your review has been published successfully!
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
