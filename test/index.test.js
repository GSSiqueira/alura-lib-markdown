import getFilesOnPath from "../index";

test("needs to be a function", () => {
  expect(typeof getFilesOnPath).toBe("function");
});
