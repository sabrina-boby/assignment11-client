import React from "react";
import MyBookedCard from "./MyBookedCard";

const MyBookedTutor = ({ bookings }) => {
  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Booked Tutors</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No booked tutors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <MyBookedCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookedTutor;
