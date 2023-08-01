import mongoose from "mongoose";

const Post = new mongoose.Schema({
    // Текст
    title: {type: String, required: true},
    description: {type: String, required: true},
    dateStart: {type: String, required: true},
    dateEnd: {type: String, required: true},
    maxPeople: {type: String, required: true},
    place: {type: String, required: true},
    speakerName: {type: String, required: true},
    eventProgramm: {type: String, required: true},

    // Фотографии
    eventOrganizerPhoto: {type: String},
    teacherPhotos: {type: String},
    eventPhotos: {type: String},
    previewPhoto: {type: String}
})

export default mongoose.model('Post', Post)