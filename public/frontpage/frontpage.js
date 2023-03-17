const dropdown = document.getElementById("dropdown")

const response = await fetch("/api/documents")
const data = await response.json()
const files = data.data

files.forEach((file) => {
  const a = document.createElement("a")
  file = file.replace(".html", "")
  a.innerText = file
  a.href = "documents/" + file.replace(".html","")
  dropdown.appendChild(a)
})
