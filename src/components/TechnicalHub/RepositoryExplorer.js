"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./technical-hub.module.css";

const REPO_OWNER = "AstraViam";
const REPO_NAME = "Volare";
const BRANCH = "main";

const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`;

const GITHUB_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;

function getNameFromPath(path) {
  if (!path) return "";

  const parts = path.split("/");

  return parts[parts.length - 1];
}

function getGitHubUrl(path) {
  return `${GITHUB_URL}/blob/${BRANCH}/${path}`;
}

function getFolderUrl(path) {
  return `${GITHUB_URL}/tree/${BRANCH}/${path}`;
}

function getExtension(name) {
  if (!name) return "";

  const parts = name.split(".");

  if (parts.length === 1) return "";

  return parts.pop().toLowerCase();
}

function getFileIcon(item) {
  if (item.type === "tree") {
    return "⌁";
  }

  const name = item.name || getNameFromPath(item.path);

  const extension = getExtension(name);

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
    cpp: "C++",
    c: "C",
    h: "H",
    csv: "CSV",
    xlsx: "XLS",
    zip: "ZIP",
  };

  return icons[extension] || "FILE";
}

function getCategory(path) {
  if (!path) return "Other";

  const firstFolder = path.split("/")[0]?.toLowerCase();

  if (!firstFolder) return "Other";

  if (firstFolder.includes("mechanical")) return "Mechanical";
  if (firstFolder.includes("electrical")) return "Electrical";
  if (firstFolder.includes("software")) return "Software";
  if (firstFolder.includes("documentation")) return "Documentation";
  if (firstFolder.includes("docs")) return "Documentation";
  if (firstFolder.includes("cad")) return "Mechanical";
  if (firstFolder.includes("design")) return "Design";

  return "Other";
}

function formatPath(path) {
  if (!path) return "Repository root";

  const parts = path.split("/");

  parts.pop();

  return parts.join(" / ") || "Repository root";
}

function buildTree(items) {
  const root = {
    name: "Volarego",
    type: "tree",
    children: [],
  };

  for (const item of items) {
    const parts = item.path.split("/");

    let current = root;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;

      if (!current.children) {
        current.children = [];
      }

      let existing = current.children.find((child) => child.name === part);

      if (!existing) {
        const currentPath = parts.slice(0, index + 1).join("/");

        existing = {
          name: part,
          type: isLast ? item.type : "tree",
          path: currentPath,
          url:
            isLast && item.type === "blob"
              ? getGitHubUrl(item.path)
              : getFolderUrl(currentPath),
          children: [],
        };

        current.children.push(existing);
      }

      current = existing;
    });
  }

  return root;
}

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 1);

  const isFolder = node.type === "tree";

  if (!isFolder) {
    return (
      <a
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.treeFile}
        style={{
          paddingLeft: `${depth * 22 + 12}px`,
        }}
      >
        <span className={styles.treeFileIcon}>{getFileIcon(node)}</span>

        <span className={styles.treeName}>{node.name}</span>

        <span className={styles.externalArrow}>↗</span>
      </a>
    );
  }

  return (
    <div>
      <button
        className={styles.treeFolder}
        onClick={() => setOpen((value) => !value)}
        style={{
          paddingLeft: `${depth * 22 + 12}px`,
        }}
      >
        <span className={`${styles.chevron} ${open ? styles.open : ""}`}>
          ›
        </span>

        <span className={styles.folderIcon}>⌁</span>

        <span>{node.name}</span>
      </button>

      {open && node.children?.length > 0 && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={`${child.path}-${child.type}`}
              node={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ResultCard({ item }) {
  const isFolder = item.type === "tree";

  const name = item.name || getNameFromPath(item.path);

  const url = isFolder ? getFolderUrl(item.path) : getGitHubUrl(item.path);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.resultCard}
    >
      <div className={styles.resultIcon}>
        {isFolder ? "⌁" : getFileIcon(item)}
      </div>

      <div className={styles.resultContent}>
        <div className={styles.resultTop}>
          <h3>{name}</h3>

          <span className={styles.resultArrow}>↗</span>
        </div>

        <p>{formatPath(item.path)}</p>

        <span className={styles.resultType}>
          {isFolder ? "Folder" : "File"}
        </span>
      </div>
    </a>
  );
}

export default function RepositoryExplorer() {
  const [items, setItems] = useState([]);
  const [tree, setTree] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRepository() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`GitHub returned status ${response.status}`);
        }

        const data = await response.json();

        if (!data.tree) {
          throw new Error("Repository tree could not be loaded.");
        }

        const cleanedItems = data.tree
          .filter((item) => item.type === "blob" || item.type === "tree")
          .filter((item) => !item.path.startsWith(".git/"))
          .map((item) => ({
            ...item,

            // IMPORTANT FIX
            name: getNameFromPath(item.path),
          }));

        setItems(cleanedItems);
        setTree(buildTree(cleanedItems));
      } catch (err) {
        console.error(err);

        setError(
          "We couldn't load the repository right now. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadRepository();
  }, []);

  const categories = useMemo(() => {
    const found = new Set();

    items.forEach((item) => {
      found.add(getCategory(item.path));
    });

    return ["All", ...Array.from(found).sort()];
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items
      .filter((item) => {
        if (category === "All") return true;

        return getCategory(item.path) === category;
      })
      .filter((item) => {
        if (!query) return true;

        return (
          item.name.toLowerCase().includes(query) ||
          item.path.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "tree" ? -1 : 1;
        }

        return a.path.localeCompare(b.path);
      });
  }, [items, search, category]);

  const totalFiles = items.filter((item) => item.type === "blob").length;

  const totalFolders = items.filter((item) => item.type === "tree").length;

  return (
    <>
      {loading && (
        <div className={styles.loadingBox}>
          <div className={styles.loader} />

          <div>
            <strong>Loading repository</strong>

            <p>Fetching the latest Volare resources from GitHub.</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className={styles.errorBox}>
          <div className={styles.errorIcon}>!</div>

          <div>
            <strong>Repository unavailable</strong>

            <p>{error}</p>

            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              Open GitHub directly ↗
            </a>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className={styles.stats}>
            <div>
              <strong>{totalFolders}</strong>
              <span>Folders</span>
            </div>

            <div>
              <strong>{totalFiles}</strong>
              <span>Files</span>
            </div>

            <div>
              <strong>OPEN</strong>
              <span>Repository</span>
            </div>
          </div>

          <div className={styles.categories}>
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={
                  category === item
                    ? `${styles.categoryButton} ${styles.activeCategory}`
                    : styles.categoryButton
                }
              >
                {item}
              </button>
            ))}
          </div>

          {search && (
            <div className={styles.searchInfo}>
              <span>
                {filteredItems.length} result
                {filteredItems.length !== 1 ? "s" : ""}
              </span>

              <span>
                {" "}
                for <strong>"{search}"</strong>
              </span>
            </div>
          )}

          {search ? (
            <div className={styles.resultsGrid}>
              {filteredItems.map((item) => (
                <ResultCard key={`${item.type}-${item.path}`} item={item} />
              ))}
            </div>
          ) : (
            tree && (
              <div className={styles.treeSection}>
                <div className={styles.treeHeader}>
                  <div>
                    <span>REPOSITORY STRUCTURE</span>

                    <strong>Volarego</strong>
                  </div>

                  <span className={styles.branch}>branch / {BRANCH}</span>
                </div>

                <div className={styles.tree}>
                  {tree.children?.map((node) => (
                    <TreeNode key={`${node.path}-${node.type}`} node={node} />
                  ))}
                </div>
              </div>
            )
          )}

          {!loading && search && filteredItems.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyShape}>?</div>

              <h3>No results found</h3>

              <p>Try another file name, folder name or search term.</p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear search
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
