import { firstContentSelector } from './selectors';

export default class ContainerBuilder {
  constructor() {
    this._videoNode = {};
  }

  get videoNode() {
    return this._videoNode;
  }

  set videoNode(node) {
    this._videoNode = node;
  }


  static createSpinner() {
    const spinnerDiv = document.createElement('div');
    spinnerDiv.className = 'spinner';
    spinnerDiv.id = 'player-spinner';

    const numberOfBoxSpinners = 2;
    for (let i = 1; i <= numberOfBoxSpinners; i += 1) {
      const boxDiv = document.createElement('div');
      boxDiv.className = `cube${i}`;
      spinnerDiv.appendChild(boxDiv);
    }

    return spinnerDiv;
  }


  createVideoContainer() {
    const introDiv = document.querySelector(firstContentSelector);
    if (introDiv) {
      this.videoNode = introDiv.cloneNode(false);
      const headerNode = document.createElement('h2');
      headerNode.setAttribute('class', 'm-t-2');
      headerNode.innerText = 'Video';

      this.videoNode.insertAdjacentElement('afterbegin', headerNode);

      introDiv.insertAdjacentElement('afterbegin', this.videoNode);

      const spinnerDiv = ContainerBuilder.createSpinner();

      headerNode.appendChild(spinnerDiv);
    }
  }

  createVideoIframe(videoId) {
    const element = document.createElement('iframe');
    element.src = `https://www.youtube.com/embed/${videoId}`;
    element.height = 0;
    element.width = 0;
    element.frameborder = '0';
    element.id = 'player-1';
    element.onload = () => {
      document.getElementById('player-spinner').style.display = 'none';
      const iframeElement = document.getElementById('player-1');
      iframeElement.width = this.videoNode.offsetWidth;
      iframeElement.height = this.videoNode.offsetWidth * 0.56;
    };

    this.videoNode.appendChild(element);
  }

  deleteVideoContainer() {
    if (!this.videoNode) return;
    const videoNodeChildren = this.videoNode.children();
    videoNodeChildren.forEach((child) => {
      this.videoNode.removeChild(child);
    });
  }
}
