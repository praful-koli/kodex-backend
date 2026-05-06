
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import config from "./src/config/config.js";
connectDB()

let PORT = config.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server Running on PORT : ", PORT);
});
