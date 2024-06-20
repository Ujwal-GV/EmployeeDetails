const express = require("express");
const path = require("path");
const cors = require("cors");
const { connectMongoDB } = require("./configuration/connection");
const employeeRouter = require("./routes/employeeRoute");
const adminRouter = require("./routes/adminRoute");

const PORT = 5001;

connectMongoDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/employees", employeeRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));