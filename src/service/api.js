const fetchRandomWord = async () => {
  const res = await fetch(
    "https://random-word-api.herokuapp.com/word?length=5"
  );
  const data = await res.json();
  //console.log("data: ", data[0]);
  return data[0];
};

export { fetchRandomWord };
