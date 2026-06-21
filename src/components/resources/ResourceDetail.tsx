import type {
  Resource,
} from "../../types/resource";

interface Props {
  resource: Resource;
  onDownload: () => void;
}

export default function ResourceDetail({
  resource,
  onDownload,
}: Props) {
  return (
    <article className="br-card">
      <h1>
        {resource.title}
      </h1>

      <p>
        {resource.description}
      </p>

      <div>
        <strong>
          Category:
        </strong>{" "}
        {resource.category}
      </div>

      <div>
        <strong>
          Type:
        </strong>{" "}
        {resource.resource_type}
      </div>

      <div
        style={{
          marginTop: "2rem",
        }}
      >
        <button
          type="button"
          className="br-button"
          onClick={
            onDownload
          }
        >
          Download Resource
        </button>
      </div>
    </article>
  );
}