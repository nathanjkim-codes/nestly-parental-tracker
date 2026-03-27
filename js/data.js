// Data storage
export let children = []; // Array to store child cards

// Create child object
export function createChild(name, birth, height, weight, gender) {
  return {
    id: Date.now(),
    name: name,
    birth: birth,
    height: height,
    weight: weight,
    gender: gender,
    growthRecords: [],
  };
}
