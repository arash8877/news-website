import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const findUser = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        if(!findUser[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=> {
            if(err) return res.sendStatus(403);
            const userId = findUser[0].id;
            const name = findUser[0].name;
            const email = findUser[0].email;
            const isAdmin = findUser[0].isAdmin;
            const accessToken = jwt.sign(
                {userId, name, email, isAdmin},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "320s"}
            );
            res.json({accessToken})
        });
    } catch (error) {
        console.log(error)
    }
}