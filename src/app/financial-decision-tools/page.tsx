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
        <ResourceCard
          title="401k vs Roth 401k"
          description="Compare the benefits and drawbacks of traditional 401(k)s and Roth 401(k)s to determine which is best for your retirement savings."
          link="/financial-decision-tools/401k-vs-roth-401k"
        />
        <ResourceCard
          title="Fixed Rate vs Adjustable Rate Mortgage"
          description="Compare the benefits and drawbacks of fixed-rate and adjustable-rate mortgages to determine which is best for your home financing needs."
          link="/financial-decision-tools/fixed-vs-arm-mortgage"
        />
        <ResourceCard
          title="Debt Consolidation vs Current Payments"
          description="Compare the benefits and drawbacks of debt consolidation and current payments to determine which is best for your financial situation."
          link="/financial-decision-tools/debt-consolidation-vs-current"
        />
        <ResourceCard
          title="Balance Transfer vs Paydown"
          description="Compare the benefits and drawbacks of balance transfers and paydowns to determine which is best for your debt management strategy."
          link="/financial-decision-tools/balance-transfer-vs-paydown"
        />
        <ResourceCard
          title="Credit Card vs Personal Loan"
          description="Compare the benefits and drawbacks of credit cards and personal loans to determine which is best for your borrowing needs."
          link="/financial-decision-tools/credit-card-vs-personal-loan"
        />
        <ResourceCard
          title="Credit Card vs Home Equity Line of Credit (HELOC)"
          description="Compare the benefits and drawbacks of credit cards and home equity lines of credit to determine which is best for your borrowing needs."
          link="/financial-decision-tools/credit-card-vs-heloc"
        />
        <ResourceCard
          title="Freelance vs Full-Time Income"
          description="Compare the benefits and drawbacks of freelance income and full-time employment to determine which is best for your financial situation."
          link="/financial-decision-tools/freelance-vs-fulltime-income"
        />
        <ResourceCard
          title="Paying Off Debt vs Investing"
          description="Compare the benefits and drawbacks of paying off debt and investing to determine which is best for your financial situation."
          link="/financial-decision-tools/payoff-debt-vs-investing"
        />
        <ResourceCard
          title="Investing vs Saving Long Term Interest"
          description="Compare the benefits and drawbacks of investing and saving for long-term interest to determine which is best for your financial goals."
          link="/financial-decision-tools/investing-vs-saving"
        />
        <ResourceCard
          title="Public vs Private College Costs"
          description="Compare the costs and benefits of public and private colleges to determine which is best for your education."
          link="/financial-decision-tools/public-vs-private-college"
        />
        <ResourceCard
          title="Buying a New vs Used Car vs Leasing a Car"
          description="Compare the costs and benefits of buying a new car, buying a used car, and leasing a car to determine which is best for your transportation needs."
          link="/financial-decision-tools/new-vs-used-vs-leasing-car"
        />
        <ResourceCard
          title="Buying a Car vs Uber vs Carpooling vs Public Transportation"
          description="Compare the costs and benefits of buying a car, using Uber, carpooling, and public transportation to determine which is best for your transportation needs."
          link="/financial-decision-tools/buying-vs-uber-vs-carpooling-vs-public-transportation"
        />
      </section>
    </div>
  );
}
