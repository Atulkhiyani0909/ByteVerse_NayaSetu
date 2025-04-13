
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Scale, 
  HelpCircle, 
  ShieldCheck,
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: FileText,
    title: "Complaint Management",
    description: "Submit and track government service complaints easily.",
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
    description: "AI-powered assistance for quick resolutions.",
    link: "/complaint"  // Changed from /support to /complaint since support page doesn't exist yet
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    description: "Robust security and complete transparency in service delivery.",
    link: "/services"
  }
];

const LandingFeatures = () => {
  return (
    <div className="grid md:grid-cols-4 gap-6 mt-16">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col h-full"
        >
          <div className="flex justify-center mb-4">
            <feature.icon 
              size={48} 
              className="text-[#1A5F7A] opacity-80" 
            />
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">
            {feature.title}
          </h3>
          <p className="text-center text-gray-600 mb-4 flex-grow">
            {feature.description}
          </p>
          <div className="mt-auto text-center">
            <Link to={feature.link}>
              <Button variant="ghost" className="text-[#1A5F7A] hover:text-[#FF6B35] p-0">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingFeatures;
