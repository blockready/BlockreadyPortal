import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppHeader from "../components/layout/AppHeader";

import PdfViewer from "../components/viewers/PdfViewer";
import VideoViewer from "../components/viewers/VideoViewer";
import MarkdownViewer from "../components/viewers/MarkdownViewer";
import ImageViewer from "../components/viewers/ImageViewer";
import UnsupportedViewer from "../components/viewers/UnsupportedViewer";

import { useAuth } from "../hooks/useAuth";

import { downloadResource } from "../services/internal-api.service";
import { resourceService } from "../services/resource.service";

import type { Resource } from "../types/resource";

import "./ResourceViewerPage.css";

export default function ResourceViewerPage() {
  const { slug } = useParams();
  const { user } = useAuth();

  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const data = await resourceService.getResourceBySlug(slug);
        setResource(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  const handleDownload = async () => {
    if (!resource || !user) {
      return;
    }

    try {
      const response = await downloadResource(user.id, resource.id);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = resource.title;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  function renderViewer(resource: Resource) {
    switch (resource.preview_type) {
      case "pdf":
        return <PdfViewer resource={resource} />;

      case "video":
        return <VideoViewer resource={resource} />;

      case "markdown":
      case "md":
        return <MarkdownViewer resource={resource} />;

      case "image":
        return <ImageViewer resource={resource} />;

      default:
        return <UnsupportedViewer resource={resource} />;
    }
  }

  if (loading) {
    return (
      <>
        <AppHeader />
        <main className="br-resource-viewer-page">
          <p className="br-resource-loading">Loading...</p>
        </main>
      </>
    );
  }

  if (!resource) {
    return (
      <>
        <AppHeader />
        <main className="br-resource-viewer-page">
          <p className="br-resource-loading">Resource not found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader />

      <main className="br-resource-viewer-page">
        <div className="br-resource-viewer-header">
          <div className="br-resource-viewer-header__content">
            <h1>{resource.title}</h1>
            <p>Preview the resource below.</p>
          </div>

          <div className="br-resource-viewer-header__actions">
            <button
              className="br-button br-resource-download-button"
              onClick={handleDownload}
            >
              Download Resource
            </button>
          </div>
        </div>

        <div className="br-resource-viewer">{renderViewer(resource)}</div>
      </main>
    </>
  );
}