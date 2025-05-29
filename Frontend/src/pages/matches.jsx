import React, { useEffect, useState } from "react";
import axios from "axios";

const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get(`https://first-vercel-backend.vercel.app/api/short-matches`);
        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        background:
          "linear-gradient(to bottom, #7ed6ff 0%, #b2f0ff 60%, #a8e063 100%)",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <div>
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-800 tracking-wide drop-shadow-lg pt-8">
          ⚽ Upcoming Football Matches
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-12">
          {matches.map((match, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-200 via-cyan-100 to-green-100 rounded-2xl shadow-2xl p-6 flex flex-col gap-3 border-2 border-blue-300 hover:border-blue-500 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-blue-200/60"
              style={{
                // Optional: add a subtle glass effect
                backdropFilter: "blur(2px)",
                background:
                  "linear-gradient(135deg, #d0f1ff 60%, #b2f0ff 90%, #e0ffe0 100%)",
              }}
            >
              <div className="text-xs uppercase tracking-wider text-blue-700 font-semibold mb-1 drop-shadow">
                {match.competition}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-blue-900 drop-shadow">
                  {match.home_team}
                </span>
                <span className="mx-2 text-blue-400 font-bold text-xl">vs</span>
                <span className="font-bold text-lg text-blue-900 drop-shadow">
                  {match.away_team}
                </span>
              </div>
              <div className="flex gap-4 text-blue-800 mt-2">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {match.date}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8v4l3 3M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path>
                  </svg>
                  {match.time}
                </span>
              </div>
              {match.venue && (
                <div className="text-sm text-blue-500 mt-2">
                  <span className="font-semibold">Venue:</span> {match.venue}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Optional grass accent at the bottom */}
      <div className="w-full h-24 bg-gradient-to-t from-green-300 to-transparent rounded-t-3xl"></div>
    </div>
  );
};

export default Matches;
