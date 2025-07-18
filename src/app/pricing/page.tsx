"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { pricingFAQs } from "@/lib/constants/faq/questions";
import { pricing } from "@/lib/constants/pricing/prices";
import { formatNumberToCurrency } from "@/lib/utils/format";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { CheckIcon, MinusIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";

export default function Example() {
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      {/* Pricing section */}
      <div>
        <h1>Pricing that grows with you</h1>
        <h5>Make Every Financial Move Count</h5>
        <p>
          Our pricing plans are designed to fit your needs, whether you're an
          individual or a business. Choose the plan that works best for you and
          start making informed financial decisions today. This is a
          subscription-based service, and you can cancel at any time. We offer a
          14-day free trial for all plans, so you can try before you buy. No
          credit card is required to start your free trial. After the trial
          period, you will be charged the monthly or annual fee for your
          selected plan. You can cancel your subscription at any time before the
          end of the trial period to avoid being charged. If you have any
          questions or need assistance, please contact our support team. We're
          here to help you make the most of our app and achieve your financial
          goals.
        </p>

        <div className="flex justify-center mt-16">
          <ToggleGroup
            type="single"
            defaultValue={frequency.value}
            aria-label="Payment frequency"
            onValueChange={(value) => {
              const selectedFrequency = pricing.frequencies.find(
                (freq) => freq.value === value
              );
              if (selectedFrequency) {
                setFrequency(selectedFrequency);
              }
            }}
          >
            {pricing.frequencies.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                size={"lg"}
                className="flex data-[state=on]:bg-primary border data-[state=on]:border-primary w-[10em] data-[state=on]:"
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex justify-end w-full">
          <div className="relative gap-8 items-end grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 lg:-mb-14 mt-10 lg:mx-0 lg:w-4/5 2xl:w-6/7 xl:w-3/4">
            {pricing.tiers.map((tier) => (
              <div
                key={tier.name}
                className="grid grid-cols-1 shadow-[inset_0_0_2px_1px_#ffffff4d] max-lg:mx-auto ring-1 ring-ring rounded-4xl h-full max-lg:max-w-md max-lg:w-full"
              >
                <div className="grid grid-cols-1 shadow-black/5 shadow-md p-2 rounded-4xl">
                  <div className="flex flex-col justify-between bg-card shadow-2xl p-10 pb-9 ring-1 ring-black/5 rounded-3xl">
                    <div>
                      <h5>
                        {tier.name} <span className="sr-only">plan</span>
                      </h5>
                      <p className="mt-2 text-pretty text-sm/6">
                        {tier.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex gap-4 items-center mt-8">
                        <h3>
                          {frequency.value === "monthly"
                            ? formatNumberToCurrency(tier.priceMonthly)
                            : formatNumberToCurrency(
                                Math.round(tier.priceMonthly * 12 * 0.8)
                              )}
                        </h3>
                        <div className="text-sm">
                          <p>USD</p>
                          <p>
                            {frequency.value === "monthly"
                              ? "per month"
                              : "per year"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-8">
                        <Button>Start a free trial</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-16 sm:pt-24">
        <table className="max-sm:hidden w-full text-left">
          <caption className="sr-only">Pricing plan comparison</caption>
          <colgroup>
            <col className="w-3/11" />
            <col className="w-2/11" />
            <col className="w-2/11" />
            <col className="w-2/11" />
            <col className="w-2/11" />
          </colgroup>
          <thead>
            <tr>
              <td className="p-0" />
              {pricing.tiers.map((tier) => (
                <th key={tier.name} scope="col" className="p-0">
                  <div className="text-primary text-sm">
                    {tier.name} <span className="sr-only">plan</span>
                  </div>
                </th>
              ))}
            </tr>
            <tr>
              <td className="p-0" />
              {pricing.tiers.map((tier) => (
                <td key={tier.name} className="pb-0 pt-3 px-0">
                  <Button variant={"outline"}>Get started</Button>
                </td>
              ))}
            </tr>
          </thead>
          {pricing.sections.map((section) => (
            <tbody key={section.name} className="group">
              <tr>
                <th
                  scope="colgroup"
                  colSpan={6}
                  className="pb-0 pt-10 group-first-of-type:pt-5 px-0"
                >
                  <div className="bg-secondary/20 -mx-4 px-4 py-3 w-full text-sm/6">
                    {section.name}
                  </div>
                </th>
              </tr>
              {section.features.map((feature) => (
                <tr
                  key={feature.name}
                  className="border-gray-100 border-b last:border-none"
                >
                  <th scope="row" className="px-0 py-4 font-normal text-sm/6">
                    {feature.name}
                  </th>
                  {pricing.tiers.map((tier) => (
                    <td key={tier.name} className="p-4 max-sm:text-center">
                      {typeof feature.tiers[
                        tier.name as keyof typeof feature.tiers
                      ] === "string" ? (
                        <>
                          <span className="sr-only">{tier.name} includes:</span>
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
                  className="block shadow-xs mt-8 px-3.5 py-2.5 ring-1 ring-gray-300 ring-inset rounded-md text-center text-sm"
                >
                  Get started
                </a>
                {pricing.sections.map((section) => (
                  <Fragment key={section.name}>
                    <div className="mt-10 group-first-of-type:mt-5 -mx-6 px-6 py-3 rounded-lg text-sm/6">
                      {section.name}
                    </div>
                    <dl>
                      {section.features.map((feature) => (
                        <div
                          key={feature.name}
                          className="grid grid-cols-2 py-4 border-gray-100 border-b last:border-none"
                        >
                          <dt className="font-normal text-sm/6">
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

      {/* FAQ section */}
      <div className="mt-24 sm:mt-56 mx-auto">
        <h2>Frequently asked questions</h2>
        <dl className="mt-20 divide-y">
          {pricingFAQs.map((faq) => (
            <div
              key={faq.id}
              className="lg:gap-8 lg:grid lg:grid-cols-12 last:pb-0 first:pt-0 py-8"
            >
              <dt className="lg:col-span-5">{faq.question}</dt>
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
    </div>
  );
}
