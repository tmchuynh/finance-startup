import { officeLocations } from "@/lib/constants/contact/locations";
import { groupAndSortByProperties } from "@/lib/utils/sort";

export default function ContactUsPage() {
  const sortedLocations = groupAndSortByProperties(
    officeLocations,
    "state",
    "city"
  );
  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Contact Us</h1>
      <h5>We'd love to hear from you!</h5>
      <p>
        If you have any questions, comments, or feedback about our app, please
        don't hesitate to reach out to us. We're here to help and would love to
        hear from you. You can contact us through the form below or reach out to
        us via email or phone. We look forward to hearing from you!
      </p>

      <div className="gap-8 sm:gap-y-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto lg:mx-0 mt-16 max-w-2xl lg:max-w-none text-base/7">
        {sortedLocations.map((location, index) => (
          <div key={index}>
            <h3 className="pl-6 border-primary border-l">{location.city}</h3>
            <address className="pt-2 pl-6 border-accent border-l not-italic">
              <p>{location.street}</p>
              <p>{location.state}</p>
            </address>
            <div className="pt-2 pl-6 border-border border-l text-accent/75">
              <p>{location.phone}</p>
              <p>{location.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
