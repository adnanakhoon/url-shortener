import express from 'express';
import {urlModel} from '../model/shortUrl';

export const createUrl = async (req: express.Request, res: express.Response) => {
  try {
     console.log("The full Url is", req.body.fullUrl);
     const {fullUrl} = req.body;
     const urlFound = await urlModel.find({fullUrl: req.body.fullUrl});
     if(urlFound.length > 0){
        res.status(409);
        res.send({message: 'URL already exists'});
  }
  else{
    const shortUrl = await urlModel.create({fullUrl});
    res.status(201).send(shortUrl);
  }

} catch (error) {
    res.status(500).send({message: 'Internal Server Error'});
  }
}

export const getAllUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrls = await urlModel.find().sort({createdAt: -1});
    if(shortUrls.length < 0){
      res.status(404).send({message: 'No URLs found'});
  }
  else{
    res.status(200).send(shortUrls);
  }
}
   catch (error) {
    res.status(500).send({message: 'Internal Server Error'});
  }
    
}
export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
  
    const shortUrl =  await urlModel.findOne({shortUrl: req.params.id});
    if(!shortUrl){
      res.status(404).send({message: "url not found"});
  }
  else{
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.fullUrl);
  }
  } catch (error) {
        res.status(500).send({message: 'Internal Server Error'});

  }
    
}
export const deleteUrl = async (req: express.Request, res: express.Response) => {
     try {
      const shortUrl =  await urlModel.findByIdAndDelete({_id: req.params.id});
    if(shortUrl){
       res.status(200).send({message: 'Successfully deleted'});
  }
      
     } catch (error) {
              res.status(500).send({message: 'Internal Server Error'});

     }
}