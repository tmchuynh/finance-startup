"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const features = [
  {
    name: "Push to deploy",
    description:
      "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates",
    description:
      "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    icon: LockClosedIcon,
  },
  {
    name: "Simple queues",
    description:
      "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    icon: ArrowPathIcon,
  },
  {
    name: "Advanced security",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: FingerPrintIcon,
  },
];
const tiers = [
  {
    name: "Freelancer",
    id: "tier-freelancer",
    href: "#",
    priceMonthly: "$19",
    description: "The essentials to provide your best work for clients.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    mostPopular: false,
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "#",
    priceMonthly: "$49",
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$99",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
    ],
    mostPopular: false,
  },
];
const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
];

export default function App() {
  return (
    <main className="isolate">
      {/* Hero section */}
      <div className="relative pt-14">
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h1>Deploy to the cloud with confidence</h1>
              <p className="mt-8 font-medium text-lg text-pretty sm:text-xl/8">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
              </p>
              <div className="flex justify-center items-center gap-x-6 mt-10">
                <Button>Get started</Button>
                <Button variant="outline">Learn more</Button>
              </div>
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
        <div
          aria-hidden="true"
          className="top-[calc(100%-13rem)] sm:top-[calc(100%-30rem)] -z-10 absolute inset-x-0 blur-3xl transform-gpu overflow-hidden"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] sm:left-[calc(50%+36rem)] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 w-144.5 sm:w-288.75 -translate-x-1/2 aspect-1155/678"
          />
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 sm:mt-56 px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2>Deploy faster</h2>
          <p>Everything you need to deploy your app</p>
          <p>
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
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
                <dd>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Pricing section */}
      <div className="py-24 sm:pt-48">
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2>Pricing</h2>
            <p>Pricing that grows with you</p>
            <p>
              Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
              Suspendisse eget egestas a elementum pulvinar et feugiat blandit
              at. In mi viverra elit nunc.
            </p>
          </div>
          <div className="gap-y-8 grid grid-cols-1 lg:grid-cols-3 mx-auto lg:mx-0 mt-16 sm:mt-20 max-w-md lg:max-w-none isolate">
            {tiers.map((tier, tierIdx) => (
              <div
                key={tier.id}
                className={cn(
                  tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                  tierIdx === 0 ? "lg:rounded-r-none" : "",
                  tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                  "flex flex-col justify-between rounded-3xl p-8 ring-1 xl:p-10"
                )}
              >
                <div>
                  <div className="flex justify-between items-center gap-x-4">
                    <h3
                      id={tier.id}
                      className={cn(
                        tier.mostPopular ? "text-primary" : "text-secondary",
                        "text-lg/8 font-semibold"
                      )}
                    >
                      {tier.name}
                    </h3>
                    {tier.mostPopular ? (
                      <Badge variant="default">Most popular</Badge>
                    ) : null}
                  </div>
                  <p className="mt-4">{tier.description}</p>
                  <p className="flex items-baseline gap-x-1 mt-6">
                    <span className="font-semibold text-4xl tracking-tight">
                      {tier.priceMonthly}
                    </span>
                    <span className="font-semibold">/month</span>
                  </p>
                  <ul role="list" className="space-y-3 mt-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          aria-hidden="true"
                          className="flex-none w-5 h-6 text-primary"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant={tier.mostPopular ? "default" : "secondary"}
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
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="lg:gap-8 lg:grid lg:grid-cols-12 py-8 first:pt-0 last:pb-0"
            >
              <dt className="lg:col-span-5 font-semibold text-base/7">
                {faq.question}
              </dt>
              <dd className="lg:col-span-7 mt-4 lg:mt-0">
                <p className="text-base/7">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* CTA section */}
      <div className="relative -z-10 mt-32 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-semibold text-4xl text-balance sm:text-5xl tracking-tight">
            Boost your productivity. Start using our app today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty">
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum
            anim id veniam aliqua proident excepteur commodo do ea.
          </p>
          <div className="flex justify-center items-center gap-x-6 mt-10">
            <Button>Get started</Button>
            <a href="#" className="font-semibold">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
