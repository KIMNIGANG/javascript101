const addBtn = document.querySelector(".footer_button");
const itemList = document.querySelector(".item_row");
const input = document.querySelector(".footer_input");

function onAdd() {
  const text = input.value;
  return text;
}

function create(text, list) {
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const item = document.createElement("div");
  item.setAttribute("class", "item");

  const item_name = document.createElement("span");
  item_name.setAttribute("class", "item_name");
  item_name.textContent = `${text}`;

  const item_delete = document.createElement("button");
  item_delete.setAttribute("class", "item_delete");
  item_delete.addEventListener("click", () => {
    itemList.removeChild(container);
  });

  const icon = document.createElement("i");
  icon.setAttribute("class", "far fa-trash-alt");

  const items_divider = document.createElement("div");
  items_divider.setAttribute("class", "items_divider");

  container.append(item);
  item.append(item_name);
  item.append(item_delete);
  item_delete.append(icon);
  container.appendChild(items_divider);

  list.appendChild(container);
}

addBtn.addEventListener("click", () => {
  const text = onAdd();
  if (text === "") {
    return;
  }
  create(text, itemList);
  input.value = "";
});

input.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    const text = onAdd();
    if (text === "") {
      return;
    }
    create(text, itemList);
    input.value = "";
  }
});
