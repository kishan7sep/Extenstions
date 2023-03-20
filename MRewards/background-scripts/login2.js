console.log('login')

chrome.runtime.onMessage.addListener(async(message, sender,sendresponse)=> {
    if(message.msg == "reward"){
        console.log(message.data)
        await main(message.data)
    }
})


/////////////////////////////////// COMMON


async function checkelementclassContains(path,text){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var t = getElementByXpath("${path}")
                var plus = t.classList.contains("${text}")
                if(plus == true){
                    return true
                }
            })()`,
            runAt: 'document_end'
        },r => {
            if(r[0] == true){
                resolve(true)
            }
            else{
                resolve(null)
            }
        })
    })
}


async function click(path){
    console.log(path)
    return new Promise(async (resolve, reject) => {
        await loading(3000)
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var t = getElementByXpath("${path}")
                t.focus()
                t.click()
                return true
            })()`,
            runAt: 'document_end'
        },r => {
            // console.log(r)
            if(r[0] == true){
                resolve(true)
            }
            else{
                resolve(null)
            }
        })
       
    })
}


async function checkelementexist(path){
    console.log(path)
    return new Promise(async (resolve, reject) => {
        await loading(3000)
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var t = getElementByXpath("${path}")
                if(t){
                    return true
                }
            })()`,
            runAt: 'document_end'
        },r => {
            // console.log(r)
            if(r[0] == true){
                resolve(true)
            }
            else{
                resolve(null)
            }
        })
       
    })
}

async function checktext(path,text){
    console.log(path)
    return new Promise(async (resolve, reject) => {
        await loading(3000)
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var t = getElementByXpath("${path}")
                console.log(t.innerHTML)
                if(t.innerHTML == "${text}"){
                    return true
                }
            })()`,
            runAt: 'document_end'
        },r => {
            // console.log(r)
            if(r[0] == true){
                resolve(true)
            }
            else{
                resolve(null)
            }
        })
       
    })
}


async function type(path,value){
    console.log(path)
    return new Promise(async (resolve, reject) => {
        await loading(3000)
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var t = getElementByXpath("${path}")
                t.click()
                t.focus()
                t.value = "${value}"
                t.click()
                return true
            })()`,
            runAt: 'document_end'
        },r => {
            // console.log(r)
            if(r[0] == true){
                resolve(true)
            }
            else{
                resolve(null)
            }
        })
       
    })
}

async function url(url){
    return new Promise(async (resolve, reject) => {
        await chrome.tabs.create({url: url}, async function(tab) {
            console.log('Tab Created ' + tab.id);
            resolve(true)
        });
    })
}

async function getValue(path){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var t = getElementByXpath("${path}")
                var result = {msg:t.innerHTML,status:true}
                return result
            })()`,
            runAt: 'document_end'
        },r => {
            console.log(r)
            if(r[0].status == true){
                resolve(r[0])
            }
            else{
                resolve(null)
            }
        })
    })
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

let statuscheck = ""

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

////////////////////////////////////////// CLEAR DATA

async function cleardata(){
    var config = { "since": 0, "originTypes": {
        "unprotectedWeb": true, 
        "protectedWeb": true, 
        "extension": true,
    }}
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




/////////////////////////////////////////////// CLOSE TABS

async function CLoseAllTabs(){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.create({url: 'edge://extensions/'}, async function(tab) {
            console.log('Tab Created ' + tab.id);
            chrome.tabs.query({}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    if(tabs[i].id != tab.id){
                        chrome.tabs.remove(tabs[i].id);
                    }
                    
                }
                resolve(true)
            });
        })
    })
}



async function CloseCurrentTab(){
    var tab = await getCurrentTab()
    console.log(tab)
    return new Promise(async (resolve, reject) => {
        chrome.tabs.remove(tab.id);
        resolve(true)
    }) 
}




/////////////////////////////////// LOGIN


async function sendingStatus(msg){
    return new Promise(async (resolve, reject) => {
        console.log('SENDING...........')
        chrome.runtime.sendMessage(msg,(response)=>{
            console.log(response)
            return response;
        })
        resolve(true)
    })
}

async function login(email,pass){
    return new Promise(async (resolve, reject) => {
        console.log('OPENING REWARD PAGE')
        var result = await url(constants.REWARDS_URL)
        await loading(2000)
        if(result == true){
            console.log('CLICKING ON SIGNIN')
            var result = await click("/html/body/div/div[3]/div[1]/div[1]/div/div/main/div[1]/div[1]/div/button")
            await loading(2000)
            if(result == true){
                console.log('PASSING EMAIL')
                var result = await type("/html/body/div/form[1]/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[3]/div/div/div/div[2]/div[2]/div/input[1]",email)
                await loading(2000)
                console.log('CLICKING ON NEXT')
                var result = await click("/html/body/div/form[1]/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[3]/div/div/div/div[4]/div/div/div/div[2]/input")
                await loading(2000)
                if(result == true){
                    console.log('PASSING PASS')
                    var result = await type("/html/body/div/form[1]/div/div/div[2]/div[1]/div/div/div/div/div/div[3]/div/div[2]/div/div[3]/div/div[2]/input",pass)
                    await loading(2000)
                    console.log('CLICKING ON NEXT')
                    var result = await click("/html/body/div/form[1]/div/div/div[2]/div[1]/div/div/div/div/div/div[3]/div/div[2]/div/div[4]/div[2]/div/div/div/div/input")
                    await loading(2000)
                    if(result == true){
                        console.log('CHECKING WETHER ACCOUNT IS LOCKED OR NOT')
                        var result = await checktext("/html/body/div[1]/div/div/div[2]/div/div[1]/div[2]/div/div[2]/div[2]/div/div/section/div/div[1]","Your account has been locked")
                        if(result == true){
                            await sendingStatus({msg:"gsheet",status:'LOCKED',email:email})
                            await loading(10000)
                        }
                        else{
                            console.log('SignIn SuccessFull')
                            await loading(2000)
                            // await CloseCurrentTab()
                            await loading(2000)
                            console.log('OPENING REWARD PAGE')
                            var result = await url(constants.REWARDS_URL)
                            await loading(2000)
                            console.log('CHECKING WETHER ACCOUNT IS SUSPENDED OR NOT')
                            var result = await checktext("/html/body/div[1]/div[2]/main/div/h1"," Uh oh, it appears your Microsoft Rewards account has been suspended.")
                            await loading(2000)
                            console.log(result)
                            if(result == true){
                                // await CloseCurrentTab()
                                await loading(2000)
                                console.log('SENDING STATUS.........')
                                console.log('OPENING EXTENSTION PAGE')
                                await url("chrome-extension://ipbgaooglppjombmbgebgmaehjkfabme/popup.html")
                                await loading(2000)
                                var data = {msg:"gsheet",status:'SUSPENDED',email:email}
                                await sendingStatus(data)
                                await loading(2000)
                                // await CloseCurrentTab()
                                await loading(2000)
                            }
                            else{
                                var result = await getValue("/html/body/div[1]/div[2]/main/div/ui-view/mee-rewards-dashboard/main/mee-rewards-user-status-banner/div/div/div/div/div[2]/div[1]/mee-rewards-user-status-banner-item/mee-rewards-user-status-banner-balance/div/div/div/div/div/div/p/mee-rewards-counter-animation/span")
                                await loading(2000)
                                console.log(result)
                                if(result.status == true){
                                    // await CloseCurrentTab()
                                    await loading(2000)
                                    console.log('SENDING STATUS.........')
                                    console.log('OPENING EXTENSTION PAGE')
                                    await url("chrome-extension://ipbgaooglppjombmbgebgmaehjkfabme/popup.html")
                                    await loading(2000)
                                    var data = {msg:"gsheet",status:result.msg,email:email}
                                    console.log(data)
                                    await sendingStatus(data)
                                    console.log('DONE')
                                    // await CloseCurrentTab()
                                    await loading(2000)
                                    resolve(true)
                                }
                            }
                        }
                    }
                }
            }
        }
        resolve(null)
    })
}



////////////////////////////////////// proxy 
async function ProxyEvent(msg){
    return new Promise(async (resolve, reject) => {
        await chrome.runtime.sendMessage(msg,(response)=>{
            console.log(response)
            return response;
        })
        resolve(true)
    })
}


/////////////////////////////////////// BANNER
async function banner(){
    return new Promise(async (resolve, reject) => {
        console.log("check banner")
        var result = await checkelementexist("/html/body/div[5]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[1]/div/section/section/div/a[1]/span")
        if(result == true){
            console.log("check banner click")
            await click("/html/body/div[5]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[1]/div/section/section/div/a[1]/span")
            await loading(2000)
        }
        await loading(2000)
        var result = await checkelementexist("/html/body/div[5]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[2]/div/section/section/div[2]/a/span")
        if(result == true){
            await click("/html/body/div[5]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[2]/div/section/section/div[2]/a/span")
            await loading(2000)
            await click("/html/body/div[5]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[2]/div/section/section/div[3]/a[1]")
        }
        await loading(2000)
        var result = await checkelementexist("/html/body/div[5]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[3]/div/section/section/div[2]/a/span")
        if(result == true){
            await click("/html/body/div[5]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[3]/div/section/section/div[2]/a/span")
            await loading(2000)
            await click("/html/body/div[5]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[3]/div/section/section/div[4]/a[2]/span")
        }
        await loading(2000)
        resolve(true)
    })
}


/////////////////////////////////////// REWARD

async function reward(){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.executeScript({
            code : `(function() {
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
                return true; 
            })()`
        },r => {
            if(r[0] == true){
                resolve(true)
            }
        })
    })
}

/////////////////////////////////////////////////////////// SEARCH

async function SearchUrl(){
    return new Promise(async (resolve, reject) => {
        await chrome.tabs.create({url: "https://rewards.bing.com/?redref=amc"}, async function(tab) {
            console.log('Tab Created ' + tab.id);
            resolve(true)
        });
    })
}



async function CheckCurrentSearch(msg){
    // CLICK ON FRAME BUTTON
    if(msg == 1){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code : `(function() {
                    function getElementByXpath(path) {
                        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    }
                    var t = getElementByXpath("/html/body/div[1]/div[2]/main/div/ui-view/mee-rewards-dashboard/main/mee-rewards-user-status-banner/div/div/div/div/div[2]/div[2]/mee-rewards-user-status-banner-item/mee-rewards-user-status-banner-dailypoint/div/div/div/div/div/a")
                    t.click()
                    return true
                })()`,
                runAt: 'document_end'
            },r=>{
                if(r[0] == true){
                    resolve(true)
                }
                else{
                    resolve(null)
                }
            })
        })
    }
    //// CHECK VALUE SEARCH DIFFERENCE 
    if(msg == 2){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code : `(function() {
                    var d = document.evaluate('/html/body/div[6]/div[2]/div[2]/mee-rewards-earning-report-points-breakdown/div/div/div[2]/div/div[1]/div/div[1]/mee-rewards-circle-progress/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    var m = document.evaluate('/html/body/div[6]/div[2]/div[2]/mee-rewards-earning-report-points-breakdown/div/div/div[2]/div/div[2]/div/div[1]/mee-rewards-circle-progress/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    var plus = d.getAttribute('title').split(' ')[0];
                    var plus2 = d.getAttribute('title').split(' ')[2];
                    var plus3 = m.getAttribute('title').split(' ')[0];
                    var plus4 = m.getAttribute('title').split(' ')[2];
                    if(parseInt(plus)<parseInt(plus2) || parseInt(plus3)<parseInt(plus4)){
                        return true
                    }
                })()`,
                runAt: 'document_end'
            },r=>{
                if(r[0] == true){
                    resolve(true)
                }
                else{
                    resolve(null)
                }
            })
        })
    }

}

async function SearchUrlMove(){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.create({url: 'chrome-extension://ipbgaooglppjombmbgebgmaehjkfabme/popup.html'}, async function(tab) {
            console.log('Tab Created ' + tab.id);
        });
        resolve(true)
    })
}


async function aftelogin(){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.create({url: 'https://www.bing.com/'}, async function(tab) {
            console.log('Tab Created ' + tab.id);
        });
        resolve(true)
    })
}


async function StartSeraches(){
    return new Promise(async (resolve, reject) => {
        chrome.runtime.sendMessage("searches",(response)=>{
            console.log(response)
            return response;
        })
        resolve(true)
    })
}

async function searchurl(){
    return new Promise(async (resolve, reject) => {
        // SEARCH URL
        console.log('SEARCH URL')
        var result = await SearchUrl()
        if(result == true){
            console.log('SEARCH CURRENT BTN CLICK')
            var result = await CheckCurrentSearch(1)
            if(result == true){
                await loading(3000)
                console.log('SEARCH CHECK')
                var result = await CheckCurrentSearch(2)
                if(result == true){
                    await loading(2000)
                    // await CloseCurrentTab()
                    await loading(2000)
                    console.log('GOING TO EXTENSION URL')
                    var result = await SearchUrlMove()
                    if(result == true){
                        await loading(3000)
                        console.log('START SEARCH')
                        var result = await StartSeraches()
                        if(result == true){
                            console.log('START WAITING FOR 90 SECOND')
                            await sleep(90000)
                        }
                    }
                }
            }
        }
        resolve(true)
    })
}
////////////////////////////////////////////// LARGE BANNER

async function largebanner(){
    return new Promise(async (resolve, reject) => {
        for(var i=0;i<10;i++){
            var li = `/html/body/div[1]/div[2]/main/div/ui-view/mee-rewards-dashboard/main/div/mee-rewards-punch-cards/div/mee-carousel/div/div[2]/ul/li[${i}]/a`
            var result = await checkelementexist(li)
            if(result == true){
                chrome.tabs.executeScript({
                    code : `(function() {
                        function getElementByXpath(path) {
                            return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                        }
                        var t = getElementByXpath("${li}")
                        t.click()
                        
                    })()`,
                    runAt: 'document_end'
                })
                await sleep(7000)  
                await loading(2000)
                for(var j=0;j<10;j++){
                    var result = await checkelementexist(`/html/body/div[1]/div[2]/main/div[2]/div[2]/div[${j}]/div[3]/a/button/span[1]`)
                    if(result == true){
                        var result = await checkelementclassContains(`/html/body/div[1]/div[2]/main/div[2]/div[2]/div[${j}]/div[1]/span","punchcard-complete`)
                        if(result == true){
                            console.log("already Done")
                        }
                        else{
                            await click(`/html/body/div[1]/div[2]/main/div[2]/div[2]/div[${j}]/div[3]/a/button/span[1]`)
                            await loading(2000)
                            await sleep(30000)
                            await CloseCurrentTab()
                            await loading(2000)
                            await sleep(3000)

                        }
                    }
                }
                
            }
        }
        resolve(true)
    })
}

////////////////////////////////// MAIN

async function main(data){
    ////////////////////////////////// ///// PRE TASK TO MAKE DEFAULT
    console.log('CLEANING .........')
    await cleardata()
    console.log('EXTENSTION URL')
    await url("chrome-extension://ipbgaooglppjombmbgebgmaehjkfabme/popup.html")
    await loading(2000)
    console.log('PROXY EVENT')
    await ProxyEvent("system")
    await loading(2000)

    //////////////////////////////////// TASK
    var ids = data
    for(var i=0;i<ids.length;i++){
        var array = ids[i].vpn
        console.log(array)
        for(var j=0;j<array.length;j++){
            try{
                console.log('EXTENSTION URL')
                var result = await url("chrome-extension://ipbgaooglppjombmbgebgmaehjkfabme/popup.html")
                await loading(2000)
                console.log('PROXY EVENT')
                var result = await ProxyEvent(array[j])
                await loading(2000)
                // await CloseCurrentTab()
                await loading(2000)
                if(result == true){
                    console.log('LOGIN ACCOUNT ...............')
                    if(array[j] == "system"){
                        var result = await login(ids[i].email,ids[i].pass)
                        if(result != true){
                            break;
                        }
                    }
                    else{
                        var result = true
                    }
                    await loading(2000)
                    if(result == true){
                        var result = await url("https://www.bing.com/")
                        await loading(5000)
                        if(result == true){
                            var result = await checkelementexist("/html/body/div[2]/div/div[3]/header/div[2]/div/a[1]/span[1]")
                            await loading(2000)
                            if(result == true){
                                await click("/html/body/div[2]/div/div[3]/header/div[2]/div/a[1]/span[1]")
                                await loading(2000)
                            }
                            await loading(2000)
                            // await CloseCurrentTab()
                            await loading(2000)
                            console.log('OPENING REWARD URL FOR REWARD COLLECTION')
                            var result = await url(constants.REWARDS_URL)
                            await loading(2000)
                            await chrome.contentSettings.popups.set({primaryPattern: "*://*/*",setting: "allow"})
                            await loading(3000)
                            await sleep(10000)
                            if(result == true){
                                console.log('NEWBIE BANNER')
                                var result = await banner()
                                await loading(2000)
                                var t = await checktext("/html/body/div[1]/div[2]/main/div/ui-view/mee-rewards-dashboard/main/div/mee-rewards-more-activities-card/mee-card-group/div/mee-card[1]/div/card-content/mee-rewards-more-activities-card-item/div/a/div[2]/h3","ウィザードを開始する")
                                if(t == true){
                                    await click("/html/body/div[1]/div[2]/main/div/ui-view/mee-rewards-dashboard/main/div/mee-rewards-more-activities-card/mee-card-group/div/mee-card[1]/div/card-content/mee-rewards-more-activities-card-item/div/a/div[2]/h3")
                                    await loading(2000)
                                    await sleep(15000)
                                    console.log('NEWBIE BANNER')
                                    var result = await banner()
                                    await loading(2000)
                                }
                                if(result == true){
                                    console.log('LARGE BANNER TASKS')
                                    var result = await largebanner()
                                    await loading(2000)
                                    // await CloseCurrentTab()
                                    await loading(2000)
                                    var result = await url(constants.REWARDS_URL)
                                    await loading(2000)
                                    if(result == true){
                                        console.log('REWARD TASKS ............')
                                        await reward()
                                        await loading(10000)
                                        console.log('SEARCHING .........')
                                        await searchurl()
                                        await loading(5000)
                                    }
                                }
                            }
                        }
                    }
                }
                console.log('Closing ALl Tabs')
                var result = await CLoseAllTabs()
            }
            catch(e){
                console.log(e)
                console.log('Closing ALl Tabs')
                var result = await CLoseAllTabs()
            }
        }
        try{
            await loading(2000)
            console.log('CLEANING .........')
            await cleardata()
            await loading(2000)
        }
        catch(e){
            console.log(e)
        }
    }
    try{
        var result = await url("chrome-extension://ipbgaooglppjombmbgebgmaehjkfabme/popup.html")
        await loading(2000)
        if(result == true){
            await againStartbtn()
            await loading(2000)
        }
    }
    catch(e){
        console.log(e)
    }
}

async function againStartbtn(){
    return new Promise(async (resolve, reject) => {
        chrome.runtime.sendMessage("againreward",(response)=>{
            console.log(response)
            return response;
        })
        resolve(true)
    })
}