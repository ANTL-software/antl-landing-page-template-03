import { FiCreditCard, FiPackage, FiSun } from "react-icons/fi";
import type { StoreSite } from "../../../../types/commerce.types";

const icons = { delivery: FiPackage, card: FiCreditCard, leaf: FiSun };

export function ServiceStrip({ services }: { services: StoreSite["services"] }) {
  return <section className="veloce__services" aria-label="Services VÉLOCE">{services.map((service) => { const Icon = icons[service.icon]; return <article key={service.title}><Icon aria-hidden="true" /><div><h3>{service.title}</h3><p>{service.text}</p></div></article>; })}</section>;
}
