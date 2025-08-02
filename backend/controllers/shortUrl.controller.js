import {generateShortUrlWithUser , generateShortUrlWithoutUser } from "../services/generateShortUrl.service.js";
import shortUrlSchema from "../model/shorturl.model.js";
import { BadRequestError, NotFoundError } from "../utils/errorHandler.util.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) throw new BadRequestError("URL is required");

    let shortUrl;

    if (req.user && req.user.id) {
      // Logged-in user
      shortUrl = await generateShortUrlWithUser(url, req.user.id);
    } else {
      // Guest user
      shortUrl = await generateShortUrlWithoutUser(url);
    }

    res.status(200).send(process.env.APP_URL + shortUrl);
  } catch (err) {
      next(err);
  }
};


export const customUrl = async (req, res, next) => {
  try {
    const { url, slug } = req.body;

    if (!url || !slug) {
      throw new BadRequestError("Both URL and slug are required");
    }

    // Check if slug already exists
    const existing = await shortUrlSchema.findOne({ short_url: slug });
    if (existing) {
      throw new BadRequestError("Custom short URL already exists");
    }

    
    const newUrlInfo = new shortUrlSchema({
      real_url: url,
      short_url: slug,
      user: req.user?.id, // optional, add if logged-in
    });

    await newUrlInfo.save();

    res.status(201).send(process.env.APP_URL + slug);
  } catch (err) {
    next(err);
  }
};


export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError("Short URL ID is required");
    }
    const url = await shortUrlSchema.findOneAndUpdate(
      { short_url: id },
      { $inc: { clicks: 1 } },
      { new: true }
    );
    if (!url) {
      throw new NotFoundError("Short URL not found");
    }
    res.redirect(url.real_url);
  } catch (err) {
    next(err);
  }
};
