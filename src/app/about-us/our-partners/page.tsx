import { partnerships } from "@/lib/constants/about/partners";

export default function OurPartnersPage() {
  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Our Partners</h1>
      <h5>Collaborating for Financial Clarity</h5>
      <div className="gap-4 grid lg:grid-cols-2 mt-7">
        <div className="space-y-4">
          <p>
            We are proud to partner with a variety of organizations that share
            our commitment to providing the best financial tools and resources.
            Our partners help us enhance our offerings and ensure that we can
            provide you with the most accurate and up-to-date information.
            Together, we are working to create a more informed and empowered
            community of users who can make better financial decisions. We
            believe that by collaborating with like-minded organizations, we can
            amplify our impact and reach more individuals and businesses.
          </p>
          <p>
            Thank you for being a part of our community, and we look forward to
            continuing to work together to provide the best financial tools and
            resources available.
          </p>
        </div>
        <p className="mt-0">
          Our partnerships allow us to leverage each other's strengths and
          resources, ensuring that we can provide the best possible experience
          for our users. We are committed to building strong and lasting
          relationships with our partners, and we are always looking for new
          opportunities to collaborate. If you are interested in partnering with
          us, please reach out to us. We would love to hear from you and explore
          how we can work together to make a positive impact in the world of
          finance.
        </p>
      </div>

      {partnerships.map((partners, index) => (
        <section key={index} className="mt-16">
          <h2>{partners.title}</h2>
          <p className="w-2/3">{partners.description}</p>
          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto lg:mx-0 mt-8 lg:max-w-none text-base/7">
            {partners.items.map((partner, index) => (
              <div key={index}>
                <h3>{partner.title}</h3>
                <h5>{partner.subtitle}</h5>
                <p>{partner.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
