import Ad from "../models/ad.model.js";
import OnlineStore from "../models/onlineStore.model.js";

export const createStore = async (req, res) => {
  const { organizationName } = req.body;
  try {
    const newStore = new OnlineStore({
      user: req.user.userId,
      organizationName,
    });
    const savedStore = await newStore.save();
    res.status(201).json({ message: 'Store created successfully', store: savedStore });
  } catch (error) {
    res.status(500).json({ message: 'Error creating store', error });
  }
};

export const getMyStore = async (req, res) => {
  try {
    const stores = await OnlineStore.find({ user: req.user.userId }).populate('ads');
    if (!stores) return res.status(404).json({ message: 'No stores found' });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your stores' });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const stores = await OnlineStore.find().populate('ads');
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all stores' });
  }
};

export const addAdToStore = async (req, res) => {
  const { adId } = req.body;
  try {
    const store = await OnlineStore.findOne({ user: req.user.userId });
    if (!store) return res.status(404).json({ error: 'Store not found' });

    const ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ error: 'Ad not found' });

    if (!store.ads.includes(adId)) {
      store.ads.push(adId);
      await store.save();
      return res.json({ message: 'Ad added to store', store });
    } else {
      return res.status(400).json({ error: 'Ad already in store' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding ad to store' });
  }
};

export const removeAdFromStore = async (req, res) => {
  const { adId } = req.params;
  try {
    const store = await OnlineStore.findOne({ user: req.user.userId });
    if (!store) return res.status(404).json({ error: 'Store not found' });

    store.ads = store.ads.filter((ad) => ad.toString() !== adId);
    await store.save();
    res.json({ message: 'Ad removed from store', store });
  } catch (error) {
    res.status(500).json({ error: 'Error removing ad from store' });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const store = await OnlineStore.findOneAndDelete({ user: req.user.userId });
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json({ message: 'Store deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting store' });
  }
};
