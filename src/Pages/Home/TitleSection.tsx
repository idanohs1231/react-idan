import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const TitleSection = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);

  useEffect(() => {
    
  }, []);

  return (
    <section
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "50vh",
        overflow: "hidden",
        backgroundColor: "#333",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to right, green, blue)",
          opacity: 0.8,
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>
          idan david
        </h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
          All the cards
        </p>

        <div style={{ height: "4px", width: "100px", backgroundColor: "white", margin: "10px auto" }}></div>

        {!user && (
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <Link to="/signin">
              <button style={buttonStyle}>Sign In</button>
            </Link>
            <Link to="/signup">
              <button style={{ ...buttonStyle, backgroundColor: "white", color: "black" }}>
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  border: "2px solid white",
  backgroundColor: "transparent",
  color: "white",
  cursor: "pointer",
  borderRadius: "5px",
  transition: "all 0.3s ease",
};

export default TitleSection;
