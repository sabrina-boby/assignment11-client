import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import MyTutorial from "./MyTutorial";
import Loading from "../Loading/Loading";

const MyTutorials = () => {
  const { user } = use(AuthContext);
  const [myTutorials, setMyTutorials] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // console.log("===== ",user.email)
  const refreshTutorials = () => {
    setLoading(true); // Start loading
    fetch(
      `http://localhost:3000/tutorials?email=${user.email}`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMyTutorials(data);
        setLoading(false); // Stop loading after data loads
      })
      .catch(() => setLoading(false)); // Stop loading on error
  };
  useEffect(() => {
    refreshTutorials();
  }, [user?.email]);
  return (
    <div>
      {/* <h1>My Tutorials {myTutorials.length}</h1> */}
      <MyTutorial
        myTutorials={myTutorials}
        refreshTutorials={refreshTutorials}
      ></MyTutorial>
    </div>
  );
};

export default MyTutorials;
