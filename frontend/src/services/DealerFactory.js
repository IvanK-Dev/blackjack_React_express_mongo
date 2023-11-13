import PlayerFactory from './PlayerFactory';

class DealerFactory extends PlayerFactory {
  constructor() {
    super();
    this.visibleScore = false;
  }
  scoreVisibleToggle = () => (this.visibleScore = !this.visibleScore);
}

export default DealerFactory;
