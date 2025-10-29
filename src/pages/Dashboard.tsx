import { motion } from 'framer-motion';
import { BarChart3, Package, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-12">
              Dashboard <span className="text-gradient-gold">(Coming Soon)</span>
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card text-center">
                <BarChart3 className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-light mb-1">$0</h3>
                <p className="text-gray-400">Total Sales</p>
              </div>
              <div className="card text-center">
                <Package className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-light mb-1">0</h3>
                <p className="text-gray-400">Products</p>
              </div>
              <div className="card text-center">
                <Users className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-light mb-1">0</h3>
                <p className="text-gray-400">Partners</p>
              </div>
              <div className="card text-center">
                <TrendingUp className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-light mb-1">0%</h3>
                <p className="text-gray-400">Growth</p>
              </div>
            </div>

            <div className="mt-12 card">
              <p className="text-center text-gray-400">
                Your dashboard will NOT BE  available AT ANY TIME SOON, SO PLEASE FUCK YOURSELF once your account is approved.
                <br />
                You'll be able to manage products, view analytics, and connect with partners.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

