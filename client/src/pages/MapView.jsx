import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = () => {

  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {

    const fetchListing = async () => {
      const { data } = await API.get(`/listings/${id}`);
      setListing(data);
    };

    fetchListing();

  }, [id]);

  if (!listing) return <p>Loading map...</p>;

  const [lng, lat] = listing.location.coordinates;

  return (
    <div className="h-screen w-full">

      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >

        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lng]}>
          <Popup>
            <strong>{listing.title}</strong>
            <br />
            ₹{listing.price}
          </Popup>
        </Marker>

      </MapContainer>

    </div>
  );
};

export default MapView;