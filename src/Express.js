import express from "express";
import path from "path";

const app = express();

app.use(
  express.static("public", {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

const __dirname = path.resolve();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
