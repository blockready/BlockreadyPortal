import type { Resource } from "../../types/resource";

interface Props {
  resource: Resource;
}

export default function VideoViewer({
  resource,
}: Props) {
  return (
    <section className="br-section-card">
      <video
        controls
        width="100%"
        style={{
          borderRadius: "12px",
        }}
      >
        <source
          src={`/api/view-resource?resourceId=${resource.id}`}
        />
      </video>
    </section>
  );
}