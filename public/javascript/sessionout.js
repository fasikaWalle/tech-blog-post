function idleTimer() {
  var time;
  //window.onload = resetTimer;
  window.onmousemove = resetTimer; // catches mouse movements
  window.onmousedown = resetTimer; // catches mouse movements
  window.onclick = resetTimer; // catches mouse clicks
  window.onscroll = resetTimer; // catches scrolling
  window.onkeypress = resetTimer; //catches keyboard actions

  async function logout() {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      console.log(response.statusText);
    }
    //Adapt to actual logout script
  }

  function reload() {
    window.location = self.location.href; //Reloads the current page
  }

  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logout, 60000); // time is in milliseconds (1000 is 1 second)
    time = setTimeout(reload, 60000); // time is in milliseconds (1000 is 1 second)
  }
}
idleTimer();
