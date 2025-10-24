import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyTutorialCard = ({ tutorial, refreshTutorials }) => {

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This tutorial will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://assigment-11-server-nu.vercel.app/tutorials/${tutorial._id}`)
          .then(() => {
            Swal.fire("Deleted!", "The tutorial has been deleted.", "success");
            refreshTutorials();
          })
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <tr className="text-center">
      <td className="p-2 border">
        <img
          src={tutorial.image}
          alt={tutorial.language}
          className="h-16 mx-auto rounded"
        />
      </td>
      <td className="p-2 border">{tutorial.language}</td>
      <td className="p-2 border">${tutorial.price}</td>
      <td className="p-2 border">{tutorial.description}</td>
      <td className="p-2 border">⭐ {tutorial.review}</td>
      <td className="p-2 border space-x-2">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
        <Link to={`/update-tutorial/${tutorial._id}`}
        >
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Update
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default MyTutorialCard;
