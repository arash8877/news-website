import News from "../models/newsModel.js";
import path from "path";
import fs from "fs";
import Category from "../models/categoryModel.js";
import Users from "../models/userModel.js";

export const getNews = async (req, res) => {
  try {
    const news = await News.findAll({
      include: [Users]
    });
    res.json(news);
  } catch (error) {
    console.log(error);
  }
};

export const createNews = async (req, res) => {
  if (req.files == null) return res.json({ error: "Please choose an image" }); // we make mandatory that every news should have an image
  const title = req.body.title; //better way is destructure
  const desc = req.body.desc; // const{title, desc, ...}=req.body
  const catId = req.body.catId;
  const userId = req.body.userId;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name); //ext is used for 'passvand' of the file
  let dateNow = Math.round(Date.now());
  const fileName = dateNow + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLocaleLowerCase())) {
    return res.json({
      msg: "Type of the image is not allowed. use just png, jpg or jpeg type.",
    });
  }
  if (fileSize > 5000000) {
    return res.json({ msg: "Size of the image should be less than 5Mb!" });
  }

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.json({ msg: err.message });
    try {
      await News.create({
        title: title,
        desc: desc,
        catId: catId,
        userId: userId,
        image: fileName,
        url: url,
      });
      res.json({ msg: "new is posted successfully." });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const getNewsById = async (req, res) => {
  // or const getSingleNews
  try {
    const response = await News.findOne({
      where: { id: req.params.id },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateNews = async (req, res) => {
  const news = await News.findOne({ where: { id: req.params.id } });
  if (!news) return res.json({ msg: "no data is found!" });

  let fileName = "";
  if (req.files === null) {
    //if user doesn't want to update the image, the previous image is used
    fileName = news.image;
  } else {
    //if user wants to update the image
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name); //ext is used for 'passvand' of the file
    let dateNow = Math.round(Date.now());
    fileName = dateNow + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLocaleLowerCase())) {
      return res.json({
        msg: "Type of the image is not allowed. use just png, jpg or jpeg type.",
      });
    }
    if (fileSize > 5000000)
      return res.json({ msg: "Size of the image should be less than 5Mb!" });

    file.mv(`./public/images/${fileName}`, (err) => {
      return res.json({ msg: err.message });
    });

    //when user wants to update the image, then the previous image should be deleted
    const filePath = `./public/images/${news.image}`;
    fs.unlinkSync(filePath);
  }

  //now data in the database should be updated
  const title = req.body.title; 
  const desc = req.body.desc; 
  const catId = req.body.catId;
  const userId = req.body.userId;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await News.update({
        title,
        desc,
        catId,
        userId,
        image: fileName,
        url
    }, {where: {id: req.params.id}});

  } catch (error) {
    console.log(error);
  }
};


export const deleteNews = async (req, res) => {
    const news = await News.findOne({where: {id: req.params.id}});

    if (!news) return res.json({msg: 'Data is not found!'});

    try {
        const filePath = `/public/images/${news.image}`;
        fs.unlinkSync(filePath);
        await News.destroy({where: {id: req.params.id}});
        res.json({msg: 'news is deleted successfully.'});
    } catch (error) {
        console.log(error);
    }
};


export const getLastNews = async (req, res) => {
    try {
        const news = await News.findAll({
            limit: 2, 
            order:[['id', 'DESC']],
            include: [Category]
        });
    } catch (error) {
        console.log(error);
    }
};


export const getNewsDetails = async (req, res) => {
    try {
        const response = await findOne({where: {id: req.params.id}});
        const numViews = response.numViews + 1;
        await News.update({numViews}, {where: {id: req.params.id}});
        res.json(response)
    } catch (error) {
        console.log(error);
    }
};


export const popularNews = async (req, res) => {
    try {
        const news = await News.findAll({
            limit: 4,
            order: [['numViews', 'DESC']],
            include: [{model: Users, attributes: ['id', 'name', 'email', 'url']}]
        });
        res.json(news);
    } catch (error) {
        console.log(error);
    }
};


export const getCatNews = async (req, res) => {
    try {
        const hasCategory = req.query.cat;
        const news  = hasCategory
        ? await News.findAll({where: {catId: hasCategory, order: ['id', 'DESC']}})
        : await News.findAll({order: ['id', 'DESC']});

        res.json(news);
    } catch (error) {
        console.log(error);
    }
}