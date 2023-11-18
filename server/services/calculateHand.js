function calculateHand() {
  console.log('calculateHand this',this)
  let score = 0;
  let hasAce = false;
  for (let card of this.hand) {
    const value = card.split('_')[1];
    switch (value) {
      case 'A':
        hasAce = true;
        score += 11;
        break;
      case 'K':
      case 'Q':
      case 'J':
        score += 10;
        break;
      default:
        score += parseInt(value, 10);
        break;
    }
  }

  if (hasAce && score > 21) {
    score -= 10;
  }

  this.score = score;
}

module.exports = calculateHand;
