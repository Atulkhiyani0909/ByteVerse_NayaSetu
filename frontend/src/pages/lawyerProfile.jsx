import { Star, MapPin, Phone, Clock, Users, Award, BadgeCheck, Mail, Calendar, Globe2, MessageSquare, Camera, Share2, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LawyerProfile = () => {
  const { id } = useParams();
  
  
        const language=["English", "Hindi"]
  

  const [lawyer, setLawyer] = useState([]);

  useEffect(() => {
    const getLawyers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/lawyer/profile/${id}`);
        setLawyer(response.data);
        
      } catch (error) {
        console.error('Error fetching lawyer Data:', error);
      }
    };

    getLawyers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-[#1A5F7A] to-[#2A8BAE] overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-24">
        <div className="relative">
          {/* Profile Header Card */}
          <Card className="mb-6 p-6">
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="relative mb-4">
                <img
                  src={lawyer.image}
                  alt={lawyer.Name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>

              {/* Name and Title */}
              <h1 className="text-2xl font-bold text-gray-900">{lawyer.Name}</h1>
              <p className="mt-1 text-gray-600">{lawyer.speciality}</p>

              {/* Stats */}
              <div className="flex justify-center gap-8 mt-4 py-3 border-y border-gray-100 w-full">
                <div className="text-center">
                  <div className="font-bold text-gray-900">{lawyer.totalConnects}</div>
                  <div className="text-sm text-gray-500">Clients</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 w-full">
                <Button className="flex-1 bg-[#1A5F7A] hover:bg-[#164d63]">
                  <Phone className="w-4 h-4 mr-2" /><a href={`tel:+91 ${lawyer.phoneNumber}`}>Call Now</a>
                </Button>
              </div>
            </div>
          </Card>

          {/* Info Cards */}
          <div className="space-y-6">
            {/* Rating and Location Card */}
            <Card className="p-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-full">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-2 font-semibold">{lawyer.ratings} Rating</span>
                </div>
                <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                  <MapPin className="h-5 w-5 text-[#1A5F7A]" />
                  <span className="ml-2">{lawyer.location?.city}, {lawyer.location?.state}</span>
                </div>
                <div className="flex items-center bg-green-50 px-4 py-2 rounded-full">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="ml-2">{lawyer.experience} Years</span>
                </div>
              </div>
              <div className="flex items-center bg-green-50 px-4 py-2 rounded-full">
                  <IndianRupee className="h-5 w-5 text-green-600" />
                  <span className="ml-2">{lawyer.call_fees} /min</span>
                </div>
            </Card>

            {/* Languages Card */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {language.map((lang) => (
                  <span
                    key={lang}
                    className="px-4 py-2 rounded-full bg-[#1A5F7A]/10 text-[#1A5F7A] font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;