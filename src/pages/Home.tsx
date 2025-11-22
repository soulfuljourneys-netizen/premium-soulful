import TripCard from "../components/TripCard";
import manaliThumb from "../assets/Thumbnails/manali kasol.png";
import kasolThumb from "../assets/Thumbnails/Kasol Kheerganga.png";
import jibhiThumb from "../assets/Thumbnails/Jibhi Tirthan Valley.png";
import choptaThumb from "../assets/Thumbnails/Chopta tungnath.png";
import udaipurThumb from "../assets/Thumbnails/Udaiur Mount Abu.png";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 pb-36 pt-6">
      {/* Hero segment: simple boxed hero matching other pages' width */}
      <section className="rounded-2xl overflow-hidden bg-slate-900 text-white">
        <div
          className="h-56 md:h-72 bg-center bg-cover flex items-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="w-full bg-black/30 px-6 py-8">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Find Your Next Escape
            </h1>
            <p className="mt-2 text-slate-200 max-w-2xl">
              Curated soulful journeys across the Himalayas — short escapes,
              long stories.
            </p>
          </div>
        </div>
      </section>

      {/* Trip cards — kept simple and boxed */}
      <section
        id="trips"
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <TripCard
          title="Kasol — Kheerganga"
          subtitle="5D • 4N | Pickup: Delhi"
          href="/kasol-kheerganga"
          image={kasolThumb}
          thumbnails={[kasolThumb]}
        />

        <TripCard
          title="Jibhi — Tirthan"
          subtitle="5D • 4N | Pickup: Delhi & Chandigarh"
          href="/jibhi-tirthan"
          image={jibhiThumb}
          thumbnails={[jibhiThumb]}
        />

        <TripCard
          title="Chopta — Tungnath"
          subtitle="5D • 4N | Every Friday from Delhi"
          href="/chopta-tungnath"
          image={choptaThumb}
          thumbnails={[choptaThumb]}
        />

        <TripCard
          title="Udaipur — Mount Abu"
          subtitle="5D • 4N | Pickup: Delhi / Gurgaon (Jaipur pickup available)"
          href="/udaipur-mount-abu"
          image={udaipurThumb}
          thumbnails={[udaipurThumb]}
        />

        <TripCard
          title="Manali — Sissu — Kasol"
          subtitle="6D • 5N | Pickup: Delhi & Chandigarh"
          href="/manali-kasol-chills"
          image={manaliThumb}
          thumbnails={[manaliThumb]}
        />

        {/* optional extras kept minimal — you can add more TripCard instances here */}
      </section>
    </main>
  );
}
