import { benefits } from "@/lib/constants/about/careers/benefits";

export default function JoinUsPage() {
  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Careers at Fiscora</h1>
      <h5>Join our team and make a difference!</h5>
      <p>
        At Fiscora, we are always looking for talented and passionate
        individuals to join our team. We believe that our employees are our
        greatest asset, and we are committed to creating a positive and
        inclusive work environment. We value diversity and are dedicated to
        fostering a culture of collaboration, innovation, and continuous
        learning. If you are interested in joining us, please check out our
        current job openings below. We look forward to hearing from you!
      </p>

      <section className="mt-16">
        <h2>Why Work With Fiscora</h2>
        <p>
          At Fiscora, we believe that our employees are our greatest asset. We
          are committed to creating a positive and inclusive work environment
          where everyone can thrive. We value diversity and are dedicated to
          fostering a culture of collaboration, innovation, and continuous
          learning. Our team is made up of talented and passionate individuals
          who are committed to making a difference in the world of finance. We
          believe that by working together, we can achieve great things and make
          a positive impact on the lives of our users. We are always looking for
          talented individuals who share our values and are passionate about
          making a difference.
        </p>
        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="mt-8">
              <div className="flex justify-center items-center bg-primary/10 mb-2 rounded-2xl w-16 h-16 text-primary">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3>{benefit.title}</h3>
              <p className="w-2/3">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
