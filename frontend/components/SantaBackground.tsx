export function SantaBackground() {
  // Increase the number of Santas and make them bigger
  const santas = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    rotation: Math.random() * 360,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    scale: 0.8 + Math.random() * 0.7, // Bigger scale between 0.8 and 1.5
    opacity: 0.05 + Math.random() * 0.08, // More transparent: between 0.05 and 0.13
    // Add z-index variation
    zIndex: Math.floor(Math.random() * 3),
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {santas.map((santa) => (
        <div
          key={santa.id}
          className="absolute w-32 h-32 santa-image" // Increased base size
          style={{
            left: santa.left,
            top: santa.top,
            transform: `rotate(${santa.rotation}deg) scale(${santa.scale})`,
            opacity: santa.opacity,
            zIndex: santa.zIndex,
          }}
        />
      ))}
    </div>
  );
}
