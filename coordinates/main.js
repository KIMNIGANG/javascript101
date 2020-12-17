const body = document.querySelector("body");
const target = document.querySelector(".target");
const horizontal = document.querySelector(".horizontal");
const vertical = document.querySelector(".vertical");
const tag = document.querySelector(".tag");
const targetRects = target.getBoundingClientRect();
const targetWidth = targetRects.width / 2;
const targetHeight = targetRects.height / 2;

window.addEventListener("load", () => {
  document.addEventListener("mousemove", (event) => {
    let left = event.clientX;
    let top = event.clientY;
    vertical.style.transform = `translateX(${left}px)`;
    horizontal.style.transform = `translateY(${top}px)`;
    target.style.transform = `translate(${left - targetWidth}px,${
      top - targetHeight
    }px)`;
    tag.style.transform = `translate(${left}px,${top}px)`;

    tag.innerHTML = `
    height:${top}
    width:${left}
    `;
  });
});
