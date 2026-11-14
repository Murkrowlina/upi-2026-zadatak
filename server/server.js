const express = require('express');
const app = express();
const mssql = require("mssql/msnodesqlv8");
const cors = require("cors");
app.use(cors({ origin: "http://127.0.0.1:5500" }));

const config = {
    connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=localhost\\SQLEXPRESS;Database=BIBLIOTEKA;Trusted_Connection=Yes;Encrypt=Yes;TrustServerCertificate=Yes",
};
let connection;

function getConnection() {
    if (!connection) {
        const pool = new mssql.ConnectionPool(config);
        connection = pool.connect().catch((error) => {
            connection = undefined;
            throw error;
        });
    }

    return connection;
}

app.get('/books', async (req, res) => {
    try {
        const con = await getConnection();
        const result = await con.request().query("SELECT * FROM dbo.Knjiga");
        res.json(result);
    } catch (error) {
        console.error("Could not load books:", error);
        res.status(500).json({ error: "Could not load books" });
    }
})

let server = app.listen(5000, () => {
    console.log('Server is listening at port 5000...');
});