import { FiArrowUpRight } from "react-icons/fi";
import type { StoreSite } from "../../../../types/commerce.types";

export function HeroSection({ hero }: Pick<StoreSite, "hero">) {
  return <section className="veloce__hero" id="top">
    <div><p className="veloce__eyebrow">{hero.eyebrow}</p><h1>{hero.title}</h1><p>{hero.text}</p><a className="veloce__cta" href={hero.cta.href}>{hero.cta.label} <FiArrowUpRight aria-hidden="true" /></a></div>
    <img src={hero.image} alt={hero.imageAlt} fetchPriority="high" />
  </section>;
}
