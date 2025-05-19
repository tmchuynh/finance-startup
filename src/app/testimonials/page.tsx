import { cn } from "@/lib/utils";
import Image from "next/image";

const featuredTestimonial = {
  body: "Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.",
  author: {
    name: "Brenna Goyette",
    title: "Founder, SavvyCal",
    location: "San Francisco, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
    logoUrl:
      "https://tailwindcss.com/plus-assets/img/logos/savvycal-logo-gray-900.svg",
  },
};

const testimonials = [
  [
    [
      {
        body: "This platform demystified retirement planning for me. The IRA vs. Roth simulator helped me understand the tax impact better than any article ever could.",
        author: {
          name: "Leslie Alexander",
          title: "CEO, Example Corp",
          location: "New York, NY",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
    [
      {
        body: "Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.",
        author: {
          name: "Lindsay Walton",
          title: "CTO, Example Corp",
          location: "San Francisco, CA",
          imageUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
  ],
  [
    [
      {
        body: "Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.",
        author: {
          name: "Tom Cook",
          title: "CFO, Example Corp",
          location: "Los Angeles, CA",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
    [
      {
        body: "Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.",
        author: {
          name: "Leonard Krasner",
          title: "COO, Example Corp",
          location: "Chicago, IL",
          imageUrl:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
  ],
];

export default function TestimonialsPage() {
  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-10/12 md:w-11/12">
      <h1>Testimonials</h1>
      <h5>What our users say about us</h5>
      <p>
        Our users love our app! Here are some of the testimonials we've received
        from our satisfied customers. We are committed to providing the best
        possible experience for our users, and we are always looking for ways to
        improve. If you have any feedback or suggestions, please don't hesitate
        to reach out to us. We would love to hear from you!
      </p>
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 grid-rows-1 xl:grid-flow-col mx-auto xl:mx-0 mt-16 sm:mt-20 max-w-2xl xl:max-w-none text-sm/6">
        <figure className="sm:block hidden col-span-2 xl:col-start-2 xl:row-end-1 sm:shadow-lg sm:rounded-2xl sm:ring-1 sm:ring-ring/5">
          <blockquote className="p-12 font-semibold text-xl/8 tracking-tight">
            <p>{`“${featuredTestimonial.body}”`}</p>
          </blockquote>
          <figcaption className="flex items-center gap-x-4 px-6 py-4 border-t border-border/10">
            <Image
              alt=""
              src={featuredTestimonial.author.imageUrl}
              className="flex-none rounded-full size-16"
              width={40}
              height={40}
            />
            <div className="flex-auto">
              <div className="font-semibold">
                {featuredTestimonial.author.name}
              </div>
              <div className="text-secondary text-sm/6">
                {featuredTestimonial.author.title}
              </div>
              <div className="text-secondary text-sm/6">
                {featuredTestimonial.author.location}
              </div>
            </div>
          </figcaption>
        </figure>
        {testimonials.map((columnGroup, columnGroupIdx) => (
          <div
            key={columnGroupIdx}
            className="space-y-8 xl:space-y-0 xl:contents"
          >
            {columnGroup.map((column, columnIdx) => (
              <div
                key={columnIdx}
                className={cn(
                  (columnGroupIdx === 0 && columnIdx === 0) ||
                    (columnGroupIdx === testimonials.length - 1 &&
                      columnIdx === columnGroup.length - 1)
                    ? "xl:row-span-2"
                    : "xl:row-start-1",
                  "space-y-8"
                )}
              >
                {column.map((testimonial) => (
                  <figure
                    key={testimonial.author.name}
                    className="shadow-lg p-6 rounded-2xl ring-1 ring-ring/5"
                  >
                    <blockquote className="">
                      <p>{`“${testimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="flex items-center gap-x-4 mt-6">
                      <Image
                        alt=""
                        src={testimonial.author.imageUrl}
                        className="rounded-full size-16"
                        width={40}
                        height={40}
                      />
                      <div>
                        <div className="font-semibold">
                          {testimonial.author.name}
                        </div>
                        <div className="text-secondary text-sm/6">
                          {testimonial.author.title}
                        </div>
                        <div className="text-secondary text-sm/6">
                          {testimonial.author.location}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
