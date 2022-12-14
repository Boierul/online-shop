'use strict';

//
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

/* Customize Strapi to integrate Stripe business logic */
const {createCoreController} = require('@strapi/strapi').factories;

// Here business logic is implemented && we extract strapi data (generated by user) via params destructuring
module.exports = createCoreController('api::order.order', ({strapi}) => ({
    // Allows to add functionality to the API endpoint
    async create(ctx) {
      // Grabbing the user info from params
      const {products, userName, email} = ctx.request.body;

      let itemLog = {}
      let sessionLog = {}
      let testLog = {}
      let sessionIDLog = {}

      try {
        // A list of the customer is buying
        // Retrieve item(s) information while also providing additional security via dynamic price backend fetch
        const lineItems = await Promise.all(
          products.map(async (product) => {

            const item = await strapi.service("api::item.item").findOne(product.id)
            itemLog = item

            // Will return a formatted JSON
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name
                },
                unit_amount: item.price * 100
              },
              quantity: product.count
            }
          })
        )

        // Create a Stripe session
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types: ["card"],
          customer_email: email,
          line_items: lineItems,
          success_url: "http://localhost:3000/checkout/success",
          cancel_url: "http://localhost:3000",
        })

        // Create the order in the Strapi backend
        const test = await strapi.service("api::order.order")
          .create({data: {userName, products, stripeSessionId: session.id}});

        // LOGS
        sessionLog = session
        testLog = test
        sessionIDLog = session.id


        // Returns the Session id to the client
        return {id: session.id};

      } catch (error) {
        ctx.response.status = 500
        return {error: {
          message: "There was a problem creating the charge"},
          sessionLog: sessionLog,
          testLog: testLog,
          sessionIDLog: sessionIDLog
        }
      }
    }
  })
)

