import { motion } from 'framer-motion';
import { Newspaper, Video, FileText } from 'lucide-react';

const Media = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-light mb-6">
              Media & <span className="text-gradient-gold">Press</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Latest news, press releases, and media resources
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="card text-center">
                <Newspaper className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-light mb-2">Press Releases</h3>
                <p className="text-gray-400">Coming soon</p>
              </div>
              <div className="card text-center">
                <Video className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-light mb-2">Videos</h3>
                <p className="text-gray-400">Coming soon</p>
              </div>
              <div className="card text-center">
                <FileText className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-light mb-2">Resources</h3>
                <p className="text-gray-400">Coming soon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Media;

