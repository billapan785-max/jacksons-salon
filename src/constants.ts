export interface Service {
  id: string;
  name: string;
  price: number | string;
  description?: string;
}

export interface GroomPackage {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  mapEmbed: string;
  services: {
    category: string;
    items: Service[];
  }[];
  groomPackages: GroomPackage[];
}

export const LOCATIONS: Location[] = [
  {
    id: 'premium-dha',
    name: "Jackson’s Salon f11",
    address: "Plot 13 1st floor, select Centre, Markaz, F-11 Markaz F 11 Markaz F-11, Islamabad, 45200, Pakistan",
    phone: "+92 341 5229528",
    whatsapp: "923415229528",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.5!2d73.1!3d33.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzAwLjAiTiA3M8KwMDYnMDAuMCJF!5e0!3m2!1sen!2s!4v1700000000000",
    services: [
      {
        category: "Special Deals & Student Packages",
        items: [
          { id: 'p-deal-1', name: "Deal 1 - Basic Grooming", price: 3500, description: "Haircut, Styling, Protein, Beard, Cleansing" },
          { id: 'p-deal-2', name: "Deal 2 - Refresh Package", price: 4000, description: "Haircut, Protein, Beard, Head Massage, Facial" },
          { id: 'p-deal-3', name: "Deal 3 - Premium Care", price: 5000, description: "Haircut, Styling, Head Massage, Protein, Beard, Manicure, Facial" },
          { id: 'p-deal-4', name: "Deal 4 - Ultimate Transformation", price: 5500, description: "Haircut, Styling, Full Massage, Protein, Beard, Manicure, Facial" },
          { id: 'p-combo-1', name: "Combo Deal 1", price: 2000, description: "Wash, Haircut, Styling, Beard, Cleansing" },
          { id: 'p-combo-2', name: "Combo Deal 2", price: 3000, description: "Wash, Haircut, Styling, Beard, Facial" },
        ]
      },
      {
        category: "Haircut (Wash, Cut, Styling)",
        items: [
          { id: 'p-hc-silas', name: "Stylist Silas", price: 600 },
          { id: 'p-hc-johnson', name: "Stylist Johnson", price: 800 },
          { id: 'p-hc-michael', name: "Stylist Michael", price: 800 },
          { id: 'p-hc-gulzaib', name: "Stylist Gulzaib", price: 1000 },
          { id: 'p-hc-jackson', name: "Stylist Jackson", price: 2000 },
        ]
      },
      {
        category: "Kids Haircut",
        items: [
          { id: 'p-kc-other', name: "Other Stylist", price: 500 },
          { id: 'p-kc-jackson', name: "Jackson Stylist", price: 2000 },
        ]
      },
      {
        category: "Beard",
        items: [
          { id: 'p-b-all', name: "All Variety", price: 500 },
        ]
      },
      {
        category: "Hair Colour & Styling",
        items: [
          { id: 'p-hcs-colour', name: "Hair Colour", price: "1500 / 3000" },
        ]
      },
      {
        category: "Hair Styles",
        items: [
          { id: 'p-hs-fiber', name: "Use Fiber (Include)", price: 200 },
          { id: 'p-hs-other', name: "Other Styles", price: 500 },
          { id: 'p-hs-jackson', name: "Stylist Jackson", price: 800 },
        ]
      },
      {
        category: "Facial Services",
        items: [
          { id: 'p-f-nose', name: "Nose Strip", price: 100 },
          { id: 'p-f-cleansing', name: "Cleansing", price: 500 },
          { id: 'p-f-polish', name: "Skin Polish", price: 500 },
          { id: 'p-f-makeup', name: "Makeup", price: 500 },
          { id: 'p-f-cleansing-steam', name: "With Steam (Cleansing)", price: 800 },
          { id: 'p-f-steam', name: "Facial with Steam", price: 1500 },
          { id: 'p-f-whitening', name: "Whitening Facial", price: 2000 },
          { id: 'p-f-herbal', name: "Herbal Facial", price: 2000 },
          { id: 'p-f-herbal-steam', name: "With Steam (Herbal)", price: 2500 },
        ]
      },
      {
        category: "Hair Treatment (Depends on Hair Length)",
        items: [
          { id: 'p-ht-protein', name: "Hair Protein", price: "500 / 1000" },
          { id: 'p-ht-loreal', name: "L'Oreal Extension Treatment", price: "5000 / 15000" },
          { id: 'p-ht-perms', name: "Hair Perms", price: "5000 / 15000" },
        ]
      },
      {
        category: "Massage (15 Mins)",
        items: [
          { id: 'p-m-head', name: "Head Massage", price: 300 },
          { id: 'p-m-shoulder', name: "Shoulder Massage", price: 300 },
          { id: 'p-m-full', name: "Head, Neck, Shoulder Massage", price: 500 },
        ]
      },
      {
        category: "Waxing & Threading",
        items: [
          { id: 'p-w-nose', name: "Nose Wax", price: 200 },
          { id: 'p-w-ears', name: "Ears Wax", price: 200 },
          { id: 'p-t-threading', name: "Threading", price: 200 },
          { id: 'p-t-eyebrows', name: "Eyebrows", price: 200 },
          { id: 'p-w-cheek', name: "Cheek Wax", price: 350 },
        ]
      },
      {
        category: "Manicure & Pedicure",
        items: [
          { id: 'p-mani-basic', name: "Basic Manicure", price: 1000 },
          { id: 'p-mani-white', name: "Whitening Mani", price: 1500 },
          { id: 'p-pedi-basic', name: "Basic Pedicure", price: 1500 },
          { id: 'p-pedi-white', name: "Whitening Pedicure", price: 2000 },
        ]
      }
    ],
    groomPackages: [
      { id: 'p-groom-1', name: "Day 1 - Complete Grooming", price: 6000, description: "Haircut, Hairstyling, Beard, Hair Protein, Facial, Manicure, Makeup" },
      { id: 'p-groom-2', name: "Day 2 - Fresh Look", price: 3000, description: "Hair Styling, Beard Setting, Face Cleansing, Makeup" },
      { id: 'p-groom-3', name: "Day 3 - Final Touch", price: 2500, description: "Face Cleansing, Hair Styling, Beard Setting, Makeup" },
    ]
  },
  {
    id: 'i8-markaz',
    name: "Jackson’s Salon i8",
    address: "Glarria Mall, Markaz, I-8 Markaz I 8 Markaz I-8, Islamabad, Pakistan",
    phone: "+92 333 5229528",
    whatsapp: "923335229528",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.824741366113!2d73.0768!3d33.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf9780000001%3A0x8000000000000000!2sGalleria%20I-8%20Markaz!5e0!3m2!1sen!2s!4v1700000000000",
    services: [
      {
        category: "Special Deals & Student Packages",
        items: [
          { id: 'i8-deal-1', name: "Deal 1 - Basic Grooming", price: 3500, description: "Haircut, Styling, Protein, Beard, Cleansing" },
          { id: 'i8-deal-2', name: "Deal 2 - Refresh Package", price: 4000, description: "Haircut, Protein, Beard, Head Massage, Facial" },
          { id: 'i8-deal-3', name: "Deal 3 - Premium Care", price: 5000, description: "Haircut, Styling, Head Massage, Protein, Beard, Manicure, Facial" },
          { id: 'i8-deal-4', name: "Deal 4 - Ultimate Transformation", price: 5500, description: "Haircut, Styling, Full Massage, Protein, Beard, Manicure, Facial" },
          { id: 'i8-combo-1', name: "Combo Deal 1", price: 2000, description: "Wash, Haircut, Styling, Beard, Cleansing" },
          { id: 'i8-combo-2', name: "Combo Deal 2", price: 3000, description: "Wash, Haircut, Styling, Beard, Facial" },
        ]
      },
      {
        category: "Haircut (Wash, Cut, Styling)",
        items: [
          { id: 'i8-hc-danish', name: "Stylist Danish", price: 800 },
          { id: 'i8-hc-sunny', name: "Stylist Sunny", price: 1500 },
        ]
      },
      {
        category: "Kids Haircut (Wash, Cut, Styling)",
        items: [
          { id: 'i8-kc-danish', name: "Stylist Danish", price: 500 },
          { id: 'i8-kc-sunny', name: "Stylist Sunny", price: 800 },
        ]
      },
      {
        category: "Beard (All Variety)",
        items: [
          { id: 'i8-b-all', name: "Beard (All Variety)", price: 500 },
        ]
      },
      {
        category: "Hair Styling",
        items: [
          { id: 'i8-hs-fiber', name: "Use Fiber (Include)", price: 200 },
          { id: 'i8-hs-styling', name: "Hair Styling", price: 500 },
        ]
      },
      {
        category: "Facials",
        items: [
          { id: 'i8-f-nose', name: "Nose Strip", price: 100 },
          { id: 'i8-f-cleansing', name: "Cleansing", price: 500 },
          { id: 'p-f-polish', name: "Skin Polish", price: 500 },
          { id: 'i8-f-cleansing-steam', name: "Cleansing With Steam", price: 800 },
          { id: 'i8-f-steam', name: "Facial with Steam", price: 1500 },
          { id: 'i8-f-whitening', name: "Whitening Facial", price: 2000 },
          { id: 'i8-f-herbal', name: "Herbal Facial", price: 2000 },
          { id: 'i8-f-herbal-steam', name: "Herbal Facial With Steam", price: 2500 },
        ]
      },
      {
        category: "Waxing & Threading",
        items: [
          { id: 'i8-w-nose', name: "Nose Wax", price: 200 },
          { id: 'i8-w-ears', name: "Ears Wax", price: 200 },
          { id: 'i8-t-threading', name: "Threading", price: 200 },
          { id: 'i8-t-eyebrows', name: "Eyebrows", price: 200 },
          { id: 'i8-w-cheek', name: "Cheek Wax", price: 350 },
        ]
      },
      {
        category: "Hair Treatment (Depends on Hair Length)",
        items: [
          { id: 'i8-ht-protein', name: "Hair Protein", price: "500 - 1000" },
          { id: 'i8-ht-dye', name: "Hair Dye", price: "1500 - 3000" },
          { id: 'i8-ht-loreal', name: "L'Oreal Extenso Treatment", price: "5000 - 15000" },
          { id: 'i8-ht-perms', name: "Hair Perms", price: "5000 - 15000" },
        ]
      },
      {
        category: "Massage (15 Mins)",
        items: [
          { id: 'i8-m-head', name: "Head Massage", price: 300 },
          { id: 'i8-m-shoulder', name: "Shoulder Massage", price: 300 },
          { id: 'i8-m-full', name: "Head, Neck, Shoulder Massage", price: 500 },
        ]
      },
      {
        category: "Other Services",
        items: [
          { id: 'i8-o-makeup', name: "Makeup", price: 500 },
          { id: 'i8-o-mani-basic', name: "Basic Manicure", price: 1000 },
          { id: 'i8-o-mani-white', name: "Whitening Mani", price: 1500 },
        ]
      }
    ],
    groomPackages: [
      { id: 'i8-groom-1', name: "Day 1 - Complete Grooming", price: 6000, description: "Haircut, Hairstyling, Beard, Hair Protein, Facial, Manicure, Makeup" },
      { id: 'i8-groom-2', name: "Day 2 - Fresh Look", price: 3000, description: "Hair Styling, Beard Setting, Face Cleansing, Makeup" },
      { id: 'i8-groom-3', name: "Day 3 - Final Touch", price: 2500, description: "Face Cleansing, Hair Styling, Beard Setting, Makeup" },
    ]
  }
];

export const REVIEWS = [
  { name: "Ahmed Khan", rating: 5, text: "Best salon in Islamabad. Sunny is a magician with the scissors!", date: "2 days ago" },
  { name: "Zainab Malik", rating: 5, text: "Very professional staff and premium atmosphere. Highly recommended for hair treatments.", date: "1 week ago" },
  { name: "Hamza Ali", rating: 4, text: "Great experience at the I-8 branch. The attention to detail is impressive.", date: "2 weeks ago" },
];
