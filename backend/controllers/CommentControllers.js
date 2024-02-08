import Comments from "../models/commentModel.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comments.findAll({});
    res.json(comments);
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (req, res) => {
  const { newsId, description, name, email, subject } = req.body;
  const commentData = { newsId, description, subject };
  console.log("**************", commentData);
  try {
    console.log("**************", name);
    await Comments.create({
      newsId,
      description,
      name,
      email,
      subject,
    });
    res.json(
      "Your comment is sent and will be posted after verifying by Admin."
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateComment = async (req, res) => {
  const { name, subject, description } = req.body;

  try {
    await Comments.update(
      {
        name,
        subject,
        description,
      },
      { where: { id: req.params.id } }
    );
    res.json("comment is edited successfully.");
  } catch (error) {
    res.json(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comments.destroy({ where: { id: req.body.id } });
    res.json("the comment is deleted successfully.");
  } catch (error) {
    console.log(error);
  }
};

export const activeComment = async (req, res) => {
  const { isActive } = req.body;
  try {
    await Comments.update(
      { isActive: isActive },
      { where: { id: req.params.body } }
    );
    res.json("comment is activated/shown.");
  } catch (error) {
    res.json(error);
  }
};

export const deactivateComment = async (req, res) => {
  const { isActive } = req.body;
  try {
    await Comments.update(
      { isActive: isActive },
      { where: { id: req.params.body } }
    );
    res.json("comment is deactivated.");
  } catch (error) {
    res.json(error);
  }
};

export const getAllCommentsForSingleNews = async (req, res) => {
  try {
    const newsId = req.params.newsId;
    const comments = await Comments.findAll({ where: { newsId: newsId } });
  } catch (error) {
    res.json(error);
  }
};
