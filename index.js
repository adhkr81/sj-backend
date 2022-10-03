fs = require('fs')

let jsonFile;


function payment (data) {

    const payCount ={}
    const payType = []

    data.forEach(type => {
        if (payType.indexOf(type.subscription.payment_method) === -1) {
            payType.push(type.subscription.payment_method)
            payCount[type.subscription.payment_method] = 1
        } else {
            payCount[type.subscription.payment_method] = payCount[type.subscription.payment_method] + 1
        }        
    })

    const payCountArr = Object.entries(payCount)
    payCountArr.sort(function(a, b) {return b[1] - a[1]})

    const returnObj = { paymentMethods : payType , TotalByType : payCountArr}

    const jsonString = JSON.stringify(returnObj)

    fs.writeFile("./test.json", jsonString, "utf8", function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }     
        console.log("JSON file has been saved.");
    })
}



fs.readFile('./data.json', 'utf8', function (err, data) {
    if (err) { 
        console.log(err)
    }
    jsonFile = JSON.parse(data)
    payment(jsonFile)
  });