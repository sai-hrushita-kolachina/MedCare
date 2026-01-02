import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ success: false, message: "Symptoms are required" });
    }

    const pythonScript = path.join(__dirname, "../ml/predict.py");
    const py = spawn("python3", [pythonScript]);
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
