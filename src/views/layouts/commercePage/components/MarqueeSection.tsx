import type { StoreSite } from "../../../../types/commerce.types";

export function MarqueeSection({ items }: { items: StoreSite["marquee"] }) {
  return <section className="veloce__marquee" aria-label="Les essentiels VÉLOCE"><div>{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}<b aria-hidden="true">✦</b></span>)}</div></section>;
}
