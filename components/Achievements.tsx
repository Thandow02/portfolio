import { achievements } from "@/data";

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 w-full">
      <h1 className="heading">
        My <span className="text-purple">Achievements</span>
      </h1>
      <p className="text-center text-white-200 mt-4 mb-12 max-w-2xl mx-auto">
        Certifications and honours that reflect my commitment to continuous professional development.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {achievements.map((item) => (
          <div
            key={item.id}
            className={`relative rounded-2xl border ${item.border} bg-gradient-to-br ${item.color} backdrop-blur-sm p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-300`}
            style={{
              background: "rgb(4,7,29)",
              backgroundImage: `linear-gradient(135deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)`,
            }}
          >
            {/* overlay gradient */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-40 pointer-events-none`}
            />

            <div className="relative z-10 flex items-start gap-4">
              <span className="text-4xl">{item.icon}</span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-purple mb-1 block">
                  {item.category}
                </span>
                <h3 className="text-white font-bold text-base lg:text-lg leading-snug">
                  {item.title}
                </h3>
                <p className="text-white-200 text-sm mt-1">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
