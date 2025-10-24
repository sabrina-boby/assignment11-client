import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const States = () => {
  const { userCount } = use(AuthContext);
  const [stats, setStats] = useState({
    tutorCount: 0,
    reviewCount: 0,
    languageCount: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:3000/tutorials").then((res) => {
      const tutorials = res.data;
      const tutorCount = tutorials.length;
      const reviewCount = tutorials.reduce(
        (sum, item) => sum + (item.review || 0),
        0
      );
      const languageSet = new Set(tutorials.map((item) => item.language));
      const languageCount = languageSet.size;

      setStats({ tutorCount, reviewCount, languageCount });
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div>
        <h3 className="text-2xl font-bold">{stats.tutorCount}+</h3>
        <p className="text-gray-600">Experienced Tutors</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold">{stats.reviewCount}+</h3>
        <p className="text-gray-600">5-star Tutor Reviews</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold">{stats.languageCount}+</h3>
        <p className="text-gray-600">Languages Taught</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold">{userCount}+</h3>
        <p className="text-gray-600">Total Users</p>
      </div>
    </div>
  );
};

export default States;
