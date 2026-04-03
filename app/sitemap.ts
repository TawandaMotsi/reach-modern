import { MetadataRoute } from "next";

const base = "https://www.www.reach-healthcare.com";

const routes = [
  "/",
  "/about",
  "/care-services",
  "/care-services/domicillary",
  "/care-services/live-in",
  "/care-services/respite",
  "/care-services/end-of-life",
  "/care-services/hospital",
  "/care-services/specialist",
  "/care-services/children",
  "/care-services/supported",
  "/staffing",
  "/work-for-us",
  "/application",
  "/contact",
  "/register",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(route => ({ url: `${base}${route}`, lastModified: new Date() }));
}
