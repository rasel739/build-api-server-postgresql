const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Build Api Documentation",
    description:
      "Build Api Documentation automatically generated by the <b>swagger-autogen</b> module.",
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json","multipart/form-data"],
  produces: ["application/json"],
  tags: [
    {
      name: "User authentication",
      description: "User signup and login",
    },
    {
      name: "User data",
      description: "User data post, get, update , delete",
    },
    {
      name: "Reset password",
      description: "Reset user password",
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      name: "Authorization",
      in: "header",
      type: "apiKey",
      description: "JWT Authorization header",
    },
  },
  security: [{ bearerAuth: [] }],

  definitions: {
    Signup: {
      email: "string",
      password: "string",
    },
    Login: {
      email: "string",
      password: "string",
    },
    User: {
      name: "string",
      phone: "string",
      email: "string",
      image: "string",
    },
    AddUser: {
       name: "string",
      phone: "string",
      email: "string",
    },
    UpdateUser: {
      name: "string",
      phone: "string",
    },
    ResetPasswordSendEmail: {
      email: "string",
    },
    ResetPasswordSet: {
      password: "string",
    },
  },
};

const outputFile = "./swagger-outputfile.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app"); // Your project's root file
});
