
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductOverview from './components/ProductOverview';
import FloatingIcons from './components/FloatingIcons';

import USP from './components/USP';

import APIOverview from './components/APIOverview';

import CodeExample from './components/CodeExample';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import { useState, useEffect } from 'react';

function Landing({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <Hero />
      <ProductOverview />

      <USP />

      <APIOverview />

      <CodeExample />
      <Pricing />
      <Footer />
    </>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <div className={`relative min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-950 dark:via-black dark:to-gray-900 transition-colors duration-300`}>
        <FloatingIcons />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Landing isDark={isDark} toggleTheme={toggleTheme} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
