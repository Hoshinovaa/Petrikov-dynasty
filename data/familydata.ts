export type NodeType = {
  name: string;
  fullName?: string;
  dob?: string;
  nationality?: string;
  role?: string;
  photo?: string;
  partner?: NodeType;
  partnerType?: "kandung" | "angkat";
  relation?: "kandung" | "angkat";
  children?: NodeType[];
};

export const familydata: NodeType = {
  name: "Simon",
  fullName: "Simon Petrikov",
  dob: "1 January 1970",
  nationality: "Russian",
  photo: "/photos/default.jpg",
  partner: {
    name: "Lyla",
    fullName: "Lyla Petrikov",
    dob: "5 May 1975",
    nationality: "Russian",
    photo: "/photos/default.jpg",
  },
  partnerType: "angkat",
  children: [
    { name: "Eldric", fullName: "Eldric Petrikov", dob: "05 April 1998", nationality: "Germany", relation: "kandung" },
    {
      name: "Allan",
      fullName: "Allan Hehe Petrikov",
      dob: "22 February 1991",
      nationality: "France",
      relation: "kandung",
      partner: {
        name: "Lily",
        fullName: "Liliana A Petrikov",
        dob: "08 May 2005",
        nationality: "Indonesia",
      },
      partnerType: "kandung",
      children: [
        {
          name: "Joeru",
          fullName: "Joeru Ashford Petrikov",
          dob: "11 July 1998",
          nationality: "Indonesia",
          children: [
            { name: "Yuzu", fullName: "Yuzu Lucilfer", dob: "24 March 1999", nationality: "Indonesia" },
            { name: "Selene" },
          ],
        },
        { name: "Graviel" },
        { name: "Naollie" },
      ],
    },
    {
      name: "Kitsu",
      fullName: "Kitsu Ryouta Petrikov",
      dob: "20 July 1998",
      nationality: "Japanese",
      photo: "/photos/kitsu.png",
      children: [{ name: "Michie" }],
    },
    {
      name: "Zah",
      fullName: "Zah Petrikov",
      dob: "15 August 2000",
      nationality: "Russian",
      photo: "/photos/Zah.png",
    },
    { name: "Stefan", partner: { name: "Naya" } },
    {
      name: "Nika",
      partner: { name: "Niko" },
      children: [
        { name: "Sophia" },
        { name: "Sonya" },
        { name: "Lupa namanya" },
      ],
    },
    { name: "Cecyl" },
  ],
};