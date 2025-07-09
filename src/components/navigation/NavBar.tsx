import {
  featuredResources,
  recentPosts,
} from "@/lib/constants/navigation/featured";
import {
  company,
  contact,
  essentials,
  pricing,
  simulators,
} from "@/lib/constants/navigation/pages";
import { sortByProperty, sortByPropertyByLength } from "@/lib/utils/sort";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { ThemeToggle } from "../button/ThemeToggle";

export default function NavBar() {
  const sortedEssentials = sortByProperty(essentials, "name");
  const sortedSimulators = sortByPropertyByLength(simulators, "name");
  const sortedContact = sortByPropertyByLength(contact, "name");
  return (
    <main className="">
      <div className="relative z-50 flex items-center justify-between bg-background shadow-sm py-5 w-full isolate">
        <div className="flex mx-auto w-12/13">
          <Popover>
            <div className="bg-background py-5 w-full">
              <div className="mx-auto px-6 lg:px-8 max-w-7xl">
                <PopoverButton className="inline-flex gap-x-1 items-center">
                  Resources
                  <ChevronDownIcon aria-hidden="true" className="size-5" />
                </PopoverButton>
              </div>
            </div>

            <PopoverPanel
              transition
              className="absolute inset-x-0 top-0 -z-10 bg-background data-closed:opacity-0 shadow-lg pb-7 pt-16 border-b ring-1 ring-gray-900/5 data-enter:duration-200 data-leave:duration-150 transition data-closed:-translate-y-1 data-enter:ease-out data-leave:ease-in"
            >
              <div className="gap-x-8 gap-y-10 grid grid-cols-1 lg:grid-cols-5 mx-auto px-6 lg:px-8 py-10 w-10/12 md:w-11/12">
                <div className="gap-x-6 sm:gap-x-8 col-span-5 lg:col-span-2 grid grid-cols-2">
                  <div>
                    <h5>Essentials</h5>
                    <div className="mt-6 flow-root">
                      <div className="-my-2">
                        {sortedEssentials.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex gap-x-4 py-2"
                          >
                            <item.icon
                              aria-hidden="true"
                              className="flex-none text-accent size-6"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5>Learning Simulators</h5>
                    <div className="mt-6 flow-root">
                      <div className="-my-2">
                        {sortedSimulators.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex gap-x-4 py-2"
                          >
                            <item.icon
                              aria-hidden="true"
                              className="flex-none text-accent size-6"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-10 sm:gap-8 col-span-5 lg:col-span-3 grid grid-cols-1 lg:grid-cols-2">
                  <h5 className="sr-only">Recent posts</h5>
                  {featuredResources.map((post) => (
                    <article
                      key={post.id}
                      className="relative flex flex-col lg:flex-col sm:flex-row gap-x-8 gap-y-6 sm:items-start lg:items-stretch max-w-2xl isolate"
                    >
                      <div className="relative flex-none">
                        <Image
                          alt=""
                          src={post.imageUrl}
                          className="rounded-lg sm:h-32 lg:h-auto w-full aspect-2/1 object-cover sm:aspect-video"
                          width={360}
                          height={200}
                        />
                        <div className="absolute inset-0 ring-1 ring-gray-900/10 ring-inset rounded-lg" />
                      </div>
                      <div>
                        <h5 className="mt-2">
                          <a href={post.href}>
                            <span className="absolute inset-0" />
                            {post.title}
                          </a>
                        </h5>
                        <p className="mt-2">{post.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </PopoverPanel>
          </Popover>
          <Popover>
            <div className="bg-background py-5 w-full">
              <div className="mx-auto px-6 lg:px-8 max-w-7xl">
                <PopoverButton className="inline-flex gap-x-1 items-center">
                  Information
                  <ChevronDownIcon aria-hidden="true" className="size-5" />
                </PopoverButton>
              </div>
            </div>

            <PopoverPanel
              transition
              className="absolute inset-x-0 top-0 -z-10 bg-background data-closed:opacity-0 shadow-lg pb-7 pt-16 border-b ring-1 ring-gray-900/5 data-enter:duration-200 data-leave:duration-150 transition data-closed:-translate-y-1 data-enter:ease-out data-leave:ease-in"
            >
              <div className="gap-x-8 gap-y-10 grid grid-cols-1 lg:grid-cols-7 mx-auto px-6 lg:px-8 py-10 w-10/12 md:w-11/12">
                <div className="gap-x-6 sm:gap-x-8 col-span-5 lg:col-span-4 grid grid-cols-3">
                  <div>
                    <h5>About Us</h5>
                    <div className="mt-6 flow-root">
                      <div className="-my-2">
                        {company.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex gap-x-4 py-2"
                          >
                            <item.icon
                              aria-hidden="true"
                              className="flex-none text-accent size-6"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5>Contact Us</h5>
                    <div className="mt-6 flow-root">
                      <div className="-my-2">
                        {sortedContact.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex gap-x-4 py-2"
                          >
                            <item.icon
                              aria-hidden="true"
                              className="flex-none text-accent size-6"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5>Pricing</h5>
                    <div className="mt-6 flow-root">
                      <div className="-my-2">
                        {pricing.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex gap-x-4 py-2"
                          >
                            <item.icon
                              aria-hidden="true"
                              className="flex-none text-accent size-6"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-10 sm:gap-8 col-span-5 lg:col-span-3 grid grid-cols-1 lg:grid-cols-2">
                  <h5 className="sr-only">Recent posts</h5>
                  {recentPosts.map((post) => (
                    <article
                      key={post.id}
                      className="relative flex flex-col lg:flex-col sm:flex-row gap-x-8 gap-y-6 sm:items-start lg:items-stretch max-w-2xl isolate"
                    >
                      <div className="relative flex-none">
                        <Image
                          alt=""
                          src={post.imageUrl}
                          className="rounded-lg sm:h-32 lg:h-auto w-full aspect-2/1 object-cover sm:aspect-video"
                          width={360}
                          height={200}
                        />
                        <div className="absolute inset-0 ring-1 ring-gray-900/10 ring-inset rounded-lg" />
                      </div>
                      <div>
                        <h5 className="mt-2">
                          <a href={post.href}>
                            <span className="absolute inset-0" />
                            {post.title}
                          </a>
                        </h5>
                        <p className="mt-2">{post.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
        <ThemeToggle />
      </div>
    </main>
  );
}
