import React from "react";
import { Link } from "react-router";

const TutorCard = ({ tutor }) => {
  const { name, email, image, language, price, description, review } = tutor;

  return (
    <div className="flex justify-center">
      <div className="flex items-center border rounded-lg p-4 shadow-md hover:shadow-lg transition w-2xl">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-md object-cover mr-4"
        />
        <div className="flex-grow">
          <div className="font-semibold text-lg">
            {name}
            <span className="text-yellow-500 ml-5">⭐ {review}</span>
          </div>
          <div className="text-gray-600">Language: {language}</div>
          <p className="text-gray-700 mt-1">{description}</p>
          <p className="text-sm text-gray-500 mt-1">Price: ${price} / hr</p>
        </div>
        <Link to={`/tutor/${tutor._id}`}>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;
