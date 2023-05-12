const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req,res)=>{
    const {title, category, amount, description, date} = req.body

    const income = ExpenseSchema({
        user: req.user.id,
        title,
        amount,
        category,
        description,
        date
    })
    
    try{
        if (!title || !category || !description || !date){
            return res.status(400).json({message: "All fields are required"})
        }
        if (amount <=0 || !amount==='number'){
            return res.status(400).json({message: "Amount must be positive number"})
        }
        await income.save()
        res.status(200).json({message: "Expense added"})
    } catch(error){
        console.log(error)
        res.status(500).json("Server error")
    }
}

exports.getExpense = async (req,res)=>{
    try{
        const incomes = await ExpenseSchema.find({ user: req.user.id }).sort({createdAt: -1})
        res.status(200).json(incomes)
    }catch(error){
        res.status(500).json({message: "Server error"})
    }
}

exports.deleteExpense = async (req,res)=>{
    try{
        const {id} = req.params
        // console.log(req.params)
        ExpenseSchema.findByIdAndDelete(id)
        .then((income)=>{
            res.status(200).json({message: "Expense deleted"})
        }).catch((err)=>{
            res.status(500).json({message: "Server Error"})
        })
    }catch(error){
        res.status(500).json({message: "Server error"})
    }
}