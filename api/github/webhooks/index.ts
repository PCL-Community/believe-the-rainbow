import { createNodeMiddleware, createProbot } from "probot";

import app from "../../../src/index.js";

export default await createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: "/api/github/webhooks",
});