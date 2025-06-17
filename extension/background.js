let startTime = null;
let activeTabId = null;

chrome.tabs.onActivated.addListener((activeInfo) => {
  startTime = Date.now();
  activeTabId = activeInfo.tabId;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.status === 'complete') {
    if (startTime) {
      chrome.tabs.get(tabId, (updatedTab) => {
        if (chrome.runtime.lastError || !updatedTab.url) {
          console.warn("Tab info unavailable or closed:", chrome.runtime.lastError);
          return;
        }

        try {
          const duration = Date.now() - startTime;
          const url = new URL(updatedTab.url);

          if (!url.protocol.startsWith('http')) return;

          const hostname = url.hostname;

          if (hostname === 'newtab' || hostname === 'extensions') return;

          console.log(`Tracked: ${hostname} (${duration}ms)`);

          fetch('http://localhost:5000/api/logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hostname, duration })
          });

          startTime = Date.now(); // reset timer
        } catch (err) {
          console.error("Error logging tab activity:", err);
        }
      });
    }
  }
});
