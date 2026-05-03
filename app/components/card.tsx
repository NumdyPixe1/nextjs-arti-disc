import Image from "next/image";
import Link from "next/link";
import { SimilarityBar } from "./SimilarityBar";
import { SkeletonLoader } from "./SkeletonLoader";

interface Props {
    data?: any;
    href?: string;
    loading?: boolean;
}
export const Card = ({ data, href, loading = false }: Props) => {
    if (loading || !data) {
        return <SkeletonLoader />;
    }
    return (
        <Link href={href ?? '#'}>
            <div className="overflow-hidden relative w-64 h-72 group rounded-2xl flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300">
                {data.image_file ? (
                    <Image
                        fill
                        className="object-cover w-full h-full"
                        src={data.image_file}
                        alt={data.title}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <img src="/img/no-photos.png" alt="No Image" />
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t rounded-2xl from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex flex-row absolute top-4 left-4">
                        <img className="size-5" src="/img/location-pin.png" alt="" />
                        <span className="text-[10px] font-bold uppercase tracking-widest backdrop-blur-md text-white px-2 py-1 rounded">{data.location_found}</span>
                    </div>

                    <div className="absolute bottom-10 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out text-white">
                        <h3 className="text-xl font-bold leading-tight">{data.title}</h3>
                    </div>
                    <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out absolute bottom-4 left-4">
                        <span className="text-[10px] font-bold bg-orange-400 backdrop-blur-md text-white px-2 py-1 rounded">{data.era}</span>
                    </div>
                </div>
            </div>
            {data.similarity && data.similarity > 0 ? (<SimilarityBar similarity={data.similarity} />) : null}
        </Link>
    );
};

