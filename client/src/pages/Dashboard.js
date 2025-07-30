import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Dashboard.css";
import L from "leaflet";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastLocation, setLastLocation] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ name: "", address: "" });
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;
    setUser(storedUser);
    setProfile({ name: storedUser.name, address: storedUser.address || "" });

    const fetchData = async () => {
      try {
        if (storedUser.role === "donor") {
          const statsRes = await fetch(
            `http://localhost:5000/api/donors/stats/donor/${storedUser.name}`
          );
          const statsData = await statsRes.json();
          setStats(statsData);

          const donationsRes = await fetch(
            `http://localhost:5000/api/donors/my-donations/${storedUser._id}`
          );
          const donationsData = await donationsRes.json();
          setItems(donationsData);

          if (
            donationsData.length > 0 &&
            donationsData[0].location?.coordinates
          ) {
            setLastLocation(donationsData[0].location.coordinates);
          }
        } else if (storedUser.role === "receiver") {
          const statsRes = await fetch(
            `http://localhost:5000/api/donors/stats/receiver/${storedUser._id}`
          );
          const statsData = await statsRes.json();
          setStats(statsData);

          const claimsRes = await fetch(
            `http://localhost:5000/api/donors/my-claims/${storedUser._id}`
          );
          const claimsData = await claimsRes.json();
          setItems(claimsData);

          if (claimsData.length > 0 && claimsData[0].location?.coordinates) {
            setLastLocation(claimsData[0].location.coordinates);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(
      `${user.role === "donor" ? "Donation" : "Claim"} Report for ${user.name}`,
      10,
      10
    );
    const tableData = items.map((item) => [
      item.foodType,
      item.quantity,
      item.expiry,
      new Date(item.createdAt).toLocaleDateString(),
      user.role === "receiver" ? item.name : "",
    ]);

    const headers =
      user.role === "donor"
        ? ["Food Type", "Quantity", "Expiry", "Donated On"]
        : ["Food Type", "Quantity", "Expiry", "Claimed On", "Donor"];

    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 20,
    });

    doc.save(`${user.role}_report_${Date.now()}.pdf`);
  };

  const downloadCSV = () => {
    const csvData = items.map((item) => ({
      FoodType: item.foodType,
      Quantity: item.quantity,
      Expiry: item.expiry,
      Date: new Date(item.createdAt).toLocaleDateString(),
      ...(user.role === "receiver" ? { Donor: item.name } : {}),
    }));

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    const wbout = XLSX.write(wb, { bookType: "csv", type: "array" });
    saveAs(
      new Blob([wbout], { type: "text/csv;charset=utf-8;" }),
      `${user.role}_report_${Date.now()}.csv`
    );
  };

  const handleProfileUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/update/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully");
        localStorage.setItem("user", JSON.stringify({ ...user, ...profile }));
        setUser({ ...user, ...profile });
        setEditMode(false);
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Server error. Try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Handle profile toggle - separate from navigation
  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
  };

  // Handle dashboard navigation - separate from profile
  const handleDashboardClick = () => {
    // Since we're already on dashboard, just ensure profile is hidden
    setShowProfile(false);
  };

  if (!user) {
    return (
      <div className="dashboard-wrapper">
        <div className="loading-state">
          🔒 Please login to view the dashboard.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <div className="loading-state">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  const lastFive = items.slice(0, 5);

  return (
    <div className="dashboard-wrapper">
      {/* Floating background food emojis */}
      <div className="floating-dashboard-emoji">📊</div>
      <div className="floating-dashboard-emoji">🍽️</div>
      <div className="floating-dashboard-emoji">📈</div>
      <div className="floating-dashboard-emoji">🎯</div>

      <div className="dashboard-container">
        {/* Left Sidebar */}
        <div className="dashboard-sidebar">
          <div className="dashboard-sidebar-logo">🍽️</div>
          
          <button
            className="sidebar-nav-button chat"
            onClick={() => navigate('/chat')}
          >
            💬 <span className="button-text">Chat with Ahara</span>
          </button>

          <button
            className="sidebar-nav-button dashboard"
            onClick={handleDashboardClick}
          >
            📊 <span className="button-text">Dashboard</span>
          </button>

          <button
            className="sidebar-nav-button profile"
            onClick={handleProfileToggle}
          >
            👤 <span className="button-text">View Profile</span>
          </button>

          <button
            className="sidebar-nav-button logout"
            onClick={handleLogout}
          >
            🚪 <span className="button-text">Logout</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Header */}
          <div className="dashboard-header">
            <h2>Welcome back, {user.name}! 👋</h2>
            <div className="user-info">
              Your {user.role} dashboard • {new Date().toLocaleDateString()}
            </div>
          </div>

          {showProfile ? (
            <div className="profile-section">
              <h3>👤 Your Profile</h3>
              <div className="profile-field">
                <label>Name: </label>
                {editMode ? (
                  <input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                ) : (
                  <span>{user.name}</span>
                )}
              </div>
              <div className="profile-field">
                <label>Email: </label>
                <span>{user.email}</span>
              </div>
              <div className="profile-field">
                <label>Address: </label>
                {editMode ? (
                  <input
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                  />
                ) : (
                  <span>{user.address || "N/A"}</span>
                )}
              </div>
              <div className="profile-actions">
                {editMode ? (
                  <>
                    <button className="profile-button" onClick={handleProfileUpdate}>
                      💾 Save
                    </button>
                    <button
                      className="profile-button cancel"
                      onClick={() => setEditMode(false)}
                    >
                      ❌ Cancel
                    </button>
                  </>
                ) : (
                  <button className="profile-button" onClick={() => setEditMode(true)}>
                    ✏️ Edit Profile
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>📊 Your {user.role === "donor" ? "Donation" : "Claim"} Stats</h3>
                  <ul className="stat-list">
                    {user.role === "donor" ? (
                      <>
                        <li>Total Donations: {stats.total || 0}</li>
                        <li>Active (Unclaimed): {stats.active || 0}</li>
                        <li>Claimed: {stats.claimed || 0}</li>
                      </>
                    ) : (
                      <>
                        <li>Total Claims: {stats.total || 0}</li>
                        <li>Unique Donors: {stats.uniqueDonors || 0}</li>
                        <li>
                          Last Location:{" "}
                          {stats.lastLocation
                            ? `${stats.lastLocation[1]?.toFixed(3)}, ${stats.lastLocation[0]?.toFixed(3)}`
                            : "N/A"}
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="action-button" onClick={downloadPDF}>
                  📄 Download PDF Report
                </button>
                <button className="action-button" onClick={downloadCSV}>
                  📊 Download CSV Report
                </button>
              </div>

              {/* History Section - Default dew point colors */}
              <div className="content-section">
                <h3>
                  {user.role === "donor" ? "📦 Your Donation History" : "🍽️ Your Claimed Food"}
                </h3>
                <ul className="item-list">
                  {items.length === 0 ? (
                    <li style={{ textAlign: 'center', color: '#3C8782' }}>
                      No {user.role === "donor" ? "donations" : "claims"} yet. Start your journey!
                    </li>
                  ) : (
                    items.map((item, i) => (
                      <li key={i}>
                        <strong>{item.foodType?.toUpperCase()}</strong> - {item.quantity}
                        {user.role === "receiver" && <> (From: {item.name})</>}
                        <br />
                        📅 {user.role === "donor" ? "Donated" : "Claimed"} on:{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                        <br />
                        🗓️ Expiry: {item.expiry}
                        <br />
                        {user.role === "donor" && (
                          <span className={`status ${item.claimed ? 'completed' : 'pending'}`}>
                            {item.claimed ? "Completed" : "Pending"}
                          </span>
                        )}
                        {user.role === "receiver" && (
                          <span className="status completed">Completed</span>
                        )}
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {/* Map Section - Transparent Yellow & Tender Peach */}
              {lastLocation && (
                <div className="content-section map-section">
                  <h3>
                    🗺️ Your Last {user.role === "donor" ? "Donation" : "Claim"} Location
                  </h3>
                  <div className="map-container">
                    <MapContainer
                      center={[lastLocation[1], lastLocation[0]]}
                      zoom={15}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                      />
                      <Marker position={[lastLocation[1], lastLocation[0]]}>
                        <Popup>
                          Last {user.role === "donor" ? "donation" : "claim"} location
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              )}

              {/* Recent Activity - Meadow Mist & Blushing Bride */}
              <div className="content-section activity-section">
                <h3>📋 Recent Activity</h3>
                <ul className="item-list">
                  {lastFive.length === 0 ? (
                    <li style={{ textAlign: 'center', color: '#5A6B57' }}>
                      No recent activity. Get started with your first {user.role === "donor" ? "donation" : "claim"}!
                    </li>
                  ) : (
                    lastFive.map((item, i) => (
                      <li key={i}>
                        ✅ You {user.role === "donor" ? "donated" : "claimed"}{" "}
                        <strong>{item.foodType}</strong> - {item.quantity}
                        {user.role === "receiver" && <> (from {item.name})</>}
                        <br />
                        📍 Location: {item.location?.coordinates?.[1]?.toFixed(3)},{" "}
                        {item.location?.coordinates?.[0]?.toFixed(3)}
                        <br />
                        📅 {new Date(item.createdAt).toLocaleDateString()}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;