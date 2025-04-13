import React from 'react';
import { CheckCircle, Users, BarChart, Award } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1A5F7A] mb-4">
            About NyayaSetu
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between citizens and government services through 
            transparency, efficiency, and accessibility.
          </p>
        </div>
        
        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#1A5F7A] mb-4">Our Mission</h2>
            <p className="text-gray-600">
              NyayaSetu aims to simplify citizen engagement with government services by 
              providing a transparent, efficient platform for complaint management and 
              legal assistance. We strive to ensure every citizen's voice is heard and 
              their issues are addressed promptly.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#1A5F7A] mb-4">Our Vision</h2>
            <p className="text-gray-600">
              We envision a future where the gap between citizens and government services 
              is bridged through technology, making governance more responsive, accountable, 
              and citizen-centric. NyayaSetu aspires to be the primary platform connecting 
              people with public services across India.
            </p>
          </div>
        </div>
        
        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A5F7A] mb-8 text-center">
            What Makes Us Different
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Easy Complaint Management",
                description: "Submit and track government service complaints with just a few clicks."
              },
              {
                icon: Users,
                title: "Legal Professional Network",
                description: "Connect with qualified legal experts for personalized assistance."
              },
              {
                icon: BarChart,
                title: "Transparent Tracking",
                description: "Monitor the status of your complaints in real-time with complete transparency."
              },
              {
                icon: Award,
                title: "Government Backed",
                description: "Supported by government initiatives to ensure accountability and resolution."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex justify-center mb-4">
                  <feature.icon 
                    size={48} 
                    className="text-[#1A5F7A] opacity-80" 
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-center text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Our Journey */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A5F7A] mb-8 text-center">
            Our Journey
          </h2>
          
          <div className="relative border-l-2 border-[#1A5F7A] ml-4 md:ml-0 md:mx-auto md:max-w-3xl pl-8 py-4 space-y-12">
            {[
              {
                year: "2023",
                title: "Inception of the Idea",
                description: "NyayaSetu was conceptualized as a solution to bridge the gap between citizens and government services."
              },
              {
                year: "2024",
                title: "Platform Development",
                description: "The development of the platform began with a focus on creating a user-friendly interface for complaint management."
              },
              {
                year: "2025",
                title: "Official Launch",
                description: "NyayaSetu was officially launched with core features including complaint submission and legal assistance."
              },
              {
                year: "Future",
                title: "Expansion & Innovation",
                description: "Plans for expanding services and incorporating advanced technologies to enhance user experience."
              }
            ].map((milestone, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[41px] md:-left-[13px] h-6 w-6 rounded-full bg-[#1A5F7A]"></div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-[#FF6B35] mb-1">{milestone.year}</h3>
                  <h4 className="text-xl font-semibold text-[#1A5F7A] mb-2">{milestone.title}</h4>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A5F7A] mb-8 text-center">
            Our Leadership Team
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Arjun Mehta",
                position: "Chief Executive Officer",
                bio: "Former civil servant with over 15 years of experience in governance and public policy."
              },
              {
                name: "Neha Kapoor",
                position: "Chief Technology Officer",
                bio: "Technology leader with expertise in building secure, scalable digital platforms for government services."
              },
              {
                name: "Sameer Verma",
                position: "Legal Affairs Director",
                bio: "Seasoned lawyer specializing in administrative law and citizen rights with 20+ years of experience."
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-gray-200"></div>
                <h3 className="text-xl font-semibold text-[#1A5F7A]">{member.name}</h3>
                <p className="text-[#FF6B35] mb-2">{member.position}</p>
                <Separator className="my-3" />
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Partners Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-[#1A5F7A] mb-8">Our Partners</h2>
          
          <div className="flex flex-wrap justify-center gap-12">
            {[1, 2, 3, 4, 5].map((partner) => (
              <div key={partner} className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Partner Logo</span>
              </div>
            ))}
          </div>
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

export default About;
