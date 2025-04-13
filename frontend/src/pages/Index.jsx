
import React from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from '@/components/LandingHeader';
import LandingFeatures from '@/components/LandingFeatures';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A5F7A] mb-6">
            NyayaSetu: Your Gateway to Government Services
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Bridging citizens and government services through a transparent, 
            efficient complaint management and legal assistance platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <Link 
              to="/register" 
              className="bg-[#FF6B35] text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition inline-block"
            >
              Register Now
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-[#1A5F7A] text-[#1A5F7A] px-8 py-3 rounded-lg hover:bg-blue-50 transition inline-block"
            >
              Login
            </Link>
          </div>

          <LandingFeatures />
          
          {/* Testimonials Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-[#1A5F7A] mb-12">
              What Our Users Say
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "NyayaSetu helped me resolve my municipal complaint within a week. The tracking system kept me informed throughout the process.",
                  author: "Ravi Desai, Delhi"
                },
                {
                  quote: "The legal assistance feature connected me with a fantastic lawyer who helped me understand my rights and options clearly.",
                  author: "Anita Sharma, Mumbai"
                },
                {
                  quote: "As a senior citizen, I found NyayaSetu incredibly easy to use. The support team was very helpful whenever I needed assistance.",
                  author: "Prakash Iyer, Bangalore"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <p className="font-medium text-[#1A5F7A]">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-24 bg-[#1A5F7A] text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of citizens who have simplified their interaction with government services through NyayaSetu.
            </p>
            <Link to="/register">
              <Button className="bg-[#FF6B35] hover:bg-orange-600 text-white px-8 py-6 text-lg">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-[#1A5F7A] text-white py-8 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">NyayaSetu</h3>
              <p className="text-sm text-gray-300">
                Bridging citizens and government services through transparency and efficiency.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { label: "Home", path: "/" },
                  { label: "Services", path: "/services" },
                  { label: "Complaint", path: "/complaint" },
                  { label: "Legal Aid", path: "/legal-aid" },
                  { label: "About", path: "/about" }
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-300 hover:text-white transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>info@nyayasetu.gov.in</li>
                <li>+91 1800-XXX-XXXX</li>
                <li>New Delhi, India</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <a href="#" key={social} className="text-gray-300 hover:text-white">
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center">
            <p>© 2025 NyayaSetu. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
