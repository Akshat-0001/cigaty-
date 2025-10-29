import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/common/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Platform from './pages/Platform';
import Media from './pages/Media';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ApplicationReceived from './pages/ApplicationReceived';
import Dashboard from './pages/Dashboard';
import Toast from './components/ui/Toast';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Routes without Layout (auth pages) */}
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/application-received" element={<PageWrapper><ApplicationReceived /></PageWrapper>} />

        {/* Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/platform" element={<PageWrapper><Platform /></PageWrapper>} />
          <Route path="/media" element={<PageWrapper><Media /></PageWrapper>} />
          <Route path="/faqs" element={<PageWrapper><FAQs /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toast />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
