const multer=require('multer');
const express=require('express');
const bcrypt=require('bcrypt');
const File=require('./File');
require('./mongoose')
require('dotenv').config()
const app=express();
const upload=multer({dest:"uploads"})
app.set('view engine',"ejs");
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
   res.render('index');
})

app.post('/upload',upload.single("file"), async(req,res)=>{
  const fileData={
     path:req.file.path,
     name:req.file.originalname,
  }
  if (req.body.password!=null && req.body.password!=="") {
    fileData.password=await bcrypt.hash(req.body.password,10)
  }
  const file=await File.create(fileData)
  res.render("index",{fileLink: `${req.headers.origin}/file/${file.id}`})
})

// app.get('/file/:id',handleDownload)
// app.post('/file/:id',handleDownload)

app.route('/file/:id').get(handleDownload).post(handleDownload);

async function handleDownload(req,res) {
  const file=await File.findById(req.params.id)

  if (file.password!=null) {
    if (req.body.password == null) {
      res.render("password")  
      return
    }
    if (!(await bcrypt.compare(req.body.password, file.password))) {
         res.render('password',{error:true})  
         return
    }
  }
  file.downloadCount++
  await file.save()
  console.log(file.downloadCount);

  res.download(file.path,file.name);
}

// app.delete('/delete',async(req,res)=>{
//   try {
//     const del=await File.deleteMany();
//     if (del) {
//       res.send('Deleted Succesfully')
//     }
  
//   } catch (error) {
//     console.log({message:error});
//   }
 

// })

app.listen(process.env.PORT)