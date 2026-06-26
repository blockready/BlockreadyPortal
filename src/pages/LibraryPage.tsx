import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ResourceCard from "../components/resources/ResourceCard";

import { resourceService } from "../services/resource.service";

import AppHeader from "../components/layout/AppHeader";

import type {
  Resource,
} from "../types/resource";

export default function LibraryPage() {
  const [
    resources,
    setResources,
  ] = useState<Resource[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        const data =
          await resourceService.getResources();

        setResources(data);
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const categories =
    useMemo(() => {
      const values =
        resources.map(
          (r) =>
            r.category
        );

      return [
        "all",
        ...new Set(values),
      ];
    }, [resources]);

  const filtered =
    useMemo(() => {
      return resources.filter(
        (resource) => {
          const matchesSearch =
            resource.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesCategory =
            category ===
              "all" ||
            resource.category ===
              category;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      resources,
      search,
      category,
    ]);

  return (
    <>
    <AppHeader />
    <main
      style={{
        maxWidth:
          "1200px",
        margin:
          "0 auto",
        padding:
          "2rem 1rem",
      }}
    >
      <style>{`
        .br-input--search {
          flex: 1;
          min-width: 0;
          font-size: 0.95rem;
          color: #1c1c1a;
          background: #ffffff;
          border: 1px solid #d8d6cd;
          border-radius: 10px;
          padding: 0.7rem 1rem;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .br-input--search::placeholder {
          color: #9a978c;
        }

        .br-input--search:focus {
          border-color: #3947b3;
          box-shadow: 0 0 0 3px rgba(57, 71, 179, 0.12);
        }

        .br-select--category {
          flex: 0 0 140px;
          min-width: 140px;
          font-size: 0.95rem;
          font-weight: 500;
          color: #1c1c1a;
          background: #ffffff;
          border: 1px solid #d8d6cd;
          border-radius: 10px;
          padding: 0.7rem 1.8rem 0.7rem 0.85rem;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M0 0L5 6L10 0Z' fill='%235b5950'/></svg>");
          background-repeat: no-repeat;
          background-position: right 0.8rem center;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .br-select--category:focus {
          border-color: #3947b3;
          box-shadow: 0 0 0 3px rgba(57, 71, 179, 0.12);
        }

        .br-filters-row {
          flex-wrap: wrap;
        }

       @media (max-width:560px){

.br-filters-row{
flex-direction:column;
align-items:stretch;
}

.br-input--search{
width:100%;
}

.br-select--category{
width:100%;
min-width:unset;
flex:none;
}

}
      `}</style>

      <h1>
        Resource Library
      </h1>

      <p>
        Browse free
        educational resources.
      </p>

      <div
        className="br-filters-row"
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom:
            "2rem",
        }}
      >
        <input
          className="br-input br-input--search"
          placeholder="Search resources..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <select
          className="br-select br-select--category"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          {categories.map(
            (
              category
            ) => (
              <option
                key={
                  category
                }
                value={
                  category
                }
              >
                {category}
              </option>
            )
          )}
        </select>
      </div>

      {loading ? (
        <p>
          Loading...
        </p>
      ) : (
        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(280px,1fr))",
            gap: "1rem",
          }}
        >
          {filtered.map(
            (
              resource
            ) => (
              <ResourceCard
                key={
                  resource.id
                }
                resource={
                  resource
                }
              />
            )
          )}
        </div>
      )}
    </main>
    </>
  );
}