import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import DetailsCard from "./components/DetailsCard/DetailsCard";
import { CandidateContext } from "./CandidateContext";
import axios from "axios";
import Reject from "./components/Reject/Reject";
import Shortlist from "./components/Shortlist/Shortlist";

const getCandidateDetails = () => {
  return axios.get(
    "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json",
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }
  );
};

const AppRoutes = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getCandidateDetails().then((res) => {
      const candidateData = res.data.map((item) => {
        return { ...item, status: "unknown" };
      });
      setLoading(false);
      setCandidates(candidateData);
    });
  }, []);

  return (
    <div>
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        <b>Job Portal</b>
      </h1>
      {loading ? (
        <div>Loadding...</div>
      ) : (
        <CandidateContext.Provider value={[candidates, setCandidates]}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:id" element={<DetailsCard />} />
            <Route path="shortlisted" element={<Shortlist />} />
            <Route path="rejected" element={<Reject />} />
            <Route path="rejected/:id" element={<DetailsCard />} />
            <Route path="shortlisted/:id" element={<DetailsCard />} />
          </Routes>
        </CandidateContext.Provider>
      )}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
