import { generateShortUrlWithoutUser } from "../services/generateShortUrl.service.js";
import shortUrlSchema from "../model/shorturl.model.js";
import { BadRequestError, NotFoundError } from "../utils/errorHandler.util.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      throw new BadRequestError("URL is required");
    }
    const shortUrl = await generateShortUrlWithoutUser(url);
    res.send(process.env.APP_URL + shortUrl);
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
