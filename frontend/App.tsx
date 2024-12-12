import { Header } from "@/components/Header";
import { NFTGallery } from "@/components/NFTGallery";

function App() {
  return (
    <>
      <Header />
      <div
        className="flex items-center justify-center flex-col min-h-screen bg-[#0A0F1A]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.08), transparent 300px),
            radial-gradient(circle at 90% 50%, rgba(220, 38, 38, 0.08), transparent 300px),
            radial-gradient(circle at 10% 50%, rgba(59, 130, 246, 0.08), transparent 300px),
            linear-gradient(180deg, rgba(24, 24, 27, 0) 0%, rgba(24, 24, 27, 0.8) 100%)
          `,
        }}
      >
        <NFTGallery />
      </div>
    </>
  );
}

export default App;
