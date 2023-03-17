import express from "express"
import path from "path"
import fs from "fs"
const app = express()

//søger for at vi kan parse data i bodyen som json
app.use(express.json())

//søger for at alt i public kan tilgås
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/frontpage/frontpage.html"))
})
app.get("/terminal", (req, res) => {
  res.sendFile(path.resolve("public/terminal/terminal.html"))
})

app.get("/express", (req, res) => {
  res.sendFile(path.resolve("public/express/express.html"))
})

app.get("/javascript", (req, res) => {
  res.sendFile(path.resolve("public/javascript/javascript.html"))
})

const users = [{ username: "daniel", password: 123 }]

app.get("/signup", (req, res) => {
  res.sendFile(path.resolve("public/signup/signup.html"))
})

app.get("/login", (req, res) => {
  res.sendFile(path.resolve("public/login/login.html"))
})
app.post("/api/login", (req, res) => {
  if (req.body.username && req.body.password) {
    const user = users.find((user) => user.username === req.body.username)
    if (user && user.password.toString() === req.body.password) {
      //res.redirect("/")
      return res.send({ message: "You have succefully been logged in" })
    }
  }
  res.status(401).send({ message: "Wrong password or username" })
})
app.post("/api/signup", (req, res) => {
  const foundUser = users.find((user) => user.username === req.body.username)
  if (
    req.body.password &&
    req.body.username &&
    !foundUser &&
    req.body.password === req.body.repeatedPassword
  ) {
    users.push({ username: req.body.username, password: req.body.password })
    return res.send({ message: "The user has succesfully been created" })
  }
  res.status(401).send({ message: "The user wasnt created" })
})

app.get("/create-html", (req, res) => {
  res.sendFile(path.resolve("public/create_html/create_html.html"))
})

app.post("/create-html", (req, res) => {
  console.log(
    fs.existsSync(
      `/public/documents_from_users/${req.params.documentName}.html`
    )
  )
  if (
    fs.existsSync(`public/documents_from_users/${req.params.documentName}.html`)
  ) {
    return res.send({ message: "document is already created" })
  }

  fs.writeFile(
    `public/documents_from_users/${req.body.documentName}.html`,
    req.body.HTMLPage,
    (error) => {
      if (error) return res.send({ message: "document wasnt created" })
    }
  )
  res.send({ message: "document created" })
})

app.get("/documents/:documentName", (req, res) => {
  if (
    fs.existsSync(`public/documents_from_users/${req.params.documentName}.html`)
  ) {
    return res.sendFile(
      path.resolve(
        `public/documents_from_users/${req.params.documentName}.html`
      )
    )
  }
  res.send({ message: "File doesnt exist" })
})

//get all user created pages
app.get("/api/documents", (req, res) => {
  const files = []
  fs.readdirSync("public/documents_from_users/").forEach((file) => {
    files.push(file)
  })
  res.send({ data: files })
})

const PORT = 8080
//Åbner porten
app.listen(PORT, (error) => {
  if (error) {
    console.log(error)
  }
  console.log("Server running on port", PORT)
})
