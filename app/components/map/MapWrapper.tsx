// ตัวห่อสำหรับแผนที่ที่โหลดแบบไดนามิกเพื่อป้องกันปัญหา SSR
"use client"
import { artifactAction } from '@/app/actions/artifactAction';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('./Map'), {
    ssr: false,
});

interface Props {
    lat: number;
    lng: number;
}

export default function MapWrapper({ lat, lng }: Props) {
    return (<Map lat={lat} lng={lng} />)
}

