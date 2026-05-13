// Data storage
export let children = []; // Array to store child cards

// Create child object
export function createChild(name, birth, heightFt, heightIn, weight, gender) {
  return {
    id: Date.now(),
    name: name,
    birth: birth,
    heightFt: heightFt,
    heightIn: heightIn,
    weight: weight,
    gender: gender,
    growthRecords: [],
  };
}

export function createInitialGrowthRecord(heightFt, heightIn, weight) {
  const today = new Date().toISOString().split("T")[0];

  const initialRecord = {
    date: today,
    heightFt: Number(heightFt),
    heightIn: Number(heightIn),
    weight: Number(weight),
  };

  return initialRecord;
}
