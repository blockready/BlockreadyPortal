import { Link } from "react-router-dom";

import type {
  Resource,
} from "../../types/resource";

interface Props {
  resource: Resource;
}

export default function ResourceCard({
  resource,
}: Props) {
  return (
    <article className="br-card br-card--resource">
      <style>{`
        .br-card--resource {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: #ffffff;
          border: 1px solid #e8e6df;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 1px 2px rgba(20, 20, 20, 0.04);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }

        .br-card--resource:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(20, 20, 20, 0.10);
          border-color: #d8d4c8;
        }

        .br-card--resource__title {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.35;
          color: #1c1c1a;
        }

        .br-card--resource__desc {
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.5;
          color: #5b5950;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .br-card--resource__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.1rem;
        }

        .br-card--resource__tag {
          display: inline-flex;
          align-items: center;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          padding: 0.28rem 0.65rem;
          border-radius: 999px;
        }

        .br-card--resource__tag--category {
          background: #eef2ff;
          color: #3947b3;
        }

        .br-card--resource__tag--type {
          background: #f0f5ed;
          color: #3f6b32;
        }

        .br-card--resource__cta {
          margin-top: auto;
          padding-top: 0.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
          background: #3947b3;
          border-radius: 10px;
          padding: 0.6rem 1rem;
          text-decoration: none;
          text-align: center;
          justify-content: center;
          transition: background 0.15s ease, gap 0.15s ease;
        }

        .br-card--resource__cta:hover {
          background: #3a3a35;
          gap: 0.6rem;
        }

        .br-card--resource__cta:focus-visible {
          outline: 2px solid #3518d4;
          outline-offset: 2px;
        }
      `}</style>

      <h3 className="br-card--resource__title">
        {resource.title}
      </h3>

      <p className="br-card--resource__desc">
        {resource.description}
      </p>

      <div className="br-card--resource__tags">
        <span className="br-card--resource__tag br-card--resource__tag--category">
          {resource.category}
        </span>

        <span className="br-card--resource__tag br-card--resource__tag--type">
          {resource.resource_type}
        </span>
      </div>

      <Link
        to={`/resource/${resource.slug}`}
        className="br-button br-card--resource__cta"
      >
        View Resource
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}