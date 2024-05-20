const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");

//here we will get all requests as /api/v1/user/..

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName : zod.string(),
    lastName: zod.string()
})

router.post("/signup" ,async function(req, res){
    const body = req.body;

    //{success} returns an object or we can do obj.success
    const {success} = signupSchema.safeParse(body)

    if(!success){
        res.status(411).json({  
            message: "Email already taken / Incorrect inputs"
        })
        return;
    }

    //checking if Database doesn’t already contain another user with same username
    const existingUser = await User.findOne({
        username: body.username
    })

    if(existingUser){
        return res.status(411).json({  
            message: "Email already taken / Incorrect inputs"
        })
    }

    //putting in mongodb if the inputs are correct 
    const dbUser = await User.create(body);

    //Create a new account
    // --------            -----------
    const userId = dbUser._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    // --------             -----------

    const token = jwt.sign({
       userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async function(req, res){
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if(!success){
        res.status(411).json({
            message:"Incorrect Inputs"
        })
        return;
    }
    const dbUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    
    if(dbUser){
        const token = jwt.sign({
            userId: dbUser._id
        }, JWT_SECRET)
        res.json({
            token: token
        })
    return;
    }

    res.status(411).json({
        message:"Error while logging in"
    })
});


const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

//update user information
router.put("/" , authMiddleware, async (req, res) => {
  
    const body = req.body;
    const {success} = updateSchema.safeParse(body);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    const updateUser = req.params.id;
    // await User.updateOne({ _id: req.userId }, req.body);

    const updatedUser = await User.findOneAndUpdate(updateUser, {
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName
    })

    res.status(200).json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    //Allowing the user to filter based on something substring
    const filter = req.query.filter || "";

    const users = await User.find({
        //if I want to search based on firstName or on lastName you can use the $or primitive here
        //we are using regex as a substring search but there are more methods to do substring search
        $or : [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        //we dont want to return the password of the user to the other user in the frontend that's why we have used map to show only the information that is needed 
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
});

router.get("/details", authMiddleware, async (req, res) => {
        const user = await User.findById(req.userId).select('username firstName lastName');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        });
});



module.exports = router;
