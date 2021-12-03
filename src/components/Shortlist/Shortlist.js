import { useContext } from "react";
import { CandidateContext } from "../../CandidateContext";
import Card from "../CandidateCard/CandidateCard";

const Shortlist = () => {
  const [candidates, setCandidates] = useContext(CandidateContext);
  return (
    <>
      <div>
        <h2>Shortlisted Candidates</h2>
      </div>
      <div className="card-container">
        {candidates.filter((item) => item.status === "shortlisted").length ===
        0 ? (
          <div>No Data</div>
        ) : (
          candidates
            .filter((item) => item.status === "shortlisted")
            .map((item) => {
              return <Card key={item.id} value={item} />;
            })
        )}
      </div>
    </>
  );
};

export default Shortlist;
