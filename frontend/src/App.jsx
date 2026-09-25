import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Detection } from './pages/Detection';
import { Results } from './pages/Results';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PredictionProvider } from './context/PredictionContext';

export default function App() {
  return (
    <PredictionProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#f8faf8]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detection" element={<Detection />} />
              <Route path="/results" element={<Results />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </PredictionProvider>
  );
}