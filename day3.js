const fs = require("fs");
const fsPromises = fs.promises;


const calculateTreeInSlope = (col, row, mapChunks) => {
    
    let countedTree = 0
    let colPosition = 0

    mapChunks.map((mapChunk, index) => {

        if((index) % row > 0) {
            return
        }

        const currentPosition = colPosition % mapChunk.length

        if(mapChunk[currentPosition] === "#") countedTree++
        colPosition += col
    })

    return  countedTree
}

const bootstrap = async function() {
    const path = "day3_map.txt"
    const fullMap = await fsPromises.readFile(path);
    const mapSplittedByNewLine = fullMap.toString().split(/\r|\n/)

    const positions = [
        {x: 1, y: 1},
        {x: 3, y: 1},
        {x: 5, y: 1},
        {x: 7, y: 1},
        {x: 1, y: 2}
    ]
    
    const calculatedTreePositions = []
    positions.map(position => {
        calculatedTreePositions.push(calculateTreeInSlope(position.x, position.y, mapSplittedByNewLine))
    })

    let totalTrees = 1
    calculatedTreePositions.map((calculatedTreePosition) => {
        console.log(calculatedTreePosition)
        totalTrees *= calculatedTreePosition
    })
    console.log(`Trees : ${totalTrees}`)
}

bootstrap()
