import fs from "fs"

const renderPage = (pagePath, config = {}) => {
  const navbar = fs
    .readFileSync("./public/components/navbar.html")
    .toString()
    .replace("$TITLE", config.title || "Created by users")
    .replace("$CSS_LINK", config.cssLink || " kmk m")
  const page = fs.readFileSync(pagePath).toString()
  if (config.navbar) {
    return navbar + page
  } else {
    return page
  }
}

export default {
  renderPage,
}
