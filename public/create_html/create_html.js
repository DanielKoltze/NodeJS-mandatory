const h1NoClass = document.getElementById("h1-no-class-element")
const pNoClass = document.getElementById("p-no-class-element")
const divNoClass = document.getElementById("div-no-class-element")
const divWithClass = document.getElementById("div-with-class-element")

const textArea = document.getElementById("textarea-html")

const inputTitle = document.getElementById("title-input")
const upperHTML = document.getElementById("upper-textarea")
const lowerHTML = document.getElementById("lower-textarea")
lowerHTML.value = "</body> \n</html>"
const text = upperHTML.value
inputTitle.addEventListener("keyup", (e) => {
  const titleLength = "<title>".length
  const position = text.indexOf("<title>") + titleLength

  upperHTML.value =
    text.substring(0, position) +
    inputTitle.value +
    text.substring(position, text.length - 1)
})

function writeElement(elementToWrite, classes = "") {
  textArea.value += `\n <${elementToWrite} class="${classes}"></${elementToWrite}>`
}

h1NoClass.addEventListener("click", (e) => {
  writeElement("h1")
})

pNoClass.addEventListener("click", (e) => {
  writeElement("p")
})
divNoClass.addEventListener("click", (e) => {
  writeElement("div")
})
divWithClass.addEventListener("click", (e) => {
  writeElement("div", "code-snippet")
})

document.getElementById("create-html-btn").addEventListener("click", (e) => {
  const setting = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      HTMLPage: upperHTML.value + textArea.value + lowerHTML.value,
      documentName: inputTitle.value,
    }),
  }
  fetch("/create-html", setting)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      window.location.href = "/"
    })
    .catch((e) => {
      console.log(e)
    })
})
