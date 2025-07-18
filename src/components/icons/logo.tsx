export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <div className="logo-anim-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
      className="animate-pulse"
    >
      <g fill="currentColor">
        <path d="M216,60,144,16.43a16.12,16.12,0,0,0-16.06,0L56,60a15.9,15.9,0,0,0-8,13.86V182.14a15.9,15.9,0,0,0,8,13.86l72,43.57a16.12,16.12,0,0,0,16.06,0L216,196a15.9,15.9,0,0,0,8-13.86V73.86A15.9,15.9,0,0,0,216,60Zm-88,144.1V152H92v34.92L60,168.18V87.82L92,69.08V104h36V51.9l32,18.74v80.28Z" />
      </g>
    </svg>
  </div>
);
