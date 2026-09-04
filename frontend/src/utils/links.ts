// src/utils/links.ts
import { COMPANY } from "@/config/company";

export const phoneLink = (phone: string = COMPANY.phoneRaw) =>
  `tel:${phone.replace(/\s/g, "")}`;

export const whatsappLink = (number: string = COMPANY.whatsapp) =>
  `https://wa.me/${number}`;

export const mailLink = (email: string = COMPANY.email) =>
  `mailto:${email}`;
