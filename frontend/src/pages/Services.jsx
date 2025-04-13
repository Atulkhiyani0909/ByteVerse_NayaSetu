
import React from 'react';
import { FileText, Scale, HelpCircle, ShieldCheck, FileCheck, FileBarChart, Lock, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingHeader from '@/components/LandingHeader';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: FileText,
    title: "Complaint Management",
    description: "Submit and track complaints related to government services.",
    link: "/complaint"
  },
  {
    icon: Scale,
    title: "Legal Assistance",
    description: "Connect with legal professionals for personalized advice.",
    link: "/legal-aid"
  },
  {
    icon: HelpCircle,
    title: "Support Chatbot",
    description: "AI-powered assistance for quick resolutions to your queries.",
    link: "/support"
  },
  {
    icon: ShieldCheck,
    title: "Documentation Verification",
    description: "Verify the authenticity of government-issued documents.",
    link: "/verify"
  },
  {
    icon: FileCheck,
    title: "Certificate Applications",
    description: "Apply for various certificates and licenses online.",
    link: "/apply"
  },
  {
    icon: FileBarChart,
    title: "Public Information",
    description: "Access important government notices and information.",
    link: "/information"
  },
  {
    icon: Lock,
    title: "Identity Services",
    description: "Manage your digital identity and verification documents.",
    link: "/identity"
  },
  {
    icon: Building,
    title: "Local Governance",
    description: "Engage with your local government bodies and initiatives.",
    link: "/local-gov"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1A5F7A] mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            NyayaSetu offers a comprehensive range of government and legal services 
            designed to make citizen engagement simple and efficient.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col h-full"
            >
              <div className="flex justify-center mb-4">
                <service.icon 
                  size={48} 
                  className="text-[#1A5F7A] opacity-80" 
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {service.title}
              </h3>
              <p className="text-center text-gray-600 mb-4 flex-grow">
                {service.description}
              </p>
              <div className="mt-auto flex justify-center">
                <Link to={service.link}>
                  <Button variant="outline" className="border-[#1A5F7A] text-[#1A5F7A] hover:bg-[#1A5F7A] hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-[#1A5F7A] text-white py-8">
        <div className="container mx-auto text-center">
          <p>© 2025 NyayaSetu. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;
