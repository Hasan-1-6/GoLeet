import express from "express";
import User from "../../models/user.js";

export default async function getUserInfo(req, res){
    const user = req.user;
    try{
        const name = user.name.trim().split(/\s+/).slice(0, 2).join(' ');
        return res.status(200).json({email : user.email, name : name})
    }
    catch(err){
        return res.status(500).json({message : "internal server error occured"})
    }
}