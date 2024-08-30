import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { amount } = req.body;
            const order = await razorpay.orders.create({
                amount,
                currency: "INR",
                receipt: "receipt_" + Math.random().toString(36).substring(7)
            });
            res.status(200).json({ orderId: order.id });
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ error: "Failed to create order" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
