import { useContext } from "react";
import { CandidateContext } from "../../CandidateContext";
import Card from "../CandidateCard/CandidateCard";

const Reject = () => {
  const [candidates, setCandidates] = useContext(CandidateContext);
  return (
    <>
      <div>
        <h2>Rejected Candidates</h2>
      </div>
      <div className="card-container">
        {candidates.filter((item) => item.status === "rejected").length ===
        0 ? (
          <div>No Data</div>
        ) : (
          candidates
            .filter((item) => item.status === "rejected")
            .map((item) => {
              return <Card key={item.id} value={item} />;
            })
        )}
      </div>
    </>
  );
};

export default Reject;
