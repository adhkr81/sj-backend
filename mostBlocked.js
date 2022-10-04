fs = require('fs')


function mostBlocked (data) {
    

    const statesCount = {}
    // const statesCountOld = {}

    // for (let i = 0; i < data.length; i++) {
    //     if (data[i].subscription.status === "Blocked") {
    //         statesCountOld[data[i].address.state] = statesCountOld[data[i].address.state]
    //                     ? statesCountOld[data[i].address.state] += 1
    //                     : 1                                  
    //        } 
    // }


    for (let i = 0; i < data.length; i++) {
        if (data[i].subscription.status === "Blocked") {

          if (statesCount[data[i].address.state] === undefined) {
            statesCount[data[i].address.state] = {
              count: 1,
              users: [{
                      first_name: data[i].first_name,
                      last_name: data[i].last_name,
                      address: data[i].address,
                    }]
            } 
          } else {
            statesCount[data[i].address.state] = {
                count: statesCount[data[i].address.state].count + 1,
                users: [...statesCount[data[i].address.state].users, 
                    {
                    first_name: data[i].first_name,
                    last_name: data[i].last_name,
                    address: data[i].address,
                  }               ]
              } 
          }
        }
      }



    console.log(statesCount)


    // const keys = Object.keys(statesCount)
    // let count = 0
    // mostBlockedStates = []

    // for (let j = 0; j < keys.length; j++) {

    //     if(statesCount[keys[j]] > count) {
    //         mostBlockedStates = [keys[j]]
    //         count = statesCount[keys[j]] 
    //     } else if (statesCount[keys[j]] === count) {
    //         mostBlockedStates.push(keys[j])
    //     } 
    // }


    // let blockedUsers = []
    // data.map((current) => {
    //     if (mostBlockedStates.indexOf(current.address.state) != -1) {
    //         return blockedUsers.push(
    //             {"first_name": current.first_name,
    //             "last_name": current.last_name,
    //             "address" : current.address}
    //         )
    //     }
    // })

    // console.log(blockedUsers)
}






let jsonFile;

fs.readFile('./data.json', 'utf8', function (err, data) {
    if (err) { 
        console.log(err)
    }
    jsonFile = JSON.parse(data)
    mostBlocked(jsonFile)
  });



// {"Utah" : {count: Number , users: {}}}
