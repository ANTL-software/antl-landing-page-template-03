import type { StoreSite } from "../../../../types/commerce.types";

export function StorySection({ story }: Pick<StoreSite, "story">) {
  return <section className="veloce__story" id="histoire"><div><p className="veloce__eyebrow">{story.eyebrow}</p><h2>{story.title}</h2></div><p>{story.text}</p></section>;
}
