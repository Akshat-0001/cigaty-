import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import CursorBottle from '../effects/CursorBottle';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Cursor-following bottle */}
      <CursorBottle />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-grow"
      >
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  );
};

export default Layout;

