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
return ( <article className="br-card"> <h1>
{resource.title} </h1>


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
      marginBottom:
        "2rem",
    }}
  >
    <iframe
      src={`/api/view-resource?resourceId=${resource.id}`}
      title={
        resource.title
      }
      width="100%"
      height="900"
      style={{
        border:
          "1px solid #ddd",
        borderRadius:
          "8px",
      }}
    />
  </div>

  <button
    type="button"
    className="br-button"
    onClick={
      onDownload
    }
  >
    Download Resource
  </button>
</article>


);
}
