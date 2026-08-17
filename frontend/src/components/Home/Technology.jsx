import { BrainCircuit, Cloud, Database, Monitor, Server, Smartphone } from "lucide-react";
import Reveal from "../common/Reveal";

const categories = [
  { icon: Monitor, title: "Frontend Engineering", techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { icon: Server, title: "Backend Systems", techs: ["Node.js", ".NET", "Python", "Java"] },
  { icon: Cloud, title: "Cloud & DevOps", techs: ["AWS", "Azure", "Docker", "Kubernetes"] },
  { icon: BrainCircuit, title: "AI & Machine Learning", techs: ["LLMs", "RAG Pipelines", "Computer Vision", "MLOps"] },
  { icon: Database, title: "Data & Analytics", techs: ["MongoDB", "PostgreSQL", "Redshift", "Kafka"] },
  { icon: Smartphone, title: "Mobile Development", techs: ["React Native", "Flutter", "iOS", "Android"] },
];

/**
 * "Technology" section — a professional, grouped look at the stack Innobles builds on.
 */
const Technology = () => (
  <section className="py-20 md:py-24">
    <div className="container-x">
      <Reveal className="max-w-2xl">
        <p className="pill-eyebrow mb-4">
          <span className="pill-dot" /> Technology
        </p>
        <h2 className="font-disp text-3xl font-bold md:text-4xl">Built on a modern, dependable stack</h2>
        <p className="mt-4 text-slate-600 md:text-lg">
          From frontend to cloud to AI — we engineer with proven technologies that scale with your business.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ icon: Icon, title, techs }) => (
          <Reveal key={title}>
            <div className="card h-full p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-disp text-lg font-bold text-ink">{title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Technology;