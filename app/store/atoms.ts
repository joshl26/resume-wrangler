import { atom } from "jotai";
import { Cart, Review, ResumeTemplate } from "@/app/api/types";

export const cartAtom = atom<Cart>({
  products: [],
});
export const reviewsAtom = atom<Review[] | null>(null);

export const resumeTemplateAtom = atom<ResumeTemplate>({ styles: [] });
