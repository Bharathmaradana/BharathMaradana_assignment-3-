const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");
const { JsonWebTokenError } = require("jsonwebtoken");
app.use(cors({ origin: "*" }));
const userschema = require("./Models/model1");

app.post("/add", async (req, res) => {
  try {
    const { name, email, phoneNumber, website, likes } = req.body;
    const userschemas = new userschema({
      name,
      email,
      phoneNumber,
      website,
      likes,
    });
    let data = await userschemas.save();

    return res.json(data);
  } catch (error) {}
});

app.post("/update/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const { name, email, phoneNumber, website } = req.body;
    console.log(req.body)
    const updateddata = await userschema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        website: website,
      }
    );

    let data = await userschema.findById({ _id: userid });
   // console.log(data);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const userid = req.params.id;
    const data = await userschema.findByIdAndDelete({ _id: userid });
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getusers", async (req, res) => {
  try {
    const data = await userschema.find();
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});
// app.post("/login",async (req,res) => {
//              try {
//                       const {email,password} = req.body;
//                       let exists = await userschema.findOne({email});
//                       if(exists) {
//                         if(exists.password !== password) {
//                             return res.send("invalid credentials");
//                         }
//                         let payload = {
//                             user: {
//                                 id:exists.id
//                             }
//                         }
//                         jwt.sign(payload,'jwtsecreat',{expiresIn: 36000000000000},(err,token) => {
//                             if(err) throw err;
//                             return res.send({token})
//                         })

//                       }
//                       else{
//                         return res.send("Please register")
//                       }
//              } catch (error) {
//                   return res.send(error);
//              }
// })
// app.post("/signup",async (req,res) => {

//               try {
//                            const {name,email,password,conformpassword} = req.body;

//                            let exist = await userschema.findOne({email:email});
//                            if(exist){
//                             return res.send("Alredy Existed")
//                            }
//                            let userdata = new userschema({
//                             name,
//                             email,
//                             password,
//                             conformpassword,
//                             places:[]
//                            })
//                           await userdata.save()
//                          return  res.status(200).send("registered successfully");
//               } catch (error) {
//             return  res.send(error);
//               }
// })

// app.get("/places/:id",async (req,res) => {
//   let creator = req.params.id;
//        try {
//                let data = await placeschema.find({creator: creator});
//                console.log(data);
//                return res.send(data);
//        } catch (error) {

//        }
// })

// app.get("/deleteplace/:id",async (req,res) => {
//    let id = req.params.id;
//    try {
//                 let data = await placeschema.findByIdAndDelete(id);
//                 return res.send("successfully deleted");
//    } catch (error) {

//    }
// })
// app.get("/placesdata/:id", async (req, res) => {
//   let id = req.params.id;
//   try {
//     let data = await placeschema.findById(id)
//     console.log(data);
//     return res.send(data);
//   } catch (error) {}
// });
// app.get("/myprofile",middleware,async (req,res) => {
//              try {

//                        let exists = await userschema.findById(req.user.id);
//                       //  let data = await placeschema.find({creator: req.user.id});
//                       //  console.log(data);

//                        if(exists){
//                         return res.send(exists);
//                        }
//                        else{
//                         return res.send("not found")
//                        }
//              } catch (error) {

//              }
// })

// app.post("/updateplace/:id",async (req,res) => {
//                    let placeid = req.params.id;
//                   let data = await placeschema.findById(placeid);
//                   console.log("ee");
//                   console.log(req.params.id);
//                   console.log("nothing")
//                    try {
//                                 const thing = new placeschema({
//                                   _id:req.params.id,
//                                   subject: req.body.subject,
//                                   Topic: req.body.Topic,
//                                   startingDate: req.body.startingDate,
//                                   EndingDate: req.body.EndingDate,
//                                   Hours: req.body.Hours,
//                                   Done: req.body.Done,
//                                   Notyet: req.body.Notyet
//                                 })
//                                 await placeschema.findByIdAndUpdate(req.params.id,thing);

//                                 return res.send("updated successfull")

//                    } catch (error) {

//                    }
// })

// app.post("/additem/:id",async (req,res) => {
//   try {

//                   const {subject,Topic,startingDate,EndingDate,Hours,Done,Notyet} = req.body;
//                   let creator  = req.params.id;

//                   console.log(creator);
//                   const placeschemas = new placeschema({
//                     subject,
//                     Topic,
//                     startingDate,
//                     EndingDate,
//                     Hours,
//                     Done,
//                     Notyet,
//                     creator
//                   })
//                  await placeschemas.save();
//                  console.log(placeschemas)
//                  let user = await userschema.findById({_id:creator});
//                   // let data = await placeschema.findById({_id:creator});
//                   user.places.push(placeschemas);
//                  await user.save();
//                    let r = await placeschema.find({creator: creator});
//                    console.log(r);
//                   return res.send(r);
//   } catch (error) {
//     console.log(error)
//   }
// })
mongoose
  .connect(
    "mongodb+srv://bharathmaradana86:bharathmaradana86@cluster0.zhm07d6.mongodb.net/ProjectretryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB connected");
  });

app.listen(5001, () => {
  console.log("Server started");
});
