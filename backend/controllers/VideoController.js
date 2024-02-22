import path from "path";
import Video from "../models/videoModel.js";
import fs from "fs";

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({});
    res.json(videos);
  } catch (error) {
    console.log(error);
  }
};

export const createVideo = async (req, res) => {
  if (req.files == null) {
    return res.json({ message: "Choose a video file!" });
  }
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name); //ext is used for 'passvand' of the file
  let dateNow = Math.round(Date.now());
  const fileName = dateNow + ext;
  const url = `${req.protocol}://${req.get("host")}/videos/${fileName}`;
  const allowedType = [".mp4"];

  if (!allowedType.includes(ext.toLowerCase())) {
    return res.json({
      message: "Invalid video format! use mp4 format.",
    });
  }
  if (fileSize > 5000000) {
    return res.json({ message: "Size of the file should be less than 5Mb!" });
  }
  file.mv(`./public/videos/${fileName}`, async (err) => {
    //mv is a method to move
    if (err) return res.json({ message: err.message });
    try {
      await Video.create({ video: fileName, url: url });
      res.json({ message: "Video uploaded successfully." });
    } catch (error) {
      console.log(error);
    }
  });
};



export const getSingleVideo = async (req, res) => {
  try {
    const video = await Video.findOne({ order: [["createdAt", "DESC"]] }); //need to find the latest video
    res.json(video);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideo = async (req, res) => {
  const video = await Video.findOne({
    where: { id: req.params.id },
  });

  if (!video) return res.json({ message: "video is not found!" });
  //need to delete the video in the data base and also in the folder public/videos
  try {
    const filePath = `./public/videos/${video.video}`; //finding name of the video
    fs.unlinkSync(filePath); //fs can find something in the system and delete it
    await Video.destroy({ where: { id: req.params.id } }); //deleting the video in the data base
    res.json({ message: "video is deleted successfully." });
  } catch (error) {
    console.log(error);
  }
};
