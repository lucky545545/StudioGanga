import { projectCategories } from "./categories.js";

const architectureProjects = projectCategories.architecture.projects;
const interiorProjects = projectCategories.interior.projects;

function sourceProject(collection, slug) {
  return collection.find((project) => project.slug === slug);
}

function buildProject({
  number,
  source,
  text,
  intro,
  statement,
  discipline,
  typology,
  focus,
}) {
  return {
    number,
    slug: source.slug,
    title: source.title,
    text,
    image: source.image,
    gallery: source.images.filter((image) => image !== source.image),
    intro,
    statement,
    details: [
      ["Discipline", discipline],
      ["Typology", typology],
      ["Focus", focus],
    ],
  };
}

export const projects = [
  buildProject({
    number: "01",
    source: sourceProject(architectureProjects, "terra-haven-farmhouse"),
    text: "A grounded farmhouse shaped by stone, timber, deep shade, and a close relationship with the landscape.",
    intro: "Terra Heaven is conceived as a quiet retreat where architecture and landscape meet without a hard edge. Deep roof planes, shaded verandahs, and planted courts extend daily life into the outdoors.",
    statement: "The house is composed as a sequence of sheltered thresholds. Dark stone anchors the structure, warm timber softens its edges, and filtered openings bring changing light into the rooms throughout the day.",
    discipline: "Architecture",
    typology: "Farmhouse",
    focus: "Landscape, shade & material",
  }),
  buildProject({
    number: "02",
    source: sourceProject(architectureProjects, "agarwal-residence"),
    text: "A contemporary residence composed through strong horizontal lines, shaded openings, and a restrained material palette.",
    intro: "Agarwal Residence balances privacy from the street with generous daylight inside. Layered elevations, recessed openings, and planted edges give the home depth while protecting its principal rooms from glare.",
    statement: "The architecture is held together by a clear structural rhythm and a limited family of finishes. Every projection, opening, and screen contributes to shade, proportion, and the identity of the house.",
    discipline: "Architecture",
    typology: "Residence",
    focus: "Elevation, light & privacy",
  }),
  buildProject({
    number: "03",
    source: sourceProject(architectureProjects, "aman-residence"),
    text: "An urban home shaped as a calm, layered sanctuary behind a composed street elevation.",
    intro: "Aman's Residence responds to a compact urban setting with carefully framed openings and a strong sense of enclosure. The massing creates privacy while allowing terraces and internal rooms to remain connected to daylight.",
    statement: "Solid planes and warm accents are balanced with deep reveals and planted moments. The result is an elevation that feels substantial without becoming heavy.",
    discipline: "Architecture",
    typology: "Urban residence",
    focus: "Massing, privacy & terraces",
  }),
  buildProject({
    number: "04",
    source: sourceProject(architectureProjects, "brijesh-sharma-complex"),
    text: "Two architectural concepts exploring identity, visibility, and an efficient commercial frontage.",
    intro: "Brijesh Sharma's Complex studies how a commercial building can establish a memorable public presence while organizing access, signage, glazing, and usable floor plates with clarity.",
    statement: "The concepts test contrasting façade rhythms and material expressions. In each option, the envelope is used to unify different functions and give the complex a confident street address.",
    discipline: "Architecture",
    typology: "Commercial complex",
    focus: "Façade, identity & access",
  }),
  buildProject({
    number: "05",
    source: sourceProject(interiorProjects, "aman-residence-interiors"),
    text: "A complete residential interior developed as a warm sequence of living, sleeping, kitchen, and bathing spaces.",
    intro: "The interiors of Aman's Residence are designed as one continuous atmosphere. Natural tones, soft lighting, integrated storage, and measured furniture layouts connect rooms with different daily functions.",
    statement: "Each room has its own character while sharing a consistent material language. Detail is used quietly, allowing comfort, light, and practical use to lead the experience.",
    discipline: "Interior design",
    typology: "Complete residence",
    focus: "Material, furniture & lighting",
  }),
  buildProject({
    number: "06",
    source: sourceProject(interiorProjects, "agarwal-residence-interiors"),
    text: "Living and bedroom interiors shaped by warm finishes, tailored furniture, and layered ambient light.",
    intro: "Agarwal Residence brings the living and private spaces together through a controlled palette and carefully proportioned built-ins. Furniture, wall surfaces, and lighting are treated as parts of a single composition.",
    statement: "Warm timber and neutral surfaces create depth without visual noise. Storage and services are integrated into the architecture so the rooms remain calm and generous.",
    discipline: "Interior design",
    typology: "Residential interiors",
    focus: "Living, bedroom & joinery",
  }),
  buildProject({
    number: "07",
    source: sourceProject(interiorProjects, "krishna-sharma-residence"),
    text: "A family of bathroom interiors combining durable surfaces with precise lighting and compact planning.",
    intro: "The bathrooms at Krishna Sharma Residence are treated as composed rooms rather than purely functional enclosures. Material transitions, mirror lighting, and fixture placement make efficient plans feel considered.",
    statement: "Each bathroom explores a distinct palette while retaining the same attention to alignment, durability, and ease of maintenance. Light and reflection expand the sense of space.",
    discipline: "Interior design",
    typology: "Residential bathrooms",
    focus: "Surfaces, fixtures & lighting",
  }),
  buildProject({
    number: "08",
    source: sourceProject(interiorProjects, "rastogi-bedroom"),
    text: "A restful bedroom organized around soft light, integrated storage, and a restrained tactile palette.",
    intro: "Mr. Rastogi's Bedroom is planned as a quiet private retreat. The bed wall, wardrobes, lighting, and loose furniture are coordinated to keep circulation clear and the visual atmosphere settled.",
    statement: "Layered neutral finishes and warm illumination give the room depth. Functional elements are absorbed into clean architectural lines so comfort remains the strongest impression.",
    discipline: "Interior design",
    typology: "Bedroom",
    focus: "Comfort, storage & ambience",
  }),
];

export function findProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
