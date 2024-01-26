

document.addEventListener("DOMContentLoaded", function () {
  // Simulate file structure (replace this with your actual structure)
  const fileStructure = {
    docs: {
      Introduction: "main.md",
      Installation: "installation.md",
      usage: {
        Configuration: "config.md",
      },
    },
  };

  // Render file structure in the sidebar
  function renderFileStructure(node, parentElement) {
    const ul = document.createElement("ul");

    for (const [description, fileName] of Object.entries(node)) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = description;
      link.href = "#"; // Add actual link or navigation logic

      li.appendChild(link);

      if (fileName instanceof Object) {
        renderFileStructure(fileName, li);
      }

      ul.appendChild(li);
    }

    parentElement.appendChild(ul);
  }

  renderFileStructure(fileStructure, document.getElementById("sidebar"));

  // Function to load and render Markdown content
  function loadMarkdownFile(key) {
    const fileName = fileStructure.docs[key];
    if (fileName) {
      // This is a simple example, you may want to use a library for better Markdown rendering
      const filePath = "../data/docs/" + fileName; // Adjust the path based on your file structure

      fetch(filePath)
        .then((response) => response.text())
        .then((markdownContent) => {
          document.getElementById("content").innerHTML = DOMPurify.sanitize(marked.parse(markdownContent));
          
        }).then(() => (
          hljs.highlightAll()
        ));
    }
  }

  // Add event listener to handle clicks on links in the sidebar
  document
    .getElementById("sidebar")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        event.preventDefault();
        const key = event.target.textContent;
        loadMarkdownFile(key);
      }
    });
});
