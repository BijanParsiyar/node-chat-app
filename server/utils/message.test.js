const expect = require("expect");

const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "Bill";
    const text = "Some message";

    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({
      from,
      text
    });
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    const from = "Deb";
    const latitude = 15;
    const longitude = 19;

    const url = "https://www.google.com/maps?q=15,19";

    const locationMessage = generateLocationMessage(from, latitude, longitude);

    expect(typeof locationMessage.createdAt).toBe("number");
    expect(locationMessage).toMatchObject({
      from,
      url
    });
  });
});
