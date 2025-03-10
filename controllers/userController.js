


const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      address: req.user.address,
      country: req.user.country,
      city: req.user.city,
    });
  } catch (error) {
    console.error("❌ Error in Get Profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { username, email, address, country, city } = req.body;

    if (!username || !email || !address || !country || !city) {
      return res.status(400).json({ message: "Please provide all the fields" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, 
      { username, email, address, country, city }, 
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      address: updatedUser.address,
      country: updatedUser.country,
      city: updatedUser.city,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export { getUserProfile , updateUserProfile};


