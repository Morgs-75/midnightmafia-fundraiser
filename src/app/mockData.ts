import { NumberData, SupporterEntry } from "../types";

// Generate 200 numbers with various states
export const generateMockNumbers = (): NumberData[] => {
  const numbers: NumberData[] = [];

  const soldNumbers = [
    { number: 7, name: "Sarah M.", message: "Go Midnight Mafia! 💪" },
    { number: 13, name: "Coach Lisa", message: "Bring it home team!" },
    { number: 21, name: "Mom Squad", message: "So proud of you all!" },
    { number: 27, name: "Jessica T.", message: "Worlds bound! 🏆" },
    { number: 42, name: "Team Alumni", message: "Once a Mafia, always a Mafia!" },
    { number: 51, name: "Emma's Dad", message: "Let's go Emma!" },
    { number: 69, name: "Grandma Sue", message: "Love you girls!" },
    { number: 77, name: "Former Coach", message: "You got this!" },
    { number: 88, name: "Local Gym", message: "Community proud!" },
    { number: 99, name: "Anonymous", message: "Good luck at Worlds!" },
  ];

  const heldNumbers = [5, 12, 23, 34, 45, 56, 67, 78, 89, 90];

  for (let i = 1; i <= 200; i++) {
    const sold = soldNumbers.find(s => s.number === i);
    const isHeld = heldNumbers.includes(i);

    if (sold) {
      numbers.push({
        number: i,
        status: "sold",
        displayName: sold.name,
        message: sold.message,
      });
    } else if (isHeld) {
      numbers.push({
        number: i,
        status: "held",
      });
    } else {
      numbers.push({
        number: i,
        status: "available",
      });
    }
  }
  
  return numbers;
};

export const generateMockSupporters = (): SupporterEntry[] => {
  return [
    {
      number: 99,
      displayName: "Anonymous",
      message: "Good luck at Worlds!",
      timestamp: new Date(2026, 1, 14, 10, 30),
    },
    {
      number: 88,
      displayName: "Local Gym",
      message: "Community proud!",
      timestamp: new Date(2026, 1, 14, 9, 15),
    },
    {
      number: 77,
      displayName: "Former Coach",
      message: "You got this!",
      timestamp: new Date(2026, 1, 14, 8, 45),
    },
    {
      number: 69,
      displayName: "Grandma Sue",
      message: "Love you girls!",
      timestamp: new Date(2026, 1, 13, 18, 20),
    },
    {
      number: 51,
      displayName: "Emma's Dad",
      message: "Let's go Emma!",
      timestamp: new Date(2026, 1, 13, 16, 10),
    },
    {
      number: 42,
      displayName: "Team Alumni",
      message: "Once a Mafia, always a Mafia!",
      timestamp: new Date(2026, 1, 13, 14, 30),
    },
    {
      number: 27,
      displayName: "Jessica T.",
      message: "Worlds bound! 🏆",
      timestamp: new Date(2026, 1, 13, 12, 0),
    },
    {
      number: 21,
      displayName: "Mom Squad",
      message: "So proud of you all!",
      timestamp: new Date(2026, 1, 13, 10, 30),
    },
  ];
};