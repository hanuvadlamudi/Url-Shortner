import shortUrl from "../model/shorturl.model.js";
import { BadRequestError } from "../utils/errorHandler.util.js";

export const getAllUserUrls = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      throw new BadRequestError("User not authenticated");
    }

    const userUrls = await shortUrl.find({ user: req.user._id }).sort({ _id: -1 });

    res.status(200).json({
      success: true,
      urls: userUrls.map(url => ({
        originalUrl: url.real_url,
        shortUrl: process.env.APP_URL + url.short_url,
        clicks: url.clicks
      })),
      message: "User URLs retrieved successfully"
    });
  } catch (err) {
    next(err);
  }
};
