import User from "../models/user.model.js";


export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const imageUrl = req.file ? req.file.path : user.profileImg;
    const updatedData = { ...req.body, profileImg: imageUrl };
    console.log(updatedData,"link->",imageUrl);

    await user.updateProfile(updatedData);
    
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Failed to update profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};


export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { currentPassword, newPassword } = req.body;
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

    await user.updateProfile({ password: newPassword });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update password' });
  }
};

export const followUser = async (req, res) => {
  try {
    console.log("suru");
    const user = await User.findById(req.user.userId);
    const followUser = await User.findById(req.params.userId);
    console.log("aya")

    if (!user || !followUser) return res.status(404).json({ message: 'User not found' });

    if (!user.following.includes(followUser._id)) {
      user.following.push(followUser._id);
      followUser.followers.push(user._id);
      await user.save();
      await followUser.save();
      res.status(200).json({ message: 'Followed user successfully' });
    } else {
      res.status(200).json({ message: 'Already following this user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to follow user' });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const unfollowUser = await User.findById(req.params.userId);

    if (!user || !unfollowUser) return res.status(404).json({ message: 'User not found' });

    user.following = user.following.filter((id) => id.toString() !== unfollowUser._id.toString());
    unfollowUser.followers = unfollowUser.followers.filter((id) => id.toString() !== user._id.toString());

    await user.save();
    await unfollowUser.save();
    res.status(200).json({ message: 'Unfollowed user successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to unfollow user' });
  }
};
