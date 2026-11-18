// Hand-reviewed subject positions in the existing 192-frame films.
// Follow the work and the doorways, rather than applying a centre crop to every shot.
export const portraitTracks = {
  kitchen: [[1,.52],[48,.55],[96,.62],[144,.57],[192,.55]],
  passage: [[1,.55],[48,.75],[80,.75],[112,.57],[144,.48],[192,.38]],
  bathroom: [[1,.38],[48,.38],[72,.40],[96,.34],[144,.31],[192,.31]],
  'ceramic-cut': [[1,.62],[48,.65],[96,.68],[144,.72],[192,.73]],
  // Frame 97 is the original edit from the trowel to the tile-fitting shot.
  'ceramic-lay': [[1,.53],[96,.53],[97,.28],[144,.29],[192,.30]],
};

export function portraitCrop(room, frame, width, height) {
  const points = portraitTracks[room];
  const end = points.findIndex(([n]) => n >= frame);
  const b = points[end < 0 ? points.length - 1 : end];
  const a = points[Math.max(0, end - 1)];
  const t = a[0] === b[0] ? 0 : Math.max(0, Math.min(1, (frame - a[0]) / (b[0] - a[0])));
  const centre = a[1] + (b[1] - a[1]) * (t * t * (3 - 2 * t));
  const cropWidth = Math.round(height * 9 / 16);
  return {left: Math.max(0, Math.min(width - cropWidth, Math.round(width * centre - cropWidth / 2))), top: 0, width: cropWidth, height};
}
