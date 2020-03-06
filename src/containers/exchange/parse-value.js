export default value => {
    value = value.replace(/[^\d.]/g, '');
    const arr = value.split('.');
    if (arr[1]) {
        arr[1] = arr[1].substr(0, 2);
    }
    return arr.join('.');
}