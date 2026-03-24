import Image from "next/image";
import Link from "next/link";
import { LocalIcon } from "./LocalIcon";

interface Props {
    title: string;
    image_file: string;
    art: string;
    location_found: string;
    href: string;
}
export const Card = ({ title, image_file, art, location_found, href }: Props) => {
    return (
        <Link href={href}>
            <div className=" overflow-hidden relative  w-64 h-72 group bg-white rounded-2xl flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300">
                {image_file ? (
                    <Image
                        fill
                        className="object-cover"
                        src={image_file}
                        alt={title}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-sm text-gray-400">ไม่มีรูปภาพ</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t rounded-2xl from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex flex-row absolute top-4 left-4">
                        <LocalIcon />
                        <span className="text-[10px] font-bold uppercase tracking-widest  backdrop-blur-md text-white px-2 py-1 rounded">{location_found}</span>
                    </div>

                    <div className="absolute bottom-10 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out text-white">
                        <h3 className="text-xl font-bold leading-tight">{title}</h3>
                    </div>
                    <div className=" transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out absolute bottom-4 left-4">
                        <span className="text-[10px] font-bold bg-orange-400 backdrop-blur-md text-white px-2 py-1 rounded">{art}</span>
                    </div>
                </div>

            </div>
        </Link>
    )
};
{/* Hidden Title that appears on Hover  */ }
