import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaRegAddressCard, FaChartLine } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const cardsOpened = 25; // Example: Fetch or calculate dynamically

  if (!user) return <p>Loading...</p>;

  const { name, phone, email, image, address, isAdmin, isBusiness } = user;

  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f5f5f5", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Profile Overview</h1>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        {/* Profile Picture */}
        <img
          src={image.url}
          alt={image.alt || "User Avatar"}
          style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover", marginBottom: "20px", border: "4px solid green" }}
        />

        {/* User Name */}
        <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
          {name.first} {name.middle} {name.last}
        </h2>

        {/* Contact Information */}
        <div style={{ marginBottom: "20px" }}>
          <p><FaEnvelope /> {email}</p>
          <p><FaPhone /> {phone}</p>
          <p><FaMapMarkerAlt /> {`${address.street} ${address.houseNumber}, ${address.city}, ${address.state}, ${address.country} - ${address.zip}`}</p>
        </div>

        {/* Account Information */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Account Details</h3>
          <p>Role: {isAdmin ? "Administrator" : "Regular User"}</p>
          <p>Account Type: {isBusiness ? "Business" : "Personal"}</p>
        </div>

        {/* Stats Section */}
        <div>
          <h3>User Stats</h3>
          <p><FaRegAddressCard /> Cards Opened: {cardsOpened}</p>
          <p><FaChartLine /> Active Since: {new Date().getFullYear() - 1} Year</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
