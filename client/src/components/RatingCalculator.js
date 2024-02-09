export default function GetSumOfRatings({ dish }) {
  const allRatingValue = dish.ratings.reduce((p, c) => {
    return p + c;
  }, 0);

  const finalValue = allRatingValue / dish.userVotes;
  return finalValue.toFixed(2);
}
