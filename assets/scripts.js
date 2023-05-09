const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  document.body.innerHTML =
    '<div style="color: red; padding: 20px;"><h1>Sorry, this website is not available on mobile or tablet.</h1></div>';
}
