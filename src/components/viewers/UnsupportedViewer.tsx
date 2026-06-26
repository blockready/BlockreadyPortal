import type { Resource } from "../../types/resource";

interface Props {
  resource: Resource;
}

export default function UnsupportedViewer({
  resource,
}: Props) {
  return (
    <section className="br-section-card">
      <h2>Preview Not Available</h2>

      <p>
        <strong>{resource.title}</strong> cannot be previewed
        directly in the browser.
      </p>

      <p>
        Resource Type:{" "}
        <strong>{resource.resource_type}</strong>
      </p>

      <p>
        You can still download this resource using the
        <strong> Download Resource </strong>
        button above.
      </p>
    </section>
  );
}