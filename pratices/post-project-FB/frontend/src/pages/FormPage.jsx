import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const FormPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fileName, setFileName] = useState("");

  const handleForm = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("caption", data.caption);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/post/create-post",
        formData,
       
      );
      console.log(res.data);
      reset();
      setFileName(""); 
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <section className="flex justify-center items-center ">
      <div className="flex flex-col gap-6 bg-[rgb(15,14,14)] px-5 py-12 rounded-md w-[350px]">
        <h1 className="text-2xl font-medium">Create Post</h1>

        <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-8">
          {/* File Upload */}
          <div>
            <label className="bg-red-900 px-4 py-3 rounded-md cursor-pointer">
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", {
                  required: "Image is required",
                  onChange: (e) => {
                    if (e.target.files.length > 0) {
                      setFileName(e.target.files[0].name);
                    }
                  },
                })}
              />
            </label>
            {fileName && (
              <p className="text-green-400 text-sm mt-2">Selected: {fileName}</p>
            )}
            {errors.image && (
              <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
            )}
          </div>

          {/* Caption */}
          <div>
            <input
              type="text"
              placeholder="Enter your caption"
              className="border border-gray-600 px-5 py-2 rounded-md w-full"
              {...register("caption", { required: "Caption is required" })}
            />
            {errors.caption && (
              <p className="text-red-500 text-sm mt-1">{errors.caption.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-900 py-2.5 rounded-2xl cursor-pointer hover:bg-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormPage;
