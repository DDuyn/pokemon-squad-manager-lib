import { getCurrentTimeStamp } from "@shared/services";
import * as fs from "fs";
import * as path from "path";
import packageJson from "../../package.json";

function getVersionFolder() {
  const version = packageJson.version;
  return path.join(__dirname, "../..", "logs", version);
}

const logsDir = getVersionFolder();
const logFileName = `${getCurrentTimeStamp()}.json`;
const logFilePath = path.join(logsDir, logFileName);

export const writeToLog = async (data: {
  level: string;
  message: string;
  timestamp: string;
}) => {
  try {
    await fs.mkdirSync(logsDir, { recursive: true });
    await fs.writeFileSync(logFilePath, JSON.stringify(data, null, 2), {
      flag: "a",
    });
  } catch (error) {
    console.error("Error al escribir en el archivo de registro:", error);
  }
};
