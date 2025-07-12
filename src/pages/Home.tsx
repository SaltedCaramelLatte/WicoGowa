// src/pages/Home.tsx
import HeroSection from '@/components/home/HeroSections';
import FacilitiesSection from '@/components/home/FacilitiesSection';
import MenuSection from '@/components/home/MenuSection';
import GallerySection from '@/components/home/GallerySection';

const Home = () => {
  return (
    <div>
      <div id="home">
        <HeroSection />
      </div>
      <div id="facility">
        <FacilitiesSection />
      </div>
      <div id="menu">
        <MenuSection />
      </div>
      <div id="gallery">
        <GallerySection />
      </div>
    </div>
  );
};

export default Home;
