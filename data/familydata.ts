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
  dob: "10 January 1970",
  nationality: "Russia",
  photo: "/photos/simon.png",
  role: "Bapak Kandung",
  partner: {
    name: "Lyla",
    fullName: "Lyla Petrikov",
    dob: "01 November 2002",
    nationality: "Indonesia",
    photo: "/photos/lyla.png",
    role: "Ibu Angkat",
  },
  partnerType: "angkat",
  children: [
    { name: "Eldric",
      fullName: "Eldric Petrikov",
      dob: "05 April 1988",
      nationality: "Germany",
      relation: "kandung",
      photo: "/photos/eldric.png",
      role: "Anak Ke-1",
    },
    {
      name: "Allan",
      fullName: "Allan Hehe Petrikov",
      dob: "22 February 1991",
      nationality: "France",
      relation: "kandung",
      photo: "/photos/allan.png",
      role: "Anak Ke-2",
      partner: {
        name: "Lily",
        fullName: "Liliana A Petrikov",
        dob: "08 May 2005",
        nationality: "Indonesia",
        photo: "/photos/lily.png",
        role: "Menantu",
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
      role: "Anak Ke-3",
      children: [{ name: "Michie" }],
    },
    {
      name: "Zah",
      fullName: "Zah Petrikov",
      dob: "17 July 2000",
      nationality: "Japan",
      photo: "/photos/zah.png",
      role: "Anak Ke-4",
    },
    { name: "Stefan",
      fullName: "Stefan Petrikov",
      dob: "19 September 2000",
      nationality: "United States of America",
      photo: "/photos/stefan.png",
      role: "Anak Ke-5",
      partner: {
        name: "Naya",
        fullName: "Naya Melvine Petrikov",
        dob: "01 Oktober 2000",
        nationality: "United States of America",
        photo: "/photos/naya.png",
        role: "Menantu",
      } },
    {
      name: "Nika",
      fullName: "Ryeo Nika Petrikov",
      dob: "05 Mei 2005",
      nationality: "Brazil",
      photo: "/photos/nika.png",
      role: "Anak Ke-6",
      partner: { name: "Niko" },
      children: [
        { name: "Sophia" },
        { name: "Sonya" },
        { name: "Lupa namanya" },
      ],
    },
    { name: "Cecyl",
      fullName: "Cecylia Lysandra Petrikov",
      dob: "27 July 2005",
      nationality: "Indonesia",
      photo: "/photos/cecyl.png",
      role: "Anak Ke-7",
    },
  ],
};