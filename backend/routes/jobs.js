const express = require("express");
const router = express.Router();
const supabase = require("../config/db");

// ===============================
// GET ALL JOBS
// ===============================
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// GET JOB BY ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
});

// ===============================
// CREATE JOB
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      location,
      salary,
      job_type,
      skills_required,
      deadline,
    } = req.body;

    const { data, error } = await supabase
      .from("jobs")
      .insert([
        {
          title,
          company,
          description,
          location,
          salary,
          job_type,
          skills_required,
          deadline,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// UPDATE JOB
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      location,
      salary,
      job_type,
      skills_required,
      deadline,
    } = req.body;

    const { data, error } = await supabase
      .from("jobs")
      .update({
        title,
        company,
        description,
        location,
        salary,
        job_type,
        skills_required,
        deadline,
      })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// DELETE JOB
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;