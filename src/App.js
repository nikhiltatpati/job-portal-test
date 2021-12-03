import React from "react";
import "./App.css";
import Card from "./components/CandidateCard/CandidateCard";
import { useContext } from "react";
import { CandidateContext } from "./CandidateContext";
import { useNavigate } from "react-router-dom";

function App() {
  const [candidates, setCandidates] = useContext(CandidateContext);
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  return (
    <div className="App">
      <h3>Top Candidates</h3>
      <div>
        <input
          type="text"
          placeholder="search.."
          onChange={(evt) => {
            setSearch(evt.target.value);
          }}
        />
      </div>

      <div className="btn-container">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          All Candidates
        </button>

        <button
          onClick={() => {
            navigate("/shortlisted");
          }}
        >
          Shortlisted Candidates
        </button>

        <button
          onClick={() => {
            navigate("/rejected");
          }}
        >
          Rejected Candidates
        </button>
      </div>

      <div className="card-container">
        {candidates.filter((item) =>
          item.name.toLowerCase().startsWith(search.toLowerCase())
        ).length === 0 ? (
          <div>No Data</div>
        ) : (
          candidates
            .filter((item) =>
              item.name.toLowerCase().startsWith(search.toLowerCase())
            )
            .map((item) => {
              return <Card key={item.id} value={item} />;
            })
        )}
      </div>
    </div>
  );
}

export default App;
