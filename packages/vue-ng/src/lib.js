const capitalizeFirstLetter = (string) => {
  return string.replace(/\w\S*/g, (tStr) => {
    return tStr.charAt(0).toUpperCase() + tStr.substr(1);
  })
}

export {
  capitalizeFirstLetter
}
