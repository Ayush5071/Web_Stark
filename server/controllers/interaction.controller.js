import Interaction from "../models/interaction.model.js";

export const capture = async (req, res) => {
    const { productId, interaction_type, rating  } = req.body;
    const userId = req.user.usrId
  if (!userId || !productId || !interaction_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const validInteractionTypes = ['view', 'click', 'add_to_cart', 'purchase'];
  if (!validInteractionTypes.includes(interaction_type)) {
    return res.status(400).json({ error: 'Invalid interaction type' });
  }

  try {
    // Create a new interaction document
    const newInteraction = new Interaction({
      userId,
      productId,
      interaction_type,
      rating,
    });

    
    await newInteraction.save();
    return res.status(201).json({ message: 'Interaction captured successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

export const prodectdataofuser = async (req, res) => {
  try {
    const { userId } = req.query;  // Get the userId from the query string

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch all interactions for the given userId from the database
    const interactions = await Interaction.find({ userId });

    if (!interactions.length) {
      return res.status(404).json({ message: 'No interactions found for this user' });
    }

    // Return the interactions
    res.status(200).json({ userId, interactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}