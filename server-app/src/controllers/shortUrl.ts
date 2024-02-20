import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (req: express.Request, res: express.Response) => {
    const { fullUrl } = req.body;
    try {
        const urlFound = await urlModel.find({ fullUrl })
        if (urlFound.length > 0) {
            res.status(409).send(urlFound)
        } else {
            const shortUrl = await urlModel.create({ fullUrl })
            res.status(200).send(shortUrl)
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" })
    }
}

export const getAllUrl = async (req: express.Request, res: express.Response) => {
    try {
        const allUrls = await urlModel.find();
        if (allUrls.length < 0) {
            res.status(400).send({ message: "Url not found" })
        } else {
            res.status(200).send(allUrls)
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" })
    }
}

export const getUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const shortUrl = await urlModel.findOne({ shortUrl: id })
        if (!shortUrl) {
            res.status(404).send({ message: "Message not found" })
        } else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`)
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" })

    }
}

export const deleteUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const shortUrl = await urlModel.findByIdAndDelete({ _id: id })
        if (shortUrl) {
            res.status(200).send({ message: "URL deleted successfully" })
        } else {
            res.status(404).send({ message: "No URL found with this id" })
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" })
    }
}