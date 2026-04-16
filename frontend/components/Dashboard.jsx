import AddWeight from "./AddWeight";
import ReminderCard from "./ReminderCard";
import WeightTable from "./WeightTable";
import ComparisonCard from "./ComparisonCard";
import Navbar from "./Navbar"; 
import "../styles/Dashboard.css";
import { useSelector } from "react-redux";


function Dashboard() {

   const user = useSelector((state) => state.auth.user);

  return (
   <div className="dashboard">
      <Navbar />

      <div className="top-section">
        <AddWeight />
        <ReminderCard username={user?.fullname || "User"} />
        <ComparisonCard />
      </div>

      <div className="middle-section">
        <WeightTable />
      </div>
    </div>
  );
}

export default Dashboard;
