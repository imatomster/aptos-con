import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Gift } from "lucide-react";

export function AddNFTForm({ onAddNFT }: { onAddNFT: (nft: any) => void }) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const RARITIES = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"];
      const POSSIBLE_TRAITS = [
        "Golden Frame",
        "Sparkle Effect",
        "Rainbow Background",
        "Laser Eyes",
        "Diamond Hands",
        "Cosmic Aura",
        "Holographic",
        "Neon Glow",
        "3D Effect",
        "Animated",
        "Pixel Art",
        "Gradient Overlay",
      ];

      // Extract collection name from everything before "#" in the name
      const collection = name.includes("#") ? name.split("#")[0].trim() : name;

      const mockNFT = {
        name: name,
        collection: collection,
        image: url,
        price: (Math.random() * 100).toFixed(2) + " APT",
        rarity: RARITIES[Math.floor(Math.random() * RARITIES.length)],
        traits: Array.from({ length: 3 }, () => POSSIBLE_TRAITS[Math.floor(Math.random() * POSSIBLE_TRAITS.length)]),
        owner: "0x1234...5678",
        lastSale: (Math.random() * 100).toFixed(2) + " APT",
      };

      onAddNFT(mockNFT);
      setUrl("");
      setName("");
      toast({
        title: "🎄 Added to Wishlist!",
        description: "Santa has been notified of your NFT wish!",
      });
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Could not add NFT to wishlist",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mb-12">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter NFT name (e.g. Bored Ape #123)..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste NFT URL here..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          />
          <Button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
          >
            <Gift className="w-4 h-4 mr-2" />
            {loading ? "Adding..." : "Add to Wishlist"}
          </Button>
        </div>
      </div>
    </form>
  );
}
