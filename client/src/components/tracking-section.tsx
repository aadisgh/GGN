import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const trackingSchema = z.object({
  trackingNumber: z.string().min(1, "Please enter a tracking number"),
});

type TrackingData = {
  trackingNumber: string;
  status: string;
  location: string;
  lastUpdate: string;
  timeline: Array<{
    status: string;
    location: string;
    time: string;
    completed: boolean;
  }>;
};

export default function TrackingSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof trackingSchema>>({
    resolver: zodResolver(trackingSchema),
    defaultValues: {
      trackingNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof trackingSchema>) => {
    setIsLoading(true);
    setTrackingData(null);

    try {
      const response = await fetch(`/api/track/${data.trackingNumber}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          toast({
            title: "Tracking number not found",
            description: "Please check your tracking number and try again.",
            variant: "destructive",
          });
        } else {
          throw new Error("Failed to fetch tracking data");
        }
        return;
      }

      const result = await response.json();
      setTrackingData(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tracking information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="tracking" className="py-20 bg-gray-100 relative">
      {/* Background image */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Courier packages with shipping labels" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Track Your Shipment</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter your tracking number to get real-time updates on your package location and delivery status
          </p>
        </motion.div>
        
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="trackingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Tracking Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your tracking number (e.g., UOC123456789)" 
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Tracking...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-search"></i>
                      <span>Track Package</span>
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          {/* Tracking Results */}
          {trackingData && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Tracking Details</h3>
                
                <div className="space-y-6">
                  {/* Package Info */}
                  <div className="border-b border-gray-200 pb-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-semibold text-gray-700">Tracking Number:</span>
                        <span className="ml-2 text-gray-600">{trackingData.trackingNumber}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Status:</span>
                        <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {trackingData.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Shipment Timeline</h4>
                    <div className="space-y-4">
                      {trackingData.timeline.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className={`w-4 h-4 rounded-full ${item.completed ? 'bg-blue-500' : 'bg-gray-300'} border-2 border-white shadow`}></div>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800">{item.status}</h5>
                            <p className="text-gray-600 text-sm">{item.location}</p>
                            <p className="text-gray-500 text-xs">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
