import ResourceCard from "@/components/cards/ResourceCard";

export default function LearningSimulatorPage() {
  return (
    <div className="mx-auto pt-6 sm:pt-12 lg:pt-16 pb-24 lg:pb-32 w-10/12 md:w-11/12">
      <h1>Learning Simulators</h1>
      <h5>Explore our collection of learning simulators</h5>
      <p>
        Our learning simulators are designed to help you practice and improve
        your skills in various areas of finance and investing. Whether you're a
        beginner or an experienced investor, our simulators provide a risk-free
        environment to learn and experiment with different strategies. Explore
        our collection of simulators below and start your learning journey
        today!
      </p>
      <p className="mt-4">
        Our simulators are designed to be user-friendly and intuitive, making it
        easy for you to navigate and use them effectively. Each simulator comes
        with detailed instructions and tips to help you get started. You can
        practice at your own pace and revisit the simulators as often as you
        like. Whether you're looking to improve your trading skills, learn about
        investment strategies, or understand complex financial concepts, our
        simulators provide a valuable resource for your learning journey.
      </p>

      <section className="gap-4 grid lg:grid-cols-2 mt-2 md:mt-6 xl:mt-8">
        <ResourceCard
          title="Stock Market Simulator"
          description="This simulator allows you to practice trading stocks in a risk-free environment. You can buy and sell stocks, track your portfolio, and learn about the stock market without any financial risk."
          link="/learning-simulators/stock-market-simulator"
        />
        <ResourceCard
          title="Crypto Market Simulator"
          description="This simulator allows you to practice trading cryptocurrencies in a risk-free environment. You can buy and sell cryptocurrencies, track your portfolio, and learn about the crypto market without any financial risk."
          link="/learning-simulators/crypto-trading-simulator"
        />
        <ResourceCard
          title="Real Estate Simulator"
          description="This simulator allows you to practice buying and selling real estate properties in a risk-free environment. You can explore different investment strategies, analyze property values, and learn about the real estate market without any financial risk."
          link="/learning-simulators/real-estate-simulator"
        />
        <ResourceCard
          title="Compound Interest Simulator"
          description="This simulator allows you to practice calculating compound interest in a risk-free environment. You can explore different investment scenarios, track your savings growth, and learn about the power of compound interest without any financial risk."
          link="/learning-simulators/compound-interest-visualizer"
        />
      </section>
    </div>
  );
}
