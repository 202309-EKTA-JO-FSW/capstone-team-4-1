import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MenuSection from './MenuSection';
import TestimonialsSection from './TestimonialsSection';

const AboutPage = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Wow, it was very wonderful to deal with them. They really appreciate the customer and strive for his satisfaction",
      author: "Mohammad Amayreh"
    },
    {
      id: 2,
      quote: "I liked their menu. They offer a very unique selection of dishes. I think they just gained a new customer.",
      author: "Dana"
    },
    {
      id: 3,
      quote: "I believe that the speed of delivery of the order reflects the extent of their credibility in dealing. I will make all my friends deal with them.",
      author: "Omar"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Our Restaurant</h1>
          <p className="text-lg text-center text-gray-700">Discover the Taste, Order Now!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img src="/restaurant-image.jpg" alt="Restaurant" className="rounded-lg shadow-lg" />
          </div>
          <div className="text-lg">
            <p className="mb-6">In a competitive world where trust is paramount, we distinguish ourselves by prioritizing sincerity and loyalty in serving our customers. We deeply understand our customers' love for food and recognize the significance of timely service and excellence. Our commitment is reflected in our extensive menu, offering a wide array of dishes to cater to diverse tastes and preferences. By prioritizing customer satisfaction and delivering the best service possible, we strive to exceed expectations and foster lasting relationships with our valued patrons.</p>
            <p className="mb-6">Explore our menu and place your order now to experience the exceptional taste and service that we offer.</p>
            <div className="text-center">
              <a href="/menu" className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600">View Menu</a>
            </div>
          </div>
        </div>
        <TestimonialsSection testimonials={testimonials} />
        <MenuSection />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
