import "../styles/WeightCard.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addWeight } from "../features/auth/weightApi";

function AddWeight() {
  const [weight, setWeight] = useState("");

  const queryClient = useQueryClient();

  // ✅ Mutation from first code
  const mutation = useMutation({
    mutationFn: addWeight,
    onSuccess: () => {
      alert("Weight Added Successfully!");
      setWeight(""); // ✅ Clear input after success
      queryClient.invalidateQueries(["weights"]);
    },
    onError: (err) => {
      alert(err.response?.data || "Only 1 weight allowed per day!");
    },
  });

  // ✅ Submit handler from first code
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(weight);
  };

  return (
    // ✅ Wrap structure inside form (UI unchanged)
    <form className="card" onSubmit={handleSubmit}>
      
      <div className="row">
        <span className="label">Weight</span>

        <input
          type="number"
          className="value"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight"
        />
      </div>

      {/* ✅ Button triggers form submit */}
      <button className="add-btn" type="submit">
        +
      </button>

    </form>
  );
}

export default AddWeight;
