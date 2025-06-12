const router = require("express").Router();

// ℹ️ Test Route. Can be left and used for waking up the server if idle
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const verifyToken = require("../middlewares/auth.middleware")

router.get("/",(req,res,next) => {
    res.json("Todo OK")
})

const authRouter = require("../routes/auth.routes")
router.use("/auth", authRouter)

const User = require("../models/User.model")




router.get("/users/:id",verifyToken, async (req, res, next) => {
  console.log(req.payload)
  try {
    console.log(req.params.id)
    
    const response = await User.findById(req.payload._id)
      res.json(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
