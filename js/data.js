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

export function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${month}/${day}/${year}`;
}

export function createInitialGrowthRecord(
  childDob,
  heightFt,
  heightIn,
  weight,
) {
  const initialRecord = {
    date: formatDate(childDob),
    heightFt: Number(heightFt),
    heightIn: Number(heightIn),
    weight: Number(weight),
  };

  return initialRecord;
}
