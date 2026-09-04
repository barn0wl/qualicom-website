// src/components/Map.tsx
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_CONFIG, LOCATIONS } from "@/config/company";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_CONFIG.token) return;

    mapboxgl.accessToken = MAPBOX_CONFIG.token;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_CONFIG.style,
      center: MAPBOX_CONFIG.center,
      zoom: MAPBOX_CONFIG.zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    LOCATIONS.forEach((location) => {
      const marker = new mapboxgl.Marker({ color: "#0F5132" })
        .setLngLat(location.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <strong>${location.name}</strong><br>
              ${location.country}
            `)
        )
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default Map;
