"use client"
import "leaflet/dist/leaflet.css"; // <--- ห้ามลืมบรรทัดนี้เด็ดขาด!
import { CircleMarker, MapContainer, Marker, TileLayer, Tooltip, Popup, useMap } from "react-leaflet"
import { useEffect } from "react";
import L from "leaflet";
const icon = L.icon({
    iconUrl: "/img/location-pin.png", // ✅ เริ่มต้นด้วย / และตามด้วยโฟลเดอร์ข้างใน public
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});
L.Marker.prototype.options.icon = icon; // ตั้งค่าไอคอนเริ่มต้นให้กับ Marker ทั้งหมด

interface Props {
    lat: number;
    lng: number;
}

// function ResizeMap() {
//     const map = useMap(); // ดึง Instance ของแผนที่มาใช้

//     useEffect(() => {
//         // สั่งให้แผนที่วาดตัวใหม่ (invalidateSize) หลังจากโหลดเสร็จ 200ms
//         const timer = setTimeout(() => {
//             map.invalidateSize();
//         }, 200);

//         return () => clearTimeout(timer);
//     }, [map]);

//     return null;
// }

export default function Map({ lat, lng }: Props) {
    const position: [number, number] = [lat, lng];
    return (<div className="h-100 w-full rounded-lg overflow-hidden shadow-lg">
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <ResizeMap /> */}
            <Marker position={position}></Marker>
        </MapContainer>
    </div>
    )
}