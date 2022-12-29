console.log('login')

chrome.runtime.onMessage.addListener(async(message, sender,sendresponse)=> {
    if(message.msg == "reward"){
        console.log(message.data)
        await main(message.data)
    }
})

async function loginSignBtn(){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.executeScript({
            code : `(function() {
                document.getElementById('id__4').click()
                return true
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

async function EMAILSignIn(msg,email){
    if(msg == 1){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code : `(function() {
                    function getElementByXpath(path) {
                        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    }
                    do{
                        // console.log(document.getElementById('i0116'))
                    }
                    while(document.getElementById('i0116') == null)
                    document.getElementById('i0116').click()
                    document.getElementById('i0116').focus()
                    document.getElementById('i0116').value = "${email}"
                    return true
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
    if(msg == 2){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code : `(function() {
                    do{
                        // console.log(document.getElementById('idSIButton9'))
                    }
                    while(document.getElementById('idSIButton9') == null)
                    document.getElementById('idSIButton9').click()
                    document.getElementById('idSIButton9').focus()
                    document.getElementById('idSIButton9').click()
                    return true
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

}


async function PASSSignIn(msg,pass){
    if(msg == 1){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code : `(function() {
                    do{
                        // console.log(document.getElementById('i0118'))
                    }
                    while(document.getElementById('i0118') == null)
                    document.getElementById('i0118').click()
                    document.getElementById('i0118').focus()
                    document.getElementById('i0118').value = "${pass}"
                    return true
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
    if(msg == 2){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code : `(function() {
                    do{
                        // console.log(document.getElementById('idSIButton9'))
                    }
                    while(document.getElementById('idSIButton9') == null)
                    document.getElementById('idSIButton9').click()
                    document.getElementById('idSIButton9').focus()
                    document.getElementById('idSIButton9').click()
                    return true
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

}

async function login(email,pass){
    return new Promise(async (resolve, reject) => {
        await chrome.tabs.create({url: constants.REWARDS_URL}, async function(tab) {
            console.log('Tab Created ' + tab.id);
        });
        await loading(3000)
        console.log('SIGNIN BTN')
        var result = await loginSignBtn()
        await loading(3000)
        if(result == true){
            // EMAIL
            console.log('TYPING EMAIL')
            var result = await EMAILSignIn(1,email)
            await loading(3000)
            console.log(result)
            if(result == true){
                console.log('EMAIL NXT BTN')
                var result = await EMAILSignIn(2,email)
                await loading(3000)
                if(result == true){
                    // PASS
                    console.log('TYPING PASS')
                    var result = await PASSSignIn(1,pass)
                    await loading(3000)
                    if(result == true){
                        console.log('PASS NXT BTN')
                        var result = await PASSSignIn(2,pass)
                        await loading(3000)
                        resolve(true)
                    }
                }
            } 

        }
        resolve(null)
    })
}










////////////////////////////////////////////////////////// BOARDER BANNER




async function signinButtonCheck(){
    return new Promise(async (resolve, reject) => {
        await loading(3000)
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var t = getElementByXpath("/html/body/div[1]/div[2]/main/section/div[1]/div[2]/section/div[1]/a[2]")
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


async function firstslide(){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var t = getElementByXpath("/html/body/div[6]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[1]/div/section/section/div/a[1]")
                if(getElementByXpath("/html/body/div[6]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[1]/div/section/section/div/a[1]") > 0){
                    t.click()
                    return true;
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



async function secondslide(msg){
    if(msg == 1){
        // CLICK ON SELECTION
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code : `(function() {
                    function getElementByXpath(path) {
                        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    }
                    var t = getElementByXpath("/html/body/div[6]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[2]/div/section/section/div[1]/a")
                    t.click()
                    return true
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
    if(msg == 2){
        // CLICK ON NEXT
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code : `(async function() {
                    function getElementByXpath(path) {
                        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    }
                    var t = getElementByXpath("/html/body/div[6]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[2]/div/section/section/div[3]")
                    t.click()
                    return true
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

}


async function thirdslide(msg){
    if(msg == 1){
        // CLICK ON SELECTION
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code : `(async function() {
                    function getElementByXpath(path) {
                        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    }
                    var t = getElementByXpath("/html/body/div[6]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[3]/div/section/section/div[2]/a")
                    t.click()
                    return true
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
    if(msg == 2){
        // CLICK ON FINISH
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code : `(async function() {
                    function getElementByXpath(path) {
                        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    }
                    var t = getElementByXpath("/html/body/div[6]/div[2]/div[2]/mee-rewards-welcome-tour/div/mee-rewards-slide[3]/div/section/section/div[4]/a[2]")
                    t.click()
                    return true
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

}



async function boarderbanner(){
    return new Promise(async (resolve, reject) => {
        console.log('SIGNIN BUTTON')
        await signinButtonCheck()
        // FOR NEWBIES POPUP BOARD
        // FIRST SLIDE
        console.log('FIRST SLIDE')
        var result = await firstslide()
        if(result == true){
            // SECOND SLIDE
            console.log('SECOND SLIDE')
            var result = await secondslide(1)
            if(result == true){
                // SECOND SLIDE NEXT
                console.log('SECOND SLSIDE NEXT')
                var result = await secondslide(2)
                if(result == true){
                    // THIRD SLIDE
                    console.log('THIRD SLIDE')
                    var result = await thirdslide(1)
                    if(result == true){
                        // THIRD SLIDE FINISH
                        console.log('THIRD SLIDE FINISH')
                        await thirdslide(2)
                    }
                }
            }
            
        }
        resolve(true)
    })
}











/////////////////////////////////  LARGE BANNER






async function LargeBannerClick(){
    // BANNER CLICK
    return new Promise(async (resolve, reject) => {
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var t = getElementByXpath("/html/body/div[1]/div[2]/main/div/ui-view/mee-rewards-dashboard/main/div/mee-rewards-punch-cards/div/mee-carousel/div/div[2]/ul/li[1]/a/mee-hero-item/section/picture/source[1]")
                t.click()
                return true
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


async function LargeBannerClickButtons(i){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var b = getElementByXpath("/html/body/div[1]/div[2]/main/div[2]/div[2]/div[${i}]/div[3]/a/button")
                var t = getElementByXpath("/html/body/div[1]/div[2]/main/div[2]/div[2]/div[${i}]/div[1]/span")
                var plus = t.classList.contains('complete')
                if(plus != true){
                    b.click()
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

async function LargeBannerClickButtonsResultClose(msg){
    if(msg == 1){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code: `(function(){
                    function getElementByXpath(path) {
                        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    }
                    var t = getElementByXpath('/html/body/div[2]/div[2]/span/a')
                    t.click()
                    return true
                ()`,
                runAt: 'document_end'
            },r =>{
                if(r[0] == 'complete'){
                    resolve(true)
                }
                else{
                    resolve(true)
                }
            })
        })
    }
    if(msg == 2){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code: 'document.readyState',
                runAt: 'document_end'
            },r =>{
                if(r[0] == 'complete'){
                    resolve('complete')
                }
                else{
                    resolve(null)
                }
            })
        })
    }
}

async function largebanner(){
    return new Promise(async (resolve, reject) => {
        // BANNER CLICK
        var result = await LargeBannerClick()
        await loading(3000)
        if(result == true){
            for(var i=7;i<11;i++){
                var result = await LargeBannerClickButtons(i)
                await loading(3000)
                if(result == true){
                    console.log('CHECKING SIGNIN BTN')
                    var result = await LargeBannerClickButtonsResultClose(1)
                    await loading(3000)
                    console.log('WAITING TO LOAD COMPLETELY')
                    var result = await LargeBannerClickButtonsResultClose(2)
                    await loading(3000)
                    if(result == 'complete'){
                        const tab = await getCurrentTab();
                        chrome.tabs.remove(tab.id);
                    }
                }
            }
        }
        resolve(true)
    })
}







/////////////////////////////////////// DAILY ACTIVITIES 



async function dailyActivitiesUrl(){
    return new Promise(async (resolve, reject) => {
        await chrome.tabs.create({url: "https://rewards.bing.com/?redref=amc"}, async function(tab) {
            console.log('Tab Created ' + tab.id);
        });
        resolve(true)
    })
}


async function dailybuttons(i){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var t = getElementByXpath('/html/body/div[1]/div[2]/main/div/ui-view/mee-rewards-dashboard/main/div/mee-rewards-daily-set-section/div/mee-card-group[1]/div/mee-card[${i}]/div/card-content/mee-rewards-daily-set-item-content/div/a/mee-rewards-points/div/div/span[1]')
                var plus = t.classList.contains('mee-icon-AddMedium')
                var clock = t.classList.contains('mee-icon-HourGlass')
                if(plus == true || clock == true){
                    t.click()
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

async function dailyactivityWait(msg){
    if(msg == 1){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code: `(function(){
                    function getElementByXpath(path) {
                        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    }
                    var t = getElementByXpath('/html/body/div[2]/div[2]/span/a')
                    t.click()
                    return true
                ()`,
                runAt: 'document_end'
            },r =>{
                if(r[0] == 'complete'){
                    resolve(true)
                }
                else{
                    resolve(true)
                }
            })
        })
    }
    if(msg == 2){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code: 'document.readyState',
                runAt: 'document_end'
            },r =>{
                if(r[0] == 'complete'){
                    resolve('complete')
                }
                else{
                    resolve(null)
                }
            })
        })
    }

}

async function dailyactivity(){
    return new Promise(async (resolve, reject) => {
        console.log('OPENING DAILY ACTIVITIES URL')
        var result = await dailyActivitiesUrl()
        await loading(3000)
        if(result == true){
            console.log('###### DAILY ACTIVITIES')
            for(var i=0;i<=20;i++){
                console.log('CHECKING BUTTON: '+i)
                var result = await dailybuttons(i)
                await loading(1000)
                if(result == true){
                    console.log('CHECKING SIGNIN BTN')
                    var result = await dailyactivityWait(1)
                    if(result == true){
                        console.log('WAITING TO LOAD COMPLETELY')
                        var result = await dailyactivityWait(2)
                        await loading(3000)
                        if(result == 'complete'){
                            console.log('CLOSING TAB')
                            await loading(15000)
                            const tab = await getCurrentTab();
                            chrome.tabs.remove(tab.id);
                        }
                    }
                }
            }
        }
        resolve(true)
    })
}








//////////////////////////////////////////////////////// MORE ACTIVITIES


async function moreActivitiesButtons(i){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.executeScript({
            code : `(function() {
                function getElementByXpath(path) {
                    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                }
                var t = getElementByXpath('/html/body/div[1]/div[2]/main/div/ui-view/mee-rewards-dashboard/main/div/mee-rewards-more-activities-card/mee-card-group/div/mee-card[${i}]/div/card-content/mee-rewards-more-activities-card-item/div/a/mee-rewards-points/div/div/span[1]')
                var plus = t.classList.contains('mee-icon-AddMedium')
                var clock = t.classList.contains('mee-icon-HourGlass')
                // var tick = t.classList.contains('mee-icon-SkypeCircleCheck')
                if(plus == true || clock == true){
                    t.click()
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


async function MoreActivityWait(msg){
    if(msg == 1){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code: `(function(){
                    function getElementByXpath(path) {
                        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    }
                    var t = getElementByXpath('/html/body/div[2]/div[2]/span/a')
                    t.click()
                    return true
                ()`,
                runAt: 'document_end'
            },r =>{
                if(r[0] == 'complete'){
                    resolve(true)
                }
                else{
                    resolve(true)
                }
            })
        })
    }
    if(msg == 2){
        return new Promise(async (resolve, reject) => {
            chrome.tabs.executeScript({
                code: 'document.readyState',
                runAt: 'document_end'
            },r =>{
                if(r[0] == 'complete'){
                    resolve('complete')
                }
                else{
                    resolve(null)
                }
            })
        })
    }
}


async function newmethod(){
    return new Promise(async (resolve, reject) => {
        console.log('OPENING MORE ACTIVITIES URL')
        var result = await dailyActivitiesUrl()
        await loading(3000)
        if(result == true){
            console.log('###### MORE ACTIVITIES')
            for(var i=0;i<=20;i++){
                console.log('CHECKING BUTTON: '+i)
                var result = await moreActivitiesButtons(i)
                await loading(1000)
                if(result == true){
                    console.log('CHECKING SIGNIN BTN')
                    var result = await MoreActivityWait(1)
                    if(result == true){
                        console.log('WAITING TO LOAD COMPLETELY')
                        var result = await MoreActivityWait(2)
                        await loading(3000)
                        if(result == 'complete'){
                            console.log('CLOSING TAB')
                            await loading(15000)
                            const tab = await getCurrentTab();
                            chrome.tabs.remove(tab.id);
                        }
                    }
                } 
            }
        }
        resolve(true)
    })

}


////////////////////////////////////////// OLD METHOD REWARD




async function oldmethod(){
    return new Promise(async (resolve, reject) => {
        console.log('OPENING MORE ACTIVITIES URL')
        var result = await dailyActivitiesUrl()
        await loading(3000)
        if(result == true){
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
        }
    })
}





////////////////////////////////////////////////// REWARD EVENT



async function RewardUrl(){
    return new Promise(async (resolve, reject) => {
        await chrome.tabs.create({url: "https://rewards.bing.com/?redref=amc"}, async function(tab) {
            console.log('Tab Created ' + tab.id);
        });
        resolve(true)
    })
}

async function reward(){
    return new Promise(async (resolve, reject) => {
        var result = await RewardUrl()
        await loading(3000)
        await chrome.contentSettings.popups.set({primaryPattern: "*://*/*",setting: "allow"})
        await loading(3000)
        if(result == true){
            // CHECK IF ASSKING FOR SIGNIN ON PAGE
            console.log('boarderBanner')
            var result = await boarderbanner()
            if(result == true){
                // LARGE BANNER
                console.log('largeBanner')
                var result = await largebanner()
                // if(result == true){
                //     // DAILY ACTIVITES
                //     console.log('DailyActies')
                //     var result = await dailyactivity()
                //     if(result == true){
                //         ////MORE ACTIVITIES
                //         console.log('MORE ACTIVITIES')
                //         await newmethod()
                //     }
                // }
                if(result == true){
                    await oldmethod()
                    await loading(3000)
                }
            }
        }
        resolve(true)
    })
}







///////////////////////////////////////////// PROXY EVENT



async function ProxyUrl(){
    return new Promise(async (resolve, reject) => {
        await chrome.tabs.create({url: 'chrome-extension://ipbgaooglppjombmbgebgmaehjkfabme/popup.html'}, async function(tab) {
            console.log('Tab Created ' + tab.id);
        });
        await loading(5000)
        resolve(true)
    })
}

async function ProxyEvent(msg){
    return new Promise(async (resolve, reject) => {
        await chrome.runtime.sendMessage(msg,(response)=>{
            console.log(response)
            return response;
        })
        resolve(true)
    })
}




async function proxyurl(msg){
    return new Promise(async (resolve, reject) => {
        await loading(3000)
        var result = await ProxyUrl()
        if(result == true){
            var result = await ProxyEvent(msg)
            if(result == true){
                resolve(true)
            }
        }
        resolve(null)
    })

}



//////////////////////////////////////////////// SEARCH EVENT


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



/////////////////////////////////////////////// AGAIN

async function againurl(){
    return new Promise(async (resolve, reject) => {
        chrome.tabs.create({url: 'chrome-extension://ipbgaooglppjombmbgebgmaehjkfabme/popup.html'}, async function(tab) {
            console.log('Tab Created ' + tab.id);
        });
        resolve(true)
    })
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


/////////////////////////////////////////////////////////////// MAIN


async function main(data){
    console.log('CLEANING .........')
    await cleardata()
    var ids = data
    for(var j=0;j<ids.length;j++){
        var array = ["system"]
        for(var i=0;i<array.length;i++){
            var result = await proxyurl(array[i])
            if(result == true){
                if(array[i] == "system"){
                    var result = await login(ids[j].email,ids[j].pass)
                }
                if(result == true){
                    console.log('reward')
                    var result = await reward()
                    if(result == true){
                        console.log('search')
                        var result = await searchurl()
                        await loading(5000)
                        if(result == true){
                            console.log('Closing ALl Tabs')
                            var result = await CLoseAllTabs()
                        }
                    }
                }
            }

        }
        console.log('CLEANING .........')
        await cleardata()
    }
    await loading(5000)
    var result = await againurl()
    await loading(5000)
    if(result == true){
        await againStartbtn()
    }
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