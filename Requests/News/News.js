import mongoose from "mongoose";

const News = new mongoose.Schema({
    // Текст
    title: {type: String, required: true},
    date: {type: String, required: true},
    description: {type: String, required: true},

    // Фотографии
    pictures: {type: String, required: true},
    previewPicture: {type: String, required: true}
})

export default mongoose.model('News', News)