import * as uuid from 'uuid'
import * as path from 'path'

class FileService{
    saveFile(file, folderName){
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(`static/${folderName}`, fileName)
            file.mv(filePath)
            return fileName
        } catch (e) {
            console.log(e)
        }
    }
}

export default new FileService()