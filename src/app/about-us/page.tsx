"use client";

import { Button } from "@/components/ui/button";
import { metrics, values, benefits } from "@/lib/constants/about/about";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AboutUsPage() {
  const router = useRouter();
  return (
    <main className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      {/* Header section */}
      <div className="px-6 lg:px-8 pt-14">
        <h1>Fiscora</h1>
        <h5>Founded out of necessity and refined through innovation.</h5>
        <p className="mt-8 font-medium text-lg text-pretty sm:text-xl/8">
          We are a team of financial analysts, developers, and educators
          dedicated to democratizing financial literacy. Our mission is to
          empower individuals and entrepreneurs with the tools they need to make
          informed financial decisions. We believe that everyone should have
          access to the knowledge and resources necessary to navigate the
          complex world of finance.
        </p>
      </div>

      {/* Content section */}
      <div className="mx-auto mt-4 md:mt-6 lg:mt-10 px-6 lg:px-8">
        <div className="mx-auto lg:mx-0 max-w-2xl lg:max-w-none">
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2 max-w-xl lg:max-w-none text-base/7">
            <div>
              <p>
                In the aftermath of the 2008 financial crisis, a group of
                financial analysts, developers, and educators came together with
                a simple yet powerful idea: financial literacy should not be
                reserved for experts. It should be accessible, actionable, and
                personalized. Too many individuals and small business owners
                were making critical financial decisions based on guesswork,
                emotion, or incomplete information.
              </p>
              <p className="mt-8">
                This realization led to the founding of our company — a
                digital-first platform dedicated to building precision-grade
                calculators, smart checklists, side-by-side decision tools, and
                interactive simulators that demystify the financial
                decision-making process. From payroll to retirement, from real
                estate to investment risk, our tools are designed to empower
                individuals and entrepreneurs alike. We merge financial science
                with intuitive design to deliver insights that drive real-world
                outcomes.
              </p>
            </div>
            <div>
              <p>
                Over time, we expanded our offerings beyond static calculators.
                Today, we are a one-stop platform for intelligent financial
                tools that simplify complexity, educate users, and elevate
                financial decisions — whether you're investing in a new
                property, launching a startup, or planning for retirement. Our
                tools are not just about numbers; they are about understanding
                the story behind those numbers. We believe that every financial
                decision is a step towards a larger goal, and we are here to
                help you navigate that journey with confidence.
              </p>
              <p className="mt-8">
                Our mission is to democratize financial literacy and empower
                everyone to make informed decisions. We believe that with the
                right tools, anyone can take control of their financial future.
                Join us on this journey to transform the way we think about
                money, one tool at a time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 px-6 lg:px-8">
        <h2>How We Meet Up</h2>
        <h5>Our goals are ambitious, but our commitment is unwavering.</h5>
        <p>
          We are not just building tools; we are building a community of
          informed decision-makers. Our platform is designed to be a
          collaborative space where users can share insights, learn from each
          other, and grow together. We believe that by fostering a culture of
          transparency and collaboration, we can create a more equitable
          financial landscape for everyone. Our tools are not just about
          individual success; they are about collective empowerment. We are
          committed to creating a platform that is inclusive, accessible, and
          user-friendly. We want to ensure that everyone, regardless of their
          background or experience, can benefit from our tools. We are dedicated
          to continuous improvement and innovation, and we are always looking
          for ways to enhance our offerings and provide even more value to our
          users. Our team is passionate about what we do, and we are committed
          to making a positive impact in the world. We believe that by providing
          the right tools and resources, we can help individuals and businesses
          make better financial decisions and achieve their goals. We are
          excited about the future and look forward to continuing to build a
          platform that empowers users to take control of their financial lives.
          Together, we can create a brighter financial future for everyone.
        </p>
        <div className="gap-x-8 gap-y-10 lg:gap-y-12 grid grid-cols-1 lg:grid-cols-3 max-w-xl lg:max-w-none">
          {metrics.map((metric) => (
            <div key={metric.title} className="mt-8">
              <h4>{metric.title}</h4>
              <p className="mt-2">{metric.value}</p>
              {metric.items && (
                <ul className="space-y-1 mt-2 pl-5 list-disc">
                  {metric.items.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>: {item.value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Image section */}
      <div className="xl:mx-auto mt-32 sm:mt-40 xl:px-8 xl:max-w-7xl">
        <Image
          alt=""
          src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80"
          className="xl:rounded-3xl w-full aspect-9/4 object-cover"
          width={2000}
          height={800}
        />
      </div>

      {/* Values section */}
      <div className="mx-auto mt-32 sm:mt-40 px-6 lg:px-8">
        <div className="mx-auto lg:mx-0 max-w-2xl">
          <h2>Our values</h2>
          <h5>Built on Trust. Powered by Insight. Designed for Everyone.</h5>
          <p>
            We are committed to building a platform that is not only
            technologically advanced but also user-friendly and accessible to
            all. Our values guide us in creating tools that empower users to
            make informed financial decisions with confidence.
          </p>
        </div>
        <dl className="gap-8 lg:gap-x-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto lg:mx-0 mt-16 max-w-2xl lg:max-w-none text-base/7">
          {values.map((value) => (
            <div key={value.name} className="relative pl-9">
              <dt className="inline font-semibold">
                <value.icon
                  aria-hidden="true"
                  className="top-1 left-1 absolute text-primary size-5"
                />
                {value.name}
              </dt>{" "}
              <dd className="inline">{value.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* CTA section */}
      <div className="relative mt-32 sm:mt-40 isolate">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="flex lg:flex-row flex-col lg:items-center gap-16 xl:gap-x-20 bg-white/5 mx-auto lg:mx-0 px-6 xl:px-20 py-16 lg:py-20 sm:p-8 sm:rounded-3xl ring-1 ring-white/10 max-w-2xl lg:max-w-none">
            <Image
              alt=""
              src="https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              className="flex-none shadow-xl rounded-2xl w-full lg:max-w-sm h-96 lg:h-auto object-cover lg:aspect-square"
              width={2000}
              height={800}
            />
            <div className="w-full">
              <h2>Join our team</h2>
              <p>
                We are always looking for talented individuals who share our
                passion for financial literacy and innovation. If you are
                interested in joining our team, please check out our job
                postings. We offer a remote-first work environment, competitive
                compensation, and a culture that values diversity and inclusion.
              </p>
              <ul
                role="list"
                className="gap-x-8 gap-y-3 grid grid-cols-1 sm:grid-cols-2 mt-10 text-base/7"
              >
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-x-3">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="flex-none w-5 h-7"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="flex mt-10">
                <Button onClick={() => router.push("/careers")}>
                  See our job postings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
