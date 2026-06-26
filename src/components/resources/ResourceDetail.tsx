import type { Resource } from "../../types/resource";

import ResourceHero from "./ResourceHero";
import ResourceMeta from "./ResourceMeta";
import ResourceActions from "./ResourceActions";
import ResourceOverview from "./ResourceOverview";
import MasterclassBanner from "./MasterclassBanner";
import ResourceDisclaimer from "./ResourceDisclaimer";

// import PdfViewer from "../viewers/PdfViewer";
// import VideoViewer from "../viewers/VideoViewer";
// import MarkdownViewer from "../viewers/MarkdownViewer";
// import ImageViewer from "../viewers/ImageViewer";
// import UnsupportedViewer from "../viewers/UnsupportedViewer";

import "./ResourceDetail.css";

interface Props {
  resource: Resource;
  onDownload: () => void;
}

// function renderViewer(resource: Resource) {
//   switch (resource.preview_type) {
//     case "pdf":
//       return <PdfViewer resource={resource} />;

//     case "video":
//       return <VideoViewer resource={resource} />;

//     case "markdown":
//       return <MarkdownViewer resource={resource} />;

//     case "image":
//       return <ImageViewer resource={resource} />;

//     default:
//       return <UnsupportedViewer resource={resource} />;
//   }
// }

export default function ResourceDetail({
  resource,
  onDownload,
}: Props) {
  return (
    <article className="br-resource-detail">
      <ResourceHero resource={resource} />

      <ResourceMeta resource={resource} />

      <ResourceActions
        resource={resource}
        onDownload={onDownload}
      />

      <ResourceOverview resource={resource} />

      <MasterclassBanner />

      <ResourceDisclaimer />
    </article>
  );
}