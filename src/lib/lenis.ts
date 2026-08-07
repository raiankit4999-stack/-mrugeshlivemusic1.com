import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);

  if (!target) {
    // Section isn't on this page (e.g. viewing a blog post) — navigate home first.
    window.location.href = `/#${id}`;
    return;
  }

  if (instance) {
    instance.scrollTo(target, { offset: 0 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
