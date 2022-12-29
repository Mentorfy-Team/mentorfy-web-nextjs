export default function MaxCharacters(e, max: number) {
  return (e.target.value = e.target.value.toString().slice(0, max));
}
