const keyName = "splitwisefriends";
const billKeyName = "splitwisebills";

const saveInLocalStorage = (list, keyName) => {
  localStorage.setItem(keyName, JSON.stringify(list));
};

const getFromLocalStorage = keyName => {
  const value = localStorage.getItem(keyName);
  try {
    const parsedValue = JSON.parse(value);
    if (!parsedValue) {
      return [];
    }
    return parsedValue;
  } catch (e) {
    console.log("json is non parsable");
    return [];
  }
};

export { keyName, saveInLocalStorage, getFromLocalStorage, billKeyName };
