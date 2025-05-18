"use client";

import { pricingFAQs } from "@/lib/constants/faq/questions";
import { pricing } from "@/lib/constants/pricing/prices";
import {
  Radio,
  RadioGroup,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";

export default function Example() {
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);

  useState(() => {
    const savedFrequency = localStorage.getItem("pricing-frequency");
    if (savedFrequency) {
      const parsedFrequency = JSON.parse(savedFrequency);
      setFrequency(parsedFrequency);
    }
  });

  return (
    <main>
      {/* Pricing section */}
      <div className="overflow-hidden isolate">
        <div className="py-16 sm:pt-32 lg:pb-0 flow-root">
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
            <div className="relative gap-y-8 grid grid-cols-1 lg:grid-cols-4 mx-auto lg:mx-0 mt-10 lg:-mb-14 max-w-md lg:max-w-none">
              {pricing.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="grid grid-cols-1 shadow-[inset_0_0_2px_1px_#ffffff4d] -m-2 max-lg:mx-auto rounded-4xl ring-1 ring-black/5 max-lg:w-full max-lg:max-w-md"
                >
                  <div className="grid grid-cols-1 shadow-black/5 shadow-md p-2 rounded-4xl">
                    <div className="bg-white shadow-2xl p-10 pb-9 rounded-3xl ring-1 ring-black/5">
                      <h2 className="font-semibold text-indigo-600 text-sm">
                        {tier.name} <span className="sr-only">plan</span>
                      </h2>
                      <p className="mt-2 text-gray-600 text-pretty text-sm/6">
                        {tier.description}
                      </p>
                      <div className="flex items-center gap-4 mt-8">
                        <div className="font-semibold text-5xl text-gray-950">
                          {tier.priceMonthly}
                        </div>
                        <div className="text-gray-600 text-sm">
                          <p>USD</p>
                          <p>per month</p>
                        </div>
                      </div>
                      <div className="mt-8">
                        <a
                          href={tier.href}
                          aria-label={`Start a free trial on the ${tier.name} plan`}
                          className="inline-block bg-indigo-600 hover:bg-indigo-500 shadow-xs px-3.5 py-2 rounded-md font-semibold text-center text-sm/6 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Start a free trial
                        </a>
                      </div>
                      <div className="mt-8">
                        <h3 className="font-medium text-gray-950 text-sm/6">
                          Start selling with:
                        </h3>
                        <ul className="space-y-3 mt-3">
                          {tier.highlights.map((highlight) => (
                            <li
                              key={highlight.description}
                              data-disabled={highlight.disabled}
                              className="group flex items-start gap-4 text-gray-600 text-sm/6 data-disabled:text-gray-400"
                            >
                              <span className="inline-flex items-center h-6">
                                <PlusIcon
                                  aria-hidden="true"
                                  className="size-4 fill-gray-400 group-data-disabled:fill-gray-300"
                                />
                              </span>
                              {highlight.disabled ? (
                                <span className="sr-only">Not included:</span>
                              ) : null}
                              {highlight.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative lg:pt-14">
          <div className="mx-auto px-6 lg:px-8 pt-16 sm:pt-24 max-w-2xl lg:max-w-7xl">
            <table className="max-sm:hidden w-full text-left">
              <caption className="sr-only">Pricing plan comparison</caption>
              <colgroup>
                <col className="w-2/5" />
                <col className="w-1/5" />
                <col className="w-1/5" />
                <col className="w-1/5" />
              </colgroup>
              <thead>
                <tr>
                  <td className="p-0" />
                  {pricing.tiers.map((tier) => (
                    <th key={tier.name} scope="col" className="p-0">
                      <div className="font-semibold text-indigo-600 text-sm">
                        {tier.name} <span className="sr-only">plan</span>
                      </div>
                    </th>
                  ))}
                </tr>
                <tr>
                  <td className="p-0" />
                  {pricing.tiers.map((tier) => (
                    <td key={tier.name} className="px-0 pt-3 pb-0">
                      <a
                        href={tier.href}
                        aria-label={`Get started with the ${tier.name} plan`}
                        className="inline-block bg-white hover:bg-gray-50 shadow-xs px-2.5 py-1.5 rounded-md ring-1 ring-gray-300 ring-inset font-semibold text-gray-900 text-sm"
                      >
                        Get started
                      </a>
                    </td>
                  ))}
                </tr>
              </thead>
              {pricing.sections.map((section) => (
                <tbody key={section.name} className="group">
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={4}
                      className="px-0 pt-10 group-first-of-type:pt-5 pb-0"
                    >
                      <div className="bg-gray-50 -mx-4 px-4 py-3 rounded-lg font-semibold text-gray-950 text-sm/6">
                        {section.name}
                      </div>
                    </th>
                  </tr>
                  {section.features.map((feature) => (
                    <tr
                      key={feature.name}
                      className="border-gray-100 border-b last:border-none"
                    >
                      <th
                        scope="row"
                        className="px-0 py-4 font-normal text-gray-600 text-sm/6"
                      >
                        {feature.name}
                      </th>
                      {pricing.tiers.map((tier) => (
                        <td key={tier.name} className="p-4 max-sm:text-center">
                          {typeof feature.tiers[
                            tier.name as keyof typeof feature.tiers
                          ] === "string" ? (
                            <>
                              <span className="sr-only">
                                {tier.name} includes:
                              </span>
                              <span className="text-gray-950 text-sm/6">
                                {
                                  feature.tiers[
                                    tier.name as keyof typeof feature.tiers
                                  ]
                                }
                              </span>
                            </>
                          ) : (
                            <>
                              {feature.tiers[
                                tier.name as keyof typeof feature.tiers
                              ] === true ? (
                                <CheckIcon
                                  aria-hidden="true"
                                  className="inline-block size-4 fill-green-600"
                                />
                              ) : (
                                <MinusIcon
                                  aria-hidden="true"
                                  className="inline-block size-4 fill-gray-400"
                                />
                              )}

                              <span className="sr-only">
                                {feature.tiers[
                                  tier.name as keyof typeof feature.tiers
                                ] === true
                                  ? `Included in ${tier.name}`
                                  : `Not included in ${tier.name}`}
                              </span>
                            </>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
            <TabGroup className="sm:hidden">
              <TabList className="flex">
                {pricing.tiers.map((tier) => (
                  <Tab
                    key={tier.name}
                    className="[&:not([data-focus])]:focus:outline-hidden py-4 border-gray-100 data-selected:border-indigo-600 border-b w-1/3 font-medium text-base/8 text-indigo-600"
                  >
                    {tier.name}
                  </Tab>
                ))}
              </TabList>
              <TabPanels as={Fragment}>
                {pricing.tiers.map((tier) => (
                  <TabPanel key={tier.name}>
                    <a
                      href={tier.href}
                      className="block bg-white hover:bg-gray-50 shadow-xs mt-8 px-3.5 py-2.5 rounded-md ring-1 ring-gray-300 ring-inset font-semibold text-center text-gray-900 text-sm"
                    >
                      Get started
                    </a>
                    {pricing.sections.map((section) => (
                      <Fragment key={section.name}>
                        <div className="bg-gray-50 -mx-6 mt-10 group-first-of-type:mt-5 px-6 py-3 rounded-lg font-semibold text-gray-950 text-sm/6">
                          {section.name}
                        </div>
                        <dl>
                          {section.features.map((feature) => (
                            <div
                              key={feature.name}
                              className="grid grid-cols-2 py-4 border-gray-100 border-b last:border-none"
                            >
                              <dt className="font-normal text-gray-600 text-sm/6">
                                {feature.name}
                              </dt>
                              <dd className="text-center">
                                {typeof feature.tiers[
                                  tier.name as keyof typeof feature.tiers
                                ] === "string" ? (
                                  <span className="text-gray-950 text-sm/6">
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
                                        className="inline-block size-4 fill-green-600"
                                      />
                                    ) : (
                                      <MinusIcon
                                        aria-hidden="true"
                                        className="inline-block size-4 fill-gray-400"
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
                      </Fragment>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="mx-auto mt-24 sm:mt-56 px-6 lg:px-8 max-w-7xl">
        <h2 className="font-semibold text-4xl sm:text-5xl tracking-tight">
          Frequently asked questions
        </h2>
        <dl className="mt-20 divide-y">
          {pricingFAQs.map((faq) => (
            <div
              key={faq.id}
              className="lg:gap-8 lg:grid lg:grid-cols-12 py-8 first:pt-0 last:pb-0"
            >
              <dt className="lg:col-span-5 font-semibold">{faq.question}</dt>
              <dd className="lg:col-span-7 mt-4 lg:mt-0">
                <p>{faq.answer.text}</p>
                {faq.answer.list && (
                  <ul className="mt-4 list-disc list-inside">
                    {faq.answer.list.map((item) => (
                      <li key={item} className="text-sm/6">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
