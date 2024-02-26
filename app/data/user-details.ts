export type User = {
  id: string;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  address_one: string;
  address_two: string;
  address_three: string;
  phone: string;
  website: string;
  thumbnail: string;
  linked_in: string;
  twitter: string;
  facebook: string;
  instagram: string;
  show_socials: string;
  github: string;
  country: string;
};

export const user: User = {
  id: "1",
  name: "Josh",
  email: "joshl26@hotmail.com",
  first_name: "Joshua",
  last_name: "Lehman",
  address_one: "35 Front St. S.",
  address_two: "Apartment 1802",
  address_three: "Mississauga, ON",
  phone: "905-990-1035",
  website: "joshlehman.ca",
  thumbnail:
    "https://res.cloudinary.com/dv6keahg3/image/upload/v1683124960/IMG_20141224_131223_veiseg.jpg",
  linked_in: "linkedin.com/in/joshrlehman",
  twitter: "google.ca",
  facebook: "google.ca",
  instagram: "google.ca",
  show_socials: "true",
  github: "https://github.com/joshl26",
  country: "CA",
};
