import News from "./News.js";
import FileService from "../../FileService.js";

class NewsService {

  async create(news, file) {
    const picture = file.pictures
    const previewPicture = file.previewPicture

    let picturesName = ''
    
    for (let i = 0; i < picture.length; i++){
      const fileName = FileService.saveFile(picture[i], 'News');
      
      if (i == picture.length - 1) {
        picturesName += fileName
      } else {
        picturesName += fileName + ','
      }
    }

    const previewfileName = FileService.saveFile(previewPicture, 'News');

    const createdNews = await News.create({ ...news, pictures: picturesName, previewPicture: previewfileName});
    return createdNews;
  }

  async getAll() { 
    const getAllNews = await News.find();  
    return getAllNews;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const getOneNews = await News.findById(id);
    return getOneNews;
  }

  async update(news) {
    if (!news._id) {
      throw new Error("не указан ID");
    }
    const updateNews = await News.findByIdAndUpdate(news._id, news, {
      new: true,
    });
    return updateNews;
  }

  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const deleteNews = await News.findByIdAndDelete(id);
    return deleteNews;
  }
}

export default new NewsService();
