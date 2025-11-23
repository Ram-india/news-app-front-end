import { useEffect, useState } from "react";
import API from "../services/axios";
import { toast } from "react-hot-toast";
import CategorySelector from "../components/CategorySelector";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const Preference = () => {
  
  const [frequency, setFrequency] = useState("daily");
  const [message, setMessage] = useState("");

  

  const savePreferences = async (e) => {

     e.preventDefault();
    try {
      const res = await API.post("/preferences", {
        preferences: selected,
        alertFrequency: frequency,
      });

      console.log("Server response:", res.data);
      toast.success("Preferences saved successfully!");
    } catch (error) {
      console.error("Failed to save preferences:", error);
      toast.error("Failed to save preferences");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Choose Your News Categories</h1>

     <CategorySelector/>

      {/* Alert Frequency Select */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Alert Frequency:</label>
        <select
          className="p-2 border rounded"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="immediate">Immediate</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={savePreferences}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Save Preferences
        </button>
      </div>

      {/* Optional message fallback */}
      {message && (
        <p className="mt-4 text-center text-sm text-red-600">{message}</p>
      )}
    </div>
  );
};

export default Preference;