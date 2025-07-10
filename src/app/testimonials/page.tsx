import {
  featuredTestimonial,
  testimonials,
} from "@/lib/constants/about/testimonials";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TestimonialsPage() {
  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      <h1>Testimonials</h1>
      <h5>What our users say about us</h5>
      <p>
        Our users love our app! Here are some of the testimonials we've received
        from our satisfied customers. We are committed to providing the best
        possible experience for our users, and we are always looking for ways to
        improve. If you have any feedback or suggestions, please don't hesitate
        to reach out to us. We would love to hear from you!
      </p>
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 xl:grid-flow-col grid-rows-1 mt-16 sm:mt-20 mx-auto xl:mx-0 max-w-2xl xl:max-w-none text-sm/6">
        <figure className="sm:block col-span-2 xl:col-start-2 hidden xl:row-end-1 sm:shadow-lg ring-ring/55 sm:ring-1 dark:ring-primary/45 sm:rounded-2xl">
          <blockquote className="p-12 text-xl/8 tracking-tight">
            <p>{`“${featuredTestimonial.body}”`}</p>
          </blockquote>
          <figcaption className="flex gap-x-4 items-center px-6 py-4 border-border/10 border-t">
            <Image
              alt=""
              src={featuredTestimonial.author.imageUrl}
              className="flex-none rounded-full size-16 object-cover object-center"
              width={40}
              height={40}
            />
            <div className="flex-auto">
              <div className="">{featuredTestimonial.author.name}</div>
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
                    className="shadow-lg p-6 ring-1 ring-ring/15 dark:ring-ring rounded-2xl"
                  >
                    <blockquote className="">
                      <p>{`“${testimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="flex gap-x-4 items-center mt-6">
                      <Image
                        alt=""
                        src={testimonial.author.imageUrl}
                        className="object-top rounded-full size-16 object-cover"
                        width={40}
                        height={40}
                      />
                      <div>
                        <div className="">{testimonial.author.name}</div>
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
