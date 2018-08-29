// There are 2 ways how you can split code to different files and use it:

// File ONE:
{
  // CommonJS modules, not a standard, mostly used in NodeJS
  module.exports = {
    logger: () => console.log("logger")
  };

  // OR

  // ES2015 modules
  export const logger = () => console.log("logger");
}

// File TWO:
{
  // CommonJS:
  const fileOne = require("./fileOne");

  // OR

  // ES2015 modules
  import fileOne from "./fileOne";

  fileOne.logger();
}




// Handy thing to remember:
{
  // Object destructuration assignment
  const { logger } = require("./fileOne");
  // OR
  import { logger } from "./fileOne";
}
