# OrderQue.com

## Description

This is the final capstone project for the MIT - Full Stack Development with MERN Course. This web application consists on a Food Ordering platform where the user can sign up, add dishes to the cart, and checkout using a credit card.

In this project in particular I decided to add a second functionality so users can not only sign up as a regular users, but also as a Restaurant entity. While logged in as a restaurant the users can create a restaurant space, add restaurant description and logo. Create, delete, and edit dishes to sell to the public.

This gives the opportunity to the user to expirement the dynamism of selling products, in this case dishes.

[Doc Requirements](https://1drv.ms/b/s!Aq3braK3qcmji0kTLnrXNQ3zvtAN?e=M9yBKt) |
[MIT Presentation](https://1drv.ms/b/s!Aq3braK3qcmji0rog4cjKEI84mp5?e=oZWZOD)

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

![Home](https://bl6pap004files.storage.live.com/y4mNa-yrUk3du3g7qFEhDwvJf8vcmKc7u5ebm_-V8IddwnasMZlA44GUXQ-OV4-hqPFhC1zuP7-FnaukQU9OhSrw8CQ9ivvf7nPWXktM44OVZkw2l6JUfK5NpdKQSKYLla8bb8XsJlhI5_xU89ZmnGeAL1qUlQV5ogdMc3jZX-jc2FDtj3TtCK6xGW3_F1xqPxYKCqnMiBNTqAyplbwYSxC2fMAVh6HWMOd2xHsoIrJhks?encodeFailures=1&width=1688&height=833)

![RestaurantList](https://bl6pap004files.storage.live.com/y4mndhYOPQTb1cOz2jZKu5G1V9PtH0NrfAOhQdSeFLNT7bhvL1Gg3kp0ThpdfnVOy7jJ2leYIb06bRmTwkMM5jwtiKmhX0SzEoaXu4hN8CaeyXCDTpiiYJKdC4-NaP5--L3YnvtFd6k-r0iChuTuvW3U5ZAuig2THVzaZutoXU61YRIzpEHKVNplhTkEh_vHs_CyBhvECUCMPTcxZKdnkH-p1wv3Ygzh_lpbIYnBoUyvx0?encodeFailures=1&width=1701&height=635)

### Restaurant Dishes

![RestaurantDishes](https://bl6pap004files.storage.live.com/y4mu4hQZG6mtCDWMP-NQVjeVm9FLbjqJzlxdA1xVuiVIbJ2DkNPcwU9qXlEctA7SSn03qBQycZY5ueZ0fDKxqR4CnvFEfq3xHR9AwzdIXxmf2inJhlGLZ0h-QWS4e_F6j73mXLtfUOyca43C1I1Rr_zLjjGzQV7MoUBIHLKGvJAxHv1PGGSEvlA0wjm616qsrlsgRXbGS1O0bdnyWtgA7oah7NjT5sSDgpp6bWqbqi1C_A?encodeFailures=1&width=1666&height=836)

### Cart and Checkout

![Cart](https://bl6pap004files.storage.live.com/y4mfpvRU8ryFhQcyVgGwkjebezIoGciwL_Gf5jM4E9JgZhfyGFbgzsYTzXMWxlS7D44MuXDMYH_x9fkz4AYuJGLDNQC0kEODiN2aVKzS09E2yd2pYCM7wWjqohAFmEzDwSWoFkZ2t2Hmcdhg3DaHbeYXtNhAzihWnVcT51TdR6WTxtWZrussAJf5mLSwGrEEkoy7WrCO6JCSYHWt-wz-xu2B2bxUd7YHSCu3OCVr4OpRuI?encodeFailures=1&width=1683&height=668)

![checkout](https://bl6pap004files.storage.live.com/y4mznGAaEu5VoHWQfQzkwxI102AhUIiUR6Cy1IzK325y5NeXu0ksx2g4tskQyN7W3zQ8vMH_g7GVBniSOag2EF3DnvnZafrpcQlnIjNv8gpMu09GK4RzYivcY1uKpSCWzd1cp5LsFaVyDZDRx3AUS9drTkptHjBW5gTMGLN4VZdehiLxVVHqC-OP9NiYI0ynEXDNMxLS3-goa2j2OwE5jZZmDuBLX_CMwRAsQRbH47AaDo?encodeFailures=1&width=1005&height=724)

### User Orders

![UserOrders](https://bl6pap004files.storage.live.com/y4mP2U4w0zX5Lh3R7J-R935MW4TM1gGJr1-KSKSG5aevAp4Jtm7UxJXqlQuvoH9RG9kaIltAzXl3SQRU6w41NkmK1a-kxC6SFdWOeraMekzae2_Qwrwe7rsj2rcL5O_igcdGfSexS3qpFHO_eWfM8MgBvufRv6uqlqYjb17P8MJ7s-OP4fpisN0yAASIn6FhNH2nden0M0TlORkqDPghQLNpiZP6oJTcOe6Ghus4O0GI9w?encodeFailures=1&width=1659&height=621)

### Restaurant Admin

![RestaurantAdmin](https://bl6pap004files.storage.live.com/y4memeJQAwqWyILYLvEPG8EWK_MAeQo5CAR9iPMQ0Sk1ljko5gCG79xSInFiSJsB37340GWJhch0aRHxamA85cUInfr-v2bCY0D2J9N725GKKz4YdmN50q1lUdX6N2os05s_fEP9xcQjk_FsSgagrlXtVA7HIRX-0b89Ol2nrE0Fo5946Q2s3gXkIw7s4wSK1Bl4mUUNdr6wj6g5EFvvKLI1XSAHXndB4yNTR0cXcESU-A?encodeFailures=1&width=1591&height=913)

## Author

[Kevin Grimaldi](https://www.linkedin.com/in/kevin-grimaldi-392b44178/)

## License

MIT License

## Images

[unsplash.com](https://unsplash.com/)
