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

  
    let objValues = Object.values(statesCount)
    let maxValue = Math.max(...objValues)

    let mostBlockStates = []
    Object.keys(statesCount).map(key => {
        return (statesCount[key] === maxValue ?
            mostBlockStates.push(key)
            : null)
    })

    console.log(mostBlockStates)
    console.log(objValues)
}






let jsonFile;

fs.readFile('./data.json', 'utf8', function (err, data) {
    if (err) { 
        console.log(err)
    }
    jsonFile = JSON.parse(data)
    mostBlocked(jsonFile)
  });