import { faqs } from "@/lib/constants/faq/questions";

export default function FAQs() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-10/12 md:w-11/12 h-full">
      <h1 className="font-bold text-2xl">Frequently Asked Questions</h1>
      <p>Welcome to the Frequently Asked Questions!</p>

      <section className="mx-auto mt-24 sm:mt-56 px-6 lg:px-8 max-w-7xl">
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
      </section>
    </div>
  );
}
