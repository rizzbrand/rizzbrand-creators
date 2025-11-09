// src/components/Marquee.tsx
import React from 'react';
import Marquee from '../ui/marquee'; // Ensure this package is installed
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import Image from 'next/image';

const MarqueeSection = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-white text-3xl mb-6">Creators We Work With</h2>
        <Marquee>
          <div className="flex space-x-10">
        
            <div className="relative w-80">
              <img src="/images/kwame.jpg" alt="Kwame Eugene" className="w-full h-80 rounded-lg object-cover" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center w-full opacity-90">
                <p className="font-semibold text-2xl">Kuami Eugene</p>
                <div className="flex justify-center space-x-3 text-sm">
                  <span>2.1M</span>
                  <span>228k</span>
                  <span>1.5M</span>
                </div>
                <div className="flex justify-center mt-2 space-x-6 opacity-80">
                  <a href="https://www.instagram.com/kuamieugene/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-8 h-8 text-white" />
                  </a>
                  <a href="https://www.youtube.com/@KuamiEugeneOfficial" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="w-8 h-8 text-white" />
                  </a>
                  <a href="https://www.tiktok.com/@kuamieugenerockstar" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="w-8 h-8 text-white" />
                  </a>
                </div>
              </div>
            </div>

 
            <div className="relative w-80">
              <Image src="/images/regina.jpg" alt="regina quaye" width={500} height={500} className="w-full h-80 rounded-lg object-cover" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center w-full opacity-90">
                <p className="font-semibold text-2xl">Amorkor Quaye </p>
                <div className="flex justify-center space-x-3 text-sm">
                  <span>18K</span>
                  <span>436</span>
                  <span>109k</span>
                </div>
                <div className="flex justify-center mt-2 space-x-6 opacity-80">
                  <a href="https://www.instagram.com/regina_quaye_/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-8 h-8 text-white" />
                  </a>
                  <a href="https://www.youtube.com/@amorkorquaye" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="w-8 h-8 text-white" />
                  </a>
                  <a href="https://www.tiktok.com/@amorkorquaye" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="w-8 h-8 text-white" />
                  </a>
                </div>
              </div>
            </div>

            
            <div className="relative w-80">
              <Image src="/images/ekay.jpg" alt="Ekay gabriel" width={500} height={500} className="w-full h-80 rounded-lg object-cover" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center w-full opacity-90">
                <p className="font-semibold text-2xl">Ekay Gabriel</p>
                <div className="flex justify-center space-x-3 text-sm">
                  <span>14k</span>
                  {/* <span>3.2M</span> */}
                  <span>1.19k</span>
                </div>
                <div className="flex justify-center mt-2 space-x-6 opacity-80">
                  <a href="https://www.instagram.com/ekayy.y/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-8 h-8 text-white" />
                  </a>
                  {/* <a href="https://www.youtube.com/channel/UC54321" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="w-8 h-8 text-white" />
                  </a> */}
                  <a href="https://www.tiktok.com/@ekay.y/" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="w-8 h-8 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Card for Iman Gadzhi */}
            {/* <div className="relative w-80">
              <Image src="/images/creator4.jpg" alt="Iman Gadzhi" className="w-full h-80 rounded-lg object-cover" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center w-full opacity-90">
                <p className="font-semibold text-2xl">Iman Gadzhi</p>
                <div className="flex justify-center space-x-3 text-sm">
                  <span>2M</span>
                  <span>5.4M</span>
                  <span>3.7M</span>
                </div>
                <div className="flex justify-center mt-2 space-x-6 opacity-80">
                  <a href="https://www.instagram.com/imangadzhi" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-8 h-8 text-white" />
                  </a>
                  <a href="https://www.youtube.com/channel/UC99999" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="w-8 h-8 text-white" />
                  </a>
                  <a href="https://www.tiktok.com/@imangadzhi" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="w-8 h-8 text-white" />
                  </a>
                </div>
              </div>
            </div> */}

            {/* Profile Card for Wendys */}
            {/* <div className="relative w-80">
              <Image src="/images/creator5.jpg" alt="Wendys" className="w-full h-80 rounded-lg object-cover" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center w-full opacity-90">
                <p className="font-semibold text-2xl">Wendys</p>
                <div className="flex justify-center space-x-3 text-sm">
                  <span>663K</span>
                  <span>3.4M</span>
                </div>
                <div className="flex justify-center mt-2 space-x-6 opacity-80">
                  <a href="https://www.instagram.com/wendys" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-8 h-8 text-white" />
                  </a>
                  <a href="https://www.youtube.com/channel/UC44444" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="w-8 h-8 text-white" />
                  </a>
                  <a href="https://www.tiktok.com/@wendys" target="_blank" rel="noopener noreferrer">
                    <FaTiktok className="w-8 h-8 text-white" />
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeSection;
