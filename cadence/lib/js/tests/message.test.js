import path from "path";

import {
  init,
  emulator,
  executeScript,
  getAccountAddress,
  deployContractByName,
  getContractAddress,
  shallResolve,
} from "flow-js-testing";

jest.setTimeout(50000)

const deployContract = async () => {
  const MessageAdmin = await getAccountAddress("MessageAdmin");
  await deployContractByName({ name: "Message", to: MessageAdmin });
};

describe("Message contract", () => {
  beforeEach(async () => {
    const basePath = path.resolve(__dirname, "../../../");
    const port = 8080;
    init(basePath);
    return emulator.start();
  });

  afterEach(async () => {
    await emulator.stop();
  });

  test("deploys", async () => {
    await shallResolve(deployContract());
  });

  test("read message", async () => {
    await deployContract();
    const result = await executeScript("read-message");
    console.log({ result });
    expect(result).toBe("Hail Superman");
  });
});
