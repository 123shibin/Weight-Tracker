import { useState } from "react";
import "../styles/ComparisonCard.css";
import { useQuery } from "@tanstack/react-query";
import api from "../api"; // axios instance with token

function ComparisonCard() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  // ✅ React Query API Call
  const { data, isLoading, error } = useQuery({
    queryKey: ["compareWeight", date1, date2],

    queryFn: async () => {
      const res = await api.get(
        `/api/weights/compare?startDate=${date1}&endDate=${date2}`
      );
      return res.data;
    },

    // ✅ Only run query when both dates selected
    enabled: !!date1 && !!date2,
  });

  return (
    <div className="compare-card">
      {/* LEFT SIDE */}
      <div className="left">
        <h3>Comparison</h3>

        <div className="field">
          <label>Date :</label>
          <input
            type="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Date :</label>
          <input
            type="date"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
          />
        </div>
      </div>

      {/* DIVIDER */}
      <div className="divider"></div>

      {/* RIGHT SIDE */}
      <div className="right">
        <h3>Difference</h3>

        <div className="result">
          {/* ✅ Loading */}
          {isLoading && <span>Loading...</span>}

          {/* ✅ Error */}
          {error && <span className="placeholder">No Data</span>}

          {/* ✅ Show Weight Difference */}
          {data && !isLoading ? (
            <span>{data}</span>
          ) : (
            !isLoading && <span className="placeholder">-- kg</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComparisonCard;
