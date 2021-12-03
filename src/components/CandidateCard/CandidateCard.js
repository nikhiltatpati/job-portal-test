import "./CandidateCard.css";
import { useNavigate } from "react-router-dom";

export default function Card({ value }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => {
        navigate(value.id);
      }}
    >
      <div className="image">
        <img height="50px" width="40px" alt="logo" src={value.Image} />
      </div>
      <div className="header">{value.name}</div>
    </div>
  );
}
