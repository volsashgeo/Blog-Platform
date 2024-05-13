// import avatar from "./avatar.png";

function makeShortDescription(text, stringLength = 40) {
  const arr = text.split(" ");

  if (text.length <= stringLength - 4) {
    return text;
  }

  let str = "";

  for (let i = 0; i < arr.length - 1; i++) {
    str += `${arr[i]} `;
    if (str.length + arr[i + 1].length > stringLength - 4) break;
  }
  return `${str} ...`;
}

async function checkImage(imageUrl) {
  let data = null;
  const fetchImg = await fetch(imageUrl);

  if (fetchImg.ok) {
    data = imageUrl;
  }
  return data;
}

export { makeShortDescription, checkImage };
