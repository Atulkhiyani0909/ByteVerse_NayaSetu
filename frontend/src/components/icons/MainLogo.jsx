const TowerBridgeSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      fill="black"
      className="size-10 pb-1.5"
    >
      <g transform="translate(0,480) scale(1,-1)">
        {/* Left tower */}
        <rect x="100" y="50" width="60" height="250" />
        <path d="M100 300 L130 360 L160 300 Z" />
        {/* Left tower details */}
        <rect x="110" y="80" width="10" height="40" fill="white" />
        <rect x="140" y="80" width="10" height="40" fill="white" />
        <rect x="110" y="140" width="10" height="40" fill="white" />
        <rect x="140" y="140" width="10" height="40" fill="white" />
        
        {/* Right tower */}
        <rect x="480" y="50" width="60" height="250" />
        <path d="M480 300 L510 360 L540 300 Z" />
        {/* Right tower details */}
        <rect x="490" y="80" width="10" height="40" fill="white" />
        <rect x="520" y="80" width="10" height="40" fill="white" />
        <rect x="490" y="140" width="10" height="40" fill="white" />
        <rect x="520" y="140" width="10" height="40" fill="white" />
  
        {/* Upper bridge */}
        <rect x="160" y="200" width="320" height="30" />
  
        {/* Lower bridge */}
        <path d="M100 50 Q300 -50 540 50 L540 90 Q300 10 100 90 Z" />
  
        {/* Suspension cables */}
        <path
          d="M130 300 Q320 400 510 300"
          stroke="black"
          strokeWidth="6"
          fill="none"
        />
        <path
          d="M130 270 Q320 360 510 270"
          stroke="black"
          strokeWidth="4"
          fill="none"
        />
  
        {/* Piers */}
        <rect x="80" y="0" width="100" height="50" />
        <rect x="460" y="0" width="100" height="50" />
      </g>
    </svg>
  );
  
export default TowerBridgeSVG;