import ResourceCard from "@/components/cards/ResourceCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        "Compare the benefits and drawbacks of debt consolidation and current payments to determine which is best for your financial situation.",
      link: "/financial-decision-tools/debt-consolidation-vs-current",
    },
    {
      title: "Pay Off Debt vs Investing",
      description:
        "Compare the benefits of paying off debt versus investing extra money to determine which strategy is best for your financial goals.",
      link: "/financial-decision-tools/payoff-debt-vs-investing",
    },
    {
      title: "Investing vs Saving",
      description:
        "Compare the benefits and drawbacks of investing versus saving to determine which strategy is best for your financial goals.",
      link: "/financial-decision-tools/investing-vs-saving",
    },
    {
      title: "Credit Card vs Personal Loan",
      description:
        "Compare the costs and benefits of using a credit card versus taking out a personal loan for major purchases or debt consolidation.",
      link: "/financial-decision-tools/credit-card-vs-personal-loan",
    },
    {
      title: "Credit Card vs HELOC",
      description:
        "Compare the costs and benefits of using a credit card versus a home equity line of credit (HELOC) for financing needs.",
      link: "/financial-decision-tools/credit-card-vs-heloc",
    },
    {
      title: "Credit Card Balance Transfer vs Paying Down Existing Cards",
      description:
        "Compare the benefits of transferring credit card balances versus paying down existing cards to determine the best debt strategy.",
      link: "/financial-decision-tools/credit-card-balance-transfer-vs-paying-down-existing-cards",
    },
    {
      title: "New vs Used vs Leasing Car",
      description:
        "Compare the total cost of ownership for buying new, buying used, or leasing a vehicle to make the best automotive decision.",
      link: "/financial-decision-tools/new-vs-used-vs-leasing-car",
    },
    {
      title: "Public vs Private College",
      description:
        "Compare the costs and benefits of attending public versus private colleges to determine the best educational investment.",
      link: "/financial-decision-tools/public-vs-private-college",
    },
    {
      title: "Freelance vs Full-Time Income",
      description:
        "Compare the financial benefits and drawbacks of freelance work versus full-time employment to determine the best career path.",
      link: "/financial-decision-tools/freelance-vs-fulltime-income",
    },
    {
      title: "Transportation Cost Comparison",
      description:
        "Compare the costs of buying a car, using rideshare services, carpooling, and public transportation to find the most economical option.",
      link: "/financial-decision-tools/buying-vs-uber-vs-carpooling-vs-public-transportation",
    },
  ];

  return (
    <div className="mx-auto pb-24 lg:pb-32 pt-6 sm:pt-12 lg:pt-16 w-10/12 md:w-11/12">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-4 font-bold text-3xl text-transparent md:text-5xl">
          Financial Decision Tools
        </h1>
        <h5 className="mb-6 font-semibold text-gray-700 text-xl md:text-2xl">
          Empowering Your Financial Journey
        </h5>
        <p className="mx-auto max-w-4xl leading-relaxed text-gray-600 text-lg">
          Welcome to our Financial Decision Tools! Here, you will find a
          comprehensive collection of resources and tools designed to help you
          make informed financial decisions. Whether you're looking to budget,
          save, invest, or plan for retirement, we have the tools you need to
          take control of your financial future. Our tools are user-friendly and
          designed to provide you with accurate and reliable information.
        </p>
      </div>
      <section>
        <ResourceCard
          title="Credit Card Balance Transfer vs Paying Down Existing Cards"
          description="Compare the benefits and drawbacks of balance transfers and paydowns to determine which is best for your debt management strategy."
          link="/financial-decision-tools/credit-card-balance-transfer-vs-paying-down-existing-cards"
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

      {/* Tools Grid */}
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <Card
            key={index}
            className="hover:shadow-lg duration-300 transition-shadow"
          >
            <CardHeader>
              <CardTitle className="font-semibold text-gray-800 text-lg line-clamp-2">
                {tool.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-gray-600 line-clamp-3">
                {tool.description}
              </CardDescription>
              <Link href={tool.link}>
                <Button className="w-full">Explore Tool</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 border border-gray-200 rounded-lg">
          <h3 className="mb-4 font-bold text-2xl text-gray-800">
            Ready to Make Informed Financial Decisions?
          </h3>
          <p className="mb-6 mx-auto max-w-2xl text-gray-600">
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
