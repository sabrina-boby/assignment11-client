import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import MyBookedTutor from "./MyBookedTutor";

const MyBookedTutors = () => {
  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(
      `https://assigment-11-server-nu.vercel.app/bookings?email=${user.email}`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);
  return (
    <div>
      {/* <h2>My Booked Tutors {bookings.length}</h2> */}
      <MyBookedTutor bookings={bookings}></MyBookedTutor>
    </div>
  );
};

export default MyBookedTutors;
