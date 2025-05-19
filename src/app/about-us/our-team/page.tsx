"use client";

import { Button } from "@/components/ui/button";
import { team } from "@/lib/constants/about/team";
import { groupAndSortByProperties } from "@/lib/utils/sort";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function OurTeamPage() {
  const router = useRouter();
  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Our Team</h1>
      <h5>Meet the people behind our app</h5>
      <p>
        Our team is dedicated to providing the best possible experience for our
        users. We are a diverse group of individuals with a wide range of
        backgrounds and expertise, all working together to create a product that
        meets the needs of our users. We are passionate about what we do and are
        committed to continuous improvement. We believe that by working
        together, we can achieve great things and make a positive impact on the
        lives of our users. Thank you for being a part of our community, and we
        look forward to continuing to work together to provide the best
        financial tools and resources available.
      </p>
      <p className="mt-8">
        We are proud to have a team of talented and dedicated individuals who
        are committed to making a difference in the world of finance. Our team
        is made up of experts in various fields, including finance, technology,
        and design. We believe that by bringing together individuals with
        diverse backgrounds and expertise, we can create a product that is not
        only functional but also user-friendly and visually appealing. Our team
        is passionate about what we do, and we are always looking for ways to
        improve our product and provide even more value to our users. We are
        committed to creating a positive and inclusive work environment where
        everyone can thrive. We value diversity and are dedicated to fostering a
        culture of collaboration, innovation, and continuous learning. We are
        always looking for talented individuals who share our values and are
        passionate about making a difference. If you are interested in joining
        our team, please check out our current job openings below. We look
        forward to hearing from you!
      </p>

      <Button className="mt-6" onClick={() => router.push("/careers")}>
        View Opening Positions
      </Button>

      {team.map((teams, index) => {
        let sortedPeople = groupAndSortByProperties(
          teams.people,
          "location",
          "name"
        );

        if (teams.category === "Management") {
          sortedPeople = teams.people;
        }

        return (
          <section key={index} className="mt-16 sm:mt-20">
            <h2>{teams.category}</h2>
            <p>{teams.introduction}</p>

            <ul
              role="list"
              className="gap-x-8 gap-y-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto lg:mx-0 mt-20 max-w-2xl lg:max-w-none"
            >
              {sortedPeople.map((person) => (
                <li key={person.name}>
                  <Image
                    alt=""
                    src={person.imageUrl}
                    className="rounded-2xl w-full aspect-14/13 object-cover"
                    width={2000}
                    height={800}
                  />
                  <div className="flex justify-between items-end gap-x-4">
                    <h3 className="mt-6 font-semibold tracking-tight">
                      {person.name}
                    </h3>
                    <div className="flex items-center gap-x-4 mt-2 text-secondary text-sm/6">
                      <IoIosMail className="size-9" />
                      <FaPhoneAlt className="size-6" />
                    </div>
                  </div>
                  <p className="text-base/7">{person.role}</p>
                  <p className="text-gray-500 text-sm/6">{person.location}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
