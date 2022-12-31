chrome.runtime.onMessage.addListener(async(message, sender,sendresponse)=> {
    if(message == "newgmail"){
        await newgmail()
    }
})







chrome.runtime.onMessage.addListener(async(message, sender,sendresponse)=> {
    if(message.msg == "subscribe"){
        console.log(message.data)
        await subscribe(message.data,message.channel)
    }
})






function getCurrentTab() {
    return new Promise(resolve => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        resolve(tabs[0]);
      });
    });
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








async function url(url){
    return new Promise(async (resolve, reject) => {
        await chrome.tabs.create({url: url}, async function(tab) {
            console.log('Tab Created ' + tab.id);
            resolve(true)
        });
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
                if(t.innerHTML != "${text}"){
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



async function Randomname(){
    return new Promise(async (resolve, reject) => {
        // const num = 8;
        // let res = '';
        // for(let i = 0; i < num; i++){
        //     const random = Math.floor(Math.random() * 27);
        //     res += String.fromCharCode(97 + random);
        // };
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var lenString = 8;  
        var randomstring = '';
        for (var i=0; i<lenString; i++) {  
            var rnum = Math.floor(Math.random() * characters.length);  
            randomstring += characters.substring(rnum, rnum+1);  
        }   
        resolve(randomstring)
    })
 
}




async function newgmail(){
    var result = await url("https://accounts.google.com/signup/v2/webcreateaccount")
    // console.log(result)
    if(result == true){
        await loading(2000)
        console.log("CLICKING ON CREATE ACCOUNT")
        var result = await click("/html/body/div[1]/div[1]/div[2]/div/c-wiz/div/div[2]/div/div[2]/div/div[2]/div/div/div[1]/div/button/div[1]")
        await loading(2000)
        // console.log(result)
        if(result == true){
            console.log("CLICKING ON CREATE ACCOUNT PERSONAL")
            var result = await click("/html/body/div[1]/div[1]/div[2]/div/c-wiz/div/div[2]/div/div[2]/div/div[2]/div/div/div[2]/div/ul/li[1]/span[2]")
            await loading(2000)
            var firstname = await Randomname()
            await loading(2000)
            var lastname = await Randomname()
            await loading(2000)
            var email = `${firstname}.${lastname}`
            await loading(2000)
            console.log("PASSING FIRST NAME")
            var result = await type("/html/body/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div[1]/div[1]/div/div[1]/div/div[1]/input",firstname)
            await loading(2000)
            console.log("PASSING LAST NAME")
            var result = await type("/html/body/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div[1]/div[2]/div/div[1]/div/div[1]/input",lastname)
            await loading(2000)
            console.log("PASSING EMAIL")
            var result = await type("/html/body/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[2]/div[1]/div/div[1]/div/div[1]/input",email)
            await loading(2000)
            console.log("PASSING PASS")
            var pass = await Randomname()
            await loading(2000)
            var result = await type("/html/body/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[3]/div[1]/div/div/div[1]/div/div[1]/div/div[1]/input",pass)
            await loading(2000)
            console.log("PASSING CONFIRM PASS")
            var result = await type("/html/body/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[3]/div[1]/div/div/div[2]/div/div[1]/div/div[1]/input",pass)
            await loading(2000)
            console.log("CLICKING ON NEXT BTN")
            var result = await click("/html/body/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/div/button/span")
            await loading(2000)
            var result = await checktext("/html/body/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/h1/span","Verifying your phone number")
            await loading(2000)
            if(result == true){
                console.log(true)
            }
            
        }
    }

}




/////////////////////////////////////////////////// YOUTUBE

async function youtube(channel){
    return new Promise(async (resolve, reject) => {
        var result = await url(channel)
        await loading(2000)
        if(result == true){
            console.log("CHECKING SUBSCRIBED OR NOT")
            var result = await checktext("/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/div/div[2]/div[5]/ytd-subscribe-button-renderer/yt-button-shape/button/div/span","Subscribed")
            
            await loading(2000)
            if(result == true){
                console.log("SUBSCRIBING.............")
                await click("/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/div/div[2]/div[5]/ytd-subscribe-button-renderer/yt-button-shape/button/div/span")
                await loading(2000)
            }
        }
        resolve(true)
    })
}   



////////////////////////////////////////////////// CLEAR DATA



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









///////////////////////////////////////////////////////////// SUBSCRIBE





async function checkMobileAsk(path,text){
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






async function subscribe(mails,yt){
    var ids = mails
    var channels = yt
    console.log('CLEANING .........')
    await cleardata()
    await loading(2000)
    for(var i=0;i<ids.length;i++){
        for(var j=0;j<channels.length;j++){
            try{
                var result = await url("https://accounts.google.com/signup/v2/webcreateaccount")
                // console.log(result)
                if(result == true){
                    await loading(2000)
                    console.log("PASSING EMAIL")
                    var result = await type("/html/body/div[1]/div[1]/div[2]/div/c-wiz/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div/div[1]/div/div[1]/input",ids[i].email)
                    await loading(2000)
                    console.log("CLICK NEXT")
                    var result = await click("/html/body/div[1]/div[1]/div[2]/div/c-wiz/div/div[2]/div/div[2]/div/div[1]/div/div/button/span")
                    await loading(2000)
                    console.log("PASSING PASS")
                    var result = await type("/html/body/div[1]/div[1]/div[2]/div/c-wiz/div/div[2]/div/div[1]/div/form/span/div[1]/div[1]/div/div/div/div/div[1]/div/div[1]/input",ids[i].pass)
                    await loading(2000)
                    console.log("CLICK NEXT")
                    var result = await click("/html/body/div[1]/div[1]/div[2]/div/c-wiz/div/div[2]/div/div[2]/div/div[1]/div/div/button/span")
                    await loading(2000)
                    console.log("CHECKING WHETHER IT ASKING FOR PASS OR NOT")
                    var result = await checkMobileAsk("/html/body/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div[1]/div/h1/span","Verifying your phone number")
                    await loading(2000)
                    if(result != true){
                        try{
                            await youtube(channels[j].channel)
                        }
                        catch(e){
                            console.log(e)
                        }
                        
                    }
                }
            }
            catch(e){
                console.log(e)
            }
        }
        console.log('CLEANING .........')
        await cleardata()
        await loading(2000)
        console.log('Closing ALl Tabs')
        var result = await CLoseAllTabs()
        await loading(5000)
    }
}






