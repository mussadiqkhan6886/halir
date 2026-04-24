"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddTestimonialPage = () => {
  const [form, setForm] = useState({
    name: "",
    message: "",
  });
  const [result,setResult] = useState("")
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        setLoading(true)
      const res = await axios.post("/api/reviews", form);
      if (res.data.success) {
        setResult("Testimonial added successfully!")
        setForm({ name: "", message: "" });
        setTimeout(() => {
          router.push("/#review")
        }, 1500)
      } else {
        setResult("Failed to add testimonial.");
      }
    } catch (error) {
      setResult("Something went wrong!")
      console.error(error);
    } finally{
        setLoading(false)
    }
  };

  return (
    <main className="max-w-3xl w-full mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold text-center mb-10">
        Add Review
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-5 w-full"
      >
        <div>
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Hashir Khan Khattak"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 focus:outline-none focus:border-zinc-800"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="write review here..."
            rows={4}
            className="w-full border border-gray-300 p-2 focus:outline-none focus:border-zinc-800 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-black text-white py-3 hover:bg-zinc-700 transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
        <p className="text-center mt-3">{result}</p>
      </form>
    </main>
  );
};

export default AddTestimonialPage;
