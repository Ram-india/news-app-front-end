import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { FaTrash, FaRegClock, FaTag, FaEnvelopeOpenText } from "react-icons/fa";

const EmailLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get("/users/email-logs");
      if (Array.isArray(response.data)) {
        setLogs(response.data);
      } else {
        setLogs([]);
      }
    } catch (error) {
      console.error("Error fetching email logs:", error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index) => {
    const log = logs[index];
    const confirmed = window.confirm("Are you sure you want to delete this log?");
    if (!confirmed) return;

    try {
      await axios.delete(`/users/email-logs/${log._id}`);
      setLogs((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      alert("Failed to delete log.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading email logs...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-700 text-center"> News Email Logs</h2>

      {logs.length === 0 ? (
        <div className="text-center text-gray-500">No email logs available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {logs.map((log, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-lg rounded-2xl p-5 hover:shadow-xl transition duration-300"
            >
              <button
                onClick={() => handleDelete(index)}
                title="Delete Log"
                className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full shadow-sm transition"
              >
                <FaTrash />
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <FaTag />
                  <span className="capitalize">{log.category}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-800">
                  <FaEnvelopeOpenText />
                  <span className="font-semibold">{log.subject}</span>
                </div>

                <div className="flex items-center gap-2 text-green-700 text-sm mb-6">
                  <FaRegClock />
                  <span>{new Date(log.sentAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="absolute bottom-3 left-3 text-xs text-gray-400">
                ID: {log._id?.slice(-6)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailLogs;