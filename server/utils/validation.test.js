const expect = require("expect");

// import isRealString
const { isRealString } = require("./validation");

// isRealString
describe("isRealString", () => {
  it("should reject non-string values", () => {
    const num = 12;

    const res = isRealString(12);

    expect(res).toBeFalsy();
  });

  it("should reject string with only spaces", () => {
    const spacesString = "   ";

    const res = isRealString(spacesString);

    expect(res).toBeFalsy();
  });

  it("should allow string iwht non-space characters", () => {
    const string = "Andrew";

    const res = isRealString(string);

    expect(res).toBeTruthy();
  });
});
