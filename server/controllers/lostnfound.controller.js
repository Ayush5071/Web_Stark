import LostAndFound from "../models/lostnfound.model.js";

export const createLostAndFoundItem = async (req, res) => {
  try {
    const { itemName, description, location } = req.body;

    const newItem = new LostAndFound({
      itemName,
      description,
      location,
    });

    await newItem.save();
    res.status(201).json({ message: 'Item created successfully', newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error });
  }
};

export const claimItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; 

    const item = await LostAndFound.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.isClaimed) return res.status(400).json({ message: 'Item already claimed' });

    item.claimedBy = userId;
    item.isClaimed = true;
    await item.save();

    res.json({ message: 'Item claimed successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Error claiming item', error });
  }
};

export const unclaimItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await LostAndFound.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (!item.isClaimed) return res.status(400).json({ message: 'Item is not claimed' });

    item.claimedBy = null;
    item.isClaimed = false;
    await item.save();

    res.json({ message: 'Item unclaimed successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Error unclaiming item', error });
  }
};


export const getClaimedItems = async (req, res) => {
  try {
    const items = await LostAndFound.find({ isClaimed: true });
    res.json({ message: 'Claimed items retrieved successfully', items });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving claimed items', error });
  }
};

export const getUnclaimedItems = async (req, res) => {
  try {
    const items = await LostAndFound.find({ isClaimed: false });
    res.json({ message: 'Unclaimed items retrieved successfully', items });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving unclaimed items', error });
  }
};


export const getMyClaimedItems = async (req, res) => {
    try {
      const userId = req.user.userId; 
  
      const items = await LostAndFound.find({ "claimed.userId": userId, "claimed.isClaimed": true });
      res.json({ message: 'Your claimed items retrieved successfully', items });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving your claimed items', error });
    }
  };
  
export const getMyUploadedItems = async (req, res) => {
    try {
      const userId = req.user.userId; 
  
      const items = await LostAndFound.find({ createdBy: userId });
      res.json({ message: 'Your uploaded items retrieved successfully', items });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving your uploaded items', error });
    }
};