import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowRight, FaMagento } from "react-icons/fa6";
import { FaLanguage } from "react-icons/fa"; // Example icon
import axios from "axios";
import { RiEnglishInput } from "react-icons/ri";
import { GiPortugal, GiSpain } from "react-icons/gi";
import { GiEgyptianProfile, GiIndiaGate } from "react-icons/gi";
import { SiAirchina } from "react-icons/si";
import { LuBadgeJapaneseYen, LuSwissFranc } from "react-icons/lu";

// Static logos for simplicity, replace with your actual icons
const categoryIcons = {
  English: <RiEnglishInput size={30} />,            // English icon
  Spanish: <GiSpain size={30} />,                  // Spain icon
  French: <LuSwissFranc size={30} />,              // France flag
  German: <FaMagento  size={30} />,             // Germany flag
  Chinese: <SiAirchina size={30} />,              // China flag
  Japanese: <LuBadgeJapaneseYen size={30} />,             // Japan flag
  Arabic: <GiEgyptianProfile size={30} />,         // Egyptian profile for Arabic
  Hindi: <GiIndiaGate size={30} />,                // India Gate for Hindi
  Portuguese: <GiPortugal size={30} />, 
};

const LanguageCategory = () => {
  const [tutorials, setTutorials] = useState([]);
  const navigate = useNavigate();


   useEffect(() => {
      fetch(`http://localhost:3000/tutorials`)
        .then((res) => res.json())
        .then((data) => setTutorials(data));
    },[]);

  // Calculate total teachers for each language
  const languageCounts = tutorials.reduce((acc, tutorial) => {
    acc[tutorial.language] = (acc[tutorial.language] || 0) + 1;
    return acc;
  }, {});

  // List of categories to display
  const categories = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Arabic",
    "Hindi",
    "Portuguese",
  ];

  return (
    <div className="bg-base-200 py-10">
    <div className="grid bg-base-200 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10 max-w-6xl mx-auto">
      {categories.map((language) => (
        <div
          key={language}
          className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
          onClick={() => navigate(`/find-tutors/${language}`)}
        >
          <div className="flex items-center gap-3">
            {categoryIcons[language]}
            <div>
              <h3 className="font-bold text-lg">{language} tutors</h3>
              <p className="text-gray-500 text-sm">
                {languageCounts[language] || 0} teachers
              </p>
            </div>
          </div>
          <FaArrowRight />
        </div>
      ))}
    </div>
    </div>
  );
};

export default LanguageCategory;
