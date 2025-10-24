import React from "react";
import TutorCard from "./TutorCard";

const FindTutor = ({ tutors }) => {
  return (
    <div className="flex flex-col gap-7 my-20">
      {tutors.map((tutor, index) => (
        <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
      ))}
    </div>
  );
};

export default FindTutor;
