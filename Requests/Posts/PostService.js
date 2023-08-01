import Post from "./Post.js";
import FileService from "../../FileService.js";

class PostService {
  
  async create(post, file) {
    const eventOrganizerPhoto = file.eventOrganizerPhoto
    const previewPhoto = file.previewPhoto
    const teacherPhotos = file.teacherPhotos
    const eventPhotos = file.eventPhotos

    const eventOrganizerPhotoName = FileService.saveFile(eventOrganizerPhoto, 'Posts');
    const previewPhotoName = FileService.saveFile(previewPhoto, 'Posts');

    let teacherPhotosName = ''
    
    for (let i = 0; i < teacherPhotos.length; i++){
      const fileName = FileService.saveFile(teacherPhotos[i], 'Posts');
      
      if (i == teacherPhotos.length - 1) {
        teacherPhotosName += fileName
      } else {
        teacherPhotosName += fileName + ','
      }
    }

    let eventPhotosName = ''
    
    for (let i = 0; i < eventPhotos.length; i++){
      const fileName = FileService.saveFile(eventPhotos[i], 'Posts');
      
      if (i == eventPhotos.length - 1) {
        eventPhotosName += fileName
      } else {
        eventPhotosName += fileName + ','
      }
    }

    const createdPost = await Post.create({ 
      ...post, 
      eventOrganizerPhoto: eventOrganizerPhotoName, 
      teacherPhotos: teacherPhotosName,
      eventPhotos: eventPhotosName,
      previewPhoto: previewPhotoName 
    });
    return createdPost;
  }

  async getAll() {
    const getAllPosts = await Post.find();
    return getAllPosts;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const getOnePost = await Post.findById(id);
    return getOnePost;
  }

  async update(post) {
    if (!post._id) {
      throw new Error("не указан ID");
    }
    const updatePost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatePost;
  }

  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const deletePost = await Post.findByIdAndDelete(id);
    return deletePost;
  }
}

export default new PostService();
