import { useNavigate } from "react-router-dom";

import type { Resource } from "../../types/resource";

interface Props {
  resource: Resource;
  onDownload: () => void;
}

export default function ResourceActions({
  resource,
  onDownload,
}: Props) {
  const navigate =
    useNavigate();

  const handleViewPdf =
    () => {
      // Phase 2
      navigate(
        `/resource/${resource.slug}/view`
      );
    };

  return (
    <section className="br-resource-actions">
      <button
        type="button"
        className="br-button"
        onClick={
          handleViewPdf
        }
      >
        View 
      </button>

      {resource.preview_type !== "video" && (
  <button
    type="button"
    className="br-button"
    onClick={onDownload}
  >
    Download
  </button>
)}
    </section>
  );
}