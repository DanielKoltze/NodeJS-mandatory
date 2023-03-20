import express from "express"
import path from "path"
import fs from "fs"
import templateEngine from "./public/util/templateEngine.js"
const app = express()

//søger for at vi kan parse data i bodyen som json
app.use(express.json())

//søger for at alt i public kan tilgås
app.use(express.static("public"))

//de forskellige pages der bliver renderet med renderpage

const frontpagePath = "./public/pages/frontpage/frontpage.html"
const frontpage = templateEngine.renderPage(frontpagePath, {
  title: "Frontpage",
  cssLink: `<link rel="stylesheet" href="../pages/frontpage/frontpage.css" />`,
  navbar: true,
})

const signupPath = "./public/pages/signup/signup.html"
const sigupPage = templateEngine.renderPage(signupPath, {
  title: "Signup",
})

const loginPath = "./public/pages/login/login.html"
const loginPage = templateEngine.renderPage(loginPath, {
  title: "Login",
})

const createHtmlPath = "./public/pages/create_html/create_html.html"
const createHtmlPage = templateEngine.renderPage(createHtmlPath, {
  title: "Create HTML",
  cssLink: `<link rel="stylesheet" href="../pages/create_html/create_html.css" />`,
  navbar: true,
})

const terminalpagePath = "./public/pages/terminal/terminal.html"
const terminalpagePage = templateEngine.renderPage(terminalpagePath, {
  title: "Terminal",
  navbar: true,
  cssLink: `<link rel="stylesheet" href="/assets/css/main.css" />
  <link rel="stylesheet" href="../pages/terminal/terminal.css" />`,
})

const expresspagePath = "./public/pages/express/express.html"
const expresspagePage = templateEngine.renderPage(expresspagePath, {
  title: "Express",
  navbar: true,
  cssLink: `<link rel="stylesheet" href="/assets/css/main.css" />`,
})

const javascriptpagePath = "./public/pages/javascript/javascript.html"
const javascriptpagePage = templateEngine.renderPage(javascriptpagePath, {
  title: "Javascript",
  navbar: true,
  cssLink: `<link rel="stylesheet" href="/assets/css/main.css" />
  <link rel="stylesheet" href="../pages/javascript/javascript.css" />`,
})

app.get("/", (req, res) => {
  res.send(frontpage)
})

app.get("/terminal", (req, res) => {
  res.send(terminalpagePage)
})

app.get("/express", (req, res) => {
  res.send(expresspagePage)
})

/*
app.get("/express", (req, res) => {
  res.sendFile(path.resolve("public/express/express.html"))
})
*/

app.get("/javascript", (req, res) => {
  res.send(javascriptpagePage)
})

const users = [{ username: "daniel", password: 123 }]

app.get("/signup", (req, res) => {
  res.send(sigupPage)
})

app.get("/login", (req, res) => {
  res.send(loginPage)
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
  res.send(createHtmlPage)
})

app.post("/create-html", (req, res) => {
  if (
    fs.existsSync(
      `public/pages/documents_from_users/${req.params.documentName}.html`
    )
  ) {
    return res.send({ message: "document is already created" })
  }

  fs.writeFile(
    `public/pages/documents_from_users/${req.body.documentName}.html`,
    req.body.HTMLPage,
    (error) => {
      if (error) {
        return res.send({ message: "document wasnt created" })
      } else {
        return res.send({ message: "document created" })
      }
    }
  )
})


app.get("/documents/:documentName", (req, res) => {
  if (
    fs.existsSync(
      `public/pages/documents_from_users/${req.params.documentName}.html`
    )
  ) {
    
    return res.sendFile(
      path.resolve(
        `public/pages/documents_from_users/${req.params.documentName}.html`
      )
    )
  }
  res.send({ message: "File doesnt exist" })
})

//get all user created pages
app.get("/api/documents", (req, res) => {
  const files = []
  fs.readdirSync("public/pages/documents_from_users/").forEach((file) => {
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
