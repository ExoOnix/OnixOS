document.addEventListener("DOMContentLoaded", function () {
  // Simulate file structure (replace this with your actual structure)
  const fileStructure = {
    Introduction: {
      "Quick-Overview": "overview.md",
    }
  };

  // Render file structure in the sidebar with limited depth
  function renderFileStructure(node, parentElement) {
    const ul = document.createElement("ul");
    ul.classList.add("nav", "nav-pills", "flex-column", "mb-auto");

    for (const [description, file] of Object.entries(node)) {
      const li = document.createElement("li");
      
      if (typeof file === "string") {
        const link = document.createElement("a");
        link.classList.add("nav-link", "link-dark");
        link.textContent = description;
        link.href = `#${description}`; // Set to "#" or your actual link
        li.appendChild(link);
      } else if (file instanceof Object) {
        const label = document.createElement("span");
        label.textContent = description;
        li.appendChild(label);

        // Recursively render nested structure
        renderFileStructure(file, li);
      }

      ul.appendChild(li);
    }

    parentElement.appendChild(ul);
  }

  // Function to load and render Markdown content
  function loadMarkdownFile(key, node) {
    const fileName = node[key];
    if (fileName) {
      // This is a simple example; you may want to use a library for better Markdown rendering
      const filePath = "../data/docs/" + fileName; // Adjust the path based on your file structure

      fetch(filePath)
        .then((response) => response.text())
        .then((markdownContent) => {
          document.getElementById("content").innerHTML = DOMPurify.sanitize(marked.parse(markdownContent));
        })
        .then(() => {
          hljs.highlightAll();
        });

      // Update the URL to reflect the current page
      window.location.hash = key;
    }
  }

  // Add event listener to handle clicks on links in the sidebar
  document.getElementById("sidebar").addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      event.preventDefault();
      const key = event.target.textContent;
      loadMarkdownFile(key, findNodeForKey(key, fileStructure));
    }
  });

  // Check the URL on page load and load the corresponding content
  const initialKey = window.location.hash.substring(1);
  if (initialKey) {
    loadMarkdownFile(initialKey, findNodeForKey(initialKey, fileStructure));
  }

  // Clear existing content in the sidebar before rendering
  document.getElementById("sidebar").innerHTML = "";

  // Render file structure
  renderFileStructure(fileStructure, document.getElementById("sidebar"));

  // Helper function to find the node with the given key in the nested structure
  function findNodeForKey(key, node) {
    if (node[key]) {
      return node;
    }
    for (const child of Object.values(node)) {
      if (child instanceof Object) {
        const result = findNodeForKey(key, child);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }
});
