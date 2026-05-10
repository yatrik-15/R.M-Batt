import { Routes, Route } from 'react-router-dom';
import { useScrollReveal } from './hooks/useScrollReveal';
import Navbar from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PortfolioDetail from './pages/PortfolioDetail.tsx';
import { ScrollProgress } from './components/PremiumEffects';

function HomePage() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <Hero />
      <Portfolio />
      <Services />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="font-sans selection:bg-terracotta-500 selection:text-white">
      {/* Premium Scroll Progress Bar */}
      <ScrollProgress />

      {/* Noise Texture Overlay */}
      <div className="noise-overlay"></div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio/:projectId" element={<PortfolioDetail />} />
      </Routes>
    </div>
  );
}

export default App;
