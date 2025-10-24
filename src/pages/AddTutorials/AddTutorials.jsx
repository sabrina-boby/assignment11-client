import axios from "axios";
import React, { use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const AddTutorials = () => {
  const { user } = use(AuthContext);
  // console.log("== ", user.displayName);
  // console.log("== ", user.email);
  // console.log("=> ", user.accessToken);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      image: form.image.value,
      language: form.language.value,
      price: form.price.value,
      description: form.description.value,
      review: 0, // Default review
    };
  //  console.log("=> ",formData)
    axios
      .post(
        `https://assigment-11-server-nu.vercel.app/tutorials`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.data.insertedId) {
          //sweet alert
          Swal.fire({
            title: "Successfully added into DB!",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Tutorials</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="label">Your Name</label>
        <input
          type="text"
          name="name"
          className="w-full p-2 border border-base-300 rounded"
          // placeholder="Your Name"
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
          placeholder="Image URL"
          required
        />

        {/* ================== */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="fieldset-legend">Language</legend>

          <select
            defaultValue=""
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

        {/* =================== */}
        <label className="label">Price (USD)</label>
        <input
          type="number"
          name="price"
          className="w-full p-2 border border-base-300 rounded"
          placeholder="Price (USD)"
          required
        />

        <label className="label">Description</label>
        <textarea
          name="description"
          className="w-full p-2 border border-base-300 rounded"
          placeholder="Description"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Add Tutorial
        </button>
      </form>
    </div>
  );
};

export default AddTutorials;
