import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
import Booking from "./pages/Booking";
const KasolKheerganga = lazy(() => import("./pages/KasolKheerganga"));
const JibhiTirthan = lazy(() => import("./pages/JibhiTirthan"));
const ChoptaTungnath = lazy(() => import("./pages/ChoptaTungnath"));
const Goa = lazy(() => import("./pages/Goa"));
const UdaipurMountAbu = lazy(() => import("./pages/UdaipurMountAbu"));
const ManaliSissuKasol = lazy(() => import("./pages/ManaliSissuKasol"));
const Kedarnath = lazy(() => import("./pages/Kedarnath"));
const MetaLeadForm = lazy(() => import("./pages/MetaLeadForm"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Payment = lazy(() => import("./pages/Payment"));
const Terms = lazy(() => import("./pages/Terms"));

function Loader() {
  return (
    <div
      className="py-12 text-center text-gray-500"
      role="status"
      aria-live="polite"
    >
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        {/* ManaliSolang removed (deleted) */}
        <Route
          path="chopta-tungnath"
          element={
            <Suspense fallback={<Loader />}>
              <ChoptaTungnath />
            </Suspense>
          }
        />
        <Route
          path="goa"
          element={
            <Suspense fallback={<Loader />}>
              <Goa />
            </Suspense>
          }
        />
        <Route
          path="group-trips-queries"
          element={
            <Suspense fallback={<Loader />}>
              <MetaLeadForm />
            </Suspense>
          }
        />
        <Route
          path="kasol-kheerganga"
          element={
            <Suspense fallback={<Loader />}>
              <KasolKheerganga />
            </Suspense>
          }
        />
        <Route
          path="jibhi-tirthan"
          element={
            <Suspense fallback={<Loader />}>
              <JibhiTirthan />
            </Suspense>
          }
        />
        <Route
          path="udaipur-mount-abu"
          element={
            <Suspense fallback={<Loader />}>
              <UdaipurMountAbu />
            </Suspense>
          }
        />
        <Route
          path="manali-kasol-chills"
          element={
            <Suspense fallback={<Loader />}>
              <ManaliSissuKasol />
            </Suspense>
          }
        />
        <Route
          path="kedarnath"
          element={
            <Suspense fallback={<Loader />}>
              <Kedarnath />
            </Suspense>
          }
        />

        {/* More trips */}
        <Route path="rishikesh" element={<div>Rishikesh Coming Soon</div>} />
        <Route path="udaipur" element={<div>Udaipur Coming Soon</div>} />
        <Route
          path="payment"
          element={
            <Suspense fallback={<Loader />}>
              <Payment />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loader />}>
              <AboutUs />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<Loader />}>
              <ContactUs />
            </Suspense>
          }
        />
        <Route
          path="terms"
          element={
            <Suspense fallback={<Loader />}>
              <Terms />
            </Suspense>
          }
        />
        <Route path="booking" element={<Booking />} />
      </Route>
    </Routes>
  );
}
