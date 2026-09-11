"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./technical-hub.module.css";

const OWNER = "AstraViam";
const REPO = "Volare";
const BRANCH = "main";

const GITHUB_URL = `https://github.com/${OWNER}/${REPO}`;

const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`;

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function getExtension(name = "") {
  const parts = name.split(".");

  if (parts.length <= 1) {
    return "";
  }

  return parts[parts.length - 1].toLowerCase();
}

function getIcon(item) {
  if (item.type === "tree") {
    return "▾";
  }

  const extension = getExtension(item.name);

  const icons = {
    js: "JS",
    jsx: "JS",
    ts: "TS",
    tsx: "TS",
    css: "CSS",
    scss: "CSS",
    html: "WEB",
    json: "{}",
    md: "MD",
    pdf: "PDF",
    png: "IMG",
    jpg: "IMG",
    jpeg: "IMG",
    webp: "IMG",
    svg: "SVG",
    gif: "IMG",
    mp4: "VID",
    mov: "VID",
    webm: "VID",
    py: "PY",
    c: "C",
    cpp: "C++",
    h: "H",
    csv: "CSV",
  };

  return icons[extension] || "FILE";
}

function getGitHubUrl(item) {
  if (item.type === "tree") {
    return `${GITHUB_URL}/tree/${BRANCH}/${item.path}`;
  }

  return `${GITHUB_URL}/blob/${BRANCH}/${item.path}`;
}

function getCategory(path = "") {
  const firstFolder = path.split("/")[0].toLowerCase();

  if (firstFolder.includes("mechanical")) {
    return "Mechanical";
  }

  if (firstFolder.includes("electrical")) {
    return "Electrical";
  }

  if (firstFolder.includes("software")) {
    return "Software";
  }

  if (firstFolder.includes("documentation") || firstFolder.includes("docs")) {
    return "Documentation";
  }

  if (firstFolder.includes("design")) {
    return "Design";
  }

  return "Other";
}

// --------------------------------------------------
// Build nested tree
// --------------------------------------------------

function buildTree(items) {
  const root = {
    name: REPO,
    path: "",
    type: "root",
    children: [],
  };

  for (const item of items) {
    const parts = item.path.split("/");

    let current = root;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;

      let existing = current.children.find((child) => child.name === part);

      if (!existing) {
        existing = {
          name: part,
          path: parts.slice(0, index + 1).join("/"),
          type: isLast ? item.type : "tree",
          children: [],
        };

        current.children.push(existing);
      }

      current = existing;
    });
  }

  function sortNode(node) {
    node.children.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === "tree" ? -1 : 1;
      }

      return a.name.localeCompare(b.name);
    });

    node.children.forEach(sortNode);
  }

  sortNode(root);

  return root;
}

// --------------------------------------------------
// Nested Tree Item
// --------------------------------------------------

function TreeItem({ item, depth = 0, expanded, toggleFolder }) {
  const isFolder = item.type === "tree" || item.type === "root";

  const isRoot = item.type === "root";

  const isExpanded = expanded[item.path] ?? depth < 1;

  const url = isRoot ? GITHUB_URL : getGitHubUrl(item);

  return (
    <div className={styles.treeNode}>
      <div
        className={styles.treeRow}
        style={{
          paddingLeft: `${depth * 24 + 10}px`,
        }}
      >
        {/* Expand button */}

        {isFolder ? (
          <button
            className={
              isExpanded ? styles.folderArrowExpanded : styles.folderArrow
            }
            onClick={(event) => {
              event.stopPropagation();
              toggleFolder(item.path);
            }}
            aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
          >
            ›
          </button>
        ) : (
          <span className={styles.folderArrowPlaceholder} />
        )}

        {/* Icon */}

        <div className={isFolder ? styles.folderIcon : styles.fileIcon}>
          {isRoot ? "⌘" : getIcon(item)}
        </div>

        {/* Name */}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.treeName}
        >
          {item.name}
        </a>

        {/* Type */}

        <span className={styles.treeType}>
          {isRoot ? "REPOSITORY" : isFolder ? "FOLDER" : "FILE"}
        </span>

        {/* GitHub arrow */}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.treeExternal}
          aria-label={`Open ${item.name} on GitHub`}
        >
          ↗
        </a>
      </div>

      {/* Children */}

      {isFolder && isExpanded && (
        <div className={styles.treeChildren}>
          {item.children.map((child) => (
            <TreeItem
              key={child.path}
              item={child}
              depth={depth + 1}
              expanded={expanded}
              toggleFolder={toggleFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------
// Main Component
// --------------------------------------------------

export default function TechnicalHub() {
  const [items, setItems] = useState([]);

  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [expanded, setExpanded] = useState({});

  // ------------------------------------------------
  // Fetch GitHub
  // ------------------------------------------------

  useEffect(() => {
    async function loadRepository() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`GitHub returned ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (!data.tree) {
          throw new Error("Repository tree missing");
        }

        const repositoryItems = data.tree
          .filter((item) => item.type === "blob" || item.type === "tree")
          .filter((item) => !item.path.startsWith(".git/"))
          .map((item) => ({
            ...item,
            name: item.path.split("/").pop(),
          }));

        setItems(repositoryItems);
      } catch (err) {
        console.error("GitHub repository error:", err);

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadRepository();
  }, []);

  // ------------------------------------------------
  // Build tree
  // ------------------------------------------------

  const tree = useMemo(() => {
    return buildTree(items);
  }, [items]);

  // ------------------------------------------------
  // Counts
  // ------------------------------------------------

  const files = useMemo(() => {
    return items.filter((item) => item.type === "blob");
  }, [items]);

  const folders = useMemo(() => {
    return items.filter((item) => item.type === "tree");
  }, [items]);

  // ------------------------------------------------
  // Categories
  // ------------------------------------------------

  const categories = [
    "All",
    "Mechanical",
    "Electrical",
    "Software",
    "Documentation",
    "Design",
    "Other",
  ];

  const categoryCounts = useMemo(() => {
    const counts = {};

    categories.forEach((category) => {
      if (category === "All") {
        counts[category] = items.length;
      } else {
        counts[category] = items.filter(
          (item) => getCategory(item.path) === category,
        ).length;
      }
    });

    return counts;
  }, [items]);

  // ------------------------------------------------
  // Search
  // ------------------------------------------------

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items
      .filter((item) => {
        if (activeCategory === "All") {
          return true;
        }

        return getCategory(item.path) === activeCategory;
      })
      .filter((item) => {
        if (!query) {
          return true;
        }

        return (
          item.name.toLowerCase().includes(query) ||
          item.path.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => a.path.localeCompare(b.path));
  }, [items, search, activeCategory]);

  // ------------------------------------------------
  // Toggle folder
  // ------------------------------------------------

  function toggleFolder(path) {
    setExpanded((previous) => ({
      ...previous,
      [path]: !(previous[path] ?? false),
    }));
  }

  // ------------------------------------------------
  // Expand everything
  // ------------------------------------------------

  function expandAll() {
    const foldersState = {};

    items
      .filter((item) => item.type === "tree")
      .forEach((item) => {
        foldersState[item.path] = true;
      });

    foldersState[""] = true;

    setExpanded(foldersState);
  }

  // ------------------------------------------------
  // Collapse everything
  // ------------------------------------------------

  function collapseAll() {
    setExpanded({});
  }

  // ------------------------------------------------
  // Category select
  // ------------------------------------------------

  function selectCategory(category) {
    setActiveCategory(category);
    setSearch("");
  }

  // ------------------------------------------------
  // Render
  // ------------------------------------------------

  return (
    <main className={styles.page}>
      {/* BACKGROUND */}

      <div className={styles.grid} />

      <div className={`${styles.ring} ${styles.ringOne}`} />

      <div className={`${styles.ring} ${styles.ringTwo}`} />

      <div className={styles.orbit}>
        <span />
      </div>

      <div className={`${styles.cross} ${styles.crossOne}`}>
        <span />
        <span />
      </div>

      <div className={`${styles.cross} ${styles.crossTwo}`}>
        <span />
        <span />
      </div>

      <div className={styles.diagonalLine} />

      {/* HERO */}

      <section className={styles.hero}>
        <div className={styles.eyebrow}>
          <span className={styles.liveDot} />
          ASTRA VIAM
          <span className={styles.slash}>/</span>
          VOLARE
          <span className={styles.slash}>/</span>
          TECHNICAL HUB
        </div>

        <h1>
          Built to be
          <br />
          <span>explored.</span>
        </h1>

        <p className={styles.heroDescription}>
          Explore the engineering, technical documentation and development work
          behind Volare.
        </p>

        {/* SEARCH */}

        <div className={styles.searchBox}>
          <div className={styles.searchSymbol}>⌕</div>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search files, folders or technical documents..."
            aria-label="Search repository"
          />

          {search && (
            <button className={styles.clear} onClick={() => setSearch("")}>
              ×
            </button>
          )}

          <div className={styles.searchHint}>SEARCH</div>
        </div>

        {/* STATS */}

        <div className={styles.stats}>
          <div>
            <strong>{loading ? "—" : files.length}</strong>

            <span>FILES</span>
          </div>

          <div className={styles.statDivider} />

          <div>
            <strong>{loading ? "—" : folders.length}</strong>

            <span>FOLDERS</span>
          </div>

          <div className={styles.statDivider} />

          <div>
            <strong>PUBLIC</strong>
            <span>REPOSITORY</span>
          </div>
        </div>
      </section>

      {/* REPOSITORY */}

      <section className={styles.repository}>
        <div className={styles.repositoryHeading}>
          <div>
            <div className={styles.sectionLabel}>REPOSITORY EXPLORER</div>

            <h2>Find anything.</h2>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            Open GitHub
            <span>↗</span>
          </a>
        </div>

        {/* FILTERS */}

        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? `${styles.filter} ${styles.filterActive}`
                  : styles.filter
              }
              onClick={() => selectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* TREE CONTROLS */}

        <div className={styles.treeToolbar}>
          <div>
            {search ? (
              <>
                Showing <strong>{results.length}</strong> matching resources
              </>
            ) : (
              <>Volarego repository</>
            )}
          </div>

          <div className={styles.treeActions}>
            <button onClick={expandAll}>Expand all</button>

            <button onClick={collapseAll}>Collapse all</button>
          </div>
        </div>

        {/* LOADING */}

        {loading && (
          <div className={styles.loading}>
            <div className={styles.loadingCircle} />

            <p>Connecting to the Volare repository...</p>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className={styles.error}>
            <div className={styles.errorMark}>!</div>

            <h3>Repository unavailable</h3>

            <p>GitHub could not be reached right now.</p>

            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              Open repository directly ↗
            </a>
          </div>
        )}

        {/* NORMAL NESTED TREE */}

        {!loading && !error && !search && (
          <div className={styles.tree}>
            <TreeItem
              item={tree}
              depth={0}
              expanded={expanded}
              toggleFolder={toggleFolder}
            />
          </div>
        )}

        {/* SEARCH RESULTS */}

        {!loading && !error && search && (
          <div className={styles.results}>
            {results.map((item) => {
              const resultItem = {
                ...item,
                name: item.path.split("/").pop(),
              };

              return (
                <a
                  key={`${item.type}-${item.path}`}
                  href={getGitHubUrl(resultItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.result}
                >
                  <div className={styles.resultIcon}>{getIcon(resultItem)}</div>

                  <div className={styles.resultText}>
                    <h3>{resultItem.name}</h3>

                    <p>{resultItem.path}</p>
                  </div>

                  <div className={styles.resultMeta}>
                    <span>{item.type === "tree" ? "FOLDER" : "FILE"}</span>

                    <strong>↗</strong>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* EMPTY */}

        {!loading && !error && search && results.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyMark}>?</div>

            <h3>Nothing found.</h3>

            <p>Try another file, folder or search term.</p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Reset search
            </button>
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}

      <section className={styles.bottom}>
        <div className={styles.bottomShape}>
          <div />
          <div />
          <div />
        </div>

        <div className={styles.bottomContent}>
          <div className={styles.sectionLabel}>THE COMPLETE SOURCE</div>

          <h2>
            See where
            <br />
            everything lives.
          </h2>

          <p>Dive into the complete Volarego repository on GitHub.</p>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bottomButton}
          >
            Explore repository
            <span>↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
