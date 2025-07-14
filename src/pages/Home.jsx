import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold mb-4">Dynamic Advisors and Consultants</h1>
        <p className="text-xl mb-6 max-w-2xl">
          Empowering businesses through expert consulting, HR services, software development, and digital transformation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/signup" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Get Started
          </Link>
          <Link to="/login" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition">
            Client Login
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white" id="about">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg">
            At Dynamic Advisors and Consultants, we help clients navigate complex business challenges with confidence.
            Whether it's HR support, immigration form help, legal assistance, or software transformation, we’re here to assist.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-gray-100" id="services">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "HR Consulting",
              "Software & Web Development",
              "B2B Support",
              "Digital Transformation",
              "Microsoft 365 Training",
              "Immigration & Housing Forms",
            ].map((service, index) => (
              <div key={index} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{service}</h3>
                <p className="text-sm text-gray-600">Tailored, professional solutions to meet your needs.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Dynamic Advisors and Consultants. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
