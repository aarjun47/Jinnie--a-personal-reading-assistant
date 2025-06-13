document.getElementById("submit").addEventListener("click", () => {
  const question = document.getElementById("question").value;
  document.getElementById("response").innerText = "Thinking...";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" }, (res) => {
      if (!res || !res.content) {
        document.getElementById("response").innerText = "Couldn't extract content.";
        return;
      }

      fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: res.content, question })
      })
        .then((r) => r.json())
        .then((data) => {
          document.getElementById("response").innerText = data.answer || data.error;
        })
        .catch(() => {
          document.getElementById("response").innerText = "Error talking to server.";
        });
    });
  });
});
