const mongoose = require("mongoose");

const connectDB = async () => {
if (process.env.USE_MOCK_DB === "true") {
console.log(
"⚠️ Running in Mock DB mode (persistent JSON store). No local MongoDB server required."
);


return;


}

try {
await mongoose.connect(process.env.MONGO_URI);


console.log("✅ MongoDB Connected");


} catch (error) {
console.error(
"MongoDB Connection Error:",
error.message
);

process.exit(1);


}
};

module.exports = {
connectDB,
};
