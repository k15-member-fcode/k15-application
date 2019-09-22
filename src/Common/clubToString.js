export const clubToString = clubList => {
  let result = "";
  let str = "";
  Object.keys(clubList).forEach(function(item, key) {
    key += 1;
    str += key + ". " + clubList[item] + "; ";
  });
  result = str.substring(0, str.length - 2);
  result += ".";
  return result;
};
