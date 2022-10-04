fs = require('fs')


function mostBlocked (data) {
    


    // const statesCountOld = {}

    // for (let i = 0; i < data.length; i++) {
    //     if (data[i].subscription.status === "Blocked") {
    //         statesCountOld[data[i].address.state] = statesCountOld[data[i].address.state]
    //                     ? statesCountOld[data[i].address.state] += 1
    //                     : 1                                  
    //        } 
    // }



    const statesCount = {}
    let highestNumber = 0


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
                if (highestNumber < statesCount[data[i].address.state].count) {
                    highestNumber = statesCount[data[i].address.state].count
                }
          } else {
            statesCount[data[i].address.state] = {
                count: statesCount[data[i].address.state].count + 1,
                users: [...statesCount[data[i].address.state].users, 
                    {
                    first_name: data[i].first_name,
                    last_name: data[i].last_name,
                    address: data[i].address,
                  }]
              } 
                if (highestNumber < statesCount[data[i].address.state].count) {
                    highestNumber = statesCount[data[i].address.state].count
            }
          }

        } else {
            if (statesCount[data[i].address.state] === undefined) {
                statesCount[data[i].address.state] = {
                    count: 0,
                  users: [{
                          first_name: data[i].first_name,
                          last_name: data[i].last_name,
                          address: data[i].address,
                        }]
                } 
              } else {
                statesCount[data[i].address.state] = {
                    count: statesCount[data[i].address.state].count,
                    users: [...statesCount[data[i].address.state].users, 
                        {
                        first_name: data[i].first_name,
                        last_name: data[i].last_name,
                        address: data[i].address,
                      }]
                  } 
              }
        }
      }



    const keys = Object.keys(statesCount)
    mostBlockedStates = []

    for (let j = 0; j < keys.length; j++) {

        if (statesCount[keys[j]].count === highestNumber) {
            mostBlockedStates.push(keys[j])
        }
    }


    console.log("State with most blocked users are",mostBlockedStates)
    console.log("Highest number of blocked users per state is",highestNumber)

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
