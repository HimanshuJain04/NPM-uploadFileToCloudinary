const cloudinary = require("cloudinary").v2;


async function UploadFileToCloudinary({ cloudName, apiKey, apiSecret, folderName = "CloudinaryFiles", file, quality = 100 }) {

    try {
        // Check if required parameters are provided
        if (!cloudName || !apiKey || !apiSecret || !file) {
            throw new Error("Missing required parameters: cloudName, apiKey, apiSecret, and file");
        }

        // Check if quality is within the valid range
        if (quality < 0 || quality > 100) {
            throw new Error("Quality value must be between 0 and 100");
        }

        // Configure Cloudinary
        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
        });

        console.log("CONFIG SUCCESS!")

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: folderName,
            resource_type: "auto",
            quality: quality
        });

        console.log("RESULT!")

        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    }
}

module.exports = UploadFileToCloudinary;
