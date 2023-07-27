
/*
* localStorage initialization of important data
*/
function localStorageUpdateData(date, data) {
    localStorage[object_key_updateDate] = date;
    localStorage[object_key_packages] = JSON.stringify(data);
    var tempNameListArray = [];
    JSON.parse(localStorage[object_key_packages]).forEach(function (element, index) {
        /* Store location of map origin */
        mapOriginName = element.name + ' map'
        storeMapOrigin(mapOriginName)
        /* Create Package Name List */
        tempNameListArray.push(element.name);
        /* Initialize package Notificaiton List*/
        packageNotif = element.name + ' notifications'
        localStorage[packageNotif] = JSON.stringify([]);
    });
    localStorage['packageNameList'] = JSON.stringify(tempNameListArray);

}

/*
* @brief Stores map origin in localStorage
* @desc  Ideally should find the correct lat lon value of the
*        desired place. But for now generate random lat lon
*/
function storeMapOrigin(packageMapName) {
    var latVal = Math.floor(Math.random() * 90) + 1; // this will get a number between 1 and 90;
    latVal *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    var lonVal = Math.floor(Math.random() * 180) + 1; // this will get a number between 1 and 180;
    lonVal *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    var coords = {
        "lat": latVal,
        "lon": lonVal
    }
    localStorage[packageMapName] = JSON.stringify(coords);
}


/*
* @brief Takes in a notif event text and checks for package name
*/
function checkIfValidPackageName(eventText) {
    providedName = eventText.split(':')[0];
    if (JSON.parse(localStorage['packageNameList']).includes(providedName)) {
        return 1;
    } return 0;
}

/*
* @brief Stores notification data into localStorage
* @Input
*    name - Package name
*    notif - Entire notification string to be stored and displayed
*/
function storeNotification(name, notif) {
    var temp = JSON.parse(localStorage[name + ' notifications'])
    temp.push(notif);
    localStorage[name + ' notifications'] = JSON.stringify(temp);
}

/*
* @brief Adds existing notification from localStorage to html table
* @input Package Name
*/
function displayNotifications(packageName) {
    var tempNotifString = packageName + ' notifications';
    var tempNotifList = JSON.parse(localStorage[tempNotifString]);
    tempNotifList.forEach(element => {
        $("#detailsBodyTableBtm").append(" \
            <tr id='tableContentsBtm'><td class='tableBtmText'>" + element + "</td></tr> \
        ")
    });
}

/*
* Function for easier reference during demo\
*/
function packages(){
    JSON.parse(localStorage['packageNameList']).forEach(element => {
        console.log(element);
    });
}