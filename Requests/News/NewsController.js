import NewsService from "./NewsService.js"

class NewsController{
    async create(req, res) {
        try {
            const news = await NewsService.create(req.body, req.files)
            res.status(200).json(news)
        } catch (e) { 
            res.status(500).json(e) 
        }
    }

    async getAll(req, res) {
        try {
            const news = await NewsService.getAll()
            return res.status(200).json(news)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const news = await NewsService.getOne(req.params.id)
            return res.status(200).json(news)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const updateNews = await NewsService.update(req.body)
            return res.status(200).json(updateNews)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const news = await NewsService.delete(req.params.id)
            return res.status(200).json(news) 
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new NewsController()