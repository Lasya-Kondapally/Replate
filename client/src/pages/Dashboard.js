import React, { useEffect, useState } from 'react';

function Dashboard({ userId }) {
  const [data, setData] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}/dashboard`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      }
    }

    fetchData();
  }, [userId]);

  const handleComplete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}/complete`, {
        method: 'POST'
      });
      const result = await res.json();
      setDone(true);
      alert(result.message);
    } catch (err) {
      console.error("Error completing donation:", err);
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Welcome, {data.name}</h2>
      <p>Role: {data.role}</p>
      <p>Status: {done ? 'Completed' : data.status}</p>

      {data.matchedWith ? (
        <>
          <h3>Your Match:</h3>
          <p><strong>Name:</strong> {data.matchedWith.name}</p>
          <p><strong>Food:</strong> {data.matchedWith.foodDetails}</p>
          <p><strong>Location:</strong> {data.matchedWith.location.latitude}, {data.matchedWith.location.longitude}</p>

          {data.role === 'receiver' && data.status === 'matched' && !done && (
            <button onClick={handleComplete}>✅ Mark as Collected</button>
          )}
        </>
      ) : (
        <p>No match assigned yet.</p>
      )}
    </div>
  );
}

export default Dashboard;
