function getReadableContent() {
  const articleTags = document.querySelectorAll("article");
  if (articleTags.length) {
    return Array.from(articleTags).map(el => el.innerText).join("\\n");
  }

  const paragraphs = Array.from(document.querySelectorAll("p"));
  return paragraphs.map(p => p.innerText).join("\\n");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrape") {
    const content = getReadableContent();
    sendResponse({ content });
  }
});
