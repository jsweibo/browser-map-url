let eventListeners = [];

function start() {
  chrome.storage.local.get('config', function (res) {
    if ('config' in res) {
      if (res.config.status) {
        // on

        // get active rules
        const activeRules = res.config.rules.filter(function (rule) {
          return rule[rule.length - 1] !== false;
        });

        if (activeRules.length) {
          // generate all event listener
          eventListeners = activeRules.map(function (activeRule) {
            return function (requestDetails) {
              return {
                redirectUrl: requestDetails.url.replace(
                  activeRule[1],
                  activeRule[2]
                ),
              };
            };
          });

          // bind every event listener
          eventListeners.forEach(function (eventListener, index) {
            chrome.webRequest.onBeforeRequest.addListener(
              eventListener,
              { urls: [activeRules[index][0]] },
              ['blocking']
            );
          });
        }
      }
    } else {
      // writing settings will invoke chrome.storage.onChanged
      chrome.storage.local.set({
        config: DEFAULT_SETTINGS,
      });
    }
  });
}

chrome.browserAction.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage();
});

chrome.storage.onChanged.addListener(function () {
  // clear
  eventListeners.forEach(function (eventListener) {
    chrome.webRequest.onBeforeRequest.removeListener(eventListener);
  });
  eventListeners = [];

  // restart
  start();
});

// start
start();
