"use client";

import { Button } from "@/components/ui/button";
import { pricingFAQs } from "@/lib/constants/faq/questions";
import { features } from "@/lib/constants/home";
import { pricing } from "@/lib/constants/pricing/prices";
import { formatNumberToCurrency } from "@/lib/utils/format";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  return (
    <main>
      {/* Hero section */}
      <div className="relative pt-14">
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="mx-auto max-w-5xl text-center">
              <h1>Plan It. Simulate It. Achieve It.</h1>
              <p className="mt-8 font-medium text-lg text-pretty sm:text-xl/8">
                With our powerful calculators, checklists, and simulators, you
                can easily analyze your financial situation and make the best
                choices for your future. Whether you're planning for retirement,
                buying a home, or starting a business, our app has the tools you
                need to succeed.
              </p>
            </div>
            <div className="mt-16 sm:mt-24 flow-root">
              <div className="-m-2 lg:-m-4 p-2 lg:p-4 rounded-xl lg:rounded-2xl ring-1 ring-gray-900/10 ring-inset">
                <Image
                  alt="App screenshot"
                  src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
                  width={2432}
                  height={1442}
                  className="shadow-2xl rounded-md ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 sm:mt-56 px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-6xl lg:text-center">
          <h2>Key Features</h2>
          <h5>Powerful tools to help you make better financial decisions.</h5>
          <p>
            Our app is designed to help you make informed financial decisions.
            With our powerful calculators, checklists, and simulators, you can
            easily analyze your financial situation and make the best choices
            for your future. Whether you're planning for retirement, buying a
            home, or starting a business, our app has the tools you need to
            succeed.
          </p>
        </div>
        <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 max-w-2xl lg:max-w-4xl">
          <dl className="gap-x-8 gap-y-10 lg:gap-y-16 grid grid-cols-1 lg:grid-cols-2 max-w-xl lg:max-w-none">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="font-semibold text-base/7">
                  <div className="top-0 left-0 absolute flex justify-center items-center bg-primary rounded-lg text-primary-foreground size-10">
                    <feature.icon aria-hidden="true" className="size-6" />
                  </div>
                  {feature.name}
                </dt>
                <dd>
                  {feature.description.map((text, index) => (
                    <p key={index} className="mt-2 text-base/7">
                      <strong>{text.title}: </strong>
                      {text.description}
                    </p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Pricing section */}
      <div className="py-24 sm:pt-48">
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-4xl lg:text-center">
            <h2>Pricing Plans</h2>
            <h5>Flexible plans for every stage of your financial journey.</h5>
            <p>
              There are no hidden fees or surprises. Choose the plan that fits
              your needs and start using our app today. All plans come with a
              30-day money-back guarantee, so you can try us risk-free.
            </p>
          </div>
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-4 mx-auto lg:mx-0 mt-16 sm:mt-20 max-w-md lg:max-w-none isolate">
            {pricing.tiers.map((tier, tierIdx) => (
              <div
                key={tierIdx}
                className="flex flex-col justify-between p-8 xl:p-10 rounded-3xl ring-1 h-full"
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-center gap-x-4">
                        <h3 id={tier.id} className="font-semibold text-lg/8">
                          {tier.name}
                        </h3>
                      </div>
                      <p className="mt-4">{tier.description}</p>
                    </div>
                    <p className="flex items-baseline gap-x-1 mt-6">
                      <span className="font-semibold text-4xl tracking-tight">
                        {formatNumberToCurrency(tier.priceMonthly)}
                      </span>
                      <span className="font-semibold">/month</span>
                    </p>
                  </div>
                  <ul role="list" className="space-y-3 mt-8">
                    {tier.highlights.map((feature, index) => (
                      <li key={index} className="flex gap-x-3">
                        <CheckIcon
                          aria-hidden="true"
                          className="flex-none w-5 h-6 text-primary"
                        />
                        {feature.description}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant={tier.featured ? "default" : "secondary"}
                  aria-describedby={tier.id}
                  className="mt-8"
                >
                  Buy plan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="mx-auto px-6 lg:px-8 sm:pt-12 pb-8 sm:pb-24 lg:pb-32 max-w-2xl lg:max-w-7xl">
        <h2 className="font-semibold text-4xl sm:text-5xl tracking-tight">
          Frequently asked questions
        </h2>
        <dl className="mt-20 divide-y">
          {pricingFAQs.slice(0, 4).map((faq) => (
            <div
              key={faq.id}
              className="lg:gap-8 lg:grid lg:grid-cols-12 py-8 first:pt-0 last:pb-0"
            >
              <dt className="lg:col-span-5 font-semibold text-base/7">
                {faq.question}
              </dt>
              <dd className="lg:col-span-7 mt-4 lg:mt-0">
                <p className="text-base/7">{faq.answer.text}</p>
                {faq.answer.list && (
                  <ul className="mt-4 list-disc list-inside">
                    {faq.answer.list.map((item, index) => (
                      <li key={index} className="text-base/7">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <Button className="mt-8" onClick={() => router.push("/pricing")}>
          Learn More About Pricing
        </Button>
      </div>

      {/* CTA section */}
      <div className="relative mt-32 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-semibold text-4xl text-balance sm:text-5xl tracking-tight">
            Take Control of Your Finances Today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty">
            Start using our powerful calculators, checklists, and simulators to
            make smarter decisions — whether you're planning your future,
            growing your business, or investing for the first time.
          </p>
          <div className="flex justify-center items-center gap-x-6 mt-10">
            <Button onClick={() => router.push("/finance-calculators")}>
              Explore the Calculators Now
            </Button>
            <Button
              variant={"link"}
              onClick={() => router.push("/finance-checklists")}
              className="font-semibold"
            >
              View The Checklists
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
