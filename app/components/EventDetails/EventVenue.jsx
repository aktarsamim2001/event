"use client";

export default function EventVenue() {
  const address = {
    name: "AWS Conference Center",
    street: "123 Cloud Lane",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  };

  return (
    <div className="__gradient rounded-xl shadow-sm p-6">
      <h1 className="text-2xl md:text-4xl font-bold text-white __heading __heading_gap">
        Venue Details
      </h1>
      {/* Custom Map (Replace with actual map image) */}
      <div className="bg-white/10 rounded-lg overflow-hidden">
      <div className="w-full h-[300px] rounded-lg ">
      <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d970749.6675982298!2d-77.93559354003945!3d18.11821195380503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eda2a1bc6cf719d%3A0x59a0d1c0b5120efa!2sJamaica!5e0!3m2!1sen!2sin!4v1742477655819!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      {/* Address Details */}
      <div className=" p-4">
        <h2 className="text-xl text-white font-semibold">Address</h2>
        <p className="text-white">{address.name}</p>
        <p className="text-white">{address.street}</p>
        <p className="text-white">
          {address.city}, {address.state} {address.zip}
        </p>
        <p className="text-white">{address.country}</p>
      </div>
      </div>

      {/* Venue Layout */}
      <div className="mt-6">
        <h2 className="text-xl text-white font-semibold">Venue Layout</h2>
        <div className="mt-4 rounded-lg overflow-hidden shadow-md">
          <img
            src="/venue-layout.png"
            alt="Venue Layout"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
