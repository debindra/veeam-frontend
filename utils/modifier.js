export function changeNameToTag(data) {
  const remove_whitespace = data.replace(/[\s*]/g, "_");
  const remove_multipleunderscore = remove_whitespace.replace(/_{2,}/g, "_");
  return remove_multipleunderscore
    .replace(/[^A-Za-z_]/g, "")
    .toLowerCase()
    .trim();
}
