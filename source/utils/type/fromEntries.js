export default function (iterable) {
  return [...iterable]
    .reduce((obj, { 0: key, 1: val }) => Object.assign(obj, { [key]: val }), {})
}
