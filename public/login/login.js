document.getElementById("login-button").addEventListener("click", async (e) => {
  const setting = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }),
    redirect: "follow",
  }
  const res = await fetch("/api/login", setting)

  if (res.ok) {
    window.location.replace("/create-html")
  }
  const data = await res.json()
})
