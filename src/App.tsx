import { StickyBar } from './components/landing/StickyBar';
import { BrandMasthead } from './components/shared/BrandMasthead';
import { HeroSection } from './components/landing/HeroSection';
import { OriginSection } from './components/landing/OriginSection';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { LivePreviewSection } from './components/landing/LivePreviewSection';
import { ValidationSection } from './components/landing/ValidationSection';
import { TrendSection } from './components/landing/TrendSection';
import { OfferSection } from './components/landing/OfferSection';
import { Footer } from './components/landing/Footer';

function App() {
  return (
    <>
      <StickyBar />
      <BrandMasthead />
      <HeroSection />
      <OriginSection />
      <HowItWorksSection />
      <LivePreviewSection />
      <ValidationSection />
      <TrendSection />
      <OfferSection />
      <Footer />
    </>
  );
}

export default App;
