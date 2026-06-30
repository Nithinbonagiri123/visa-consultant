/**
 * Central stock-photo manifest.
 *
 * All homepage and section imagery is sourced from Unsplash via these URLs.
 * The site uses each entry through next/image, with `images.remotePatterns`
 * in next.config.ts pinned to `images.unsplash.com`.
 *
 * Replace any entry with a commissioned shot in /public/images/... when the
 * client provides verified imagery (counsellor headshots, real campus photos,
 * graduation shots from actual placements, etc.).
 */

type StockImage = {
  /** Unsplash photo ID — verified to return 200 from images.unsplash.com. */
  id: string;
  /** Descriptive alt text — replace if the photo is swapped. */
  alt: string;
};

const unsplash = (id: string, w: number, q = 75) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const stockImages = {
  heroLibrary: {
    id: "1568667256549-094345857637",
    alt: "Spiral library with sweeping bookshelves — emblematic of Ireland's great academic libraries like Trinity College Long Room.",
  },
  studentsConsulting: {
    id: "1543269865-cbf427effbad",
    alt: "Four young adults in conversation around a table — a counsellor-style consultation.",
  },
  campusBuilding: {
    id: "1592280771190-3e2e4d571952",
    alt: "Modern brick university campus building under a soft sky.",
  },
  studentsClassroom: {
    id: "1571260899304-425eee4c7efc",
    alt: "University students in a classroom, one standing with notebooks — focused, real student life.",
  },
  graduation: {
    id: "1541339907198-e08756dedf3f",
    alt: "Graduates throwing mortarboards in the air at sunset over a city skyline.",
  },
  libraryStudents: {
    id: "1523240795612-9a054b0db644",
    alt: "Group of students collaborating around laptops in a university library.",
  },
} satisfies Record<string, StockImage>;

export const stockSrc = (image: StockImage, width: number, quality?: number) =>
  unsplash(image.id, width, quality);
