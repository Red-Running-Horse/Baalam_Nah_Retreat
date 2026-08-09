
import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {
  return (
    <LanguageProvider>
      <Header />
      <HomePage />
      <Footer />
    </LanguageProvider>
  );
}

export default App;
