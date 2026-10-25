export async function loadFont(font: FontFace) {
  const loadedFont = await font.load();
  document.fonts.add(loadedFont);
}
