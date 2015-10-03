let listener = (req) => {
  let url = req.url;
  let [, user, project] = url.match(/^https?:\/\/github.com\/([^\/]+)\/([^\/]+)/);
  chrome.tabs.update(
    req.id,
    {
      url: `https://github.com/${user}/${project}/issues/new?body=${encodeURIComponent(url)}`
    }
  );
};

chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req.mode == "open") {
    if (!chrome.pageAction.onClicked.hasListener(listener)) {
      chrome.pageAction.onClicked.addListener(listener);
    }

    chrome.pageAction.show(sender.tab.id);
  } else if (req.mode == "close") {
    chrome.pageAction.onClicked.removeListener(listener);
    chrome.pageAction.hide(sender.tab.id);
  }
});
