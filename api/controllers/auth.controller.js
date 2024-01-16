import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  //  Console
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ mesage: "All field are required ..!" });
  }
  const hashedPassword=bcryptjs.hashSync(password,12)
  const newUser=new User ({username,email,password:hashedPassword});
 try{

    await newUser.save();
    res.json({message:"DATA INSERT"});
 }catch(err){
      res.status(500).json({message:err.message});
 }
};
