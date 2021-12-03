import React from "react";
import "./DetailsCard.css";
import { useContext } from "react";
import { CandidateContext } from "../../CandidateContext";
import { useParams, useNavigate } from "react-router-dom";

const DetailsCard = () => {
  const [candidates, setCandidates] = useContext(CandidateContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = React.useState();
  const [restData, setRestData] = React.useState([]);
  React.useEffect(() => {
    const val = candidates.filter((item) => {
      return item.id === id;
    });
    const restVal = candidates.filter((item) => {
      return item.id !== id;
    });
    setUserData(val[0]);
    setRestData(restVal);
  }, [id, candidates]);

  return (
    <div className="card">
      {userData ? (
        <>
          <div className="image">
            <img height="50px" width="40px" alt="logo" src={userData.Image} />
          </div>
          <div>{userData.name}</div>
          {userData.status === "unknown" ? (
            <div>
              <div>
                <button
                  onClick={() => {
                    userData.status = "shortlisted";
                    setCandidates([userData, ...restData]);
                    navigate("/");
                  }}
                >
                  Shortlist
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    userData.status = "rejected";
                    setCandidates([userData, ...restData]);
                    navigate("/");
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ) : (
            <div>
              <b>{userData.status}</b>
            </div>
          )}
        </>
      ) : (
        <div>No Candidate Data</div>
      )}
    </div>
  );
};

export default DetailsCard;
