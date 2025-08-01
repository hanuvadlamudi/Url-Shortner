import { generateNanoId } from "../utils/helper.util.js";
import shortUrlSchema from "../model/shorturl.model.js";
import { ConflictError, BadRequestError } from "../utils/errorHandler.util.js";

export const generateShortUrlWithoutUser = async (url) => {
  if (!url) {
    throw new BadRequestError("URL is required");
  }
  const shortUrl = await generateNanoId(7);

  const existing = await shortUrlSchema.findOne({ short_url: shortUrl });
  if (existing) {
    throw new ConflictError("Generated short URL already exists");
  }

  const newUrlInfo = new shortUrlSchema({
    real_url: url,
    short_url: shortUrl,
  });

  await newUrlInfo.save();
  return shortUrl;
};

export const generateShortUrlWithUser = async (url, userId) => {
  if (!url) {
    throw new BadRequestError("URL is required");
  }
  if (!userId) {
    throw new BadRequestError("User ID is required");
  }
  const shortUrl = await generateNanoId(7);

  const existing = await shortUrlSchema.findOne({ short_url: shortUrl });
  if (existing) {
    throw new ConflictError("Generated short URL already exists");
  }

  const newUrlInfo = new shortUrlSchema({
    real_url: url,
    short_url: shortUrl,
    user: userId,
  });

  await newUrlInfo.save();
  return shortUrl;
};
