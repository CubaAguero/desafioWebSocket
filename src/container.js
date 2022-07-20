const fs = require('fs');

class Container{
    constructor(nameFile){
        this.nameFile = nameFile
    }

    async createFile(){
        try{
             await fs.promises.writeFile("productos.txt", "")
             return console.log("Archivo Creado!")
        }
        catch(err){
            console.log("No se pudo crear el archivo!",err)
        }
    }        
    
    async save(title, price, thumbnail){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            let dataFile = [];
            if (res != ""){
                dataFile = JSON.parse(res)
            }

            let item = {};
            item.title = title,
            item.price = price,
            item.thumbnail = thumbnail,
            item.id = dataFile.length + 1;
            dataFile.push(item)

            await fs.promises.writeFile("productos.txt", JSON.stringify(dataFile, null, 2))
            
            return {massage: "Archivo Guardado", id: `${item.id}`}
        }
        catch(err){
            console.log("No se pudo guardar!",err)
        }
    }

    async getById(id){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            if(res == ""){
                return null
            }
            let data = JSON.parse(res)
            let item = data.find((elem) => elem.id === id)
            if(item === undefined){
                return {message: "No se encontro el item"}
            }
            return item
        }
        catch(err){
            console.log('No se pudo encontrar el elemento!',err)
        }
    }

    async getAll(){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
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

    async deleteById(id){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            if(res == ""){
                return {message: "No hay productos!"}
            }
            let data = JSON.parse(res)

            let item = data.find((elem) => elem.id === id)
            if(item === undefined) return {message: "No se encontro el item "}
            
            let dataFile = data.filter((elem) => elem.id !== item.id)
            await fs.promises.writeFile("productos.txt", JSON.stringify(dataFile, null, 2))
            return {message: "Se elimino el item!"}
        }
        catch(err){
            console.log('No se pudo eliminar!',err)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile("productos.txt", " ")
            return console.log("Se eliminaron los elementos del Archivo!")
        }
        catch(err){
            console.log("No se pudo borrar el archivo!",err)
        }    
    }

    async put(id, item){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            if(res == ""){
                return {message: "No hay productos!"}
            }
            
            let data = JSON.parse(res)
            let index = data.findIndex((elem) => elem.id === id)
            if(index === undefined) return {message: "No se encontro el item"}
            let obj = {}
            obj.title= item.title
            obj.price = item.price
            obj.thumbnail = item.thumbnail
            obj.id = id
            data[index] = obj

            await fs.promises.writeFile("productos.txt", JSON.stringify(data, null, 2))
            return {message: "item actualizado!"}

        }
        catch(err){
            console.log("Error!",err)
        }
    }

} 

module.exports = Container;