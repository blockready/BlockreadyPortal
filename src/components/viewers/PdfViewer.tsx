import type { Resource } from "../../types/resource";

interface Props {
  resource: Resource;
}

export default function PdfViewer({
  resource,
}: Props) {
  return (
    <section
      className="br-section-card"
      style={{
        padding: 0,
        overflow: "hidden",
      }}
    >
      <iframe
        src={`/api/view-resource?resourceId=${resource.id}`}
        title={resource.title}
        width="100%"
        height="900"
        style={{
          border: "none",
          display: "block",
        }}
      />
    </section>
  );
}