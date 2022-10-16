import React from "react";
import Link from "next/link";
import Article from "../components/Article";
import styles from "../styles/About.module.css";

const About = () => {
  const specList = [
    {
      name: "Framework",
      content: "NextJS",
    },
    {
      name: "Hosting Service",
      content: "Vercel",
    },
    {
      name: "API Approach",
      content: "REST",
    },
    {
      name: "API Documentation",
      content: "Swagger",
    },
    {
      name: "Database",
      content: "MongoDB",
    },
    {
      name: "Secondary Storage",
      content: "AWS S3",
    },
    {
      name: "Payment Getaway",
      content: "Stripe",
    },
    {
      name: "Authorization and Authentication",
      content: "JSON Web Tokens",
    },
    {
      name: "Important libraries",
      content:
        "@aws-sdk/s3-client, mongoose, stripe, cookies-next, next-swagger-docs, general-formatter",
    },
  ];

  return (
    <div className={styles.main}>
      <section className={styles.section}>
        <Article
          title="About this project"
          textContent="This project is the final capstone of the MIT - Full Stack Development With MERN. The restaurant application consists on building the basics of an eCommerce-like Web App, that allows it users to order dishes from a list of restaurants. Each restaurant has different dishes, prices, and much more."
        />
        <Article
          title="What can you do in OrderQue?"
          textContent={`My version of this project, is an extension of the original requirements, where a user cannot only sign up as a regular user, but also as a Restaurant. While logged in as a restaurant, the user has the capability to customize the dishes by adding, deleting, updating the images of the dishes or the restaurant itself. I based this approach on many other eCommerce solutions, where anyone can sign up, sell or buy. This creates a very dynamic marketplace, where you can experiment how is to have a functional business.`}
        />
        <Article title="Tech Specs" listArray={specList} />
        <div className={styles.links_container}>
          <span>
            Check out the GitHub Repo:{" "}
            <Link href="https://github.com/anthgrim/OrderQue">
              <a className={styles.link} rel="noreferrer" target="_blank">
                HERE
              </a>
            </Link>
          </span>
          <span>
            Check out the API Documentation:{" "}
            <Link href="/api-doc">
              <a className={styles.link}>HERE</a>
            </Link>
          </span>
        </div>
      </section>
    </div>
  );
};

export default About;
