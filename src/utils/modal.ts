export const getFlexDirectionOfModalContainer = (
  direction: 'left' | 'right' | 'top' | 'bottom',
) => {
  switch (direction) {
    case 'left':
    case 'right':
      return 'row';
    case 'bottom':
    case 'top':
      return 'column';
    default:
      return 'row';
  }
};
