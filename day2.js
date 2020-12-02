const fs = require("fs");
const fsPromises = fs.promises;

const loadPasswords = async (path) => {
    const fullContent = await fsPromises.readFile(path);
    const splittedPasswordsByNewLines = fullContent.toString().split(/\r|\n/)
    
    return splittedPasswordsByNewLines.map(rawPasswordToCheck => {

        const rawPasswordToCheckSplittedBySpace = rawPasswordToCheck.split(" ")
        const minLetterCount = Number(rawPasswordToCheckSplittedBySpace[0].split("-")[0])
        const maxLetterCount = Number(rawPasswordToCheckSplittedBySpace[0].split("-")[1])

        return {
            password: rawPasswordToCheckSplittedBySpace[2],
            letter: rawPasswordToCheckSplittedBySpace[1].substr(0, 1),
            minLetterCount: minLetterCount,
            maxLetterCount: maxLetterCount
        }
    })
}

const maxMinLetterPolicy = ({password, maxLetterCount, minLetterCount, letter}) => {
    const letterOccurrences = [...password].filter(passwordLetter => passwordLetter === letter)
    const isValid = letterOccurrences.length <= maxLetterCount && letterOccurrences.length >= minLetterCount
    return isValid
}

const validLetterPositionPolicy = ({password, positions, letter}) => {

    const letterPositionOccurrences = [...password].map((passwordLetter, index) => {
        index = index + 1 
        return passwordLetter === letter && positions.includes(index)
    }).filter(value => !!value)

    return letterPositionOccurrences.length === 1
}


const bootstrap = async function() {

    let validFirstPolicyPasswordsCount = 0
    let validTwoPolicyPasswordsCount = 0

    const passwordsToCheck = await loadPasswords('day2_passwords.txt')
    
    passwordsToCheck.forEach(passwordToCheck => {
        if(maxMinLetterPolicy(passwordToCheck)) {
            validFirstPolicyPasswordsCount++
        }
     })
    

    passwordsToCheck.forEach(passwordToCheck => {
        if(validLetterPositionPolicy({
            letter: passwordToCheck.letter,
            password: passwordToCheck.password,
            positions: [passwordToCheck.maxLetterCount, passwordToCheck.minLetterCount]
        })) {
            validTwoPolicyPasswordsCount++
        }
     })

     console.log(`Valid passwords policy 1 count ${validFirstPolicyPasswordsCount}`)
     console.log(`Valid passwords policy 2 count ${validTwoPolicyPasswordsCount}`)

}

bootstrap()
