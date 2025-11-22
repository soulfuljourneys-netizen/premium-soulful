import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import KasolKheerganga from "./pages/KasolKheerganga";
import JibhiTirthan from "./pages/JibhiTirthan";
import ChoptaTungnath from "./pages/ChoptaTungnath";
import UdaipurMountAbu from "./pages/UdaipurMountAbu";
import ManaliSissuKasol from "./pages/ManaliSissuKasol";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* ManaliSolang removed (deleted) */}
        <Route path="chopta-tungnath" element={<ChoptaTungnath />} />
        <Route path="kasol-kheerganga" element={<KasolKheerganga />} />
        <Route path="jibhi-tirthan" element={<JibhiTirthan />} />
        <Route path="udaipur-mount-abu" element={<UdaipurMountAbu />} />
        <Route path="manali-kasol-chills" element={<ManaliSissuKasol />} />

        {/* More trips */}
        <Route path="rishikesh" element={<div>Rishikesh Coming Soon</div>} />
        <Route path="udaipur" element={<div>Udaipur Coming Soon</div>} />
      </Route>
    </Routes>
  );
}
