// ตัวห่อสำหรับแผนที่ที่โหลดแบบไดนามิกเพื่อป้องกันปัญหา SSR
"use client"
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('./Map'), {
    ssr: false,
});


export default function MapWrapper() {
    return (<Map lat={14.371} lng={99.889} />)
}

