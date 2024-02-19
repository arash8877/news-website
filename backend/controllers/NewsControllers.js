import News from "../models/newsModel.js";
import path from "path";
import fs from "fs";
import Category from "../models/categoryModel.js";
import Users from "../models/userModel.js";


//----------------------------------------getNews-------------------------------------------------------

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


//----------------------------------------createNews-------------------------------------------------------

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
      message: "Oops! Type of the image is not allowed. use just png, jpg or jpeg type.",
    });
  }
  if (fileSize > 5000000) {
    return res.json({ message: "Oops! Size of the image should be less than 5Mb!" });
  }

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.json({ message: err.message });
    try {
      await News.create({
        title: title,
        desc: desc,
        catId: catId,
        userId: userId,
        image: fileName,
        url: url,
      });
      res.json({ message: "news is posted successfully." });
    } catch (error) {
      console.log(error.message);
    }
  });
};

//----------------------------------------getNewsById-------------------------------------------------------

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

//----------------------------------------updateNews-------------------------------------------------------

export const updateNews = async (req, res) => {
  const news = await News.findOne({ where: { id: req.params.id } });
  if (!news) return res.json({ message: "No data found!" });

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

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.json({
        message: "Oops! Type of the image is not allowed. use just png, jpg or jpeg type.",
      });
    }
    if (fileSize > 5000000)
      return res.json({ message: "Oops! Size of the image should be less than 5Mb!" });

    //when user wants to update the image, then the previous image should be deleted
    const filePath = `./public/images/${news.image}`;
    fs.unlinkSync(filePath);

    file.mv(`./public/images/${fileName}`, (err) => {
      return res.json({ message: err.message });
    });
  }

  //now data in the database should be updated
  const title = req.body.title; 
  const desc = req.body.desc; 
  const userId = req.body.userId;
  const catId = req.body.catId;
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
    res.json({ message: "Post updated successfully!" })

  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------deleteNews-------------------------------------------------------


export const deleteNews = async (req, res) => {
    const news = await News.findOne({where: {id: req.params.id}});
    

    if (!news) return res.json({message: 'Data is not found!'});

    try {
        const filePath = `./public/images/${news.image}`;
        
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        } else {
          console.log(`File not found: ${filePath}`);
        }
        await News.destroy({where: {id: req.params.id}});
        res.json({message: 'news is deleted successfully.'});
    } catch (error) {
      console.error('Error deleting news:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


//----------------------------------------getLastNews-------------------------------------------------------

export const getLastNews = async (req, res) => {
    try {
        const news = await News.findAll({
            limit: 2, 
            order:[['id', 'DESC']],
            include: [{model: Users, attributes: ['id', 'name', 'email', 'url']}, 
                      {model: Category}]
        });
        res.status(200).json({ news });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};


//----------------------------------------getNewsDetail-------------------------------------------------------

export const getNewsDetail = async (req, res) => {
    try {
        const response = await News.findOne({where: {id: req.params.id}});
        const numViews = response.numViews + 1;
        await News.update({numViews}, {where: {id: req.params.id}});
        res.json(response)
    } catch (error) {
        console.log(error);
    }
};


//----------------------------------------popularNews-------------------------------------------------------

export const popularNews = async (req, res) => {
    try {
        const news = await News.findAll({
            limit: 3,
            order: [['numViews', 'DESC']],
            include: [{model: Users, attributes: ['id', 'name', 'email', 'url']}]
        });
        res.json(news);
    } catch (error) {
        console.log(error);
    }
};


//----------------------------------------getCatNews-------------------------------------------------------


export const getCatNews = async (req, res) => {
    try {
        const hasCategory = req.query.cat;
        const news  = hasCategory
        ? await News.findAll({
          limit: 4,
          where: { catId: hasCategory },
          order: [['id', 'DESC']],
          include: [{ model: Users, attributes: ['id', 'name', 'email', 'url'] }],
        })
      : await News.findAll({
          limit: 4,
          order: [['id', 'DESC']],
          include: [{ model: Users, attributes: ['id', 'name', 'email', 'url'] }],
        });

        res.json(news);
    } catch (error) {
        console.log(error);
    }
}










