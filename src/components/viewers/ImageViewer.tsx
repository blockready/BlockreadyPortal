import type { Resource } from "../../types/resource";

interface Props {
  resource: Resource;
}

export default function ImageViewer({
  resource,
}: Props) {
  return (
    <section className="br-section-card">
      <img
        src={`/api/view-resource?resourceId=${resource.id}`}
        alt={resource.title}
        style={{
          width: "100%",
          borderRadius: "12px",
        }}
      />
    </section>
  );
}