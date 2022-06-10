export function getBreakpoint(width) {
  if (width < 600) return 'sm';
  if (width < 1150) return 'md';
  return 'lg';
}
