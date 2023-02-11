require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const lodash = require("lodash");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({     // we have initialize session
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());  // we have initialized passport
app.use(passport.session());  // we are using passport to set up a session(that was defined above)
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/philDB", {useNewUrlParser: true});

var entry_from = "";

const philSchema = new mongoose.Schema({
  username : {
    type:String,
    default: "-1"
},
  password : {
    type:String,
    default: "-1"
  },
  googleId: {
    type:String,
    default: "-1"
},
  name: {
    type:String,
    default: "-1"
  },
  phone: {
    type:String,
    default: "-1"
  }, 
  address: {
    type:String,
    default: "-1"
  },
  funding: {
    type:String,
    default: "-1"
  },
  interestedField : { 
    type:Array,
  } 

});

const ngoSchema = new mongoose.Schema({
    name: {
      type: String,
      default: "-1"
    },
    mission: {
      type: String,
      default: "-1"
    },
    username : {
      type: String,
      default: "-1"
    },
    password : {
      type: String,
      default: "-1"
    },
    googleId: {
      type: String,
      default: "-1"
    },
    phone: {
      type: String,
      default: "-1"
    }, 
    address: {
      type: String,
      default: "-1"
    },
    funding: {
      type: String,
      default: "-1"
    },
    history: {
      type: String,
      default: "-1"
    },
    previousWork: {
      type: String,
      default: "-1"
    },
    howToAchiveGoal: {
      type: String,
      default: "-1"
    },
    ngoid: {
      type: String,
      default: "0"
    },
    socialUrl : {
      type: String,
      default: "-1"
    },
    achievement: {
      type: String,
      default: "-1"
    },
    fundingNeeds: {
      type: String,
      default: "-1"
    },
    workFeild: {
      type: Array,
    },
    website: {
        type: String,
        default: "-1"
    }
  });

philSchema.plugin(passportLocalMongoose);
philSchema.plugin(findOrCreate);

ngoSchema.plugin(passportLocalMongoose);
ngoSchema.plugin(findOrCreate);

const User = new mongoose.model("User", philSchema);
const Ngo = new mongoose.model("Ngo", ngoSchema);

passport.use(User.createStrategy()); // created staretgy for local registration/login path
passport.use(Ngo.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });



passport.use(new GoogleStrategy({  // created a GoogleStrategy that will be used in .get("/auth/google") route for authentication
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/listofngo",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, email, profile, cb) {
    //console.log(profile);
    //console.log(profile._json.email);
    console.log("Entry from : ",entry_from);
    if(entry_from == "ngo"){
      Ngo.findOrCreate({ googleId: profile.id, username: profile._json.email }, function (err, user) {
        return cb(err, user);
      });
    }
    else{
      User.findOrCreate({ googleId: profile.id, username: profile._json.email }, function (err, user) {
        return cb(err, user);
      });
    }
  }
));

app.get("/auth/google", passport.authenticate("google", {scope: ["profile","email"]  }));

app.get("/auth/google/listofngo",  // this is the path where google will redirect the user if authentication is successfull.
  passport.authenticate('google', { failureRedirect: "/login" }),   // this is where we authenticate users locally(though it says "google", ignore that as it is performed by google, not our normal email-password way)(google authentication was done in previous get request(/auth/google, if that is successfulll, we get redirected to this path, where we aurthenticate locally, for creating a cookie)), ie, we will save their current login session and tell fortune cookie that user has been logged in.
  function(req, res) {
    var email = req.user.email;
    console.log("OP");
    console.log(email);
    if(entry_from == "ngo"){
      Ngo.findOne({username : email}, function (err, foundOne) {
            if(err) {
                console.log("error aya bhai 1: ",err);
            } else {
              console.log("founded : ",foundOne);
               if(foundOne.ngoID == "0"){
                res.redirect("/collect_data_ngo");
               }
               else{
                res.redirect("/listofngo");
               }
            }
        });
    }
    if(entry_from == "phil"){
      User.findOne({username : email}, function (err, foundOne) {
            if(err) {
                console.log("error aya bhai 1: ",err);
            } else {
              console.log("founded : ",foundOne);
               if(foundOne.phone == "-1"){
                res.redirect("/collect_data");
               }
               else{
                res.redirect("/listofngo");
               }
            }
        });
    }

    // res.redirect("/listofngo");

    console.log("Sign in successful ", entry_from);
});

app.get("/listofngo", function(req, res){
  Ngo.find({}, function(err, posts){
  if(err){
    console.log(err);
  }
  else{
    res.render("ngoEntry", {postArray : posts});
    console.log(posts);
  }
  
  });
});

app.get("/signin-choice", function (req,res) {
    res.render("signup_signin");
})

app.get("/collect_data", function (req,res) {
  entry_from = "phil"
    res.render("dataForm");
})

app.post("/collect_data", function (req,res) {
    console.log(req.body);
    var thisname = req.body.name;
    var thiscontact = req.body.contact;
    var thisaddress = req.body.address;
    var thisinterests = req.body.interests;
    var thisemail = req.body.email;




    var docs = User.findOneAndUpdate({username:thisemail}, {"$set":{name : thisname, address : thisaddress, interestedField : thisinterests, phone: thiscontact}}, {new : true},
     function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs);
        }
    });


    res.redirect("/listofngo");
})


app.get("/collect_data_ngo", function (req,res) {
    entry_from = "ngo"
    res.render("dataForm_ngo");
})

app.post("/collect_data_ngo", function (req,res) {
    // console.log(req.body);
    var thisname = req.body.name;
    var thiscontact = req.body.number;
    var thisaddress = req.body.address;
    var workFeild = req.body.work;
    var mission = req.body.mission;
    var fundingNeeds = req.body.funds;
    var history = req.body.history;
    var previousWork = req.body.prevwork;
    var howToAchiveGoal = req.body.goal;
    var ngoid = req.body.ngoid;
    var website = req.body.website;
    var socialUrl = req.body.socialUrl;
    var achievement = req.body.achievement;
    var thisemail = req.body.email;

    console.log(workFeild);
    var docs = Ngo.findOneAndUpdate({username: thisemail}, 
        {"$set":{
            name : thisname, 
            phone: thiscontact,
            address : thisaddress,
            workFeild: workFeild,
            mission: mission,
            fundingNeeds: fundingNeeds,
            history: history,
            previousWork: previousWork,
            howToAchiveGoal: howToAchiveGoal,
            ngoID: ngoid,
            website: website,
            socialUrl: socialUrl,
            achievement: achievement
        }}, 
        {new : true},
        function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
            }
    });
    res.redirect("/listofngo");
})


//////////////////////////////////////////////////////////////////////////


app.get("/", function (req,res) {
    res.render("home");
});

app.get("/login", function(req, res){
  entry_from = "phil";
  res.render("login");
});

app.get("/register", function(req, res){
    //console.log("in phil : ",entry_from);
    entry_from = "phil";
    //console.log("in phil : ",entry_from);
  res.render("register");
});

app.get("/registerngo", function(req, res){
    //console.log("in ngo : ",entry_from);
    entry_from = "ngo";
    //console.log("in ngo : ",entry_from);
  res.render("registerngo");
});

app.get("/loginngo", function(req, res){
  entry_from = "ngo";
  res.render("loginngo");
});

app.get("/listofngo/:topic", function(req, res){
  let inpString = lodash.lowerCase(req.params.topic);
  Ngo.find({}, function(err, posts){
    if(!err){
      for(let i = 0; i<posts.length; i++){
        let pTitle = lodash.lowerCase(posts[i].ngoid);
        if(pTitle === inpString){
          res.render("ngo_profile", {obj : posts[i]});
          break;
        }
      }
    }
  });
});

app.post("/register", function(req, res){

    User.register({username: req.body.username}, req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/collect_data");
        });
      }
    });
  
  });

  app.post("/registerngo", function(req, res){

    Ngo.register({username: req.body.username}, req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.redirect("/registerngo");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/collect_data_ngo");
        });
      }
    });
  
  });


app.post("/login", function(req, res){

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    req.login(user, function(err){
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/listofngo");
        });
      }
    });
  
  });

  app.post("/loginngo", function(req, res){

    const user = new Ngo({
      username: req.body.username,
      password: req.body.password
    });
  
    req.login(user, function(err){
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/listofngo");
        });
      }
    });
  
  });

  app.get("/logout", function(req, res){
    req.logout(function (err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  });

app.get("/profile", function (req,res) {
    res.render("ngo_profile");
})

////////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 4000;

app.listen(port, function() {
    console.log("Server started on port 4000.");
  });