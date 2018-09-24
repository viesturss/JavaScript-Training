{
  // Most basic async example: setTimeout(callback, timeout);
  const callback = () => console.log("Executing after timeout");
  setTimeout(callback, 1000);
  console.log("Executing right after"); // Asynchronous code is non-blocking.
  // callback function is executed when async task finishes
}




{
  // Callbacks are primitive way of doing async work.
  // That is why there are Promise's
  const promise = fetch("https://catfact.ninja/fact");
  promise
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.warn(data);
    })
    .catch(error => {
      console.error(error);
    });
}




{
  // Doesn't look that good, right?
  // Latest spec allows us to do it simpler:
  const fetchFact = async () => {
    try {
      const res = await fetch("https://catfact.ninja/fact");
      const data = await res.json();
      console.warn(data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchFact();
  // It is called async/await.
}
