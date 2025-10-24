import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useLocation, useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateTutorial = () => {
  const { user } = use(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState({});

  useEffect(() => {
    fetch(`https://assigment-11-server-nu.vercel.app/tutorials/${id}`)
      .then((res) => res.json())
      .then((data) => setTutorials(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedTutorial = {
      image: form.image.value,
      language: form.language.value,
      price: form.price.value,
      description: form.description.value,
    };

    axios
      .put(
        `https://assigment-11-server-nu.vercel.app/tutorials/${id}`,
        updatedTutorial
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", "The tutorial has been updated.", "success");
          navigate("/my-tutorials"); // navigate to the MyTutorials page
        }
      })
      .catch((err) => console.error(err));
  };
  // console.log("--", tutorials);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Tutorial</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="label">Your Name</label>
        <input
          type="text"
          name="name"
          className="w-full p-2 border border-base-300 rounded"
          defaultValue={user?.displayName || ""}
          readOnly
          required
        />

        <label className="label">Your Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 border border-base-300 rounded"
          defaultValue={user?.email || ""}
          readOnly
          required
        />

        <label className="label">Image URL</label>
        <input
          type="text"
          name="image"
          className="w-full p-2 border border-base-300 rounded"
          defaultValue={tutorials.image || ""}
          required
        />

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="fieldset-legend">Language</legend>
          <select
            defaultValue={tutorials.language || ""}
            name="language"
            className="select w-full"
            required
          >
            <option value="" disabled>
              Select a Language
            </option>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Chinese</option>
            <option>Japanese</option>
            <option>Arabic</option>
            <option>Hindi</option>
            <option>Portuguese</option>
          </select>
        </fieldset>

        <label className="label">Price (USD)</label>
        <input
          type="number"
          name="price"
          className="w-full p-2 border border-base-300 rounded"
          defaultValue={tutorials.price || ""}
          required
        />

        <label className="label">Description</label>
        <textarea
          name="description"
          className="w-full p-2 border border-base-300 rounded"
          defaultValue={tutorials.description || ""}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Update Tutorial
        </button>
      </form>
    </div>
  );
};

export default UpdateTutorial;
