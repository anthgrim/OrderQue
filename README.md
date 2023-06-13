# OrderQue.com (DEPRECATED)

### Note
This site has been closed. Although the code sample is still functional. Follow instructions below to run locally

## Description

This is the final capstone project for the MIT - Full Stack Development with MERN Course. This web application consists on a Food Ordering platform where the user can sign up, add dishes to the cart, and checkout using a credit card.

In this project in particular I decided to add a second functionality so users can not only sign up as a regular users, but also as a Restaurant entity. While logged in as a restaurant the users can create a restaurant space, add restaurant description and logo. Create, delete, and edit dishes to sell to the public.

This gives the opportunity to the user to expirement the dynamism of selling products, in this case dishes.

## Functionalities

- Sign Up as a user or restaurant with email and password
- Sign In
- Search for restaurants
- Search for dishes in a restaurant
- Add dishes to your cart by selecting a quantity
- Modify quantity of dishes on cart
- Price and quantity shown in cart updates automatically
- Check out with stripe
- Create your Restaurant by signing up as a restaurant
- Upload or edit your restaurant picture
- Create, Edit and Delete Dishes. Including pictures and prices

## Future Adds

- Add tags to search for restaurants with a certain category
- Visualize how many dishes a restaurant has sold in a the restaurant admin

## How to Run

Fork this repository and follow the next steps

```bash
git clone git@github.com:anthgrim/OrderQue.git
cd OrderQue
npm install
```

Before running `npm run dev`, you will need the following environment variables:

```
DB_URI=<This is your MongoDb URI>
ACCESS_TOKEN_SECRET=<This is your access token secret>
REFRESH_TOKEN_SECRET=<This is your refresh token secret>
STRIPE_PUBLIC_KEY=<Your stripe public key>
STRIPE_SECRET_KEY=<Your stripe secret key>
S3_UPLOAD_KEY=<Your S3 key>
S3_UPLOAD_SECRET=<Your S3 secret>
S3_UPLOAD_BUCKET=<Your S3 bucket>
S3_UPLOAD_REGION=<Your S3 bucket region>
```

Once you have set up the environment variables, you can safely run the application in your computer by running `npm run dev`. Then open [localhost:3000](http//localhost:3000) in your browser.

## Tech Specifications

- Framework: [NextJS](https://nextjs.org/)
- Hosting Service: [Vercel](https://vercel.com/)
- API Approach: [REST](https://aws.amazon.com/what-is/restful-api/)
- API Documentation: Swagger. Visit [OrderQue API Docs](https://www.orderque.com/api-doc)
- Database: [MongoDB](https://www.mongodb.com/)
- Secondary Storage: [AWS S3](https://aws.amazon.com/s3/)
- Payment Getaway: [Stripe](https://stripe.com/)
- Authorization and Authentication: [JSON Web Tokens](https://jwt.io/)
- Important libraries: [@aws-sdk/client-s3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html), [stripe](https://stripe.com/docs/api), [mongoose](https://mongoosejs.com/), [cookies-next](https://www.npmjs.com/package/cookies-next), [next-swagger-doc](https://www.npmjs.com/package/next-swagger-doc), [general-formatter](https://www.npmjs.com/package/general-formatter)

## Images

### Home and Restaurant List

![Home](./public/Home.png)

![RestaurantList](./public/Home-restaurants.png)

### Restaurant Dishes

![RestaurantDishes](./public/Restaurant-dishes.png)

### Cart and Checkout

![Cart](./public/Cart.png)

![checkout](./public/Checkout.png)

### User Orders

![UserOrders](./public/MyOrders.png)

### Restaurant Admin

![RestaurantAdmin](./public/restaurant-admin.png)

## Author

[Kevin Grimaldi](https://www.linkedin.com/in/kevin-grimaldi-392b44178/)

## License

MIT License

## Images

[unsplash.com](https://unsplash.com/)
