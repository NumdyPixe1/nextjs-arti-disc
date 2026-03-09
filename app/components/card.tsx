import Image from "next/image";
import { LocalIcon } from "./local-icon";

interface Props {
    title: string;
    image_url: string;
    art: string;
    location_found: string;
}
export const Card = ({ title, image_url, art, location_found }: Props) => {
    return (
        <div className=" overflow-hidden relative  w-64 h-72 group bg-white rounded-2xl flex flex-col">
            {/* <Image blurDataURL="" fill className="object-cover" src={image_url} alt={title} /> */}
            <img className=" w-full h-full object-cover" src={image_url} alt={title} />
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

        </div>)
};
{/* Hidden Title that appears on Hover  */ }
