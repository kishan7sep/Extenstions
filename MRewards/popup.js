const port = chrome.runtime.connect();

const staticSearchesWrapper = document.getElementById('static-search-input-wrapper');
const randomSearchesWrapper = document.getElementById('random-search-input-wrapper');

const iterationCount1 = document.getElementById('iteration-count-1');
const iterationCount2 = document.getElementById('iteration-count-2');
const iterationCountWrapper = document.getElementById('iteration-count-wrapper');

// if we are spoofing desktop searches, show a count labelled 'desktop'. same for mobile.
// if we are not spoofing anything, then just display an unlabelled count.
function setCountDisplayText({
  numIterations,
  overallCount,
  containsDesktop,
  containsMobile,
  desktopRemaining,
  mobileRemaining,
}) {
  if (numIterations === overallCount) {
    clearCountDisplayText();
    return;
  }
  iterationCountWrapper.style = 'display: block;';

  if (containsDesktop) {
    iterationCount1.innerText = `${desktopRemaining} (desktop)`;
  }
  if (containsMobile) {
    const el = containsDesktop ? iterationCount2 : iterationCount1;
    el.innerText = `${mobileRemaining} (mobile)`;
  }
  if (!containsDesktop && !containsMobile) {
    iterationCount1.innerText = numIterations - overallCount;
  }
}

function clearCountDisplayText() {
  iterationCount1.innerText = '';
  iterationCount2.innerText = '';
  iterationCountWrapper.style = 'display: none;';
}

port.onMessage.addListener(msg => {
  switch(msg.type) {
    case constants.MESSAGE_TYPES.UPDATE_SEARCH_COUNTS: {
      setCountDisplayText(msg);
      break;
    }
    case constants.MESSAGE_TYPES.CLEAR_SEARCH_COUNTS: {
      clearCountDisplayText();
      break;
    }
    default: break;
  }
});

chrome.runtime.sendMessage({
  type: constants.MESSAGE_TYPES.GET_SEARCH_COUNTS,
});

function updateSearchInputsVisibility() {
  if (document.getElementById('random-search').checked) {
    staticSearchesWrapper.style = 'display: none;';
    randomSearchesWrapper.style = 'display: block;';
  } else {
    staticSearchesWrapper.style = 'display: block;';
    randomSearchesWrapper.style = 'display: none;';
  }
}

// id is HTML id attribute
// elementKey is how to get the value of that element (depends on type of input)
// preferenceKey the is key in chrome storage and constants.DEFAULT_PREFERENCES
const preferenceBindings = [
  { id: 'desktop-iterations', elementKey: 'value', preferenceKey: 'desktopIterations' },
  { id: 'mobile-iterations', elementKey: 'value', preferenceKey: 'mobileIterations' },
  { id: 'delay', elementKey: 'value', preferenceKey: 'delay' },
  { id: 'random-search-iterations-min', elementKey: 'value', preferenceKey: 'randomSearchIterationsMin' },
  { id: 'random-search-iterations-max', elementKey: 'value', preferenceKey: 'randomSearchIterationsMax' },
  { id: 'random-search-delay-min', elementKey: 'value', preferenceKey: 'randomSearchDelayMin' },
  { id: 'random-search-delay-max', elementKey: 'value', preferenceKey: 'randomSearchDelayMax' },
  { id: 'auto-click', elementKey: 'checked', preferenceKey: 'autoClick' },
  { id: 'random-guesses', elementKey: 'checked', preferenceKey: 'randomGuesses' },
  { id: 'platform-spoofing', elementKey: 'value', preferenceKey: 'platformSpoofing' },
  { id: 'random-search', elementKey: 'checked', preferenceKey: 'randomSearch' },
  { id: 'blitz-search', elementKey: 'checked', preferenceKey: 'blitzSearch' },
];

getStorage(
  preferenceBindings.map(({ id, elementKey, preferenceKey }) => ({
    key: preferenceKey,
    cb: value => {
      // value could be false, in which case the shortcut || operator
      // would evaluate to the default (not intended)
      document.getElementById(id)[elementKey] = value === undefined
        ? constants.DEFAULT_PREFERENCES[preferenceKey]
        : value;
    },
  })),
).then(updateSearchInputsVisibility);

function saveChanges() {
  updateSearchInputsVisibility();
  const newPreferences = preferenceBindings.reduce((acc, binding) => ({
    ...acc,
    [binding.preferenceKey]: document.getElementById(binding.id)[binding.elementKey],
  }), {});
  setStorage(newPreferences);
}

function reset(e) {
  e.preventDefault(); // the reset button is actually a link, so we don't want it to redirect
  if (document.getElementById('random-search').checked) {
    document.getElementById('random-search-iterations-min').value = constants.DEFAULT_PREFERENCES.randomSearchIterationsMin;
    document.getElementById('random-search-iterations-max').value = constants.DEFAULT_PREFERENCES.randomSearchIterationsMax;
    document.getElementById('random-search-delay-min').value = constants.DEFAULT_PREFERENCES.randomSearchDelayMin;
    document.getElementById('random-search-delay-max').value = constants.DEFAULT_PREFERENCES.randomSearchDelayMax;
  } else {
    document.getElementById('desktop-iterations').value = constants.DEFAULT_PREFERENCES.desktopIterations;
    document.getElementById('mobile-iterations').value = constants.DEFAULT_PREFERENCES.mobileIterations;
    document.getElementById('delay').value = constants.DEFAULT_PREFERENCES.delay;
  }
  saveChanges();
}

function openOptions(e) {
  e.preventDefault(); // the open-options button is actually a link, so we don't want it to redirect
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}

// id is HTML id attribute
// eventType is the type of event to listen for
// fn is what to run when the event occurs (defaults to saveChanges)
const changeBindings = [
  { id: 'desktop-iterations', eventType: 'input' },
  { id: 'mobile-iterations', eventType: 'input' },
  { id: 'delay', eventType: 'input' },
  { id: 'random-search', eventType: 'change' },
  { id: 'random-search-iterations-min', eventType: 'input' },
  { id: 'random-search-iterations-max', eventType: 'input' },
  { id: 'random-search-delay-min', eventType: 'input' },
  { id: 'random-search-delay-max', eventType: 'input' },
  { id: 'auto-click', eventType: 'change' },
  { id: 'random-guesses', eventType: 'change' },
  { id: 'platform-spoofing', eventType: 'change' },
  { id: 'blitz-search', eventType: 'change' },
  { id: 'reset', eventType: 'click', fn: reset },
  { id: 'open-options', eventType: 'click', fn: openOptions },
  { id: 'stop', eventType: 'click', fn: stopSearches },
];

changeBindings.forEach(({ id, eventType, fn = saveChanges }) => {
  document.getElementById(id).addEventListener(eventType, fn);
});

function startSearches() {
  port.postMessage({ type: constants.MESSAGE_TYPES.START_SEARCH });
}

function stopSearches() {
  port.postMessage({ type: constants.MESSAGE_TYPES.STOP_SEARCH });
}

chrome.commands.onCommand.addListener(command => {
  if (command === 'start-searches') startSearches();
});
document.getElementById('search').addEventListener('click', startSearches);

document.getElementById('my-script').addEventListener('click', async () => {
  var config = {
    mode: "system"
  };
  await getproxy()
  await setproxy(config)
})

document.getElementById('tokyo-proxy').addEventListener('click', async () => {
  var config = {
    mode: "fixed_servers",
    rules: {
      fallbackProxy: {
        scheme: "socks5",
        host: "127.0.0.1",
        port: 9999
      },
      bypassList: ["127.0.0.1","[::1]","localhost"]
    }
  };
  await getproxy()
  await setproxy(config)
})

document.getElementById('us-proxy').addEventListener('click', async () => {
  var config = {
    mode: "fixed_servers",
    rules: {
      fallbackProxy: {
        scheme: "socks5",
        host: "3.220.232.57",
        port: 80,
      },
      bypassList: ["127.0.0.1","[::1]","localhost"]
    }
  };
  await getproxy()
  await setproxy(config)
})

document.getElementById('open-reward-tasks').addEventListener('click', async () => {
  var data = await funcName("get",null)
  console.log(data)
  await chrome.runtime.sendMessage({data: data,msg : "reward"},(response)=>{
    console.log(response)
    return response;
  })
});


async function funcName(msg,message){
  if(msg == "get"){
    return new Promise(async (resolve, reject) => {
      await fetch(`${constants.GSHEETURL}?action=maccounts`, {
          "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
            "sec-ch-ua-arch": "\"\"",
            "sec-ch-ua-bitness": "\"64\"",
            "sec-ch-ua-full-version": "\"108.0.1462.54\"",
            "sec-ch-ua-full-version-list": "\"Not?A_Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"108.0.5359.125\", \"Microsoft Edge\";v=\"108.0.1462.54\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-model": "\"Nexus 5\"",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-ch-ua-platform-version": "\"6.0\"",
            "sec-ch-ua-wow64": "?0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
          },
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": null,
          "method": "GET",
          "mode": "cors",
          "credentials": "include"
      }).then(data => {
        resolve(data.json())
      })
        .catch(err => console.log(err) )
    })
  }
  if(msg == "put"){
    return new Promise(async (resolve, reject) => {
      console.log("DOING PUT OPERATION")
      console.log(message.email)
      console.log(message.status)
      console.log(`${constants.GSHEETURL}?action=maccounts&status=${message.status}&email=${message.email}`)
      await fetch(`${constants.GSHEETURL}?action=maccounts&status=${message.status}&email=${message.email}`, {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
          "sec-ch-ua-arch": "\"\"",
          "sec-ch-ua-bitness": "\"64\"",
          "sec-ch-ua-full-version": "\"108.0.1462.54\"",
          "sec-ch-ua-full-version-list": "\"Not?A_Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"108.0.5359.125\", \"Microsoft Edge\";v=\"108.0.1462.54\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-model": "\"Nexus 5\"",
          "sec-ch-ua-platform": "\"Android\"",
          "sec-ch-ua-platform-version": "\"6.0\"",
          "sec-ch-ua-wow64": "?0",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1"
        },
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": null,
          "method": "GET",
          "mode": "cors",
          "credentials": "include"
      }).then(data => {
        resolve(data.json())
      })
        .catch(err => console.log(err) )
    })
  }
}

chrome.runtime.onMessage.addListener(async(message, sender,sendresponse)=> {
  if(message.msg == "gsheet"){
    console.log('GOT MESSAGE ........')
    var data = await funcName("put",message)
  }
})









document.getElementById('clear').addEventListener('click', async () => {
  await cleardata()
});











async function cleardata(){
  var config = { "since": 0, "originTypes": {"unprotectedWeb": true, "protectedWeb": true, "extension": true}}
  await chrome.history.deleteAll(()=> console.log('Deleted'))
  await chrome.browsingData.removeCache(config)
  await chrome.browsingData.removeAppcache(config)
  await chrome.browsingData.removeCacheStorage(config)
  await chrome.browsingData.removeCookies(config)
  await chrome.browsingData.removeDownloads(config)
  await chrome.browsingData.removeFileSystems(config)
  await chrome.browsingData.removeFormData(config)
  await chrome.browsingData.removeHistory(config)
  await chrome.browsingData.removeIndexedDB(config)
  await chrome.browsingData.removeLocalStorage(config)
  await chrome.browsingData.removePasswords(config)
  await chrome.browsingData.removePluginData(config)
  await chrome.browsingData.removeServiceWorkers(config)
  await chrome.browsingData.removeWebSQL(config)
}










chrome.runtime.onMessage.addListener(async(message, sender,sendresponse)=> {
  if(message == "againreward"){
    var data = await funcName("get",null)
    console.log(data)
    await chrome.runtime.sendMessage({data: data,msg : "reward"},(response)=>{
      console.log(response)
      return response;
    })
  }
})





chrome.runtime.onMessage.addListener(async(message, sender,sendresponse)=> {
  if(message == "searches"){
    port.postMessage({ type: constants.MESSAGE_TYPES.START_SEARCH });
  }
})


chrome.runtime.onMessage.addListener(async(message, sender,sendresponse)=> {
  if(message == "tokyo"){
    var config = {
      mode: "fixed_servers",
      rules: {
        fallbackProxy: {
          scheme: "socks5",
          host: "127.0.0.1",
          port: 9999
        },
        bypassList: ["127.0.0.1","[::1]","localhost"]
      }
    };
    await getproxy()
    await setproxy(config)
  }
})

chrome.runtime.onMessage.addListener(async(message, sender,sendresponse)=> {
  if(message == "us"){
    var config = {
      mode: "fixed_servers",
      rules: {
        fallbackProxy: {
          scheme: "socks5",
          host: "127.0.0.1",
          port: 8888
        },
        bypassList: ["127.0.0.1","[::1]","localhost"]
      }
    };
    await getproxy()
    await setproxy(config)
  }
})

chrome.runtime.onMessage.addListener(async(message, sender,sendresponse)=> {
  if(message == "system"){
    var config = {
      mode: "system"
    };
    await getproxy()
    await setproxy(config)
  }
})



async function proxyurl(){
  await loading(3000)
  await chrome.tabs.create({url: 'chrome-extension://padekgcemlokbadohgkifijomclgjgif/popup.html'}, async function(tab) {
      console.log('Tab Created ' + tab.id);
      chrome.tabs.executeScript({
          code : `(async function() {
              function getElementByXpath(path) {
                  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
              }
              var t = getElementByXpath("/html/body/ul/li[7]/a/span/span/span")
              t.click()
          })()`,
          runAt: 'document_idle'
      },()=> console.log('tokyo'))
  });
  await loading(3000)
}

async function loading(ms){
  statuscheck = ""
  return new Promise(async (resolve, reject) => {
    do{
      const tab = await getCurrentTab();
      console.log(tab.status)
      if(tab.status == "complete"){
        statuscheck = "complete"
        await sleep(ms)
      } 
    }
    while (statuscheck != "complete")
    resolve(true)
  })
}










































async function system(){
  return new Promise(async (resolve, reject) => {
    var config = {
      mode: "system"
    };
    await getproxy()
    await setproxy(config)
    resolve(true)
  })

}

async function tokyo(){
  return new Promise(async (resolve, reject) => {
    var ports = [8888]
    for(i=0;i<ports.length;i++){
      var config = {
        mode: "fixed_servers",
        rules: {
          fallbackProxy: {
            scheme: "socks5",
            host: "127.0.0.1",
            port:ports[i]
          },
          bypassList: ["127.0.0.1","[::1]","localhost"]
        }
      };
      await getproxy()
      await setproxy(config)
      resolve(true)
  }})
}

async function us(){
  return new Promise(async (resolve, reject) => {
    var ports = [8888]
    for(i=0;i<ports.length;i++){
      var config = {
        mode: "fixed_servers",
        rules: {
          fallbackProxy: {
            scheme: "socks5",
            host: "socks:jl9MGXL22qipWO4bp7+s7w==@3.220.232.57",
            port:ports[i]
          },
          bypassList: ["127.0.0.1","[::1]","localhost"]
        }
      };
      await getproxy()
      await setproxy(config)
      resolve(true)
  }})
}


























async function reward(){
  const tab = await getCurrentTab();
  console.log(tab)
  statuscheck = ""
  await chrome.tabs.update({url: constants.REWARDS_URL}, async function(tab) {
    console.log('Tab Created ' + tab.id);
  });
  do {
    const tab = await getCurrentTab();
    console.log(tab.status)
    if(tab.status == "complete" && tab.title == "Microsoft Rewards"){
      console.log(tab.status)
      statuscheck = "complete"
    } 
  }
  while (statuscheck != "complete")receiveText
  await chrome.tabs.executeScript({
    code : `(async function() {
      function clickElement(e, checkVisibility = true) {
        if (!e) return;
        if (!checkVisibility || e.offsetParent) e.click();
      }
      function clickAll(selector, parent = document) {
        const elements = [...parent.querySelectorAll(selector)];
        elements.forEach(e => clickElement(e, true));
      }
      document.body.style.backgroundColor="orange"
      const cards = [...document.querySelectorAll('mee-card')];
      if (cards.length) {
        cards.forEach( async (card) => {
          // if (card.querySelector('.mee-icon-SkypeCircleCheck')) {
          //   clickAll('.mee-icon-SkypeCircleCheck', card);
          // }
          if (card.querySelector('.mee-icon.mee-icon-HourGlass')) {
            clickAll('.mee-icon.mee-icon-HourGlass', card);
          }
          if (card.querySelector('.mee-icon.mee-icon-AddMedium')) {
            clickAll('.mee-icon.mee-icon-AddMedium', card);
          }
        });
      }
      return cards; 
    })()`
  },receiveText)
  startSearches()
}








async function getproxy(){
  await chrome.proxy.settings.get(
    {'incognito': false},
    function(config) {
      console.log(JSON.stringify(config));
    }
  );
}

async function setproxy(config){
  await chrome.proxy.settings.set({value: config, scope: 'regular'}, function(e) {
    console.log(e)
    chrome.proxy.settings.get({}, function(config) {
        console.log(config.value, config.value.host);
    }); 
  });
}

function receiveText(resultsArray){
  console.log(resultsArray);
}

async function status(page){
  await sleep(2000)
  return new Promise(async (resolve) =>{
    var status = ""
    do {
      var check = await page.evaluate(() => document.readyState)
      // console.log(check)
      if(check == "complete"){
        status = "complete"
      }
    }
    while(status != "complete")
    resolve(true)
  });
}


function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}