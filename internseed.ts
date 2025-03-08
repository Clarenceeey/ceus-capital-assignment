/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from "~/server/db";

function slugifyWithId(name: string, id: number | bigint): string {
  return `${slugify(name)}-${id}`;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Trim hyphens from start and end
}

interface AddressId {
  id: bigint; // Adjust this based on your schema (e.g., number or string)
}

async function main() {
  // 1. Ensure these tags exist so that `connect` works

  // address
  const iso_code = "SG-01";
  const planningAreaName = "Bishan";

  // address
  const buildingNumber = "Bishan Community Club";
  const streetName = "51 Bishan St. 13";
  const unitNumber = "#03-01";
  const postalCode = "579799";
  const fullAddress =
    "51 Bishan St. 13, #03-01 Bishan Community Club, Singapore 579799";
  const latitude = 1.3495560956703267;
  const longitude = 103.85117585340905;

  // business description
  const businessName = "Mr Cat Academy";
  const businessDescription = "Mr Cat Academy is a sir";
  const businessContactEmail = "tution@mrcat.net";
  const businessGooglePlaceId = "ChIJN1t_tDeuEmsRNsoyG03frY4";
  const businessFacebookPageId = "262576896966693";
  const businessFacebookPageLink = "https://facebook.com/MrCat";
  const businessInstagramPageLink = "https://www.instagram.com/MrCat/";
  const businessWhatsappLink =
    "https://api.whatsapp.com/send?phone=658498105&text=Hi";
  const businessAverageRating = 5.0;

  // business hours
  const businessHoursData = [
    { day_name: "Monday", open_time: "12:00:00", close_time: "23:00:00" },
    { day_name: "Tuesday", open_time: "12:00:00", close_time: "23:00:00" },
    { day_name: "Wednesday", open_time: "12:00:00", close_time: "23:00:00" },
    { day_name: "Thursday", open_time: "12:00:00", close_time: "23:00:00" },
    { day_name: "Friday", open_time: "12:00:00", close_time: "23:00:00" },
    { day_name: "Saturday", open_time: "09:00:00", close_time: "23:00:00" },
    { day_name: "Sunday", open_time: "09:00:00", close_time: "23:00:00" }, // Closed on Sunday
  ];

  const categoryName = "Tuition";

  // Define multiple services
  const servicesData = [
    {
      name: "Primary 1 Math Tuition",
      tags: ["Math", "Primary 1", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 1 Chinese Tuition",
      tags: ["Chinese", "Primary 1", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 1 English Tuition",
      tags: ["English", "Primary 1", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 1 Science Tuition",
      tags: ["Science", "Primary 1", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 2 English Tuition",
      tags: ["English", "Primary 2", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 2 Chinese Tuition",
      tags: ["Chinese", "Primary 2", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 2 Science Tuition",
      tags: ["Science", "Primary 2", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 2 Math Tuition",
      tags: ["Math", "Primary 2", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 3 English Tuition",
      tags: ["English", "Primary 3", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 3 Chinese Tuition",
      tags: ["Chinese", "Primary 3", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 3 Science Tuition",
      tags: ["Science", "Primary 3", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 3 Math Tuition",
      tags: ["Math", "Primary 3", "Small Group", "Onsite"],
      pricing: {
        price: "36.67",
      },
    },
    {
      name: "Primary 4 English Tuition",
      tags: ["English", "Primary 4", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Primary 4 Chinese Tuition",
      tags: ["Chinese", "Primary 4", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Primary 4 Science Tuition",
      tags: ["Science", "Primary 4", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Primary 4 Math Tuition",
      tags: ["Math", "Primary 4", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Primary 5 English Tuition",
      tags: ["English", "Primary 5", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Primary 5 Chinese Tuition",
      tags: ["Chinese", "Primary 5", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Primary 5 Science Tuition",
      tags: ["Science", "Primary 5", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Primary 5 Math Tuition",
      tags: ["Math", "Primary 5", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Primary 6 English Tuition",
      tags: ["English", "Primary 6", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Primary 6 Chinese Tuition",
      tags: ["Chinese", "Primary 6", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Primary 6 Science Tuition",
      tags: ["Science", "Primary 6", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Primary 6 Math Tuition",
      tags: ["Math", "Primary 6", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    //SEC1
    {
      name: "Secondary 1 English G1 Tuition",
      tags: ["English", "G1", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 1 English G2 Tuition",
      tags: ["English", "G2", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 1 English G3 Tuition",
      tags: ["English", "G3", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 1 Chinese G1 Tuition",
      tags: ["Chinese", "G1", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 1 Chinese G2 Tuition",
      tags: ["Chinese", "G2", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 1 Chinese G3 Tuition",
      tags: ["Chinese", "G3", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 1 Science G1 Tuition",
      tags: ["Science", "G1", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 1 Science G2 Tuition",
      tags: ["Science", "G2", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 1 Science G3 Tuition",
      tags: ["Science", "G3", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 1 Math G1 Tuition",
      tags: ["Math", "G1", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 1 Math G2 Tuition",
      tags: ["Math", "G2", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 1 Math G3 Tuition",
      tags: ["Math", "G3", "Secondary 1", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    //SEC2
    {
      name: "Secondary 2 English G1 Tuition",
      tags: ["English", "G1", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 2 English G2 Tuition",
      tags: ["English", "G2", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 2 English G3 Tuition",
      tags: ["English", "G3", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 2 Chinese G1 Tuition",
      tags: ["Chinese", "G1", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 2 Chinese G2 Tuition",
      tags: ["Chinese", "G2", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 2 Chinese G3 Tuition",
      tags: ["Chinese", "G3", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 2 Science G1 Tuition",
      tags: ["Science", "G1", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 2 Science G2 Tuition",
      tags: ["Science", "G2", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 2 Science G3 Tuition",
      tags: ["Science", "G3", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 2 Math G1 Tuition",
      tags: ["Math", "G1", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 2 Math G2 Tuition",
      tags: ["Math", "G2", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    {
      name: "Secondary 2 Math G3 Tuition",
      tags: ["Math", "G3", "Secondary 2", "Small Group", "Onsite"],
      pricing: {
        price: "40",
      },
    },
    //SEC3
    {
      name: "Secondary 3 English NT Tuition",
      tags: ["English", "NT", "Secondary 3", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 English NA Tuition",
      tags: ["Secondary 3", "English", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 English Express Tuition",
      tags: ["Secondary 3", "English", "Express", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },

    {
      name: "Secondary 3 Chinese NT Tuition",
      tags: ["Chinese", "NT", "Secondary 3", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Chinese NA Tuition",
      tags: ["Secondary 3", "Chinese", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Chinese Express Tuition",
      tags: ["Secondary 3", "Chinese", "Express", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Pure Physics Express Tuition",
      tags: ["Secondary 3", "Pure Physics", "Express", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Pure Chemistry Express Tuition",
      tags: [
        "Secondary 3",
        "Pure Chemistry",
        "Express",
        "Small Group",
        "Onsite",
      ],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Pure Biology Express Tuition",
      tags: ["Secondary 3", "Pure Biology", "Express", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Combined Sciences NT Tuition",
      tags: ["Secondary 3", "Combined Sciences", "NT", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Combined Sciences NA Tuition",
      tags: ["Secondary 3", "Combined Sciences", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Combined Sciences Express Tuition",
      tags: [
        "Secondary 3",
        "Combined Sciences",
        "Express",
        "Small Group",
        "Onsite",
      ],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Elementary Math NA Tuition",
      tags: ["Secondary 3", "Elementary Math", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Elementary Math Express Tuition",
      tags: [
        "Secondary 3",
        "Elementary Math",
        "Express",
        "Small Group",
        "Onsite",
      ],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Advanced Math NA Tuition",
      tags: ["Secondary 3", "Advanced Math", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 3 Advanced Math Express Tuition",
      tags: [
        "Secondary 3",
        "Advanced Math",
        "Express",
        "Small Group",
        "Onsite",
      ],
      pricing: {
        price: "45",
      },
    },
    //SEC4
    {
      name: "Secondary 4 English NT Tuition",
      tags: ["Secondary 4", "English", "NT", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 English NA Tuition",
      tags: ["Secondary 4", "English", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 English Express Tuition",
      tags: ["Secondary 4", "English", "Express", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Chinese NT Tuition",
      tags: ["Secondary 4", "Chinese", "NT", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Chinese NA Tuition",
      tags: ["Secondary 4", "Chinese", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Chinese Express Tuition",
      tags: ["Secondary 4", "Chinese", "Express", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Pure Physics Express Tuition",
      tags: ["Secondary 4", "Pure Physics", "Express", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Pure Chemistry Express Tuition",
      tags: [
        "Secondary 4",
        "Pure Chemistry",
        "Express",
        "Small Group",
        "Onsite",
      ],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Pure Biology Express Tuition",
      tags: ["Secondary 4", "Pure Biology", "Express", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Combined Sciences NT Tuition",
      tags: ["Secondary 4", "Combined Sciences", "NT", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Combined Sciences NA Tuition",
      tags: ["Secondary 4", "Combined Sciences", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Combined Sciences Express Tuition",
      tags: [
        "Secondary 4",
        "Combined Sciences",
        "Express",
        "Small Group",
        "Onsite",
      ],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Elementary Math NA Tuition",
      tags: ["Secondary 4", "Elementary Math", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Elementary Math Express Tuition",
      tags: [
        "Secondary 4",
        "Elementary Math",
        "Express",
        "Small Group",
        "Onsite",
      ],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Advanced Math NA Tuition",
      tags: ["Secondary 4", "Advanced Math", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 4 Advanced Math Express Tuition",
      tags: [
        "Secondary 4",
        "Advanced Math",
        "Express",
        "Small Group",
        "Onsite",
      ],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 5 English NA Tuition",
      tags: ["Secondary 5", "English", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 5 Chinese NA Tuition",
      tags: ["Secondary 5", "Chinese", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 5 Pure Physics NA Tuition",
      tags: ["Secondary 5", "Pure Physics", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 5 Pure Chemistry NA Tuition",
      tags: ["Secondary 5", "Pure Chemistry", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 5 Pure Biology NA Tuition",
      tags: ["Secondary 5", "Pure Biology", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 5 Combined Sciences NA Tuition",
      tags: ["Secondary 5", "Combined Sciences", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 5 Elementary Math NA Tuition",
      tags: ["Secondary 5", "Elementary Math", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 5 Advanced Math NA Tuition",
      tags: ["Secondary 5", "Advanced Math", "NA", "Small Group", "Onsite"],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Junior College 1 H1 Math Tuition",
      tags: ["Junior College 1", "Math", "H1", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 1 H2 Math Tuition",
      tags: ["Junior College 1", "Math", "H2", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 1 H1 Physics Tuition",
      tags: ["Junior College 1", "Physics", "H1", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 1 H2 Physics Tuition",
      tags: ["Junior College 1", "Physics", "H2", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 1 H1 Chemistry Tuition",
      tags: ["Junior College 1", "Chemistry", "H1", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 1 H2 Chemistry Tuition",
      tags: ["Junior College 1", "Chemistry", "H2", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 1 H1 Biology Tuition",
      tags: ["Junior College 1", "Biology", "H1", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 1 H2 Biology Tuition",
      tags: ["Junior College 1", "Biology", "H2", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 1 General Paper Tuition",
      tags: [
        "Junior College 1",
        "General Paper",
        "H1",
        "Small Group",
        "Onsite",
      ],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 2 H1 Math Tuition",
      tags: ["Junior College 2", "Math", "H1", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 2 H2 Math  Tuition",
      tags: ["Junior College 2", "Math", "H2", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 2 H1 Physics Tuition",
      tags: ["Junior College 2", "Physics", "H1", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College H2 Physics Tuition",
      tags: ["Junior College 2", "Physics", "H2", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 2 H1 Chemistry Tuition",
      tags: ["Junior College 2", "Chemistry", "H1", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 2 H2 Chemistry Tuition",
      tags: ["Junior College 2", "Chemistry", "H2", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 2 H1 Biology Tuition",
      tags: ["Junior College 2", "Biology", "H1", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 2 H2 Biology Tuition",
      tags: ["Junior College 2", "Biology", "H2", "Small Group", "Onsite"],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Junior College 2 General Paper Tuition",
      tags: [
        "Junior College 2",
        "General Paper",
        "H1",
        "Small Group",
        "Onsite",
      ],
      pricing: {
        price: "60",
      },
    },
    {
      name: "Primary Math 1 to 1 Tuition",
      tags: [
        "Math",
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Primary 4",
        "Primary 5",
        "Primary 6",
        "1 to 1",
        "Onsite",
      ],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Primary English 1 to 1 Tuition",
      tags: [
        "English",
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Primary 4",
        "Primary 5",
        "Primary 6",
        "1 to 1",
        "Onsite",
      ],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Primary Science 1 to 1 Tuition",
      tags: [
        "Science",
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Primary 4",
        "Primary 5",
        "Primary 6",
        "1 to 1",
        "Onsite",
      ],
      pricing: {
        price: "45",
      },
    },
    {
      name: "Secondary 1 Math G1 1 to 1 Tuition",
      tags: ["Math", "Secondary 1", "G1", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 1 Math G2 1 to 1 Tuition",
      tags: ["Math", "Secondary 1", "G2", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 1 Math G3 1 to 1 Tuition",
      tags: ["Math", "Secondary 1", "G3", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 1 Science G1 1 to 1 Tuition",
      tags: ["Science", "Secondary 1", "G1", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 1 Science G2 1 to 1 Tuition",
      tags: ["Science", "Secondary 1", "G2", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 1 Science G3 1 to 1 Tuition",
      tags: ["Science", "Secondary 1", "G3", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 1 English G1 1 to 1 Tuition",
      tags: ["English", "Secondary 1", "G1", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 1 English G2 1 to 1 Tuition",
      tags: ["English", "Secondary 1", "G2", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 1 English G3 1 to 1 Tuition",
      tags: ["English", "Secondary 1", "G3", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 1 Chinese G1 1 to 1 Tuition",
      tags: ["Chinese", "Secondary 1", "G1", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 1 Chinese G2 1 to 1 Tuition",
      tags: ["Chinese", "Secondary 1", "G2", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 1 Chinese G3 1 to 1 Tuition",
      tags: ["Chinese", "Secondary 1", "G3", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 Math G1 1 to 1 Tuition",
      tags: ["Math", "Secondary 2", "G1", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 Math G2 1 to 1 Tuition",
      tags: ["Math", "Secondary 2", "G2", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 Math G3 1 to 1 Tuition",
      tags: ["Math", "Secondary 2", "G3", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 Science G1 1 to 1 Tuition",
      tags: ["Science", "Secondary 2", "G1", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 Science G2 1 to 1 Tuition",
      tags: ["Science", "Secondary 2", "G2", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 Science G3 1 to 1 Tuition",
      tags: ["Science", "Secondary 2", "G3", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 English G1 1 to 1 Tuition",
      tags: ["English", "Secondary 2", "G1", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 English G2 1 to 1 Tuition",
      tags: ["English", "Secondary 2", "G2", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 English G3 1 to 1 Tuition",
      tags: ["English", "Secondary 2", "G3", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 Chinese G1 1 to 1 Tuition",
      tags: ["Chinese", "Secondary 2", "G1", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 Chinese G2 1 to 1 Tuition",
      tags: ["Chinese", "Secondary 2", "G2", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 2 Chinese G3 1 to 1 Tuition",
      tags: ["Chinese", "Secondary 2", "G3", "1 to 1", "Onsite"],
      pricing: {
        price: "50",
      },
    },
    {
      name: "Secondary 3 English NT 1 to 1 Tuition",
      tags: ["English", "NT", "Secondary 3", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 English NA 1 to 1 Tuition",
      tags: ["Secondary 3", "English", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 English Express 1 to 1 Tuition",
      tags: ["Secondary 3", "English", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },

    {
      name: "Secondary 3 Chinese NT 1 to 1 Tuition",
      tags: ["Chinese", "NT", "Secondary 3", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Chinese NA 1 to 1 Tuition",
      tags: ["Secondary 3", "Chinese", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Chinese Express 1 to 1 Tuition",
      tags: ["Secondary 3", "Chinese", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Pure Physics Express 1 to 1 Tuition",
      tags: ["Secondary 3", "Pure Physics", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Pure Chemistry Express 1 to 1 Tuition",
      tags: ["Secondary 3", "Pure Chemistry", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Pure Biology Express 1 to 1 Tuition",
      tags: ["Secondary 3", "Pure Biology", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Combined Sciences NT 1 to 1 Tuition",
      tags: ["Secondary 3", "Combined Sciences", "NT", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Combined Sciences NA 1 to 1 Tuition",
      tags: ["Secondary 3", "Combined Sciences", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Combined Sciences Express 1 to 1 Tuition",
      tags: ["Secondary 3", "Combined Sciences", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Elementary Math NA 1 to 1 Tuition",
      tags: ["Secondary 3", "Elementary Math", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Elementary Math Express 1 to 1 Tuition",
      tags: ["Secondary 3", "Elementary Math", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Advanced Math NA 1 to 1 Tuition",
      tags: ["Secondary 3", "Advanced Math", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 3 Advanced Math Express 1 to 1 Tuition",
      tags: ["Secondary 3", "Advanced Math", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 English NT 1 to 1 Tuition",
      tags: ["Secondary 4", "English", "NT", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 English NA 1 to 1 Tuition",
      tags: ["Secondary 4", "English", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 English Express 1 to 1 Tuition",
      tags: ["Secondary 4", "English", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Chinese NT 1 to 1 Tuition",
      tags: ["Secondary 4", "Chinese", "NT", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Chinese NA 1 to 1 Tuition",
      tags: ["Secondary 4", "Chinese", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Chinese Express 1 to 1 Tuition",
      tags: ["Secondary 4", "Chinese", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Pure Physics Express 1 to 1 Tuition",
      tags: ["Secondary 4", "Pure Physics", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Pure Chemistry Express 1 to 1 Tuition",
      tags: ["Secondary 4", "Pure Chemistry", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Pure Biology Express 1 to 1 Tuition",
      tags: ["Secondary 4", "Pure Biology", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Combined Sciences NT 1 to 1 Tuition",
      tags: ["Secondary 4", "Combined Sciences", "NT", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Combined Sciences NA 1 to 1 Tuition",
      tags: ["Secondary 4", "Combined Sciences", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Combined Sciences Express 1 to 1 Tuition",
      tags: ["Secondary 4", "Combined Sciences", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Elementary Math NA 1 to 1 Tuition",
      tags: ["Secondary 4", "Elementary Math", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Elementary Math Express 1 to 1 Tuition",
      tags: ["Secondary 4", "Elementary Math", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Advanced Math NA 1 to 1 Tuition",
      tags: ["Secondary 4", "Advanced Math", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Advanced Math Express 1 to 1 Tuition",
      tags: ["Secondary 4", "Advanced Math", "Express", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 5 English NA 1 to 1 Tuition",
      tags: ["Secondary 5", "English", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 5 Chinese NA 1 to 1 Tuition",
      tags: ["Secondary 5", "Chinese", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 5 Pure Physics NA 1 to 1 Tuition",
      tags: ["Secondary 5", "Pure Physics", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 5 Pure Chemistry NA 1 to 1 Tuition",
      tags: ["Secondary 5", "Pure Chemistry", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 5 Pure Biology NA 1 to 1 Tuition",
      tags: ["Secondary 5", "Pure Biology", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 5 Combined Sciences NA 1 to 1 Tuition",
      tags: ["Secondary 5", "Combined Sciences", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 4 Elementary Math NA 1 to 1 Tuition",
      tags: ["Secondary 4", "Elementary Math", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Secondary 5 Advanced Math NA 1 to 1 Tuition",
      tags: ["Secondary 5", "Advanced Math", "NA", "1 to 1", "Onsite"],
      pricing: {
        price: "55",
      },
    },
    {
      name: "Junior College 1 H1 Math 1 to 1 Tuition",
      tags: ["Junior College 1", "Math", "H1", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 1 H2 Math 1 to 1 Tuition",
      tags: ["Junior College 1", "Math", "H2", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 1 H1 Physics 1 to 1 Tuition",
      tags: ["Junior College 1", "Physics", "H1", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 1 H2 Physics 1 to 1 Tuition",
      tags: ["Junior College 1", "Physics", "H2", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 1 H1 Chemistry 1 to 1 Tuition",
      tags: ["Junior College 1", "Chemistry", "H1", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 1 H2 Chemistry 1 to 1 Tuition",
      tags: ["Junior College 1", "Chemistry", "H2", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 1 H1 Biology 1 to 1 Tuition",
      tags: ["Junior College 1", "Biology", "H1", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 1 H2 Biology 1 to 1 Tuition",
      tags: ["Junior College 1", "Biology", "H2", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 1 General Paper 1 to 1 Tuition",
      tags: ["Junior College 1", "General Paper", "H1", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 2 H1 Math 1 to 1 Tuition",
      tags: ["Junior College 2", "Math", "H1", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 2 H2 Math 1 to 1 Tuition",
      tags: ["Junior College 2", "Math", "H2", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 2 H1 Physics 1 to 1 Tuition",
      tags: ["Junior College 2", "Physics", "H1", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 2 H2 Physics 1 to 1 Tuition",
      tags: ["Junior College 2", "Physics", "H2", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 2 H1 Chemistry 1 to 1 Tuition",
      tags: ["Junior College 2", "Chemistry", "H1", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 2 H2 Chemistry 1 to 1 Tuition",
      tags: ["Junior College 2", "Chemistry", "H2", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 2 H1 Biology 1 to 1 Tuition",
      tags: ["Junior College 2", "Biology", "H1", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 2 H2 Biology 1 to 1 Tuition",
      tags: ["Junior College 2", "Biology", "H2", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
    {
      name: "Junior College 2 General Paper 1 to 1 Tuition",
      tags: ["Junior College 2", "General Paper", "H1", "1 to 1", "Onsite"],
      pricing: {
        price: "100",
      },
    },
  ];

  const allServiceTags = new Set();
  servicesData.forEach((service) => {
    service.tags.forEach((tag) => allServiceTags.add(tag));
  });

  await db.tag.createMany({
    data: Array.from(allServiceTags).map((name) => ({ name: name as string })),
    skipDuplicates: true,
  });

  // 2. Create or ensure "SG" country record
  await db.country.upsert({
    where: { iso_code: "SG" },
    update: {},
    create: {
      iso_code: "SG",
      name: "Singapore",
      postal_code_regex: "^\\d{6}$",
      postal_code_label: "Postal Code",
      is_postal_code_required: true,
    },
  });

  // 3. Insert top-level administrative divisions if not present
  await db.administrative_division.createMany({
    data: [
      {
        country_iso: "SG",
        parent_id: null,
        type: "Region",
        name: "Central Singapore",
        iso_code: "SG-01",
      },
      {
        country_iso: "SG",
        parent_id: null,
        type: "Region",
        name: "North East",
        iso_code: "SG-02",
      },
      {
        country_iso: "SG",
        parent_id: null,
        type: "Region",
        name: "North West",
        iso_code: "SG-03",
      },
      {
        country_iso: "SG",
        parent_id: null,
        type: "Region",
        name: "South East",
        iso_code: "SG-04",
      },
      {
        country_iso: "SG",
        parent_id: null,
        type: "Region",
        name: "South West",
        iso_code: "SG-05",
      },
    ],
    skipDuplicates: true,
  });

  // 4. Create a sub-division "Bishan" under "Central Singapore" if not exists
  const subDivision = await db.administrative_division.findFirst({
    where: { iso_code: iso_code },
  });

  if (subDivision) {
    await db.administrative_division.upsert({
      where: {
        admin_division_unique: {
          country_iso: "SG",
          parent_id: subDivision?.id || null,
          name: planningAreaName,
        },
      },
      update: {},
      create: {
        country_iso: "SG",
        parent_id: subDivision.id,
        type: "Planning Area",
        name: planningAreaName,
        local_name: planningAreaName,
      },
    });
  }

  // 5. Insert an address for Bishan (if not present)
  const planningAreaDiv = await db.administrative_division.findFirst({
    where: { name: planningAreaName },
  });

  if (!planningAreaDiv) {
    throw new Error("Planning area division not found");
  }

  let addressId: bigint | null = null;

  // ✅ Find if an address already exists (based on building, street, and unit)
  const existingAddress = await db.address.findFirst({
    where: {
      building_number: "Block 152",
      street_name: "Bishan St. 11",
      unit_number: "#02-215",
      postal_code: "570152",
    },
  });

  if (existingAddress) {
    // Use the existing address ID if found
    addressId = existingAddress.id;
  } else {
    // Create a new address using raw SQL
    const result = await db.$queryRaw<AddressId[]>`
  INSERT INTO "address" (
    "country_iso",
    "administrative_division_id",
    "building_number",
    "street_name",
    "unit_number",
    "postal_code",
    "full_address",
    "geolocation",
    "created_at",
    "updated_at"
  ) VALUES (
    'SG',
    ${planningAreaDiv.id},
    ${buildingNumber},
    ${streetName},
    ${unitNumber},
    ${postalCode},
    ${fullAddress},
    ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
    NOW(),
    NOW()
  ) RETURNING "id";
`;

    const [newAddress] = result;
    addressId = newAddress.id;
  }

  if (!addressId) {
    throw new Error("❌ Address ID is required for service creation");
  }

  // ✅ Create a unique business with its own `address_id`
  let business = await db.business.upsert({
    where: { name: businessName },
    update: {},
    create: {
      name: businessName,
      address_id: addressId, // ✅ Connects to the existing or newly created address
      description: businessDescription,
      contact_email: businessContactEmail,
      google_place_id: businessGooglePlaceId,
      facebook_page_id: businessFacebookPageId,
      facebook_page_link: businessFacebookPageLink,
      instagram_page_link: businessInstagramPageLink,
      whatsapp_link: businessWhatsappLink,
      average_rating: businessAverageRating,
      ai_review: "Our AI analysis suggests excellent overall feedback...",
    },
  });

  // ✅ Generate a slug after business creation
  const businessSlug = slugifyWithId(businessName, business.id);
  business = await db.business.update({
    where: { id: business.id },
    data: { slug: businessSlug },
  });

  const createdServices = [];
  for (const serviceData of servicesData) {
    const newService = await db.service.create({
      data: {
        business: { connect: { id: business.id } },
        address: { connect: { id: addressId } },
        name: serviceData.name,
        description: serviceData.name,
        category: {
          connectOrCreate: {
            where: { name: "Tuition" },
            create: { name: "Tuition" },
          },
        },
        service_tag: {
          create: serviceData.tags.map((tag) => ({
            tag: { connect: { name: tag } },
          })),
        },
        service_image: {
          create: {
            url_path:
              "https://www.mrcat.com.br/arquivos/new-logo.png?v=637306130597200000",
            display_order: 0,
            is_main: true,
          },
        },
        pricing: {
          create: {
            price: serviceData.pricing.price,
            currency: serviceData.pricing.currency || "SGD", // Default to "SGD"
            pricing_unit: serviceData.pricing.pricing_unit || "hour", // Default to "hour"
            variant_name: serviceData.pricing.variant_name || "Standard Rate", // Default to "Standard Rate"
          },
        },
      },
    });
    createdServices.push(newService);
  }

  console.log(
    "Created services:",
    createdServices.map((s) => ({ id: s.id, name: s.name })),
  );

  await db.business_hours.createMany({
    data: businessHoursData.map((bh) => ({
      business_id: business.id,
      day_name: bh.day_name,
      open_time: bh.open_time ? new Date(`1970-01-01T${bh.open_time}Z`) : null,
      close_time: bh.close_time
        ? new Date(`1970-01-01T${bh.close_time}Z`)
        : null,
    })),
    skipDuplicates: true,
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await db.$disconnect());
