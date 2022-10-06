import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import React from "react";
import "swagger-ui-react/swagger-ui.css";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps = async () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "OrderQue.com API Documentation",
        version: "0.0.1",
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
