import React, { useEffect, useState } from 'react'



const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

const CategorySelecotor = () => {
    const [selected, setSelected]= useState([]);

 // Fetch preferences on page load
 useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await API.get("/preferences");
        console.log("Fetched preferences from server:", res.data);

        setSelected(res.data.preferences || []);
        setFrequency(res.data.alertFrequency || "daily");
      } catch (error) {
        console.error("Failed to fetch preferences:", error);
        setMessage("Failed to load preferences");
      }
    };

    fetchPreferences();
  }, []);
  const toggleCategory = (category) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };
  const savePreferences = async (e) => {

    e.preventDefault();
   try {
     const res = await API.post("/preferences", {
       preferences: selected,
     
     });

     console.log("Server response:", res.data);
     toast.success("Preferences saved successfully!");
   } catch (error) {
     console.error("Failed to save preferences:", error);
     toast.error("Failed to save preferences");
   }
 };
  return (
    <div className='flex flex-wrap gap-3 mb-4'>
        {
            categories.map((category)=>(
                <button
                 key={category}
                 type='button'
                 className={`px-4 py-2 rounded ${selected.includes(category)? "bg-blue-600 text-white" :"bg-gray-200"}`}
                 onClick={() => toggleCategory(category)}
                 >
                    {category}
                 </button>
            ))
        }


    </div>
  )
}

export default CategorySelecotor