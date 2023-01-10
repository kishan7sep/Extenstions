document.getElementById('newgmail').addEventListener('click', async () => {
  await chrome.runtime.sendMessage("newgmail",(response)=>{
    console.log(response)
    return response;
  })
})






document.getElementById('subscribe').addEventListener('click', async () => {
  var url = "https://script.google.com/macros/s/AKfycbwWYvmAKJxZ4pIMly7ov2xnn1AahPzAAVy3Y3TkXQaJZNBbkz_HyBoECdITPEiSpziN/exec?action=gaccounts"
  var data = await funcName(url)
  var url = "https://script.google.com/macros/s/AKfycbwWYvmAKJxZ4pIMly7ov2xnn1AahPzAAVy3Y3TkXQaJZNBbkz_HyBoECdITPEiSpziN/exec?action=youtube"
  var channel_links = await funcName(url)
  console.log(data)
  console.log(channel_links)
  await chrome.runtime.sendMessage({data: data,msg : "subscribe",channel:channel_links},(response)=>{
    console.log(response)
    return response;
  })
})


document.getElementById('watchtime').addEventListener('click', async () => {
  var url = "https://script.google.com/macros/s/AKfycbwWYvmAKJxZ4pIMly7ov2xnn1AahPzAAVy3Y3TkXQaJZNBbkz_HyBoECdITPEiSpziN/exec?action=vpn"
  var vpn = await funcName(url)
  var url = "https://script.google.com/macros/s/AKfycbwWYvmAKJxZ4pIMly7ov2xnn1AahPzAAVy3Y3TkXQaJZNBbkz_HyBoECdITPEiSpziN/exec?action=youtube"
  var channel_links = await funcName(url)
  console.log(vpn)
  console.log(channel_links)
  await chrome.runtime.sendMessage({vpn: vpn,msg : "watchtime",channel:channel_links},(response)=>{
    console.log(response)
    return response;
  })
})


async function funcName(url){
  return new Promise(async (resolve, reject) => {
      await fetch(url, {
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