// Open the side panel when the user clicks the extension action icon.
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((err) => console.error('ReStyld sidePanel:', err));
