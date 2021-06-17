export function delay(ms = 0): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1000) return `${bytes}b`;

  const kilobytes = bytes / 1024;
  if (kilobytes < 1000) return `${kilobytes.toFixed(2)}kb`;

  const megabytes = kilobytes / 1024;
  if (megabytes < 1000) return `${megabytes.toFixed(2)}MB`;

  const gigabytes = megabytes / 1024;
  return `${gigabytes.toFixed(2)}GB`;
}
