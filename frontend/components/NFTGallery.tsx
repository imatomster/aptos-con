import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Heart, Gift, Crown, User, History, Sparkles } from "lucide-react";
import { AddNFTForm } from "@/components/AddNFTForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import confetti from "canvas-confetti";
import { SantaBackground } from "@/components/SantaBackground";

const INITIAL_NFTS = [
  {
    name: "Nuigurumi #1",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/1.png",
    price: "0.71 APT",
    rarity: "Legendary",
    traits: ["Rose"],
    owner: "0x33e1...4418",
    lastSale: "0.13 APT",
  },
  {
    name: "Nuigurumi #2",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/2.png",
    price: "0.18 APT",
    rarity: "Rare",
    traits: ["Red Eyes"],
    owner: "0x5a0a...ea95",
    lastSale: "0.27 APT",
  },
  {
    name: "Nuigurumi #3",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/3.png",
    price: "0.68 APT",
    rarity: "Legendary",
    traits: ["Winter Hat", "Scarves", "Bitcoin Chain"],
    owner: "0x4af0...db4f",
    lastSale: "0.66 APT",
  },
  {
    name: "Nuigurumi #4",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/4.png",
    price: "0.37 APT",
    rarity: "Legendary",
    traits: ["Red Eyes", "Tiger Pinky"],
    owner: "0x5f80...c413",
    lastSale: "0.77 APT",
  },
  {
    name: "Nuigurumi #5",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/5.png",
    price: "0.92 APT",
    rarity: "Common",
    traits: ["Space Suit", "Laser Eyes", "Red Eyes"],
    owner: "0x5faa...d7fb",
    lastSale: "0.81 APT",
  },
  {
    name: "Nuigurumi #6",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/6.png",
    price: "0.58 APT",
    rarity: "Epic",
    traits: ["VR Headset", "Rose"],
    owner: "0x208f...3cbb",
    lastSale: "0.45 APT",
  },
  {
    name: "Nuigurumi #7",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/7.png",
    price: "0.82 APT",
    rarity: "Uncommon",
    traits: ["Night Crown", "Dragon Blade", "Winter Hat"],
    owner: "0x148f...6629",
    lastSale: "0.62 APT",
  },
  {
    name: "Nuigurumi #8",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/8.png",
    price: "0.94 APT",
    rarity: "Legendary",
    traits: ["Bitcoin Chain", "VR Headset", "Samurai Armor"],
    owner: "0x48e2...47c5",
    lastSale: "0.96 APT",
  },
  {
    name: "Nuigurumi #9",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/9.png",
    price: "0.68 APT",
    rarity: "Legendary",
    traits: ["Space Suit", "Golden"],
    owner: "0x559c...9a34",
    lastSale: "0.69 APT",
  },
  {
    name: "Nuigurumi #10",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/10.png",
    price: "0.37 APT",
    rarity: "Common",
    traits: ["Night Crown", "Diamond Blue"],
    owner: "0x2cbf...8bf5",
    lastSale: "0.17 APT",
  },
  {
    name: "Nuigurumi #11",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/11.png",
    price: "0.32 APT",
    rarity: "Rare",
    traits: ["Bitcoin Chain", "Dragon Blade"],
    owner: "0x71ae...abfe",
    lastSale: "0.54 APT",
  },
  {
    name: "Nuigurumi #12",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/12.png",
    price: "0.52 APT",
    rarity: "Rare",
    traits: ["Night Crown", "Red Eyes", "Dragon Blade"],
    owner: "0x75aa...4014",
    lastSale: "0.65 APT",
  },
  {
    name: "Nuigurumi #13",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/13.png",
    price: "0.57 APT",
    rarity: "Legendary",
    traits: ["Bitcoin Chain", "Winter Hat", "Red Eyes"],
    owner: "0x4558...703e",
    lastSale: "0.67 APT",
  },
  {
    name: "Nuigurumi #14",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/14.png",
    price: "0.5 APT",
    rarity: "Epic",
    traits: ["Rose"],
    owner: "0x203b...a393",
    lastSale: "0.13 APT",
  },
  {
    name: "Nuigurumi #15",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/15.png",
    price: "0.13 APT",
    rarity: "Uncommon",
    traits: ["Tiger Pinky"],
    owner: "0x58c1...b7bf",
    lastSale: "0.88 APT",
  },
  {
    name: "Nuigurumi #16",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/16.png",
    price: "0.29 APT",
    rarity: "Epic",
    traits: ["VR Headset"],
    owner: "0x8508...f439",
    lastSale: "0.52 APT",
  },
  {
    name: "Nuigurumi #17",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/17.png",
    price: "0.26 APT",
    rarity: "Epic",
    traits: ["Dragon Blade", "Bitcoin Chain", "Tiger Pinky"],
    owner: "0x62ae...bde6",
    lastSale: "0.54 APT",
  },
  {
    name: "Nuigurumi #18",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/18.png",
    price: "0.4 APT",
    rarity: "Epic",
    traits: ["Samurai Armor", "Cosmic Feathers", "Winter Hat"],
    owner: "0x4d85...89cb",
    lastSale: "0.88 APT",
  },
  {
    name: "Nuigurumi #19",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/19.png",
    price: "0.46 APT",
    rarity: "Common",
    traits: ["Red Eyes", "Samurai Armor"],
    owner: "0x173d...4538",
    lastSale: "0.55 APT",
  },
  {
    name: "Nuigurumi #20",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/20.png",
    price: "0.13 APT",
    rarity: "Legendary",
    traits: ["Tiger Pinky"],
    owner: "0x3f18...c48c",
    lastSale: "0.54 APT",
  },
  {
    name: "Nuigurumi #21",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/21.png",
    price: "0.77 APT",
    rarity: "Uncommon",
    traits: ["Space Suit", "Tiger Pinky", "Dragon Blade"],
    owner: "0x4818...b3ed",
    lastSale: "0.84 APT",
  },
  {
    name: "Nuigurumi #22",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/22.png",
    price: "0.71 APT",
    rarity: "Epic",
    traits: ["Diamond Blue"],
    owner: "0x51ba...424d",
    lastSale: "0.58 APT",
  },
  {
    name: "Nuigurumi #23",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/23.png",
    price: "0.69 APT",
    rarity: "Epic",
    traits: ["Bitcoin Chain"],
    owner: "0xe719...260f",
    lastSale: "0.68 APT",
  },
  {
    name: "Nuigurumi #24",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/24.png",
    price: "0.61 APT",
    rarity: "Rare",
    traits: ["Scarves"],
    owner: "0x7e87...e77d",
    lastSale: "0.87 APT",
  },
  {
    name: "Nuigurumi #25",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/25.png",
    price: "0.37 APT",
    rarity: "Common",
    traits: ["Bitcoin Chain", "Diamond Blue", "Night Crown"],
    owner: "0x7623...a829",
    lastSale: "0.96 APT",
  },
  {
    name: "Nuigurumi #26",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/26.png",
    price: "0.17 APT",
    rarity: "Epic",
    traits: ["Bitcoin Chain", "Diamond Blue", "Laser Eyes"],
    owner: "0xf8c2...c7f4",
    lastSale: "0.13 APT",
  },
  {
    name: "Nuigurumi #27",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/27.png",
    price: "0.5 APT",
    rarity: "Common",
    traits: ["Laser Eyes"],
    owner: "0x1eb4...84b4",
    lastSale: "0.75 APT",
  },
  {
    name: "Nuigurumi #28",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/28.png",
    price: "0.84 APT",
    rarity: "Legendary",
    traits: ["Bitcoin Chain"],
    owner: "0x2f48...297f",
    lastSale: "0.86 APT",
  },
  {
    name: "Nuigurumi #29",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/29.png",
    price: "0.12 APT",
    rarity: "Epic",
    traits: ["Scarves", "Space Suit", "Night Crown"],
    owner: "0x3d62...a27d",
    lastSale: "0.58 APT",
  },
  {
    name: "Nuigurumi #30",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/30.png",
    price: "0.44 APT",
    rarity: "Uncommon",
    traits: ["Space Suit", "Cosmic Feathers"],
    owner: "0x5648...fe96",
    lastSale: "0.68 APT",
  },
  {
    name: "Nuigurumi #31",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/31.png",
    price: "0.33 APT",
    rarity: "Legendary",
    traits: ["Red Eyes", "Cosmic Feathers", "Tiger Pinky"],
    owner: "0x7036...4223",
    lastSale: "0.11 APT",
  },
  {
    name: "Nuigurumi #32",
    collection: "Nuigurumi",
    image: "https://ipfs.bluemove.io/uploads/nuigurumi/32.png",
    price: "0.3 APT",
    rarity: "Common",
    traits: ["Scarves", "Night Crown", "Rose"],
    owner: "0x636b...2d1f",
    lastSale: "0.48 APT",
  },
];

export function NFTGallery() {
  const [nfts, setNfts] = useState(INITIAL_NFTS);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [giftDialogOpen, setGiftDialogOpen] = useState(false);
  const [selectedNFTIndex, setSelectedNFTIndex] = useState<number | null>(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddNFT = (newNFT: any) => {
    setNfts([newNFT, ...nfts]);
  };

  const handleLike = (index: number) => {
    toast({
      title: "🎄 Added to Nice List!",
      description: `${nfts[index].name} has been added to your nice list!`,
    });
  };

  const handleGift = (index: number) => {
    setSelectedNFTIndex(index);
    setGiftDialogOpen(true);
  };

  const handleGiftSubmit = () => {
    if (selectedNFTIndex === null || !recipientAddress) return;

    // Close dialog first
    setGiftDialogOpen(false);

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Show gift animation
    const card = document.querySelector(`[data-nft-index="${selectedNFTIndex}"]`);
    if (card) {
      card.classList.add("animate-gift-celebration");
    }

    // Remove NFT after animation
    setTimeout(() => {
      const updatedNFTs = nfts.filter((_, index) => index !== selectedNFTIndex);
      setNfts(updatedNFTs);
      setRecipientAddress("");
      setSelectedNFTIndex(null);
      // Force grid refresh
      setRefreshKey((prev) => prev + 1);

      toast({
        title: "🎁 Gift Sent!",
        description: `Your NFT has been gifted to ${recipientAddress}!`,
      });
    }, 2000);
  };

  const toggleCardExpansion = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="relative min-h-screen">
      <SantaBackground />
      <div className="flex flex-col items-center justify-center pt-32 pb-8">
        {/* Form Section */}
        <div className="w-full px-4 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">My NFT Wishlist</h2>
            <p className="text-white/60">Add your favorite NFTs to your Christmas wishlist</p>
          </div>
          <AddNFTForm onAddNFT={handleAddNFT} />
        </div>

        {/* Gallery Section */}
        {nfts.length === 0 ? (
          <div className="text-center text-white/60 bg-white/5 rounded-2xl p-12 backdrop-blur-sm border border-white/10">
            <Gift className="w-16 h-16 mx-auto mb-4 text-green-500/50" />
            <p className="text-xl font-medium mb-2">Your wishlist is empty!</p>
            <p className="text-sm text-white/40">Add some NFTs above to get started</p>
          </div>
        ) : (
          <div className="w-full max-w-7xl mx-auto px-6">
            <div
              key={refreshKey}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto"
            >
              {nfts.map((nft, index) => (
                <div
                  key={index}
                  data-nft-index={index}
                  className={`group relative bg-[#1A1F2E]/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 ${
                    expandedCard === index ? "ring-2 ring-green-500/50" : ""
                  }`}
                >
                  {/* Wishlist Badge */}
                  <div className="absolute top-2 right-2 z-10">
                    <div className="px-2 py-1 bg-red-500/20 rounded-full border border-red-500/20 backdrop-blur-sm">
                      <p className="text-red-400 text-xs">🎁 #{index + 1}</p>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="relative aspect-square">
                    <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Price Tag - Overlaid on image */}
                    <div className="absolute bottom-4 right-4 px-3 py-2 bg-green-500/20 rounded-xl border border-green-500/30 backdrop-blur-sm">
                      <p className="text-green-400 font-mono font-bold">{nft.price}</p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    {/* Title and Collection */}
                    <div className="mb-4">
                      <h3 className="text-xl font-medium text-white mb-1">{nft.name}</h3>
                      <p className="text-white/60 text-sm">{nft.collection}</p>
                    </div>

                    {/* Quick Info Buttons */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start bg-purple-500/10 hover:bg-purple-500/20 text-purple-400"
                        onClick={() => toggleCardExpansion(index)}
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        {nft.rarity}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                        onClick={() => toggleCardExpansion(index)}
                      >
                        <History className="w-4 h-4 mr-2" />
                        Last: {nft.lastSale}
                      </Button>
                    </div>

                    {/* Expanded Info */}
                    {expandedCard === index && (
                      <div className="animate-fadeIn">
                        <div className="space-y-2 mb-4">
                          <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-white/40 text-xs mb-1">Owner</p>
                            <p className="text-white/80 font-mono text-sm flex items-center">
                              <User className="w-4 h-4 mr-2 text-yellow-500" />
                              {nft.owner}
                            </p>
                          </div>
                          <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-white/40 text-xs mb-2">Traits</p>
                            <div className="flex flex-wrap gap-2">
                              {nft.traits.map((trait, i) => (
                                <div
                                  key={i}
                                  className="px-2 py-1 bg-white/5 rounded-lg border border-white/10 flex items-center"
                                >
                                  <Sparkles className="w-3 h-3 mr-1 text-yellow-500" />
                                  <p className="text-white/60 text-xs">{trait}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Add to List
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                        onClick={() => handleGift(index)}
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        Gift
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Dialog open={giftDialogOpen} onOpenChange={setGiftDialogOpen}>
          <DialogContent className="bg-[#1A1F2E] border border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Gift NFT</DialogTitle>
              <DialogDescription className="text-white/60">
                Enter the recipient's address to send this NFT as a gift
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Recipient's address..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              />
              <div className="flex justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setGiftDialogOpen(false)}
                  className="text-white/60 hover:text-white/80"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGiftSubmit}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                >
                  Send Gift
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
