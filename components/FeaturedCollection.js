import React from "react";
import Bags from "../assets/images/bags.jpg";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCollection({ unstoppable, exile }) {
  const collection = [unstoppable, exile];
  return (
    <div className="max-w-2xl mx-auto pt-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="font-semibold text-2xl md:text-4xl">
        Featured Collection
      </div>
      <div className="flex flex-row mt-5 justify-evenly cursor-pointer ">
        {collection.map((data) => (
          <Link href={`/collections/${data.handle}`} key={data.handle}>
            <div className="relative h-full">
              <Image
                src={Bags}
                alt="image"
                layout="intrinsic"
                width={250}
                height={500}
                objectFit="cover"
                className="rounded-3xl"
              />
              <div
                id="featured_collection_images"
                className="text-white text-xs md:text-xl
               capitalize 
               absolute top-1/2 left-1/4
               font-bold w-full"
              >
                {data.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
