
import React, { useState } from 'react';
import { FileText, Upload, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingHeader from '@/components/LandingHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const categories = [
  "Municipal Services",
  "Public Infrastructure",
  "Healthcare",
  "Education",
  "Transportation",
  "Public Utilities",
  "Law Enforcement",
  "Other"
];

const Complaint = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  
  const handleNextStep = () => {
    setStep(step + 1);
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Complaint submitted successfully! Your reference number is #NTC-23589.");
    // In a real implementation, this would send the data to a backend
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <LandingHeader />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#1A5F7A]">Submit a Complaint</h1>
            <p className="text-lg text-gray-600 mt-2">
              Tell us about your issue with government services
            </p>
          </div>
          
          {/* Progress steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber ? 'bg-[#1A5F7A] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {stepNumber === 1 ? 'Category' : stepNumber === 2 ? 'Details' : 'Review'}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Category Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-[#1A5F7A]">Select Complaint Category</h2>
                  <RadioGroup
                    value={category}
                    onValueChange={setCategory}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categories.map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                          <RadioGroupItem value={cat} id={cat} />
                          <Label htmlFor={cat}>{cat}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={handleNextStep}
                      className="bg-[#1A5F7A] text-white"
                      disabled={!category}
                    >
                      Next <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Complaint Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-[#1A5F7A]">Complaint Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Brief description of the issue" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Detailed Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Please provide as many details as possible..."
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location of Issue</Label>
                      <Input id="location" placeholder="Address or location where the issue occurred" required />
                    </div>
                    
                    <div>
                      <Label className="block mb-2">Upload Evidence (Optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Drag and drop files here, or click to select files
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          (Max file size: 10MB. Supported formats: JPG, PNG, PDF)
                        </p>
                        <Input 
                          id="file-upload" 
                          type="file" 
                          className="hidden" 
                          accept="image/jpeg,image/png,application/pdf"
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          className="mt-4"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          Select File
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleNextStep}
                      className="bg-[#1A5F7A] text-white"
                    >
                      Next <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Review and Submit */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-[#1A5F7A]">Review and Submit</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-medium text-gray-700">Category</h3>
                      <p>{category}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-medium text-gray-700">Contact Information</h3>
                      <p className="text-sm text-gray-600">
                        Your complaint will be associated with your account details
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-medium text-gray-700">Next Steps</h3>
                      <p className="text-sm text-gray-600">
                        After submission, you'll receive a confirmation email with your complaint reference number.
                        You can track the status of your complaint through your dashboard.
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <input 
                        type="checkbox" 
                        id="confirm" 
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1A5F7A] focus:ring-[#1A5F7A]" 
                        required
                      />
                      <label htmlFor="confirm" className="ml-2 text-sm text-gray-600">
                        I confirm that all information provided is accurate and true to the best of my knowledge.
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#FF6B35] hover:bg-orange-600 text-white"
                    >
                      Submit Complaint
                    </Button>
                  </div>
                </div>
              )}
            </form>
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

export default Complaint;
