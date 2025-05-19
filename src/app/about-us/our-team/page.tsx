"use client";

import Image from "next/image";

const team = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    location: "Toronto, Canada",
  },
  // More people...
];

export default function OurTeamPage() {
  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Our Team</h1>

      {/* Team section */}
      <div className="mx-auto mt-32 sm:mt-40 px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto lg:mx-0 max-w-2xl">
          <h2 className="font-semibold text-4xl text-pretty sm:text-5xl tracking-tight">
            Our team
          </h2>
          <p className="mt-6 text-lg/8">
            We’re a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul
          role="list"
          className="gap-x-8 gap-y-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto lg:mx-0 mt-20 max-w-2xl lg:max-w-none"
        >
          {team.map((person) => (
            <li key={person.name}>
              <Image
                alt=""
                src={person.imageUrl}
                className="rounded-2xl w-full aspect-14/13 object-cover"
                width={2000}
                height={800}
              />
              <h3 className="mt-6 font-semibold text-lg/8 tracking-tight">
                {person.name}
              </h3>
              <p className="text-base/7">{person.role}</p>
              <p className="text-gray-500 text-sm/6">{person.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
