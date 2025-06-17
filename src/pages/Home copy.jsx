import { useEffect, useState } from "react";
import PublicSidebar from "../Components/sidebar/PublicSidebar";
import { FaRocket, FaShoppingBag, FaTruck, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <FaShoppingBag className="text-4xl text-blue-500" />,
      title: "Browse Categories",
      description: "Choose from restaurants, groceries, and more.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <FaRocket className="text-4xl text-purple-500" />,
      title: "Place an Order",
      description: "Select your desired items and add to cart.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: <FaTruck className="text-4xl text-green-500" />,
      title: "Get It Delivered",
      description: "Fast delivery right at your doorstep.",
      color: "from-green-400 to-green-600",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: "😊" },
    { number: "500+", label: "Restaurants", icon: "🍽️" },
    { number: "50K+", label: "Orders Delivered", icon: "📦" },
    { number: "4.8", label: "Average Rating", icon: "⭐" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PublicSidebar />

      <div className="flex-1 overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 px-8 py-20">
            <div
              className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Delicious Food
                <span className="block text-yellow-300 animate-bounce-custom">
                  Delivered Fast! 🚀
                </span>
              </h1>
              <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
                Browse restaurants, grocery shops, electronics and more! Get
                your favorite meals delivered in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Order Now <FaArrowRight className="inline ml-2" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 text-6xl animate-bounce-custom opacity-20">
            🍕
          </div>
          <div className="absolute top-40 right-20 text-5xl animate-pulse opacity-20">
            🍔
          </div>
          <div className="absolute bottom-20 left-20 text-4xl animate-bounce opacity-20">
            🍜
          </div>
          <div className="absolute bottom-40 right-10 text-5xl animate-pulse opacity-20">
            🥗
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-6 rounded-2xl bg-gradient-to-br ${
                    features[index % 3]?.color || "from-gray-400 to-gray-600"
                  } text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-fadeInUp`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeInUp">
                How It Works ✨
              </h2>
              <p
                className="text-xl text-gray-600 animate-fadeInUp"
                style={{ animationDelay: "0.2s" }}
              >
                Simple steps to get your favorite food delivered
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group animate-fadeInUp hover-lift"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {index + 1}. {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Connection Line */}
                  {index < features.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-400 to-red-500 text-white">
          <div className="max-w-4xl mx-auto text-center px-8">
            <h2 className="text-4xl font-bold mb-6 animate-fadeInUp">
              Ready to Order? 🍽️
            </h2>
            <p
              className="text-xl mb-8 opacity-90 animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              Join thousands of satisfied customers and get your favorite food
              delivered now!
            </p>
            <button
              className="bg-white text-orange-500 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fadeInUp"
              style={{ animationDelay: "0.4s" }}
            >
              Start Ordering <FaRocket className="inline ml-2" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
