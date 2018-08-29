// Basic scope is no scope - global scope.
const imGlobal = "global";

// Isolated scope:
{
  console.log(imGlobal); // => "global"
  const imIsolated = "isolated";
  console.log(imIsolated); // => "isolated"
}
console.log(imIsolated); // => Uncaught ReferenceError: imIsolated is not defined

// Breaking scope (don't do this):
{
  var imGlobalAgain = "😔";
}
console.log(imGlobalAgain); // => 😔





try {
  throw new Error("😨");
  return "😊";
} catch (error) {
  console.error(error);
  return "😐";
} finally {
  return "😲";
}
