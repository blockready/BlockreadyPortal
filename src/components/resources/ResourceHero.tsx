import type { Resource } from "../../types/resource";

interface Props {
  resource: Resource;
}

export default function ResourceHero({
  resource,
}: Props) {
  return (
    <section className="br-resource-hero">
      {/* <a
        href="/library"
        className="br-resource-back"
      >
        ← Back to Library
      </a> */}

      <h1 className="br-resource-title">
        {resource.title}
      </h1>

      <p className="br-resource-description">
        {resource.description ??
          "No description available."}
      </p>

      <div className="br-resource-badges">
        <span className="br-badge br-badge-category">
          {resource.category}
        </span>

        <span className="br-badge br-badge-type">
          {resource.resource_type}
        </span>

        <span className="br-badge br-badge-version">
          v{resource.version}
        </span>
      </div>
    </section>
  );
}