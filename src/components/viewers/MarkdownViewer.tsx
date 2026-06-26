import {
  useEffect,
  useState,
} from "react";

import ReactMarkdown from "react-markdown";

import type {
  Resource,
} from "../../types/resource";

interface Props {
  resource: Resource;
}

export default function MarkdownViewer({
  resource,
}: Props) {
  const [
    markdown,
    setMarkdown,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    async function loadMarkdown() {
      try {
        const response =
          await fetch(
            `/api/view-resource?resourceId=${resource.id}`
          );

        if (!response.ok) {
          throw new Error(
            "Unable to load markdown."
          );
        }

        const text =
          await response.text();

        setMarkdown(text);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMarkdown();
  }, [resource.id]);

  if (loading) {
    return (
      <section className="br-section-card">
        Loading markdown...
      </section>
    );
  }

  return (
    <section className="br-section-card">
      <div className="br-resource-overview">
        <ReactMarkdown>
          {markdown}
        </ReactMarkdown>
      </div>
    </section>
  );
}