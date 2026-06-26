import type { Resource } from "../../types/resource";
import ReactMarkdown from "react-markdown";
import "./ResourceOverview.css";


interface Props {
  resource: Resource;
}

export default function ResourceOverview({
  resource,
}: Props) {
  return (
    <section className="br-section-card">
      <h2 className="br-section-title">
        Resource Overview
      </h2>


<div className="resource-content">
  <ReactMarkdown>
    {resource.long_description ??
      resource.description ??
      ""}
  </ReactMarkdown>
</div>
    </section>
  );
}