// import React, { useRef, useEffect, useState } from "react";
// import maplibregl from "maplibre-gl";
// import "maplibre-gl/dist/maplibre-gl.css";

// export default function LocationPicker({ onLocationSelect }) {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const marker = useRef(null);

//   const [lng, setLng] = useState(78.4867);
//   const [lat, setLat] = useState(17.385);
//   const [zoom] = useState(12);

//   useEffect(() => {
//     if (map.current) return;

//     map.current = new maplibregl.Map({
//       container: mapContainer.current,
//       style: "https://demotiles.maplibre.org/style.json", 
//       center: [lng, lat],
//       zoom,
//     });

//     map.current.on("click", (e) => {
//       const { lng, lat } = e.lngLat;

//       if (marker.current) {
//         marker.current.setLngLat([lng, lat]);
//       } else {
//         marker.current = new maplibregl.Marker({ color: "red", draggable: true })
//           .setLngLat([lng, lat])
//           .addTo(map.current);

//         marker.current.on("dragend", () => {
//           const pos = marker.current.getLngLat();
//           setLng(pos.lng);
//           setLat(pos.lat);
//           onLocationSelect && onLocationSelect({ lng: pos.lng, lat: pos.lat });
//         });
//       }

//       setLng(lng);
//       setLat(lat);
//       onLocationSelect && onLocationSelect({ lng, lat });
//     });
//   }, [onLocationSelect]);

//   return (
//     <div>
//       {/* <div
//         ref={mapContainer}
//         style={{
//           width: "100%",
//           height: "300px",
//           borderRadius: "8px",
//           marginTop: "10px",
//         }}
//       /> */}
//       <div
//   ref={mapContainer}
//   style={{
//     width: "100%",
//     height: "300px",
//     borderRadius: "8px",
//     marginTop: "10px",
//     border: "1px solid #ccc"
//   }}
// />

//       <p>
//         Selected Location: <b>{lat.toFixed(5)}, {lng.toFixed(5)}</b>
//       </p>
//     </div>
//   );
// }
// import React, { useRef, useEffect, useState } from "react";
// import maplibregl from "maplibre-gl";
// import "maplibre-gl/dist/maplibre-gl.css";

// export default function LocationPicker({ onLocationSelect }) {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const marker = useRef(null);

//   const [lng, setLng] = useState(78.4867);
//   const [lat, setLat] = useState(17.385);
//   const zoom = 12;

//   useEffect(() => {
//     if (map.current) return;

//     map.current = new maplibregl.Map({
//       container: mapContainer.current,
//       style: "https://demotiles.maplibre.org/style.json",
//       center: [lng, lat],
//       zoom,
//     });

//     map.current.on("load", () => {
//       // Optionally add a marker on initial load
//       marker.current = new maplibregl.Marker({ color: "red", draggable: true })
//         .setLngLat([lng, lat])
//         .addTo(map.current);

//       marker.current.on("dragend", () => {
//         const pos = marker.current.getLngLat();
//         setLng(pos.lng);
//         setLat(pos.lat);
//         onLocationSelect && onLocationSelect({ lng: pos.lng, lat: pos.lat });
//       });
//     });

//     map.current.on("click", (e) => {
//       const { lng, lat } = e.lngLat;
//       setLng(lng);
//       setLat(lat);
//       if (marker.current) {
//         marker.current.setLngLat([lng, lat]);
//       } else {
//         marker.current = new maplibregl.Marker({ color: "red", draggable: true })
//           .setLngLat([lng, lat])
//           .addTo(map.current);
//       }

//       onLocationSelect && onLocationSelect({ lng, lat });
//     });
//   }, [onLocationSelect]);

//   return (
//     <div style={{ maxWidth: "600px", margin: "20px auto" }}>
//       <div
//         ref={mapContainer}
//         style={{
//           width: "100%",
//           height: "300px",
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//         }}
//       />
//       <p>
//         Selected Location: <b>{lat.toFixed(5)}, {lng.toFixed(5)}</b>
//       </p>
//     </div>
//   );
// }
import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function LocationPicker({ onLocationSelect }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  const [lng, setLng] = useState(78.4867);
  const [lat, setLat] = useState(17.385);
  const zoom = 12;

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://api.maptiler.com/maps/streets/style.json?key=vtv7q5RzE6ki9u4aG83O",
      center: [lng, lat],
      zoom,
    });

    // Add draggable marker on initial load
    map.current.on("load", () => {
      marker.current = new maplibregl.Marker({ color: "red", draggable: true })
        .setLngLat([lng, lat])
        .addTo(map.current);

      // Update location state on marker drag end
      marker.current.on("dragend", () => {
        const pos = marker.current.getLngLat();
        setLng(pos.lng);
        setLat(pos.lat);
        onLocationSelect && onLocationSelect({ lng: pos.lng, lat: pos.lat });
      });
    });

    // Move marker and update location when user clicks on map
    map.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;

      if (marker.current) {
        marker.current.setLngLat([lng, lat]);
      } else {
        marker.current = new maplibregl.Marker({ color: "red", draggable: true })
          .setLngLat([lng, lat])
          .addTo(map.current);

        marker.current.on("dragend", () => {
          const pos = marker.current.getLngLat();
          setLng(pos.lng);
          setLat(pos.lat);
          onLocationSelect && onLocationSelect({ lng: pos.lng, lat: pos.lat });
        });
      }

      setLng(lng);
      setLat(lat);
      onLocationSelect && onLocationSelect({ lng, lat });
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [onLocationSelect, lat, lng]);

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />
      <p>
        Selected Location: <b>{lat.toFixed(5)}, {lng.toFixed(5)}</b>
      </p>
    </div>
  );
}
// import React, { useRef, useEffect } from "react";
// import maplibregl from "maplibre-gl";
// import "maplibre-gl/dist/maplibre-gl.css";

// export default function TestMap() {
//   const mapContainer = useRef(null);

//   useEffect(() => {
//     const map = new maplibregl.Map({
//       container: mapContainer.current,
//       style: "https://demotiles.maplibre.org/style.json",
//       center: [78.4867, 17.385],
//       zoom: 12,
//     });

//     return () => map.remove();
//   }, []);

//   return (
//     <div
//       ref={mapContainer}
//       style={{ width: "600px", height: "400px", border: "1px solid black" }}
//     />
//   );
// }
