"use client";

import { faqs } from "@/lib/constants/faq/questions";
import { pricing } from "@/lib/constants/pricing/prices";
import { cn } from "@/lib/utils";
import { Radio, RadioGroup } from "@headlessui/react";
import {
  CheckIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import { useState } from "react";

export default function Example() {
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);

  return (
    <main>
      {/* Pricing section */}
      <div className="overflow-hidden isolate">
        <div className="bg-gray-900 py-16 sm:pt-32 lg:pb-0 flow-root">
          <div className="mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="relative z-10">
              <h1 className="mx-auto max-w-4xl font-semibold text-5xl text-balance text-center sm:text-6xl tracking-tight">
                Pricing that grows with you
              </h1>
              <p className="mx-auto mt-6 max-w-2xl font-medium text-center text-lg text-pretty sm:text-xl/8">
                Choose an affordable plan that’s packed with the best features
                for engaging your audience, creating customer loyalty, and
                driving sales.
              </p>
              <div className="flex justify-center mt-16">
                <fieldset aria-label="Payment frequency">
                  <RadioGroup
                    value={frequency}
                    onChange={setFrequency}
                    className="gap-x-1 grid grid-cols-2/5 p-1 rounded-full font-semibold text-center text-xs/5"
                  >
                    {pricing.frequencies.map((option) => (
                      <Radio
                        key={option.value}
                        value={option}
                        className="data-checked:bg-indigo-500 px-2.5 py-1 rounded-full cursor-pointer"
                      >
                        {option.label}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
            </div>
            <div className="relative gap-y-8 grid grid-cols-1 lg:grid-cols-3 mx-auto lg:mx-0 mt-10 lg:-mb-14 max-w-md lg:max-w-none">
              <svg
                viewBox="0 0 1208 1024"
                aria-hidden="true"
                className="lg:-top-48 -bottom-48 lg:bottom-auto left-1/2 absolute h-256 -translate-x-1/2 translate-y-1/2 lg:translate-y-0 mask-[radial-gradient(closest-side,white,transparent)]"
              >
                <ellipse
                  cx={604}
                  cy={512}
                  rx={604}
                  ry={512}
                  fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)"
                />
                <defs>
                  <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#E935C1" />
                  </radialGradient>
                </defs>
              </svg>
              <div
                aria-hidden="true"
                className="lg:block lg:top-4 lg:bottom-0 lg:absolute lg:inset-x-px hidden lg:bg-gray-800/80 lg:rounded-t-2xl lg:ring-1 lg:ring-white/10"
              />
              {pricing.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={cn(
                    tier.featured
                      ? "z-10 shadow-xl ring-1 ring-gray-900/10"
                      : "bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0",
                    "relative rounded-2xl"
                  )}
                >
                  <div className="p-8 xl:p-10 lg:pt-12 xl:pt-14">
                    <h2
                      id={tier.id}
                      className={cn(
                        tier.featured ? "" : "text-white",
                        "text-sm/6 font-semibold"
                      )}
                    >
                      {tier.name}
                    </h2>
                    <div className="flex sm:flex-row flex-col lg:flex-col sm:justify-between sm:items-end lg:items-stretch gap-6">
                      <div className="flex items-center gap-x-4 mt-2">
                        <p
                          className={cn(
                            tier.featured ? "" : "text-white",
                            "text-4xl font-semibold tracking-tight"
                          )}
                        >
                          {
                            tier.price[
                              frequency.value as "monthly" | "annually"
                            ]
                          }
                        </p>
                        <div className="text-sm">
                          <p className={tier.featured ? "" : "text-white"}>
                            USD
                          </p>
                          <p
                            className={
                              tier.featured ? "text-gray-500" : "text-gray-400"
                            }
                          >{`Billed ${frequency.value}`}</p>
                        </div>
                      </div>
                      <a
                        href={tier.href}
                        aria-describedby={tier.id}
                        className={cn(
                          tier.featured
                            ? "bg-primary shadow-xs hover:bg-indigo-500 focus-visible:outline-primary"
                            : "bg-white/10 hover:bg-white/20 focus-visible:outline-white",
                          "rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                        )}
                      >
                        Buy this plan
                      </a>
                    </div>
                    <div className="mt-8 sm:mt-10 flow-root">
                      <ul
                        role="list"
                        className={cn(
                          tier.featured
                            ? "divide-gray-900/5 border-gray-900/5"
                            : "divide-white/5 border-white/5",
                          "-my-2 divide-y border-t text-sm/6 lg:border-t-0"
                        )}
                      >
                        {tier.highlights.map((mainFeature) => (
                          <li key={mainFeature} className="flex gap-x-3 py-2">
                            <CheckIcon
                              aria-hidden="true"
                              className={cn(
                                tier.featured
                                  ? "text-primary"
                                  : "text-gray-500",
                                "h-6 w-5 flex-none"
                              )}
                            />
                            {mainFeature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative lg:pt-14">
          <div className="mx-auto px-6 lg:px-8 py-24 sm:py-32 max-w-7xl">
            {/* Feature comparison (up to lg) */}
            <section
              aria-labelledby="mobile-comparison-heading"
              className="lg:hidden"
            >
              <h2 id="mobile-comparison-heading" className="sr-only">
                Feature comparison
              </h2>

              <div className="space-y-16 mx-auto max-w-2xl">
                {pricing.tiers.map((tier) => (
                  <div key={tier.id} className="border-gray-900/10 border-t">
                    <div
                      className={cn(
                        tier.featured ? "border-primary" : "border-transparent",
                        "-mt-px w-72 border-t-2 pt-10 md:w-80"
                      )}
                    >
                      <h3
                        className={cn(
                          tier.featured ? "text-primary" : "",
                          "text-sm/6 font-semibold"
                        )}
                      >
                        {tier.name}
                      </h3>
                      <p className="mt-1 text-sm/6">{tier.description}</p>
                    </div>

                    <div className="space-y-10 mt-10">
                      {pricing.sections.map((section) => (
                        <div key={section.name}>
                          <h4 className="font-semibold text-sm/6">
                            {section.name}
                          </h4>
                          <div className="relative mt-6">
                            {/* Fake card background */}
                            <div
                              aria-hidden="true"
                              className="sm:block right-0 absolute inset-y-0 hidden shadow-xs rounded-lg w-1/2"
                            />

                            <div
                              className={cn(
                                tier.featured
                                  ? "ring-2 ring-primary"
                                  : "ring-1 ring-gray-900/10",
                                "relative rounded-lg shadow-xs sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0"
                              )}
                            >
                              <dl className="divide-y text-sm/6">
                                {section.features.map((feature) => (
                                  <div
                                    key={feature.name}
                                    className="flex justify-between items-center sm:grid sm:grid-cols-2 px-4 sm:px-0 py-3"
                                  >
                                    <dt className="pr-4">{feature.name}</dt>
                                    <dd className="flex justify-end sm:justify-center items-center sm:px-4">
                                      {typeof feature.tiers[
                                        tier.name as keyof typeof feature.tiers
                                      ] === "string" ? (
                                        <span
                                          className={
                                            tier.featured ? "font-semibold" : ""
                                          }
                                        >
                                          {
                                            feature.tiers[
                                              tier.name as keyof typeof feature.tiers
                                            ]
                                          }
                                        </span>
                                      ) : (
                                        <>
                                          {feature.tiers[
                                            tier.name as keyof typeof feature.tiers
                                          ] === true ? (
                                            <CheckIcon
                                              aria-hidden="true"
                                              className="mx-auto size-5"
                                            />
                                          ) : (
                                            <XMarkIconMini
                                              aria-hidden="true"
                                              className="mx-auto size-5"
                                            />
                                          )}

                                          <span className="sr-only">
                                            {feature.tiers[
                                              tier.name as keyof typeof feature.tiers
                                            ] === true
                                              ? "Yes"
                                              : "No"}
                                          </span>
                                        </>
                                      )}
                                    </dd>
                                  </div>
                                ))}
                              </dl>
                            </div>

                            {/* Fake card border */}
                            <div
                              aria-hidden="true"
                              className={cn(
                                tier.featured
                                  ? "ring-2 ring-primary"
                                  : "ring-1 ring-gray-900/10",
                                "pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block"
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Feature comparison (lg+) */}
            <section
              aria-labelledby="comparison-heading"
              className="lg:block hidden"
            >
              <h2 id="comparison-heading" className="sr-only">
                Feature comparison
              </h2>

              <div className="before:block gap-x-8 grid grid-cols-4 border-gray-900/10 border-t">
                {pricing.tiers.map((tier) => (
                  <div key={tier.id} aria-hidden="true" className="-mt-px">
                    <div
                      className={cn(
                        tier.featured ? "border-primary" : "border-transparent",
                        "border-t-2 pt-10"
                      )}
                    >
                      <p
                        className={cn(
                          tier.featured ? "text-primary" : "",
                          "text-sm/6 font-semibold"
                        )}
                      >
                        {tier.name}
                      </p>
                      <p className="mt-1 text-sm/6">{tier.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-16 -mt-6">
                {pricing.sections.map((section) => (
                  <div key={section.name}>
                    <h3 className="font-semibold text-sm/6">{section.name}</h3>
                    <div className="relative -mx-8 mt-10">
                      {/* Fake card backgrounds */}
                      <div
                        aria-hidden="true"
                        className="before:block absolute inset-x-8 inset-y-0 gap-x-8 grid grid-cols-4"
                      >
                        <div className="bg-white shadow-xs rounded-lg size-full" />
                        <div className="bg-white shadow-xs rounded-lg size-full" />
                        <div className="bg-white shadow-xs rounded-lg size-full" />
                      </div>

                      <table className="relative border-separate border-spacing-x-8 w-full">
                        <thead>
                          <tr className="text-left">
                            <th scope="col">
                              <span className="sr-only">Feature</span>
                            </th>
                            {pricing.tiers.map((tier) => (
                              <th key={tier.id} scope="col">
                                <span className="sr-only">
                                  {tier.name} tier
                                </span>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.features.map((feature, featureIdx) => (
                            <tr key={feature.name}>
                              <th
                                scope="row"
                                className="py-3 pr-4 w-1/4 font-normal text-left text-sm/6"
                              >
                                {feature.name}
                                {featureIdx !== section.features.length - 1 ? (
                                  <div className="absolute inset-x-8 mt-3 h-px" />
                                ) : null}
                              </th>
                              {pricing.tiers.map((tier) => (
                                <td
                                  key={tier.id}
                                  className="relative px-4 py-0 w-1/4 text-center"
                                >
                                  <span className="relative py-3 size-full">
                                    {typeof feature.tiers[
                                      tier.name as keyof typeof feature.tiers
                                    ] === "string" ? (
                                      <span
                                        className={cn(
                                          tier.featured ? "font-semibold" : "",
                                          "text-sm/6"
                                        )}
                                      >
                                        {
                                          feature.tiers[
                                            tier.name as keyof typeof feature.tiers
                                          ]
                                        }
                                      </span>
                                    ) : (
                                      <>
                                        {feature.tiers[
                                          tier.name as keyof typeof feature.tiers
                                        ] === true ? (
                                          <CheckIcon
                                            aria-hidden="true"
                                            className="mx-auto size-5"
                                          />
                                        ) : (
                                          <XMarkIconMini
                                            aria-hidden="true"
                                            className="mx-auto size-5"
                                          />
                                        )}

                                        <span className="sr-only">
                                          {feature.tiers[
                                            tier.name as keyof typeof feature.tiers
                                          ] === true
                                            ? "Yes"
                                            : "No"}
                                        </span>
                                      </>
                                    )}
                                  </span>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Fake card borders */}
                      <div
                        aria-hidden="true"
                        className="before:block absolute inset-x-8 inset-y-0 gap-x-8 grid grid-cols-4 pointer-events-none"
                      >
                        {pricing.tiers.map((tier) => (
                          <div
                            key={tier.id}
                            className={cn(
                              tier.featured
                                ? "ring-2 ring-primary"
                                : "ring-1 ring-gray-900/10",
                              "rounded-lg"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="mx-auto mt-24 sm:mt-56 px-6 lg:px-8 max-w-7xl">
        <h2 className="font-semibold text-4xl sm:text-5xl tracking-tight">
          Frequently asked questions
        </h2>
        <dl className="mt-20 divide-y">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="lg:gap-8 lg:grid lg:grid-cols-12 py-8 first:pt-0 last:pb-0"
            >
              <dt className="lg:col-span-5 font-semibold">{faq.question}</dt>
              <dd className="lg:col-span-7 mt-4 lg:mt-0">
                <p>{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
