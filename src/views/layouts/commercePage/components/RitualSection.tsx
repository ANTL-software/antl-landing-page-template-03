import { FiArrowDownRight } from "react-icons/fi";
import type { StoreSite } from "../../../../types/commerce.types";

export function RitualSection({ ritual }: Pick<StoreSite, "ritual">) {
  return <section className="veloce__ritual" id="rituel"><div className="veloce__ritual-intro"><p className="veloce__eyebrow">{ritual.eyebrow}</p><h2>{ritual.title}</h2><p>{ritual.text}</p><FiArrowDownRight aria-hidden="true" /></div><ol>{ritual.steps.map((step) => <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></section>;
}
