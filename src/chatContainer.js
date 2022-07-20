const fs = require('fs')

class ChatContainer{
    constructor(nameFile){
        this.nameFile = nameFile
    }

    async getAll(){
        try{
            const res = await fs.promises.readFile("chat.txt", "utf-8")
            if(res == ""){
                return null
            }
            const data = JSON.parse(res)
            return data
        }  
        catch(err){
            console.log("No se pudo leer!",err)
        }
    }

    async saveMassege( message ){
        try{
            const res = await fs.promises.readFile('chat.txt', 'utf-8')
            let dataFile = [];
            if (res != ""){
                dataFile = JSON.parse(res)
            }
            dataFile.push({ message })
            await fs.promises.writeFile("chat.txt", JSON.stringify(dataFile, null, 2))
        }
        catch(err){
            console.log('No se pudo guardar!', err)
        }
    }
}

module.exports = ChatContainer