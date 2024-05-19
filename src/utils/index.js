function makeShortDescription(text, stringLength = 40) {
  if (text) {
    const arr = text.split(' ');

    if (text?.length <= stringLength - 4) {
      return text;
    }

    let str = '';

    for (let i = 0; i < arr.length - 1; i++) {
      str += `${arr[i]} `;
      if (str.length + arr[i + 1].length > stringLength - 4) break;
    }
    return `${str} ...`;
  }
  return null
}

export default makeShortDescription;
