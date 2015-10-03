function _onhashchange() {
  var matches = document.URL.match(/#L(?:[\d]+)$/);

  if (matches) {
    var path = $('.js-permalink-shortcut').attr('href') + matches[0];
    var url = 'https://github.com' + path;
    if (url != document.URL) {
      history.replaceState('', '', path);
    }

    chrome.runtime.sendMessage({ mode: 'open', url: document.URL }, () => {});
  } else {
    chrome.runtime.sendMessage({ mode: 'close' }, () => {});
  }
}

_onhashchange();
//window.onhashchange = _onhashchange;
window.onpopstate = () => {
  _onhashchange();
};
