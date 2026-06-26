import type { Resource } from "../../types/resource";

interface Props {
  resource: Resource;
}

function formatDate(
  value: string | null
) {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default function ResourceMeta({
  resource,
}: Props) {
  return (
    <section className="br-resource-meta">
      <div className="br-meta-card">
        <span>Published</span>

        <strong>
          {formatDate(
            resource.created_at
          )}
        </strong>
      </div>

      <div className="br-meta-card">
        <span>Last Updated</span>

        <strong>
          {formatDate(
            resource.last_updated_at
          )}
        </strong>
      </div>

      <div className="br-meta-card">
        <span>Reviewed</span>

        <strong>
          {formatDate(
            resource.reviewed_at
          )}
        </strong>
      </div>
    </section>
  );
}