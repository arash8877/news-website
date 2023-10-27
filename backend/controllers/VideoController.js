import path from "path";
import Video from "../models/videoModel.js";
import fs from "fs";

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({});
    res.json("all videos");
  } catch (error) {
    console.log(error);
  }
};

export const createVideo = async (req, res) => {
  if (req.file == 0) {
    return res.json({ message: "No video is chosen!" });
  }
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name); //ext is used for 'passvand' of the file
  let dateNow = Math.round(Date.now());
  const fileName = dateNow + ext;
  const url = `${req.protocol}://${req.get("host")}/videos/${fileName}`;
  const allowedType = [".mp4"];

  if (!allowedType.includes(ext.toLocaleLowerCase())) {
    return res.json({
      msg: "Type of the file is not allowed. use just mp4 type.",
    });
  }
  if (fileSize > 5000000) {
    return res.json({ msg: "Size of the file should be less than 5Mb!" });
  }
  file.mv(`./public/videos/${fileName}`, async (err) => {
    //mv is a method to move
    if (err) return res.json({ msg: err.message });
    try {
      await Video.create({ video: fileName, url: url });
      res.json({ msg: "video is added successfully." });
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

  if (!video) return res.json({ msg: "video is not find!" });
  //need to delete the video in the data base and also in the folder public/videos
  try {
    const filePath = `./public/videos/${video.video}`; //finding name of the video
    fs.unlinkSync(filePath); //fs can find something in the system and delete it
    await Video.destroy({ where: { id: req.params.id } }); //deleting the video in the data base
    res.json({ msg: "video is deleted successfully." });
  } catch (error) {
    console.log(error);
  }
};