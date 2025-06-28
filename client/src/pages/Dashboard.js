// /// new working

// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import { useNavigate } from 'react-router-dom';

// // Fix leaflet icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [stats, setStats] = useState({});
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [lastLocation, setLastLocation] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [profile, setProfile] = useState({ name: '', address: '' });
//   const [showProfile, setShowProfile] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (!storedUser) return;
//     setUser(storedUser);
//     setProfile({ name: storedUser.name, address: storedUser.address || '' });

//     const fetchData = async () => {
//       try {
//         if (storedUser.role === 'donor') {
//           const statsRes = await fetch(`http://localhost:5000/api/donors/stats/donor/${storedUser.name}`);
//           const statsData = await statsRes.json();
//           setStats(statsData);

//           const donationsRes = await fetch(`http://localhost:5000/api/donors/my-donations/${storedUser._id}`);
//           const donationsData = await donationsRes.json();
//           setItems(donationsData);

//           if (donationsData.length > 0 && donationsData[0].location?.coordinates) {
//             setLastLocation(donationsData[0].location.coordinates);
//           }
//         } else if (storedUser.role === 'receiver') {
//           const statsRes = await fetch(`http://localhost:5000/api/donors/stats/receiver/${storedUser._id}`);
//           const statsData = await statsRes.json();
//           setStats(statsData);

//           const claimsRes = await fetch(`http://localhost:5000/api/donors/my-claims/${storedUser._id}`);
//           const claimsData = await claimsRes.json();
//           setItems(claimsData);

//           if (claimsData.length > 0 && claimsData[0].location?.coordinates) {
//             setLastLocation(claimsData[0].location.coordinates);
//           }
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching dashboard data', err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text(`${user.role === 'donor' ? 'Donation' : 'Claim'} Report for ${user.name}`, 10, 10);
//     const tableData = items.map(item => [
//       item.foodType,
//       item.quantity,
//       item.expiry,
//       new Date(item.createdAt).toLocaleDateString(),
//       user.role === 'receiver' ? item.name : ''
//     ]);

//     const headers = user.role === 'donor'
//       ? ['Food Type', 'Quantity', 'Expiry', 'Donated On']
//       : ['Food Type', 'Quantity', 'Expiry', 'Claimed On', 'Donor'];

//     autoTable(doc, {
//       head: [headers],
//       body: tableData,
//       startY: 20,
//     });

//     doc.save(`${user.role}_report_${Date.now()}.pdf`);
//   };

//   const downloadCSV = () => {
//     const csvData = items.map(item => ({
//       FoodType: item.foodType,
//       Quantity: item.quantity,
//       Expiry: item.expiry,
//       Date: new Date(item.createdAt).toLocaleDateString(),
//       ...(user.role === 'receiver' ? { Donor: item.name } : {})
//     }));

//     const ws = XLSX.utils.json_to_sheet(csvData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Report');
//     const wbout = XLSX.write(wb, { bookType: 'csv', type: 'array' });
//     saveAs(new Blob([wbout], { type: 'text/csv;charset=utf-8;' }), `${user.role}_report_${Date.now()}.csv`);
//   };

//   const handleProfileUpdate = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/users/update/${user._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(profile),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert('Profile updated successfully');
//         localStorage.setItem('user', JSON.stringify({ ...user, ...profile }));
//         setUser({ ...user, ...profile });
//         setEditMode(false);
//       } else {
//         alert(data.message || 'Update failed');
//       }
//     } catch (err) {
//       console.error('Profile update error:', err);
//       alert('Server error. Try again.');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   if (!user) return <div>🔒 Please login to view the dashboard.</div>;
//   if (loading) return <div>Loading your dashboard...</div>;

//   const lastFive = items.slice(0, 5);

//   return (
//       <>
//       <div>

//       <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', alignItems: 'center', gap: '10px' }}>
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//           alt="Profile"
//           width="40"
//           height="40"
//           style={{ cursor: 'pointer' }}
//           onClick={() => setShowProfile(!showProfile)}
//         />
//         <button onClick={handleLogout}>🚪 Logout</button>
//       </div>

//       {showProfile ? (
//         <div style={{ marginTop: '60px' }}>
//           <h3>👤 Your Profile</h3>
//           <div>
//             <label>Name: </label>
//             {editMode ? (
//               <input
//                 value={profile.name}
//                 onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//               />
//             ) : (
//               <span>{user.name}</span>
//             )}
//           </div>
//           <div>
//             <label>Email: </label>
//             <span>{user.email}</span>
//           </div>
//           <div>
//             <label>Address: </label>
//             {editMode ? (
//               <input
//                 value={profile.address}
//                 onChange={(e) => setProfile({ ...profile, address: e.target.value })}
//               />
//             ) : (
//               <span>{user.address || 'N/A'}</span>
//             )}
//           </div>
//           <div style={{ marginTop: '10px' }}>
//             {editMode ? (
//               <>
//                 <button onClick={handleProfileUpdate}>💾 Save</button>
//                 <button onClick={() => setEditMode(false)} style={{ marginLeft: '10px' }}>❌ Cancel</button>
//               </>
//             ) : (
//               <button onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
//             )}
//           </div>
//         </div>
//       ) : (
//         <>
//           <h2>Welcome, {user.name}! 👋</h2>

//           {user.role === 'donor' ? (
//             <>
//               <h3>📊 Your Donation Stats</h3>
//               <ul>
//                 <li>Total Donations: {stats.total}</li>
//                 <li>Active (Unclaimed): {stats.active}</li>
//                 <li>Claimed: {stats.claimed}</li>
//               </ul>

//               <h3>📦 Your Donation History</h3>
//               <ul>
//                 {items.map((donation, i) => (
//                   <li key={i}>
//                     <strong>{donation.foodType?.toUpperCase()}</strong> - {donation.quantity} (Expiry: {donation.expiry})
//                     <br />
//                     Donated on: {new Date(donation.createdAt).toLocaleDateString()}
//                   </li>
//                 ))}
//               </ul>
//             </>
//           ) : (
//             <>
//               <h3>📊 Your Claim Stats</h3>
//               <ul>
//                 <li>Total Claims: {stats.total}</li>
//                 <li>Unique Donors: {stats.uniqueDonors}</li>
//                 <li>Last Claimed Location: {stats.lastLocation ? `${stats.lastLocation[1]}, ${stats.lastLocation[0]}` : 'N/A'}</li>
//               </ul>

//               <h3>🍽️ Your Claimed Food</h3>
//               <ul>
//                 {items.map((claim, i) => (
//                   <li key={i}>
//                     <strong>{claim.foodType?.toUpperCase()}</strong> - {claim.quantity}
//                     (From: {claim.name}, Expiry: {claim.expiry})
//                     <br />
//                     Claimed on: {new Date(claim.createdAt).toLocaleDateString()}
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}

//           <div style={{ marginTop: '15px', marginBottom: '30px' }}>
//             <button onClick={downloadPDF} style={{ marginRight: '10px' }}>⬇️ Download PDF</button>
//             <button onClick={downloadCSV}>⬇️ Download CSV</button>
//           </div>

//           {lastLocation && (
//             <>
//               <h3>🗺️ Your Last {user.role === 'donor' ? 'Donation' : 'Claim'} Location</h3>
//               <MapContainer
//                 center={[lastLocation[1], lastLocation[0]]}
//                 zoom={15}
//                 style={{ height: '300px', width: '100%', marginBottom: '20px' }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution="&copy; OpenStreetMap contributors"
//                 />
//                 <Marker position={[lastLocation[1], lastLocation[0]]}>
//                   <Popup>
//                     Last {user.role === 'donor' ? 'donation' : 'claim'} location
//                   </Popup>
//                 </Marker>
//               </MapContainer>
//             </>
//           )}

//           <div style={{ marginTop: '30px' }}>
//             <h3>📋 Recent Activity</h3>
//             <ul>
//               {lastFive.map((item, i) => (
//                 <li key={i}>
//                   ✅ You {user.role === 'donor' ? 'donated' : 'claimed'} <strong>{item.foodType}</strong> - {item.quantity}
//                   {user.role === 'receiver' && <> (from {item.name})</>}
//                   <br />
//                   📍 Location: {item.location?.coordinates?.[1]}, {item.location?.coordinates?.[0]}
//                   <br />
//                   📅 {new Date(item.createdAt).toLocaleDateString()}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}
//       </div>
//     </>

//   );
// }

// export default Dashboard;

/// new working

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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

  if (!user) return <div>🔒 Please login to view the dashboard.</div>;
  if (loading) return <div>Loading your dashboard...</div>;

  const lastFive = items.slice(0, 5);

  return (
    <>
      <div>
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            width="40"
            height="40"
            style={{ cursor: "pointer" }}
            onClick={() => setShowProfile(!showProfile)}
          />
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>

        {showProfile ? (
          <div style={{ marginTop: "60px" }}>
            <h3>👤 Your Profile</h3>
            <div>
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
            <div>
              <label>Email: </label>
              <span>{user.email}</span>
            </div>
            <div>
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
            <div style={{ marginTop: "10px" }}>
              {editMode ? (
                <>
                  <button onClick={handleProfileUpdate}>💾 Save</button>
                  <button
                    onClick={() => setEditMode(false)}
                    style={{ marginLeft: "10px" }}
                  >
                    ❌ Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)}>
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <h2>Welcome, {user.name}! 👋</h2>

            {user.role === "donor" ? (
              <>
                <h3>📊 Your Donation Stats</h3>
                <ul>
                  <li>Total Donations: {stats.total}</li>
                  <li>Active (Unclaimed): {stats.active}</li>
                  <li>Claimed: {stats.claimed}</li>
                </ul>

                <h3>📦 Your Donation History</h3>
                <ul>
                  {items.map((donation, i) => (
                    <li key={i} style={{ marginBottom: "10px" }}>
                      <strong>{donation.foodType?.toUpperCase()}</strong> -{" "}
                      {donation.quantity} (Expiry: {donation.expiry})
                      <br />
                      Donated on:{" "}
                      {new Date(donation.createdAt).toLocaleDateString()}
                      <br />
                      🏷️ Status:{" "}
                      <span
                        style={{
                          fontWeight: "bold",
                          color: donation.claimed ? "green" : "orange",
                        }}
                      >
                        {donation.claimed ? "Completed" : "Pending"}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h3>📊 Your Claim Stats</h3>
                <ul>
                  <li>Total Claims: {stats.total}</li>
                  <li>Unique Donors: {stats.uniqueDonors}</li>
                  <li>
                    Last Claimed Location:{" "}
                    {stats.lastLocation
                      ? `${stats.lastLocation[1]}, ${stats.lastLocation[0]}`
                      : "N/A"}
                  </li>
                </ul>

                <h3>🍽️ Your Claimed Food</h3>
                <ul>
                  {items.map((claim, i) => (
                    <li key={i} style={{ marginBottom: "12px" }}>
                      <strong>{claim.foodType?.toUpperCase()}</strong> -{" "}
                      {claim.quantity}
                      (From: {claim.name}, Expiry: {claim.expiry})
                      <br />
                      🗓️ Claimed on:{" "}
                      {new Date(claim.createdAt).toLocaleDateString()}
                      <br />
                      🏷️ Status:{" "}
                      <span style={{ color: "green" }}>Completed</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div style={{ marginTop: "15px", marginBottom: "30px" }}>
              <button onClick={downloadPDF} style={{ marginRight: "10px" }}>
                ⬇️ Download PDF
              </button>
              <button onClick={downloadCSV}>⬇️ Download CSV</button>
            </div>

            {lastLocation && (
              <>
                <h3>
                  🗺️ Your Last {user.role === "donor" ? "Donation" : "Claim"}{" "}
                  Location
                </h3>
                <MapContainer
                  center={[lastLocation[1], lastLocation[0]]}
                  zoom={15}
                  style={{
                    height: "300px",
                    width: "100%",
                    marginBottom: "20px",
                  }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={[lastLocation[1], lastLocation[0]]}>
                    <Popup>
                      Last {user.role === "donor" ? "donation" : "claim"}{" "}
                      location
                    </Popup>
                  </Marker>
                </MapContainer>
              </>
            )}

            <div style={{ marginTop: "30px" }}>
              <h3>📋 Recent Activity</h3>
              <ul>
                {lastFive.map((item, i) => (
                  <li key={i}>
                    ✅ You {user.role === "donor" ? "donated" : "claimed"}{" "}
                    <strong>{item.foodType}</strong> - {item.quantity}
                    {user.role === "receiver" && <> (from {item.name})</>}
                    <br />
                    📍 Location: {item.location?.coordinates?.[1]},{" "}
                    {item.location?.coordinates?.[0]}
                    <br />
                    📅 {new Date(item.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
