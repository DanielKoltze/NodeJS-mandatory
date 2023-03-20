const dropdown = document.getElementById("dropdown")

fetch("/api/documents")
  .then((res) => res.json())
  .then((data) => {
    const files = data.data

    files.forEach((file) => {
      const a = document.createElement("a")
      file = file.replace(".html", "")
      a.innerText = file
      a.href = "/documents/" + file.replace(".html", "")
      dropdown.appendChild(a)
    })
  })
