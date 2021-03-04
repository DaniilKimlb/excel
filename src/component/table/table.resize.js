import { $ } from '../../core/dom';

export function tableResize($root, event) {
  const type = event.target.dataset.resize;
  const sideProp = type === 'colum' ? 'bottom' : 'right';
  const $resized = $(event.target);
  const $parent = $resized.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  let delta;
  document.onmousemove = (e) => {
    $resized.css({
      opacity: '100',
      [sideProp]: '-5000px',
    });
    if (type === 'colum') {
      delta = e.pageX - coords.right;
      $resized.css({
        right: -delta + 'px',
      });
    } else {
      delta = e.pageY - coords.bottom;
      $resized.css({
        bottom: -delta + 'px',
      });
    }
  };
  document.onmouseup = (e) => {
    document.onmousemove = null;
    $resized.css({
      opacity: '0',
      right: '0',
      bottom: '0',
    });
    if (type === 'colum') {
      $parent.css({ width: coords.width + delta + 'px' });
      $root
        .findAll(`[data-ceil="${$parent.text}"]`)
        .forEach((element) =>
          $(element).css({ width: coords.width + delta + 'px' })
        );
    } else {
      $parent.css({ height: coords.height + delta + 'px' });
    }
  };
}
