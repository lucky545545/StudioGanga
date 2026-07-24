const architectureAssets = import.meta.glob(
  "../../assets/architecture/**/*.png",
  { eager: true, query: "?url", import: "default" }
);

const interiorAssets = import.meta.glob(
  "../../assets/Interior/**/*.png",
  { eager: true, query: "?url", import: "default" }
);

function naturalSort([pathA], [pathB]) {
  return pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: "base" });
}

function projectImages(assetMap, folder) {
  const marker = `/${folder}/`;

  return Object.entries(assetMap)
    .filter(([path]) => path.replaceAll("\\", "/").includes(marker))
    .sort(naturalSort)
    .map(([, image]) => image);
}

function makeProject(assetMap, folder, slug, title, type, preferredImage) {
  const images = projectImages(assetMap, folder);
  const image = preferredImage
    ? Object.entries(assetMap).find(([path]) => path.replaceAll("\\", "/").endsWith(`/${folder}/${preferredImage}`))?.[1]
    : images[0];

  return {
    slug,
    title,
    type,
    image: image || images[0],
    images,
  };
}

const architectureProjects = [
  makeProject(
    architectureAssets,
    "Architecture- terra heaven farmhouse",
    "terra-haven-farmhouse",
    "Terra Heaven Farmhouse",
    "Farmhouse",
    "t1.png"
  ),
  makeProject(
    architectureAssets,
    "Architecture- Agarwal Residence",
    "agarwal-residence",
    "Agarwal Residence",
    "Residence",
    "ENTERIOR.png"
  ),
  makeProject(
    architectureAssets,
    "Architecture- Aman's residence",
    "aman-residence",
    "Aman's Residence",
    "Residence",
    "AMAN GARG OP2.png"
  ),
  makeProject(
    architectureAssets,
    "Architecture- Brijesh Sharma's Complex",
    "brijesh-sharma-complex",
    "Brijesh Sharma's Complex",
    "Commercial complex",
    "Concept-1/1-2.png"
  ),
];

const interiorProjects = [
  makeProject(
    interiorAssets,
    "Interior - Aman's residence",
    "aman-residence-interiors",
    "Aman's Residence",
    "Complete residence",
    "living room/LV1.png"
  ),
  makeProject(
    interiorAssets,
    "Interior-Agarwal Residence",
    "agarwal-residence-interiors",
    "Agarwal Residence",
    "Living & bedroom",
    "Living room/RENDER 1 AG.png"
  ),
  makeProject(
    interiorAssets,
    "Interior-Krishna Sharma Residence",
    "krishna-sharma-residence",
    "Krishna Sharma Residence",
    "Bathrooms",
    "bathroom 1/g1.png"
  ),
  makeProject(
    interiorAssets,
    "Interior- Mr. Rastogi Bedroom",
    "rastogi-bedroom",
    "Mr. Rastogi Bedroom",
    "Bedroom",
    "1-1.png"
  ),
];

export const projectCategories = {
  architecture: {
    slug: "architecture",
    title: "Architecture",
    eyebrow: "Built work & concepts",
    description: "Homes and buildings shaped by climate, context, material, and the rhythms of everyday life.",
    projects: architectureProjects,
    images: Object.values(architectureAssets),
    cover: architectureProjects[0].image,
  },
  interior: {
    slug: "interior",
    title: "Interior",
    eyebrow: "Spaces & details",
    description: "Warm, practical interiors developed through proportion, light, detail, and natural finishes.",
    projects: interiorProjects,
    images: Object.values(interiorAssets),
    cover: interiorProjects[0].image,
  },
};

export function findCategoryBySlug(slug) {
  return projectCategories[slug];
}
