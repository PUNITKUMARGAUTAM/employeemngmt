const router = require('express').Router();
const Employee = require('../models/Employee');
const verifyToken = require('../middleware/verifyToken');

// Create Employee

router.post('/createEmp', verifyToken , async(req , res) => {
    try 
    {
        const {name , email , position , salary } = req.body;
        const newEmp = new Employee({name , email , position , salary , createdBy : req.user.id });
        const saved = await newEmp.save();
        res.status(201).json(saved);
    }
    catch(err) {
        res.status(500).json({message : "Server error"});
    }
});

//ReadAll

router.get('/getAll' , verifyToken , async(req, res) => {
    try{
        const emps = await Employee.find({createdBy : req.user.id});
        res.json(emps);

    }catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server error"});
    }
})

// getById 

// getById
router.get('/getById/:id', verifyToken, async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Not found" });

    // check ownership
    if (emp.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


//updateByid

router.put('/updateByid/:id' , verifyToken , async(req , res) => {

    try 
    {
        const emp = await Employee.findById(req.params.id);
        if(!emp) return res.status(404).json({message : "Not found"});
        if(emp.createdBy.toString() !== req.user.id) return res.status(403).json({message: 'forbodden'});

        const updated = await Employee.findByIdAndUpdate(req.params.id , req.body, {new : true});
        res.json(updated);
    }catch(err)
    {
        console.error(err);
        res.status(500).json({message : "Server error"});
    }
});

// delete by id

router.delete('/deleteById/:id' , verifyToken , async(req , res) => {

    try 
    {
       const emp = await Employee.findById(req.params.id);
       if(!emp) return res.status(404).json({message : 'not found'});
       if(emp.createdBy.toString() !== req.user.id) return res.status(403).json({message : 'forbidden'});

       await Employee.findByIdAndDelete(req.params.id);
       res.json({message : "Employee Deleted"});

    }catch(err) {
        console.error(err);
        res.status(500).json({message : "Server error"});
    }
})

module.exports = router;