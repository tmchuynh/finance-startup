import { faqs } from "@/lib/constants/faq/questions";

export default function FAQs() {
  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Frequently Asked Questions</h1>
      <h5>Answers to your most common questions</h5>
      <p>
        We understand that you may have questions about our app and its
        features. That's why we've compiled a list of frequently asked questions
        to help you find the information you need. If you have any other
        questions or need further assistance, please don't hesitate to reach out
        to us. We're here to help!
      </p>

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
    </div>
  );
}
