export default function SocialProof() {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "15+", label: "Industries" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "Worldwide", label: "Remote Collaboration" },
  ];

  return (
    <section className="py-20 bg-white border-y border-[#E6E6E6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 divide-x-0 md:divide-x divide-[#E6E6E6]">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-4xl md:text-5xl font-semibold text-[#101010] tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-[#757575] text-sm md:text-base font-medium tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
