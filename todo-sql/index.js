import express from "express";
import { sqlConnection } from "./config/db.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
(() => {
  sqlConnection.connect((err) => {
    if (err) {
      console.log(err?.message || "error in database connection!");
    } else {
      console.log("Database connected successfully");
      app.listen("5000", () => {
        console.log("server started successfully");
      });
    }
  });
})();

app.get("/", async (req, res) => {
  const { page = 1, limit = 4, sortBy = "name", sortType = "asc" } = req.query;

  const query = `SELECT * FROM employee ORDER BY ${sortBy} ${sortType} LIMIT ?, ?`;
  const offset = (page - 1) * limit;
  sqlConnection.query(query, [offset, parseInt(limit)], (err, rows) => {
    if (err) {
      res.status(400).json({
        status: "error",
        data: null,
        message: err?.message || `error while fetching employees`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: rows,
        message: "employees fetched successfully",
      });
    }
  });
});

app.post("/add", (req, res) => {
  const { id, name, salary } = req.body;
  try {
    sqlConnection.query("INSERT INTO EMPLOYEE VALUES(?, ?, ?)", [
      id,
      name,
      salary,
    ]);

    res.status(200).json({
      status: "success",
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

app.patch("/:id", (req, res) => {
  const { salary } = req.body;
  const { id } = req.params;
  try {
    sqlConnection.query("UPDATE employee SET salary = ? WHERE id = ?", [
      salary,
      id,
    ]);

    res.status(200).json({
      status: "success",
      message: "employee details updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: null,
      message: err?.message || `error while fetching employees`,
    });
  }
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    sqlConnection.query("DELETE FROM employee WHERE id = ?", [id]);
    res.status(200).json({
      status: "success",
      message: "employee deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: null,
      message: err?.message || `error while fetching employees`,
    });
  }
});

app.get("/:key", (req, res) => {
  const { key } = req.params;

  try {
    sqlConnection.query(
      "SELECT * FROM employee WHERE name LIKE CONCAT('%', ?, '%')",
      [key],
      (err, rows) => {
        if (err) {
          res.status(400).json({
            status: "error",
            data: null,
            message: err?.message || `error while fetching employees`,
          });
        } else {
          res.status(200).json({
            status: "success",
            data: rows,
            message: "employees fetched successfully",
          });
        }
      },
    );
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: null,
      message: err?.message || `error while fetching employees`,
    });
  }
});
