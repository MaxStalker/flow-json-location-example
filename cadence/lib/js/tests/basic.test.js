import path from "path";
import {
  init,
  emulator,
  getAccountAddress,
  executeScript,
} from "flow-js-testing";

describe("basic", () => {
  // Instantiate emulator and path to Cadence files
  beforeEach(async () => {
    const basePath = path.resolve(__dirname, "../../../");
    const port = 8081;
    init(basePath, port);
    await emulator.start(port, false);
  });

  // Stop emulator, so it could be restarted
  afterEach(async () => {
    await emulator.stop();
  });

  test("create address", async () => {
    const result = await executeScript("log-message", ["Simon says meow!"]);
    console.log({ result });
  });
});
