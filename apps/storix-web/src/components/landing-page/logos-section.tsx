import { COMPANIES } from "~/lib/constants";

const LogosSection = () => {
  return (
    <section className="bg-muted/30 w-full border-y py-12">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Trusted by innovative companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {COMPANIES.map((company) => (
              <img
                key={company.name}
                src={company.logo}
                alt={`${company.name} logo`}
                width={120}
                height={60}
                className="h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogosSection;
