import ResourceCard from "@/components/cards/ResourceCard";

export default function FinancialDecisionToolsPage() {
  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Financial Decision Tools</h1>
      <h5>Empowering Your Financial Journey</h5>
      <p>
        Welcome to our Financial Decision Tools page! Here, you will find a
        collection of resources and tools designed to help you make informed
        financial decisions. Whether you're looking to budget, save, invest, or
        plan for retirement, we have the tools you need to take control of your
        financial future. Our tools are user-friendly and designed to provide
        you with accurate and reliable information. We believe that everyone
        should have access to the resources they need to make informed financial
        decisions, and we are committed to providing you with the best tools
        available. Explore our collection of financial decision tools and start
        taking control of your financial future today!
      </p>

      <section className="gap-4 grid lg:grid-cols-2 mt-2 md:mt-6 xl:mt-8">
        <ResourceCard
          title="IRA vs Roth IRA"
          description="Compare the benefits and drawbacks of traditional IRAs and Roth IRAs to determine which is best for your retirement savings."
          link="/financial-decision-tools/ira-vs-roth"
        />
        <ResourceCard
          title="Renting VS Buying"
          description="Compare the costs and benefits of renting versus buying a home to determine which option is best for you."
          link="/financial-decision-tools/renting-vs-buying"
        />
        <ResourceCard
          title="High-Deductible Health Plan (HDHP) vs Traditional Health Plan"
          description="Compare the costs and benefits of high-deductible health plans and traditional health plans to determine which is best for your healthcare needs."
          link="/financial-decision-tools/high-deductiable-health-plan-vs-traditional-health-plan"
        />
      </section>
    </div>
  );
}
