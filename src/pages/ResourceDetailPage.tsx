import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import ResourceDetail from "../components/resources/ResourceDetail";

import { resourceService } from "../services/resource.service";

import type {
  Resource,
} from "../types/resource";

import { useAuth } from "../hooks/useAuth";

import AppHeader from "../components/layout/AppHeader";

import {
  trackResourceView,
  downloadResource,
} from "../services/internal-api.service";

export default function ResourceDetailPage() {
  const { slug } = useParams();

  const { user } = useAuth();

  console.log("ResourceDetailPage mounted");
  console.log("slug:", slug);
  const [
    resource,
    setResource,
  ] = useState<Resource | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    async function load() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const data =
          await resourceService.getResourceBySlug(
            slug
          );

        setResource(data);

        if (
          user &&
          data
        ) {
          await trackResourceView(
            user.id,
            data.id
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug, user]);

  const handleDownload =
    async () => {
      if (!resource) {
        return;
      }

      try {
        if (!user) {
throw new Error(
"User not authenticated"
);
}

const response =
await downloadResource(
user.id,
resource.id
);


        if (!response.ok) {
          throw new Error(
            "Download failed"
          );
        }

        const blob =
          await response.blob();

        const url =
          window.URL.createObjectURL(
            blob
          );

        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.download =
          resource.title;

        document.body.appendChild(
          link
        );

        link.click();

        link.remove();

        window.URL.revokeObjectURL(
          url
        );
      } catch (error) {
        console.error(
          "Download failed",
          error
        );
      }
    };

  if (loading) {
  return (
    <>
      <AppHeader />
      <p
        style={{
          padding: "2rem",
        }}
      >
        Loading...
      </p>
    </>
  );
}

  if (!resource) {
  return (
    <>
      <AppHeader />
      <p
        style={{
          padding: "2rem",
        }}
      >
        Resource not found.
      </p>
    </>
  );
}

  return (
    <>
    <AppHeader />
    <main
      style={{
        maxWidth:
          "900px",
        margin:
          "0 auto",
        padding:
          "2rem",
      }}
    >
      <ResourceDetail
        resource={resource}
        onDownload={
          handleDownload
        }
      />
    </main>
    </>
  );
}