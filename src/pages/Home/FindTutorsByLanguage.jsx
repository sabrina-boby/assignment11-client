import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import FindTutor from "../FindTutors/FindTutor";

const FindTutorsByLanguage = () => {
  const { language } = useParams();
  const [tutors, setTutors] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/tutorials/category/${language}`)
      .then((res) => res.json())
      .then((data) => setTutors(data));
  }, []);
  return (
    <div>
        {tutors.length > 0 ? (
        <FindTutor tutors={tutors} />
      ) : (
        <p className="text-center text-gray-500 font-bold text-xl my-10">No tutor found</p>
      )}
    </div>
  );
};

export default FindTutorsByLanguage;
