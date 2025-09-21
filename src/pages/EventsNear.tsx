import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  IconArrowLeft, 
  IconMapPin, 
  IconCalendar,
  IconClock,
  IconSearch,
  IconHome,
  IconBookmark,
  IconUser,
  IconShoppingCart
} from '@tabler/icons-react';

const EventsNear = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [events] = useState([
    {
      id: 1,
      title: "FARMERS MARKET",
      description: "Organic produce and handmade crafts",
      location: "National Zoological Park, Sundar Nagar, New Delhi, Delhi 110013",
      date: "SUNDAY, 19 MARCH, 2023",
      time: "9:00 AM - 1:00 PM",
      coordinates: [77.2410, 28.6139],
      category: "market"
    },
    {
      id: 2,
      title: "TEXTILE EXHIBITION",
      description: "Traditional Indian textiles showcase",
      location: "Jangpath, Connaught Place, New Delhi, Delhi 110001",
      date: "SUNDAY, 19 MARCH, 2023", 
      time: "8:00 AM - 5:00 PM",
      coordinates: [77.2167, 28.6315],
      category: "exhibition"
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // Simple map simulation since we need Mapbox token
  useEffect(() => {
    if (mapContainer.current) {
      // Create a simple map placeholder
      const mapDiv = mapContainer.current;
      mapDiv.innerHTML = `
        <div class="w-full h-full bg-gray-800 relative overflow-hidden rounded-lg">
          <div class="absolute inset-0 opacity-20">
            <div class="grid grid-cols-8 h-full">
              ${Array(64).fill(0).map((_, i) => `
                <div class="border border-gray-600 ${i % 3 === 0 ? 'bg-gray-700' : ''}"></div>
              `).join('')}
            </div>
          </div>
          <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
            <div class="text-xs text-white bg-black/50 px-2 py-1 rounded mt-1 whitespace-nowrap">Farmers Market</div>
          </div>
          <div class="absolute top-1/2 right-1/3 transform translate-x-1/2 -translate-y-1/2">
            <div class="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
            <div class="text-xs text-white bg-black/50 px-2 py-1 rounded mt-1 whitespace-nowrap">Textile Exhibition</div>
          </div>
          <div class="absolute bottom-4 left-4 text-white text-xs bg-black/50 px-2 py-1 rounded">
            📍 D-2 Vasant Kunj, New Delhi
          </div>
        </div>
      `;
    }
  }, []);

  const todayEvents = events.filter(event => event.date.includes("19 MARCH"));
  const tomorrowEvents = events.filter(event => !event.date.includes("19 MARCH"));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12 bg-black/50">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/discover')}
          className="text-white hover:bg-white/20"
        >
          <IconArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="p-2 text-white">
            <IconSearch className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Title */}
      <div className="px-4 mb-4">
        <h1 className="text-2xl font-bold">Events near you</h1>
        <p className="text-gray-400 text-sm">Exhibitions, Pop-up Stores, and Markets around you.</p>
      </div>

      {/* Map Section */}
      <div className="px-4 mb-6">
        <div className="h-64 rounded-lg overflow-hidden">
          <div ref={mapContainer} className="w-full h-full"></div>
        </div>
      </div>

      {/* Current Location */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <IconMapPin className="h-4 w-4" />
          <span>Your current location is</span>
        </div>
        <p className="font-semibold text-white">D-2 Vasant Kunj, New Delhi</p>
      </div>

      {/* VIEW GOOGLE EARTH Button */}
      <div className="px-4 mb-6">
        <Button 
          variant="outline" 
          className="w-full bg-amber-100 hover:bg-amber-200 text-black border-amber-300 font-semibold"
          onClick={() => navigate('/geo-location')}
        >
          VIEW GOOGLE EARTH
        </Button>
      </div>

      {/* Events List */}
      <div className="px-4 pb-20">
        {/* Today Section */}
        <Card className="bg-amber-100 text-black p-6 rounded-2xl mb-6">
          <div className="flex items-center gap-4 mb-4">
            <IconMapPin className="h-6 w-6" />
            <div>
              <h2 className="text-2xl font-bold">TODAY</h2>
              <p className="text-sm font-medium">SUNDAY, 19 MARCH, 2023</p>
            </div>
          </div>

          <div className="space-y-4">
            {todayEvents.map((event) => (
              <div key={event.id} className="border-b border-gray-400 pb-4 last:border-b-0">
                <h3 className="font-bold text-lg">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm mb-1">
                  <IconMapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <IconClock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tomorrow Section */}
        <Card className="bg-gray-800 text-white p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <IconCalendar className="h-6 w-6" />
            <div>
              <h2 className="text-2xl font-bold">TOMORROW</h2>
              <p className="text-sm text-gray-400">MONDAY, 20 MARCH, 2023</p>
            </div>
          </div>

          <div className="text-center py-8 text-gray-400">
            <p>No events scheduled for tomorrow</p>
            <p className="text-sm">Check back later for updates</p>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-700 px-4 py-2 z-40">
        <div className="flex justify-around items-center">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => navigate('/marketplace')}
          >
            <IconHome className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Home</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => navigate('/discover')}
          >
            <IconBookmark className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Discover</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <IconShoppingCart className="h-5 w-5 text-samhita-gold" />
            <span className="text-xs text-samhita-gold font-medium">Events</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => navigate('/dashboard')}
          >
            <IconUser className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-400">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default EventsNear;