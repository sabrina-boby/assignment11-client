import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router"; // Correct import
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useNotifications } from "../../context/NotificationContext/NotificationProvider";
import axios from "axios";
import Swal from "sweetalert2";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const TutorDetails = () => {
  const { user } = use(AuthContext);
  const { addNotification } = useNotifications();
  const { id } = useParams();
  const [tutor, setTutor] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRefreshTrigger, setReviewRefreshTrigger] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:3000/tutorials/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTutor(data);
      });
  }, [id]);

  const handleBookSession = () => {
    const bookingData = {
      tutorId: tutor._id,
      image: tutor.image,
      language: tutor.language,
      price: tutor.price,
      tutorEmail: tutor.email,
      email: user.email,
      review: tutor.review,
    };

    axios
      .post(
        "http://localhost:3000/bookings",
        bookingData
      )
      .then((res) => {
        // console.log(res);
        if (res.data.insertedId) {
          // Add notification
          addNotification({
            type: 'success',
            title: 'Booking Confirmed! 🎉',
            message: `Your session with ${tutor.name} has been booked successfully!`,
            action: 'view'
          });

          //sweet alert
          Swal.fire({
            title: "Successfully added into DB!",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    // Trigger review list refresh
    setReviewRefreshTrigger(prev => prev + 1);
    // Refresh tutor data to show updated ratings
    fetch(
      `http://localhost:3000/tutorials/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTutor(data);
      });
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Tutor Details Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:mr-6 mb-4 md:mb-0">
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-48 h-48 rounded-md object-cover"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-3xl font-bold mb-2">{tutor.name}</h2>
            <p className="text-gray-600 mb-1">Email: {tutor.email}</p>
            <p className="text-gray-600 mb-1">Language: {tutor.language}</p>
            <p className="text-gray-600 mb-1">Price: ${tutor.price} / hr</p>
            <div className="flex items-center mb-3">
              <span className="text-yellow-500 text-xl">⭐</span>
              <span className="ml-2 text-lg font-semibold">
                {tutor.averageRating || tutor.review || 0}
              </span>
              {tutor.totalReviews && (
                <span className="ml-2 text-gray-600">
                  ({tutor.totalReviews} reviews)
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-4">{tutor.description}</p>
            <div className="flex space-x-4">
              <button
                onClick={handleBookSession}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Book a Session
              </button>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {showReviewForm ? 'Cancel Review' : 'Write Review'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-8">
          <ReviewForm 
            tutorId={id} 
            onReviewSubmitted={handleReviewSubmitted}
          />
        </div>
      )}

      {/* Reviews Section - Always visible */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ReviewList tutorId={id} refreshTrigger={reviewRefreshTrigger} />
      </div>
    </div>
  );
};

export default TutorDetails;
