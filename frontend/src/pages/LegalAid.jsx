
import React from 'react';
import { Scale, FileSearch, MessageSquare, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingHeader from '@/components/LandingHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const lawyers = [
  {
    name: "Priya Sharma",
    specialty: "Family Law",
    experience: "12 years",
    rating: 4.8,
    image: "/placeholder.svg"
  },
  {
    name: "Rajesh Kumar",
    specialty: "Criminal Law",
    experience: "15 years",
    rating: 4.9,
    image: "/placeholder.svg"
  },
  {
    name: "Ananya Patel",
    specialty: "Corporate Law",
    experience: "8 years",
    rating: 4.7,
    image: "/placeholder.svg"
  },
  {
    name: "Vikram Singh",
    specialty: "Constitutional Law",
    experience: "20 years",
    rating: 5.0,
    image: "/placeholder.svg"
  }
];

const LegalAid = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1A5F7A] mb-4">
            Legal Assistance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced legal professionals for personalized advice 
            and representation for your legal matters.
          </p>
        </div>
        
        {/* Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Scale,
              title: "Legal Consultation",
              description: "Schedule one-on-one consultations with qualified lawyers"
            },
            {
              icon: FileSearch,
              title: "Document Review",
              description: "Get your legal documents reviewed by professionals"
            },
            {
              icon: MessageSquare,
              title: "Legal Advice",
              description: "Receive guidance on various legal matters and questions"
            },
            {
              icon: Calendar,
              title: "Court Representation",
              description: "Find lawyers who can represent you in court proceedings"
            }
          ].map((service, index) => (
            <Card key={index} className="transition hover:shadow-lg">
              <CardHeader className="text-center pt-6">
                <div className="mx-auto bg-[#E5F5FB] p-3 rounded-full mb-4">
                  <service.icon className="h-8 w-8 text-[#1A5F7A]" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Pro Bono Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-[#1A5F7A] mb-2">Pro Bono Legal Services</h2>
              <p className="text-gray-600 mb-4 max-w-2xl">
                NyayaSetu partners with Nyaya Bandhu and other government initiatives to provide
                free legal assistance to eligible citizens. Check your eligibility and connect 
                with pro bono advocates.
              </p>
            </div>
            <Button className="bg-[#FF6B35] hover:bg-orange-600 text-white whitespace-nowrap">
              Check Eligibility
            </Button>
          </div>
        </div>
        
        {/* Featured Lawyers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1A5F7A] mb-8 text-center">
            Featured Legal Professionals
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lawyers.map((lawyer, index) => (
              <Card key={index} className="transition hover:shadow-lg">
                <CardHeader className="text-center pt-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={lawyer.image} alt={lawyer.name} />
                    <AvatarFallback>{lawyer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{lawyer.name}</CardTitle>
                  <CardDescription>{lawyer.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span>Experience:</span>
                    <span className="font-medium">{lawyer.experience}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-sm">
                    <span>Rating:</span>
                    <span className="font-medium">{lawyer.rating}/5.0</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Profile</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="border-[#1A5F7A] text-[#1A5F7A]">
              View All Legal Professionals
            </Button>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-[#1A5F7A] text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Legal Help?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Schedule a consultation with a legal professional today and take the first step
            towards resolving your legal concerns.
          </p>
          <Button className="bg-white text-[#1A5F7A] hover:bg-gray-100">
            Schedule Consultation
          </Button>
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

export default LegalAid;
