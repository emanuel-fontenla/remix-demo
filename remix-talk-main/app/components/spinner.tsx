import spinner from "../assets/pedro.png";

export default function Spinner() {
  return (
    <div style={{ padding: "1rem" }}>
      <div className="spinner" style={{ margin: "auto" }}>
        <img src={spinner} alt="Pedro!" />
      </div>
    </div>
  );
}
