export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getProductIcon = (productName) => {
  if (productName.toLowerCase().includes('headphone')) return '🎧';
  if (productName.toLowerCase().includes('watch')) return '⌚';
  if (productName.toLowerCase().includes('stand')) return '💻';
  if (productName.toLowerCase().includes('keyboard')) return '⌨️';
  if (productName.toLowerCase().includes('hub')) return '🔌';
  if (productName.toLowerCase().includes('mouse')) return '🖱️';
  return '📦';
};

