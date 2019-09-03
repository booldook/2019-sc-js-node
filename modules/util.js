const dtChg = d => {
    var dt = d.getFullYear() + "-";
    dt += zeroPlus((d.getMonth() + 1)) + "-";
    dt += zeroPlus(d.getDay()) + " ";
    dt += zeroPlus(d.getHours()) + ":";
    dt += zeroPlus(d.getMinutes()) + ":";
    dt += zeroPlus(d.getSeconds());
    return dt;
}

const zeroPlus = n => (n<10) ? "0"+n : n;

module.exports = {
    dtChg,
    zeroPlus
}