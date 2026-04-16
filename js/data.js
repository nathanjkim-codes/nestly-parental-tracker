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
