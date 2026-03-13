
// ✔ FOR LOCAL DEVELOPMENT ONLY
// For Vercel deployment, use api/index.js instead

import app from "./api/index.js";
import dotenv from "dotenv";

dotenv.config();

console.log("JWT SECRET =", process.env.JWT_SECRET);








// ✔ Server - Local development only
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}, v 2`);
});




// ✔ Legacy endpoints - kept for backward compatibility but routes defined in api/index.js

