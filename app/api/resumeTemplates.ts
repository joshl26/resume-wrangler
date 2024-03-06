import { getResumeTemplates } from "../lib/data";
import { ResumeTemplate } from "./types";

export const getProducts = async (): Promise<ResumeTemplate[]> => {
  return getResumeTemplates();
};
