import Category from "../models/categoryModel.js"

export const getCategory = async(req, res) => {
    try {
        const categories = await Category.findAll({});
        res.json(categories);
    } catch (error) {
        console.log(error)
    }
}


export const getCategoryForHomePage = async(req, res) => {
    try {
        const categories = await Category.findAll({});
        res.json(categories);
    } catch (error) {
        console.log(error)
    }
}


export const createCategory = async (req, res) => {
    const name = req.body.name;
    if (!name) return res.json("Category name is required!") 
    try {
        await Category.create({
            name: name,
        })
        res.json({message:'the category has been added.'})
    } catch (error) {
        console.log(error)
    }
}


export const updateCategory = async(req,res)=> {
    const name = req.body.name;
    try {
         await Category.update({name: name},{
              where: {id: req.params.id}
         })
         res.json("Category updated successfully!")
    } catch (error) {
         console.log(error);
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await Category.destroy({
            where: {id: req.params.id}
        })
        res.json('the category is deleted successfully')
    } catch (error) {
        console.log(error)
    }
}