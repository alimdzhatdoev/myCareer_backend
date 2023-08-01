import PostService from "./PostService.js"

class PostController{
    async create(req, res) {
        try {
            const post = await PostService.create(req.body, req.files)
            res.status(200).json(post)
        } catch (e) {
            res.status(500).json(e) 
        }
    }

    async getAll(req, res) {
        try {
            const post = await PostService.getAll()
            return res.status(200).json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const post = await PostService.getOne(req.params.id)
            return res.status(200).json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const updatePost = await PostService.update(req.body)
            return res.status(200).json(updatePost)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id)
            return res.status(200).json(post) 
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new PostController()