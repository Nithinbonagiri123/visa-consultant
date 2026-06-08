import VideoBackground from "./components/VideoBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <VideoBackground />
      <Navbar />
      <Hero />
    </main>
  );
}
