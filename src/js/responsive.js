import domSelectors from './dom';

const responsive = (() => {
  const wrapper = document.querySelector('.page-wrapper');
  const el = domSelectors.notebook;
  const elHeight = el.offsetHeight;
  const elWidth = el.offsetWidth;

  function doResize() {
    const scale = Math.min(
      window.innerWidth / elWidth,
      window.innerHeight / elHeight,
    );

    wrapper.style.transform = `scale(${scale})`;

    // const offset = elWidth - (elWidth * scale);
    // el.style.transform = `translate(-${offset}px);`;
  }

  doResize();

  return { doResize };
})();

export { responsive as default };
