// src/pages/Home.jsx
import React from "react";
import PublicSidebar from "../Components/sidebar/PublicSidebar";
import Topbar from "../Components/Topbar/Topbar";
 

const Home = () => {
  return (
    <div className="flex">
      <PublicSidebar />
      <div className="flex-1">
     

        {/* Welcome Section */}
        <section className="p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-lg mb-6">
            Browse restaurants, grocery shops, electronics and more!
          </p>

          {/* How It Works */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">1. Browse Categories</h3>
                <p>Choose from restaurants, groceries, and more.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">2. Place an Order</h3>
                <p>Select your desired items and add to cart.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">3. Get It Delivered</h3>
                <p>Fast delivery right at your doorstep.</p>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Home;
