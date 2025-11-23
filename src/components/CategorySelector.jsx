import { useEffect, useState } from "react";
import API from "../services/axios";
import { toast } from "react-hot-toast";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const CategorySelector = ({ onChange }) => {
  const [selected, setSelected] = useState([]);

  // Load user preferences from backend
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await API.get("/preferences");

        const userPrefs = res.data.preferences || [];
        setSelected(userPrefs);

        // Send categories to Home.jsx
        onChange(userPrefs);
      } catch (error) {
        console.error("Failed to fetch preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  // Toggle category selection
  const toggleCategory = async (category) => {
    const updated = selected.includes(category)
      ? selected.filter((item) => item !== category)
      : [...selected, category];

    setSelected(updated);
    onChange(updated); // Send to Home.jsx

    // Save to backend instantly
    try {
      await API.post("/preferences", { preferences: updated });
      toast.success("Preferences updated");
    } catch (error) {
      toast.error("Failed to update preferences");
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`px-2 py-1 rounded ${
            selected.includes(category)
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => toggleCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;