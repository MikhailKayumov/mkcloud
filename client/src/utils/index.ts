export function delay(ms = 0): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
