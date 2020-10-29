export const clubToString = clubList => {
    let result = "";
    let str = "";
    if (clubList !== undefined) {
        Object.keys(clubList).forEach((item, key) =>{
            key += 1;
            str += key + ". " + clubList[item] + "; ";
        });
        result = str.substring(0, str.length - 2);
        result += ".";
        return result;
    }
    else {
        return "(trống)";
    }
};
