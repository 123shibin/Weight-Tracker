import { useState, useEffect } from "react";
import "../styles/ReminderCard.css";

export default function ReminderCard({ username }) {
  // ✅ Unique key for each user
  const storageKey = `reminderData_${username}`;

  // ✅ Load saved data from localStorage
  const savedData = JSON.parse(localStorage.getItem(storageKey));

  const [profilePic, setProfilePic] = useState(
    savedData?.profilePic || "https://i.pravatar.cc/150?img=3"
  );

  const [reminders, setReminders] = useState(
    savedData?.reminders || [
      "Drink 3 liters of water",
      "Workout at 6 PM",
      "Read Java for 30 minutes",
      "Sleep before 11 PM",
    ]
  );

  // ✅ Save to localStorage whenever reminders or profile changes
  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ profilePic, reminders })
    );
  }, [profilePic, reminders, storageKey]);

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePic(imageURL);
    }
  };

  // Handle reminder change
  const handleReminderChange = (index, value) => {
    const updated = [...reminders];
    updated[index] = value;
    setReminders(updated);
  };

  return (
    <div className="card">
      <div className="header">
        <label className="avatar">
          <img src={profilePic} alt="Profile" />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <h2>
          Hello, <span className="username">{username}</span>!
        </h2>
      </div>

      <div className="reminder">
        <strong>Reminder:</strong>

        {reminders.map((text, index) => (
          <input
            key={index}
            className="line-input"
            value={text}
            onChange={(e) => handleReminderChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}
