const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup = async(req,res)=>{
    const { username, password } = req.body;

    if(!username || !password){
      return res.status(400).json({
        success:false,
        message:"Enter all details"
      })
    }
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
}

exports.login = async(req,res)=>{
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      // Create a JWT that expires in 1 hour
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
}