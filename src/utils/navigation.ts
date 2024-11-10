function scrollToHash(hash: string) {
  const scrollToElement = document.getElementById(hash);
  if (!scrollToElement) return;
  scrollToElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export { scrollToHash };
