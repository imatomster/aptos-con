import { WalletSelector } from "@/components/WalletSelector";
import { Bell, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const daysUntilChristmas = () => {
    const today = new Date();
    const christmas = new Date(today.getFullYear(), 11, 25); // Month is 0-based
    if (today > christmas) {
      christmas.setFullYear(christmas.getFullYear() + 1);
    }
    const diffTime = Math.abs(christmas.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Festive Banner */}
      <div className="bg-gradient-to-r from-green-600/20 via-red-600/20 to-green-600/20 text-center py-1">
        <p className="text-sm text-white/80">
          🎄 {daysUntilChristmas()} days until Christmas! Make your NFT wishes count 🎅
        </p>
      </div>

      {/* Main Header */}
      <div className="bg-[#0A0F1A]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-8 py-4 max-w-screen-xl mx-auto w-full">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-white">
                NFT <span className="text-green-500">Wishlist</span>
              </h1>
              <div className="px-2 py-0.5 bg-red-500/10 rounded-full border border-red-500/20">
                <p className="text-red-400 text-sm">Beta</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white"
                onClick={() => window.location.reload()}
              >
                <Gift className="w-4 h-4 mr-2" />
                My Wishlist
              </Button>
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white"
                onClick={() => window.open("https://bluemove.net/", "_blank")}
              >
                Explore
              </Button>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex relative text-white/70 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            <div className="hidden md:block px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
              <p className="text-green-400 font-mono text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {daysUntilChristmas()} Days till Christmas
              </p>
            </div>

            <WalletSelector />
          </div>
        </div>
      </div>
    </div>
  );
}
