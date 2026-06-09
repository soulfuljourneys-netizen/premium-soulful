import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Terms & Conditions – Goa Trip Booking
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          By booking a trip with{' '}
          <a
            href="https://soulfuljourneys.in?utm_source=chatgpt.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Soulful Journeys
          </a>, you agree to the following Terms & Conditions. Please read carefully before making payment.
        </p>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">1. Booking Confirmation</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Your booking is confirmed only after:</li>
            <ul className="list-disc space-y-1 pl-5 text-slate-700">
              <li>Advance/payment is received</li>
              <li>Seat availability is confirmed</li>
              <li>Required details/documents are submitted</li>
            </ul>
            <li>The company reserves the right to reject or cancel any booking at its discretion with applicable refund rules.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">2. Payment Policy</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Partial payment may be accepted to block seats.</li>
            <li>Full payment must be completed before the communicated deadline.</li>
            <li>Failure to complete payment may result in cancellation without prior notice.</li>
            <li>Prices may increase due to surge pricing in hotels, transport, flights, train fares, fuel costs, taxes, or vendor changes before booking confirmation.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">3. Cancellation & Refund Policy</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">By Traveler</h3>
              <ul className="list-disc space-y-2 pl-5 text-slate-700">
                <li>Advance/payment once made may be non-refundable unless specifically mentioned.</li>
                <li>Refund amount depends on cancellation timing and vendor policies.</li>
                <li>Any cancellation close to departure may attract heavy cancellation charges.</li>
                <li>No refund for:</li>
                <ul className="list-disc space-y-1 pl-5 text-slate-700">
                  <li>No-show</li>
                  <li>Missing departure</li>
                  <li>Leaving trip midway</li>
                  <li>Late arrival</li>
                  <li>Personal emergencies</li>
                  <li>Weather discomfort</li>
                  <li>Change of mind after booking</li>
                </ul>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">By Company</h3>
              <ul className="list-disc space-y-2 pl-5 text-slate-700">
                <li>In rare situations, trips may be cancelled due to:</li>
                <ul className="list-disc space-y-1 pl-5 text-slate-700">
                  <li>Natural disasters</li>
                  <li>Government restrictions</li>
                  <li>Safety concerns</li>
                  <li>Political unrest</li>
                  <li>Vendor failure</li>
                  <li>Low participation</li>
                  <li>Transport strike</li>
                  <li>Pandemic-related issues</li>
                  <li>Force majeure events</li>
                </ul>
                <li>In such cases:</li>
                <ul className="list-disc space-y-1 pl-5 text-slate-700">
                  <li>Refunds, credits, or rescheduling options will depend on recoveries received from vendors.</li>
                  <li>Convenience charges, taxes, processing fees, and unrecoverable bookings may be deducted.</li>
                </ul>
              </ul>
            </div>
          </div>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">4. Train / Flight / Bus Disclaimer</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Train, flight, Volvo, taxi, ferry, or bus delays/cancellations are beyond company control.</li>
            <li>RAC/waitlisted train tickets may occur if confirmed tickets are unavailable.</li>
            <li>Seat preferences, coach preferences, lower berth requests, or together seating are not guaranteed.</li>
            <li>Any fare increase after booking confirmation must be paid by traveler.</li>
            <li>If transport gets cancelled/rescheduled by operator:</li>
            <ul className="list-disc space-y-1 pl-5 text-slate-700">
              <li>Alternative arrangements may incur extra charges.</li>
              <li>Company will assist but is not liable for operator failures.</li>
            </ul>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">5. Hotel & Stay Policy</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Hotel categories, room types, views, floor preferences, or exact properties are subject to availability.</li>
            <li>Similar-category stays may be provided in case of operational issues.</li>
            <li>Early check-in/late checkout depends on hotel policies.</li>
            <li>Triple/quad sharing may include extra mattress/floor mattress.</li>
            <li>AC/geyser/WiFi/power backup availability depends on property conditions and local infrastructure.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">6. Room Sharing & Group Travel</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Solo travelers may be paired with same-gender travelers unless otherwise specified.</li>
            <li>Group trips involve shared spaces, coordination delays, and varying personalities.</li>
            <li>Travelers are expected to maintain respectful behavior.</li>
            <li>Misconduct, harassment, violence, intoxication issues, illegal activities, or creating discomfort for others can lead to removal from trip without refund.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">7. Alcohol, Smoking & Substance Use</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Consumption of illegal substances is strictly prohibited.</li>
            <li>Travelers are solely responsible for consequences of intoxication, legal violations, injuries, damages, or disputes caused under influence.</li>
            <li>The company is not liable for accidents, fights, drowning, police cases, or medical emergencies arising from substance use.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">8. Adventure Activities Disclaimer</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Activities such as water sports, scooty rides, trekking, parasailing, rafting, ATV rides, swimming, camping, and night outings are undertaken at traveler’s own risk.</li>
            <li>Weather, tides, operational conditions, government rules, or vendor availability may cause cancellation without refund.</li>
            <li>Travelers must follow all safety instructions.</li>
            <li>The company is not liable for injuries, accidents, loss of life, phobias/panic attacks, physical strain, or medical complications.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">9. Medical & Health Responsibility</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Travelers must disclose serious medical conditions before booking.</li>
            <li>Travelers are responsible for carrying personal medicines, valid prescriptions, and emergency contacts.</li>
            <li>The company is not responsible for allergies, food reactions, motion sickness, dehydration, heatstroke, illness, mental health episodes, or pre-existing conditions.</li>
            <li>Any medical evacuation, hospitalization, or emergency expense must be borne by traveler.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">10. Traveler Conduct</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Travelers must respect local laws and culture, follow trip captain instructions, avoid damaging hotel/property/vehicle, and maintain decorum with locals and group members.</li>
            <li>Any damages caused by traveler must be paid directly by traveler.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">11. Delays & Itinerary Changes</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Itineraries are tentative and may change due to traffic, weather, crowd, safety, operational issues, local restrictions, or delays by travelers themselves.</li>
            <li>Certain activities/sightseeing may be skipped if timing does not permit.</li>
            <li>No refund shall be provided for missed activities due to delays beyond company control.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">12. Personal Belongings</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Travelers are responsible for their own belongings.</li>
            <li>The company is not liable for theft, lost luggage, forgotten items, damaged gadgets, cash loss.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">13. Photography & Media Consent</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Photos/videos taken during trips may be used by Soulful Journeys for marketing, social media, and promotional content.</li>
            <li>Travelers uncomfortable with this should inform the team in writing before trip begins.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">14. Scooty / Vehicle Rental Responsibility</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Travelers renting scooties/bikes/cars must carry valid driving license, wear helmet, and follow traffic laws.</li>
            <li>Fines, challans, damages, accidents, fuel costs, towing, or legal issues are traveler’s responsibility.</li>
            <li>The company acts only as facilitator between rental vendor and traveler.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">15. Weather & Natural Conditions</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            <li>Goa trips are affected by rain, heat, high tides, sea conditions, and government beach restrictions.</li>
            <li>Beach access, parties, cruises, water sports, or nightlife may shut unexpectedly.</li>
            <li>No compensation/refund for weather-related disruptions.</li>
          </ul>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">16. Force Majeure</h2>
          <p className="text-slate-700">
            The company shall not be liable for failure or delay caused by events beyond reasonable control including natural disasters, floods, landslides, pandemic, war, riots, government orders, technical breakdowns, transport shutdowns, internet failures, or power outages.
          </p>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">17. Pricing Errors</h2>
          <p className="text-slate-700">
            In case of accidental pricing mistakes, technical glitches, or human error, the company reserves the right to revise pricing or cancel booking with refund of paid amount.
          </p>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">18. Jurisdiction</h2>
          <p className="text-slate-700">Any disputes shall be subject to jurisdiction of courts in New Delhi.</p>
        </section>

        <hr className="border-slate-200 my-8" />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">19. Acceptance of Risk</h2>
          <p className="text-slate-700">
            By booking the trip, traveler acknowledges that travel involves inherent risks, plans can change unexpectedly, group trips require flexibility, and the company acts as organizer/facilitator with third-party vendors. Traveler voluntarily accepts these risks while participating in the trip.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
