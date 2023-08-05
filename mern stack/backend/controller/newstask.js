const newsmodel = require('../models/newsdata');

const  addnews = async(req,res)=>{
    const {title,description,username} = req.body;
    try{
        const model = await newsmodel.create({title,description,username});
        res.status(200).json(model);
    }
    catch{
        res.status(400).json({error:"no data added"})
    }
}

const listnews = async(req,res) =>{
    try{
        const model = await newsmodel.find({});
        res.status(200).json(model);
    }
    catch{
        res.status(400).json({error:"no data found"});
    }
}

const updatenews = async(req,res)=>
{
    const {id} = req.params;
    try{
        const model = await newsmodel.findByIdAndUpdate({_id:id},{...req.body});
        res.status(200).json(model)
    }
    catch{
        res.status(400).json({error:"no update"})
    }

}

const deletenews = async(req,res)=>{
    const {id} = req.params;
    try{
        const model = await newsmodel.findByIdAndDelete({_id:id});
        res.status(200).json(model);
    }
    catch{
        res.status(400).json({error:"no data to delete"})
    }
}

const listnewsByid = async(req,res)=>{
    const {id} = req.params;
    try{
        const model = await newsmodel.findById({_id:id});
        res.status(200).json(model)
    }
    catch{
        res.status(200).json({error:"no date to list"})
    }
}

module.exports = {addnews,listnews,listnewsByid,updatenews,deletenews}