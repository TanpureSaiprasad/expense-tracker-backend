
// get user profile
export const getUserProfile = async (req, res) => {
  try {
    res.json(req.user); // password already removed
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

