document.getElementById("signup-button").addEventListener("click", async (e) => {
    const setting = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
          repeatedPassword: document.getElementById("repeatedPassword").value
      }),
    }
    const res = await fetch("/api/signup", setting)
    if (res.ok) {
        window.location.replace("/login")
      }

      
    const responseData = await res.json()
    console.log(responseData)
  })
  