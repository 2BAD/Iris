export default function (data) {
  try {
    JSON.parse(data)
  } catch {
    return false
  }
  return true
}
