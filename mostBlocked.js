fs = require('fs')


function mostBlocked (data) {
    
    const statesCount = {}

    data.map((current) => {
       if (current.subscription.status === "Blocked") {
        return (statesCount[current.address.state] = statesCount[current.address.state]
            ? statesCount[current.address.state] += 1
            : 1)            
       } 
    })

    console.log(statesCount)

    let objValues = Object.values(statesCount)
    let maxValue = Math.max(...objValues)

    let mostBlockedStates = []
    Object.keys(statesCount).map(key => {
        return (statesCount[key] === maxValue ?
            mostBlockedStates.push(key)
            : null)
    })

    let blockedUsers = []
    data.map((current) => {
        if (mostBlockedStates.indexOf(current.address.state) != -1) {
            return blockedUsers.push(
                {"first_name": current.first_name,
                "last_name": current.last_name,
                "address" : current.address}
            )
        }
    })

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