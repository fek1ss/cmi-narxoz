import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Directions from "./components/Directions";
import Model from "./components/Model";
import Value from "./components/Value";
import Team from "./components/Team";
import Pilot from "./components/Pilot";
import Request from "./components/Request";
import Footer from "./components/Footer";
import { Toaster } from "./components/Sonner";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <main>
      <Hero />
      <About />
      <Directions />
      <Model />
      <Value />
      <Team />
      <Pilot />
      <Request />
    </main>
    <Footer />
  </div>
);

const App = () => (
  <>
    <Toaster />
    <Index />
  </>
);

export default App;
