(function () {
  var watermark = document.getElementById("watermark");
  var progress = document.getElementById("progress");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  function progressRatio() {
    var root = document.documentElement;
    var max = root.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / max));
  }

  function paint() {
    var t = progressRatio();
    if (progress) {
      progress.style.transform = "scaleX(" + t + ")";
    }
    if (!watermark) return;
    if (reduce.matches) {
      watermark.style.opacity = "0.07";
      return;
    }
    watermark.style.opacity = String(0.02 + t * 0.14);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      paint();
      ticking = false;
    });
  }

  paint();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  if (typeof reduce.addEventListener === "function") {
    reduce.addEventListener("change", paint);
  } else if (typeof reduce.addListener === "function") {
    reduce.addListener(paint);
  }
})();
