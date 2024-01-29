document.addEventListener("DOMContentLoaded", function () {
  // Simulate file structure (replace this with your actual structure)
  const fileStructure = {
    Introduction: {
      "Quick-Overview": "overview.md",
      "Frequently-Asked-Questions": "faq.md",
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

// Function to set margin-top based on window width
function setMarginTop() {
  var element1 = document.querySelector('.sidebar-container');
  var element2 = document.querySelector('.content');

  // Check window width
  if (window.innerWidth <= 767) {
    // Set margin-top of element2 based on the height of element1
    var marginTopValue = element1.clientHeight + 'px';
    element2.style.marginTop = marginTopValue;

    // Optional: Log the margin-top value for verification
    console.log('Margin-top set to:', marginTopValue);
  } else {
    // Reset margin-top when window width is greater than 767
    element2.style.marginTop = '0';
  }
}

// Initial call to setMarginTop on page load
setMarginTop();

// Event listener to call setMarginTop on window resize
window.addEventListener('resize', setMarginTop);
