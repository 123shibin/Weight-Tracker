import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWeights,
  deleteWeight,
  editWeight,
} from "../features/auth/weightApi";
import "../styles/WeightTable.css";

export default function WeightTable() {
  // ✅ Pagination Page Number
  const [page, setPage] = useState(0);

  // ✅ Edit State
  const [editId, setEditId] = useState(null);
  const [newWeight, setNewWeight] = useState("");

  const queryClient = useQueryClient();

  // ✅ Fetch Weights
  const { data, isLoading } = useQuery({
    queryKey: ["weights", page],
    queryFn: () => getWeights(page),
  });

  // ✅ Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteWeight,
    onSuccess: () => {
      queryClient.invalidateQueries(["weights"]);
    },
  });

  // ✅ Edit Mutation
  const editMutation = useMutation({
    mutationFn: editWeight,
    onSuccess: () => {
      alert("Weight Updated Successfully!");
      setEditId(null); // close edit mode
      setNewWeight(""); // clear input
      queryClient.invalidateQueries(["weights"]);
    },
    onError: () => {
      alert("Update Failed!");
    },
  });

  // ✅ Save Edit Function
  const handleSave = (id) => {
    editMutation.mutate({ id, newWeight });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No weights found</p>;

  return (
    <div className="table-card">
      <div className="table-header">
        <span>Date / Time</span>
        <span>Weight</span>
        <span>Actions</span>
      </div>

      {/* ✅ Data Display */}
      {data.content.map((row) => (
        <div className="table-row" key={row.id}>
          <span>{row.date}</span>

          {/* ✅ If Editing Show Input Else Show Value */}
          <span>
            {editId === row.id ? (
              <input
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="Enter new weight"
              />
            ) : (
              `${row.weightValue} kg`
            )}
          </span>

          {/* ✅ Actions */}
          <span className="actions">
            {/* ✅ Edit Button */}
            {editId === row.id ? (
              <>
                <button
                  className="save"
                  onClick={() => handleSave(row.id)}
                >
                  Save
                </button>

                <button
                  className="cancel"
                  onClick={() => {
                    setEditId(null);
                    setNewWeight("");
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="edit"
                onClick={() => {
                  setEditId(row.id);
                  setNewWeight(row.weightValue); // preload old value
                }}
              >
                Edit
              </button>
            )}

            {/* ✅ Delete Button */}
            <button
  className="delete"
  onClick={() => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this weight?"
    );

    if (confirmDelete) {
      deleteMutation.mutate(row.id);
    }
  }}
>
  Delete
</button>

          </span>
        </div>
      ))}

      {/* ✅ Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
        >
          Previous
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={data.last}
        >
          Next
        </button>
      </div>
    </div>
  );
}
