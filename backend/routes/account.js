const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    
    res.json({
        balance: account.balance
    })
});


//we have to worry about 2 things
//1. the request doesnot partially succed 
//2. if there is an if check it sort of needs to run first for the first transaction and then for the second transaction, that is if someone sends 2 concurrent request tab bhi then cannot foolus  

//Doing transaction in MongoDB
router.post("/transfer", authMiddleware, async (req, res) => {
    //we first have to create whats called a session ki bhai now i am going to do a bunch of things together pls let me do them and if anyone fails revert

    //creating a session
    const session = await mongoose.startSession();

    //Starting a Transaction session, everything that happens after this needs to either happen together or needs to rollback, it will never partially execute
    //anything comes between session.startTransaction() to session.commitTransaction() either all of this happens together or niether will happen
    session.startTransaction();

    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    //make sure the user exists, to whom we are sending money if user doesnt exists abort the transaction
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer

    // Decrement the balance of the fromAccount
    //increase the balance of the first user by -amount which basically means decrease it by this number
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);

    // Increment the balance of the toAccount
    //increase the balance of the first user by +amount which basically means increase it by this number 
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;