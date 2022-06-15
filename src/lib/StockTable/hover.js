export default function hover(node, [ticker, activeRow]) {
  const onHover = () => activeRow.set(ticker);
  const onUnHover = () => (
    activeRow.update(old =>
      old !== ticker ? old : ''
    )
  );
  node.addEventListener('mouseover', onHover);
  node.addEventListener('mouseleave', onUnHover);
  return {
    destroy() {
      node.removeEventListener('mouseover', onHover);
      node.removeEventListener('mouseleave', onUnHover);
    }
  };
}
