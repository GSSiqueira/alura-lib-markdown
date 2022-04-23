import getFilesOnPath from "../index";

const textWithLinksResult = [
  [
    {
      FileList: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
    },
  ],
  "No links were found.",
];

describe("getFilesOnPath::", () => {
  it("must be a function", () => {
    expect(typeof getFilesOnPath).toBe("function");
  });
  it("must return array with results", async () => {
    const result = await getFilesOnPath("./test/files/");
    expect(result).toEqual(textWithLinksResult);
  });
  it("must throw error due to no file", async () => {
    await expect(getFilesOnPath("./test/fileX/")).rejects.toThrow(
      "No files were found."
    );
  });
});
