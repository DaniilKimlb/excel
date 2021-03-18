import { $ } from '../../core/dom';

export function tableResize($root, event) {
  return new Promise((r) => {
    const type = event.target.dataset.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    const $resized = $(event.target);
    const $parent = $resized.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    let delta;
    let value;
    document.onmousemove = (e) => {
      $resized.css({
        opacity: '100',
        [sideProp]: '-5000px',
      });

      if (type === 'col') {
        delta = e.clientX - coords.right;
        $resized.css({
          right: -delta + 'px',
        });
      } else {
        delta = e.clientY - coords.bottom;
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
      if (type === 'col') {
        value = coords.width + delta;
        $parent.css({ width: value + 'px' });
        $root
          .findAll(`[data-ceil="${$parent.data.col}"]`)
          .forEach((element) => $(element).css({ width: value + 'px' }));
      } else {
        value = coords.height + delta;
        $parent.css({ height: value + 'px' });
      }
      r({
        id: $parent.data[type],
        value,
        type,
      });
    };
  });
}
