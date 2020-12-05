const fs = require("fs");
const fsPromises = fs.promises;

const bootstrap = async function() {
    
    const path = "day4_passwords.txt"
    const passwords = await fsPromises.readFile(path);
    const splittedPasswordsByLines = passwords.toString().split("\n")
    
    const required = [
        {key: "byr", validate:  (value) => !!value.match('^19[2-9][0-9]|200[0-2]$')},
        {key: "iyr", validate:  (value) => !!value.match('^201[0-9]|2020$')},
        {key: "eyr", validate:  (value) => !!value.match('^202[0-9]|2030$')},
        {key: "hgt", validate:  (value) => !!value.match('^1[5-8][0-9]cm|19[0-3]cm|59in|6[0-9]in|7[0-6]in$')},
        {key: "hcl", validate:  (value) => !!value.match('^#[0-9a-f]{6}$')},
        {key: "ecl", validate:  (value) => !!value.match('^(amb|blu|brn|gry|grn|hzl|oth)$')},
        {key: "pid", validate:  (value) => !!value.match('^\\d{9}$')},
    ]
   
    const validPasswordsLength = splittedPasswordsByLines.reduce((previousLine, currentLine) => {
        if(currentLine == '') return previousLine + "|"
        return previousLine + ' ' + currentLine
    }).split("|").map(completePasswordLine => {
         const completePassword = completePasswordLine.split(" ").map(keyValueStringPair => {
            if(!keyValueStringPair) return
            const [key, value] = keyValueStringPair.split(":")
            return {key, value}
        }).filter(value => !!value).map(keyValueObject => {
            return keyValueObject
        })

        let validPassword = true
        required.map(require => {
            if(!completePassword.map(keyValue => keyValue.key).includes(require.key) || !require.validate(completePassword.find(keyValue => {
                return keyValue.key === require.key
            }).value)) validPassword = false
        })

        if(validPassword) return true
    }).filter(value => !!value).length

    console.log(`Valid passwords ${validPasswordsLength}`)
}

bootstrap()
