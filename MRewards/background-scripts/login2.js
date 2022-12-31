console.log('login')

chrome.runtime.onMessage.addListener(async(message, sender,sendresponse)=> {
    if(message.msg == "reward"){
        console.log(message.data)
        await main(message.data)
    }
})


/////////////////////////////////// COMMON

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
                            console.log('OPENING REWARD PAGE')
                            var result = await url(constants.REWARDS_URL)
                            await loading(2000)
                            console.log('CHECKING WETHER ACCOUNT IS SUSPENDED OR NOT')
                            var result = await checktext("/html/body/div[1]/div[2]/main/div/h1"," Uh oh, it appears your Microsoft Rewards account has been suspended.")
                            await loading(2000)
                            console.log(result)
                            if(result == true){
                                console.log('SENDING STATUS.........')
                                console.log('OPENING EXTENSTION PAGE')
                                await url("chrome-extension://ipbgaooglppjombmbgebgmaehjkfabme/popup.html")
                                await loading(2000)
                                var data = {msg:"gsheet",status:'SUSPENDED',email:email}
                                await sendingStatus(data)
                                await loading(2000)
                            }
                            else{
                                var result = await getValue("/html/body/div[1]/div[2]/main/div/ui-view/mee-rewards-dashboard/main/mee-rewards-user-status-banner/div/div/div/div/div[2]/div[1]/mee-rewards-user-status-banner-item/mee-rewards-user-status-banner-balance/div/div/div/div/div/div/p/mee-rewards-counter-animation/span")
                                await loading(2000)
                                console.log(result)
                                if(result.status == true){
                                    console.log('SENDING STATUS.........')
                                    console.log('OPENING EXTENSTION PAGE')
                                    await url("chrome-extension://ipbgaooglppjombmbgebgmaehjkfabme/popup.html")
                                    await loading(2000)
                                    var data = {msg:"gsheet",status:result.msg,email:email}
                                    console.log(data)
                                    await sendingStatus(data)
                                    console.log('DONE')
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



////////////////////////////////// MAIN

async function main(data){
    console.log('CLEANING .........')
    await cleardata()
    await loading(2000)
    var ids = data
    for(var i=0;i<ids.length;i++){
        console.log('LOGIN ACCOUNT ...............')
        var result = await login(ids[i].email,ids[i].pass)
        await loading(2000)
        if(result == true){
            console.log('OPENING REWARD URL FOR REWARD COLLECTION')
        }
        await loading(2000)
        console.log('CLEANING .........')
        await cleardata()
        await loading(2000)
        console.log('Closing ALl Tabs')
        var result = await CLoseAllTabs()
        await loading(2000)
    }
}



