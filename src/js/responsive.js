import domSelectors from './dom';

const responsive = (() => {
  //const wrapper = document.querySelector('.page-wrapper');
  const el = domSelectors.notebook;
  const elHeight = el.offsetHeight;
  const elWidth = el.offsetWidth;

  function doResize() {
    const scale = Math.min(
      window.innerWidth / elWidth,
      window.innerHeight / elHeight,
    );

    el.style.transform = `scale(${scale})`;

    // center in window
    const hOffset = (window.innerWidth - elWidth) / 2;
    el.style.left = `${hOffset}px`;
    
    const vOffset = (window.innerHeight - elHeight) / 2;
    el.style.top = `${vOffset}px`;
  }

  doResize();

  return { doResize };
})();

export { responsive as default };
