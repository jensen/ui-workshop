/*
  These are cached values for the elements. It is also possible
  to call document.querySelector each time you want to find one
  of these elements. This could be slow with a large document.

  If we use "id" instead of "data-component" the browser will
  create references to these elements in the window object.
*/
const elements = {
  list: document.querySelector("[data-component='list']"),
  form: document.querySelector("[data-component='form']"),
  addButton: document.querySelector("[data-component='add-button']"),
  nameInput: document.querySelector("[data-component='name-input']"),
  error: document.querySelector("[data-component='error']"),
  partyList: document.querySelector("[data-component='party-list']"),
  parties: {},
  items: {},
  remove: {},
};

/*
  Each component references a specific existing element in the DOM.
*/
export const ListComponent = () => elements.list;
export const FormComponent = () => elements.form;
export const AddButtonComponent = () => elements.addButton;
export const NameInputComponent = () => elements.nameInput;
export const ErrorComponent = () => elements.error;

/*
  These components create elements dynamically. They have a unique identifier
  when they are in a list, and can be passed data to be when creating elements.
*/
export const ItemComponent = (key, props) => {
  /* Check to see if we have this in our index of elements. */
  if (elements.items[key]) {
    return elements.items[key];
  }

  /* Create the element to display the name of the attendee. */
  const item = document.createElement("li");

  item.setAttribute("data-component", `item-${key}`);

  /*
    The values being added with the input field can be added to the form
    as hidden fields.
  */
  const input = document.createElement("input");

  input.setAttribute("type", "hidden");
  input.setAttribute("name", "attendees");
  input.setAttribute("value", props.name);

  /* Add the hidden input, display text and remove button to the item. */
  item.appendChild(input);
  item.appendChild(document.createTextNode(props.name));
  item.appendChild(RemoveComponent(key));

  /* Index the element. */
  elements.items[key] = item;

  return item;
};

export const RemoveComponent = (key, props) => {
  if (elements.remove[key]) {
    return elements.remove[key];
  }

  const button = document.createElement("button");

  button.setAttribute("data-component", `remove-${key}`);
  button.appendChild(document.createTextNode("remove"));

  button.addEventListener("click", (event) => {
    ItemComponent(key).remove();

    delete elements.items[key];
    delete elements.remove[key];
  });

  return button;
};

export const PartyListComponent = () => elements.partyList;

export const PartyComponent = (key, props) => {
  if (elements.parties[key]) {
    return elements.parties[key];
  }

  const item = document.createElement("li");

  elements.parties[key] = item;

  item.appendChild(
    document.createTextNode(
      `date: ${props.date}, pizzas: ${
        props.pizzas
      }, guestlist: ${props.guestlist.join(", ")}`
    )
  );

  return item;
};
