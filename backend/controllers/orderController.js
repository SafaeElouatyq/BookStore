import Order from "../models/order.js";
import User from "../models/user.js";

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, keycloakId, username, email } = req.body;

    if (!keycloakId || !username || !email) {
      return res.status(400).json({ message: "Informations utilisateur manquantes" });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "La commande est vide" });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Le montant total est invalide" });
    }

    let user = await User.findOne({ keycloakId });

    if (!user) {
      user = await User.create({
        keycloakId,
        username,
        email,
        role: "client",
      });
    }

    const formattedItems = items.map((item) => ({
      book: item._id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      user: user._id,
      items: formattedItems,
      totalAmount,
      status: "En cours",
    });

    const populatedOrder = await Order.findById(order._id)
      .populate("user", "username email role")
      .populate("items.book", "title image price");

    res.status(201).json({
      message: "Commande créée avec succès",
      order: populatedOrder,
    });
  } catch (error) {
    console.error("Erreur createOrder :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const { keycloakId } = req.params;

    const user = await User.findOne({ keycloakId });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const orders = await Order.find({ user: user._id })
      .populate("user", "username email role")
      .populate("items.book", "title image price")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur getMyOrders :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email role")
      .populate("items.book", "title image price")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur getAllOrders :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};