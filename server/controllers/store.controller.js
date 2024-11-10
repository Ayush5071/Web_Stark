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
    const populatedStore = await savedStore.populate('user').populate('ads').execPopulate();
    res.status(201).json({ message: 'Store created successfully', store: populatedStore });
  } catch (error) {
    res.status(500).json({ message: 'Error creating store', error });
  }
};

export const getMyStore = async (req, res) => {
  try {
    const stores = await OnlineStore.find({ user: req.user.userId })
      .populate('user')
      .populate('ads');
    if (!stores) return res.status(404).json({ message: 'No stores found' });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your stores' });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const stores = await OnlineStore.find().populate('user').populate('ads');
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all stores' });
  }
};

export const addAdToStore = async (req, res) => {
  const { adId } = req.body;
  const { organizationName } = req.params;

  console.log("Organization Name:", organizationName);
  console.log("Ad ID:", adId);

  try {
    // Find the store by user ID and organization name
    const store = await OnlineStore.findOne({
      user: req.user.userId,
      organizationName
    });

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    console.log("Store found:", store);

    // Find the ad by ID
    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    console.log("Ad found:", ad);

    // Check if ad is already in the store's ads array
    if (!store.ads.includes(adId)) {
      store.ads.push(adId);

      // Save the store after adding the ad
      await store.save();
      console.log("Ad added to store and store saved");

      // Optionally, populate 'user' and 'ads' here
      const updatedStore = await OnlineStore.findById(store._id)
        .populate('user')
        .populate('ads');

        console.log("populate hua")

      return res.json({ message: 'Ad successfully added to store', store: updatedStore });
    } else {
      return res.status(400).json({ error: 'Ad already in store' });
    }
  } catch (error) {
    console.error("Error adding ad to store:", error);
    res.status(500).json({ error: 'Error adding ad to store', details: error.message });
  }
};


export const removeAdFromStore = async (req, res) => {
  const { organizationName } = req.params;
  const { adId } = req.body;

  console.log("oraganization name ->",organizationName);
  console.log("AdId ->",adId);;
  try {
    const store = await OnlineStore.findOne({ 
      user: req.user.userId, 
      organizationName 
    }).populate('user').populate('ads');
    if (!store) return res.status(404).json({ error: 'Store not found' });

    console.log("store mil gya ->", store);


    store.ads = store.ads.filter((ad) => ad.toString() !== adId);
    await store.save();

    console.log("new Store without that ad in it _>", store);

    console.log("finally ye bhi chal gya");
    res.json(store);
    console.log("ab to sethi hai");
  } catch (error) {
    res.status(500).json({ error: 'Error removing ad from store' });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = await OnlineStore.findOneAndDelete({ user: req.user.userId, _id: storeId })
      .populate('user')
      .populate('ads');
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json({ message: 'Store deleted', store });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting store' });
  }
};
