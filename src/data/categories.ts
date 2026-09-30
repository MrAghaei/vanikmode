import { externalUrl } from "@/lib/site";
import type { CategoryCard } from "@/types/landing";

// Verbatim from reference/content.md §4 (`.section-homepage-categories`, 10 cards).
export const categoryCards: CategoryCard[] = [
  {
    label: "شال و روسری / اسکارف",
    href: externalUrl("/products/category/57/head-scarves/"),
    image: "0959f6c3-ec2d-4e54-be44-1ad04990ccd1.jpg",
  },
  {
    label: "کت زنانه",
    href: externalUrl("/products/category/109/women-jacket/"),
    image: "19801166-d95f-4a70-b917-fba8f734a128.jpg",
  },
  {
    label: "پیراهن زنانه",
    href: externalUrl("/products/category/22/women-shirt/"),
    image: "ea6c510c-d68e-4570-a875-78a0cd9f32bc.jpg",
  },
  {
    label: "شومیز / بلوز",
    href: externalUrl("/products/category/28/blouses/"),
    image: "f92e6e3e-3f56-4b6e-8753-d7b42247103f.jpg",
  },
  {
    label: "شلوار / دامن",
    href: externalUrl("/products/category/4/women-bottoms/"),
    image: "e52e1807-4800-433c-af5e-36c7d99a100d.jpg",
  },
  {
    label: "لباس گرم",
    href: externalUrl("/products/category/6/cold-season-clothing/"),
    image: "dcacb153-ba48-461c-b6d7-8f2c219edd45.jpg",
  },
  {
    label: "مانتو / تونیک / کت",
    href: externalUrl("/products/category/29/women-manto/"),
    image: "4d0b14af-526a-42ec-9a6d-767d107ac259.jpg",
  },
  {
    label: "ست زنانه",
    href: externalUrl("/products/category/2/women-sets/"),
    image: "601f73e5-1b62-4c05-b0ce-fa4e6d7fce70.jpg",
  },
  {
    label: "تیشرت",
    href: externalUrl("/products/category/31/tshirts/"),
    image: "1dff17c6-59a0-4b41-8603-4aaa1883888a.jpg",
  },
  {
    label: "ژاکت / بافت / پلیور",
    href: externalUrl("/products/category/49/knitwear/"),
    image: "d1c76ed8-480a-4c82-8f24-76e068828689.jpg",
  },
];
