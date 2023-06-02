import jwt from "jsonwebtoken";

// what we write in the front:
// const res = axios.post("/api/test", {
//    headers: {
//         "authorization": "Bearer the...token..............."
//     }
// })


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null) {return res.status(401).json("You should first login.")};
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=> {
        if(err) return res.json("Token is expired!");
        req.user = decoded;  //this extra line is: to access to the data of that user which is logged in
         next();
    })
        
}