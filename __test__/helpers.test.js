const { format_date, format_plural } = require("./utils/helpers");

test("format_plural() returns a pluralized word", () => {
  const word1 = format_plural("comment", 1);
  const word2 = format_plural("share", 2);

  expect(word1).toBe("comment");
  expect(word2).toBe("shares");
});

test("format_date() returns a date string", () => {
  const date = new Date("2021-05-12 14:11:02");

  expect(format_date(date)).toBe("5/12/2021");
});
