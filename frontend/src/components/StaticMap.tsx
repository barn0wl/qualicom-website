// src/components/StaticMap.tsx

import { MAPBOX_CONFIG } from "@/config/company";

interface Location {
  name: string;
  country: string;
  coordinates: { lat: number; lng: number };
  color?: string;
}

interface StaticMapProps {
  locations: Location[];
  className?: string;
  height?: string;
}

// Mapbox marker color param needs a bare hex (no #)
const stripHash = (hex: string) => hex.replace("#", "");

const StaticMap = ({ locations, className = "", height = "h-64" }: StaticMapProps) => {
  const defaultColors = ["0A6B2F", "04AB06", "2D8F5E"];

  const generateMapUrl = () => {
    const lats = locations.map((l) => l.coordinates.lat);
    const lngs = locations.map((l) => l.coordinates.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    // Mapbox marker overlays: pin-s-l+HEXCOLOR(lng,lat)
    const markers = locations
      .map((loc) => {
        const color = stripHash(loc.color || defaultColors[0]);
        return `pin-s-l+${color}(${loc.coordinates.lng},${loc.coordinates.lat})`;
      })
      .join(",");

    if (MAPBOX_CONFIG.token) {
      // Use bbox path (auto-fit) instead of a fixed center/zoom so all
      // markers are always guaranteed to be in frame regardless of spread.
      const padding = 60; // px padding around the bbox
      const bboxPath = `[${minLng},${minLat},${maxLng},${maxLat}]`;
      const style = MAPBOX_CONFIG.style.replace("mapbox://styles/", "");
      return `https://api.mapbox.com/styles/v1/${style}/static/${markers}/${bboxPath}/800x400?padding=${padding}&access_token=${MAPBOX_CONFIG.token}`;
    }

    // Fallback: OSM static map service, no API key required.
    // Supports markers natively, so there's no manual projection math.
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    // crude zoom estimate from bbox span so all markers stay in view
    const latSpan = maxLat - minLat || 1;
    const lngSpan = maxLng - minLng || 1;
    const maxSpan = Math.max(latSpan, lngSpan);
    const zoom = Math.max(2, Math.min(10, Math.floor(8 - Math.log2(maxSpan))));

    const markerParams = locations
      .map(
        (loc) =>
          `markers=${loc.coordinates.lat},${loc.coordinates.lng},lightgreen${
            loc.color ? "" : ""
          }`
      )
      .join("&");

    return `https://staticmap.openstreetmap.de/staticmap.php?center=${centerLat},${centerLng}&zoom=${zoom}&size=800x400&${markerParams}`;
  };

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-md ${height} ${className}`}>
      <div className="w-full h-full bg-gray-200 relative">
        <img
          src={generateMapUrl()}
          alt="Carte de localisation"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Attribution */}
        <div className="absolute bottom-1 right-2 text-[10px] text-gray-500 bg-white/70 px-2 py-0.5 rounded">
          {MAPBOX_CONFIG.token ? "© Mapbox © OpenStreetMap" : "© OpenStreetMap"}
        </div>
      </div>
    </div>
  );
};

export default StaticMap;
