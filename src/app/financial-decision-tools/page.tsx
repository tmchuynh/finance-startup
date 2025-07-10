import ResourceCard from "@/components/cards/ResourceCard";
import { Button } from "@/components/ui/button";
import { sortByProperty } from "@/lib/utils/sort";
import Link from "next/link";

export default function FinancialDecisionToolsPage() {
  const tools = [
    {
      title: "IRA vs Roth IRA",
      description:
        "Compare the benefits and drawbacks of traditional IRAs and Roth IRAs to determine which is best for your retirement savings.",
      link: "/financial-decision-tools/ira-vs-roth",
    },
    {
      title: "Renting VS Buying",
      description:
        "Compare the costs and benefits of renting versus buying a home to determine which option is best for you.",
      link: "/financial-decision-tools/renting-vs-buying",
    },
    {
      title: "High-Deductible Health Plan (HDHP) vs Traditional Health Plan",
      description:
        "Compare the costs and benefits of high-deductible health plans and traditional health plans to determine which is best for your healthcare needs.",
      link: "/financial-decision-tools/high-deductiable-health-plan-vs-traditional-health-plan",
    },
    {
      title: "401k vs Roth 401k",
      description:
        "Compare the benefits and drawbacks of traditional 401(k)s and Roth 401(k)s to determine which is best for your retirement savings.",
      link: "/financial-decision-tools/401k-vs-roth-401k",
    },
    {
      title: "Fixed Rate vs Adjustable Rate Mortgage",
      description:
        "Compare the benefits and drawbacks of fixed-rate and adjustable-rate mortgages to determine which is best for your home financing needs.",
      link: "/financial-decision-tools/fixed-vs-arm-mortgage",
    },
    {
      title: "Debt Consolidation vs Current Payments",
      description:
        "Compare the benefits and drawbacks of debt consolidation and making current payments to determine which is best for your financial situation.",
      link: "/financial-decision-tools/debt-consolidation-vs-current",
    },
    {
      title: "Pay Off Debt vs Investing",
      description:
        "Compare the benefits and drawbacks of paying off debt and investing to determine which is best for your financial situation.",
      link: "/financial-decision-tools/payoff-debt-vs-investing",
    },
    {
      title: "Investing vs Saving",
      description:
        "Compare the benefits and drawbacks of investing and saving for long-term interest to determine which is best for your financial goals.",
      link: "/financial-decision-tools/investing-vs-saving",
    },
    {
      title: "Credit Card vs Personal Loan",
      description:
        "Compare the benefits and drawbacks of credit cards and personal loans to determine which is best for your borrowing needs.",
      link: "/financial-decision-tools/credit-card-vs-personal-loan",
    },
    {
      title: "Credit Card vs Home Equity Line of Credit (HELOC)",
      description:
        "Compare the benefits and drawbacks of credit cards and home equity lines of credit to determine which is best for your borrowing needs.",
      link: "/financial-decision-tools/credit-card-vs-heloc",
    },
    {
      title: "Credit Card Balance Transfer vs Paying Down Existing Cards",
      description:
        "Compare the benefits and drawbacks of balance transfers and paydowns to determine which is best for your debt management strategy.",
      link: "/financial-decision-tools/credit-card-balance-transfer-vs-paying-down-existing-cards",
    },
    {
      title: "Freelance vs Full-Time Income",
      description:
        "Compare the benefits and drawbacks of freelance income and full-time employment to determine which is best for your financial situation.",
      link: "/financial-decision-tools/freelance-vs-fulltime-income",
    },
    {
      title: "Public vs Private College Costs",
      description:
        "Compare the costs and benefits of public and private colleges to determine which is best for your education.",
      link: "/financial-decision-tools/public-vs-private-college",
    },
    {
      title: "Buying a New vs Used Car vs Leasing a Car",
      description:
        "Compare the costs and benefits of buying a new car, buying a used car, and leasing a car to determine which is best for your transportation needs.",
      link: "/financial-decision-tools/new-vs-used-vs-leasing-car",
    },
    {
      title: "Buying a Car vs Uber vs Carpooling vs Public Transportation",
      description:
        "Compare the costs and benefits of buying a car, using Uber, carpooling, and public transportation to determine which is best for your transportation needs.",
      link: "/financial-decision-tools/buying-vs-uber-vs-carpooling-vs-public-transportation",
    },
  ];

  const sortedTools = sortByProperty(tools, "title");

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1>Financial Decision Tools</h1>
        <h5 className="">Empowering Your Financial Journey</h5>
        <p>
          Welcome to our Financial Decision Tools! Here, you will find a
          comprehensive collection of resources and tools designed to help you
          make informed financial decisions. Whether you're looking to budget,
          save, invest, or plan for retirement, we have the tools you need to
          take control of your financial future. Our tools are user-friendly and
          designed to provide you with accurate and reliable information.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
        {sortedTools.map((tool, index) => (
          <ResourceCard
            key={index}
            title={tool.title}
            description={tool.description}
          />
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="p-8 border bounded-lg">
          <h3>Ready to Make Informed Financial Decisions?</h3>
          <p>
            Our tools are designed to provide you with accurate and reliable
            information to help you navigate complex financial decisions with
            confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/finance-calculators">
              <Button variant="outline" size="lg">
                Explore Calculators
              </Button>
            </Link>
            <Link href="/learning-simulators">
              <Button size="lg">Try Simulators</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
