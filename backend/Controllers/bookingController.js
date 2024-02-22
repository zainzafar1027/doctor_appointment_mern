import User from './../models/UserSchema.js'
import { Doctor } from './../models/doctorSchema.js'
import Booking from './../models/bookingSchema.js'
import stripe, { Stripe } from 'stripe'

export const getCheckoutSession = async (req, res) => {
    try {
   
        // Find the doctor by ID
        const doctor = await Doctor.findById(req.params.doctorId);
        console.log("Doctor ID:", req.params.doctorId);

        // If doctor not found, return 404
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
     
    const user = await User.findById(req.userId);
    console.log(req.userId)


    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

  


        // Initialize Stripe with your secret key
        const stripe = new Stripe(process.env.STRIPE_SECRET_Key);

        // Calculate the unit amount based on doctor's ticket price
        const unitAmount = doctor.ticketPrice * 100; // Convert to cents

        // Check if unit amount is valid
        if (isNaN(unitAmount) || unitAmount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid ticket price" });
        }

        // Create a checkout session with Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: unitAmount,
                        product_data: {
                            name: doctor.name,
                            description: doctor.bio,
                            images: [doctor.photo]
                        }
                    },
                    quantity: 1
                }
            ]
        });

        // If session creation fails, handle the error
        if (!session || !session.id) {
            return res.status(500).json({ success: false, message: "Error creating checkout session" });
        }

        // Save booking details to the database
        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: session.id
        });
        await booking.save();

        // Respond with success and session details
        res.status(200).json({ success: true, message: "Successfully Paid", session });
    } catch (err) {
        // Log and handle errors
        console.error(err);
        res.status(500).json({ success: false, message: "Error creating checkout session" });
    }
}

