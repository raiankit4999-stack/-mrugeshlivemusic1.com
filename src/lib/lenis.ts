import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (instance) {
    instance.scrollTo(target, { offset: 0 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
