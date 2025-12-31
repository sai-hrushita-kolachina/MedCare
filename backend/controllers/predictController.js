import { spawn } from "child_process";

export const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ success: false, message: "Symptoms are required" });
    }

    const py = spawn("python", ["ml/predict.py"]);

    let output = "";
    let error = "";

    py.stdin.write(JSON.stringify({ symptoms }));
    py.stdin.end();

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      error += data.toString();
    });

    py.on("close", () => {
      if (error) {
        return res.status(500).json({ success: false, error });
      }
      return res.json(JSON.parse(output));
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
