import express from "express";
import { pool } from "./config/db.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/getAllTodos", (__, res) => {
  const query = `SELECT * FROM "Todo"`;
  try {
    pool.query(query, (error, results) => {
      if (error) {
        res.status(400).json({
          status: "error",
          data: null,
          message: error?.message || "error while fetching todos",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: results.rows,
          message: "todos fetched successfully",
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      data: null,
      message: error?.message || "error while fetching todos",
    });
  }
});

app.post("/add", async (req, res) => {
  const { id, name, salary } = req.body;

  console.log(req.body);
  try {
    const results = await pool.query(
      `INSERT INTO "Todo" (id, name, salary) VALUES ($1, $2, $3) RETURNING *`,
      [id, name, salary],
    );

    res.status(200).json({
      status: "success",
      data: results.rows[0],
      message: "employee added successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: null,
      message: err?.message || `error while fetching employees`,
    });
  }
});

app.patch("/:id", async (req, res) => {
  const { salary } = req.body;
  const { id } = req.params;
  try {
    await pool.query(`UPDATE "Todo" SET salary = $1 WHERE id = $2`, [
      salary,
      id,
    ]);

    res.status(200).json({
      status: "success",
      message: "Todo details updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: null,
      message: err?.message || `error while fetching Todoa`,
    });
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query(`DELETE FROM "Todo" WHERE id = $1`, [id]);
    res.status(200).json({
      status: "success",
      message: "Todo deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: null,
      message: err?.message || `error while fetching Todos`,
    });
  }
});

app.get("/:key", async (req, res) => {
  const { key } = req.params;

  const keyString = String(key);

  try {
    const results = await pool.query(
      `SELECT * FROM "Todo" WHERE name LIKE ('%' || $1::text || '%')`,
      [keyString],
    );

    res.status(200).json({
      status: "success",
      data: results.rows,
      message: "Todos fetched successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: null,
      message: err?.message || `error while fetching Todoa`,
    });
  }
});

(() => {
  pool
    .connect()
    .then(() => {
      console.info("Connected to database successfully");
      app.listen(5000, () => {
        console.log("server started successfully");
      });
    })
    .catch((error) => {
      console.error(error?.message, "err while connecting to DB");
    });
})();
