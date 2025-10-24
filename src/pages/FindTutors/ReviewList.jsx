import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { toast } from 'react-toastify';

const ReviewList = ({ tutorId, refreshTrigger }) => {
  const { user } = React.useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [tutorId, refreshTrigger]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`https://assigment-11-server-nu.vercel.app/reviews/${tutorId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const response = await fetch(`https://assigment-11-server-nu.vercel.app/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });

      if (response.ok) {
        toast.success('Review deleted successfully');
        fetchReviews(); // Refresh reviews
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  const StarRating = ({ rating, readonly = true }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet. Be the first to review this tutor!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">
        Reviews ({reviews.length})
      </h3>
      
      {reviews.map((review) => (
        <div key={review._id} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {review.reviewerName ? review.reviewerName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {review.reviewerName || 'Anonymous'}
                </p>
                <div className="flex items-center space-x-2">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            
            {user && user.email === review.reviewerEmail && (
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            )}
          </div>
          
          <p className="text-gray-700 mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
