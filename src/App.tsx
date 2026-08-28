import { Architecture, PullQuote } from "./components/Architecture";
import { Hero, Nav } from "./components/Hero";
import { Cli, Deploy, Faq, Footer, SecurityBand } from "./components/Interactive";
import { Pipeline, Problem, Spec, Ticker } from "./components/Sections";

export default function App() {
  return (
    <div className="min-h-screen text-ink">
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Architecture />
        <PullQuote />
        <Pipeline />
        <Spec />
        <Cli />
        <SecurityBand />
        <Deploy />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
