import Image from "next/image";
import { imageArchive } from "@/data/imageArchive";

export default function ImageArchive() {
  return (
    <section className="image-archive" aria-label="Art and publication archive">
      {([
        { key: "art", title: "Studies in black & white", description: "Line, texture and the spaces in between.", label: "Artwork" },
        { key: "art1", title: "Art on the printed page", description: "A collection of book covers and printed works.", label: "Printed work" },
      ] as const).map((group) => {
        const images = imageArchive[group.key];
        const renderImage = (item: typeof images[number]) => (
          <figure key={item.src}>
            <a href={item.src} target="_blank" rel="noreferrer" aria-label={`Open ${group.label.toLowerCase()} ${item.number} at full size`}>
              <Image src={item.src} alt={`${group.label} ${item.number} from the artist’s image archive`} width={item.width} height={item.height} sizes="(max-width: 767px) 42vw, 22vw" />
            </a>
            <figcaption>{group.label} {String(item.number).padStart(2, "0")}</figcaption>
          </figure>
        );
        return (
          <div className="archive-group" key={group.key}>
            <div className="archive-heading"><h2>{group.title}</h2><p>{group.description}</p></div>
            <div className="archive-grid">{images.slice(0, 4).map(renderImage)}</div>
            <details className="archive-more">
              <summary>View the full collection <span>({images.length} images)</span></summary>
              <div className="archive-grid">{images.slice(4).map(renderImage)}</div>
            </details>
          </div>
        );
      })}
    </section>
  );
}
