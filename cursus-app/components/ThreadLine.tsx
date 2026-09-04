const DOTS = [6, 27, 48, 69, 90];

export default function ThreadLine() {
  return (
    <div
      className="hidden md:block absolute top-0 bottom-0 w-px"
      style={{
        left: "2.75rem",
        background:
          "linear-gradient(to bottom, transparent, rgba(216,180,92,0.4) 10%, rgba(216,180,92,0.4) 90%, transparent)",
      }}
    >
      {DOTS.map((top) => (
        <div
          key={top}
          className="thread-dot absolute w-1.5 h-1.5 rounded-full bg-gold"
          style={{ top: `${top}%`, left: -2.5 }}
        />
      ))}
    </div>
  );
}
