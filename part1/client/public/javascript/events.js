import {
  ListComponent,
  ItemComponent,
  NameInputComponent,
  ErrorComponent,
  PartyListComponent,
  PartyComponent,
  FormComponent,
} from "./components.js";

export const handleFormSubmission = async (event) => {
  /*
    The default behaviour of a form when we trigger a submit
    event is to retrieve a new document. Since this is a
    single page application, we need to stay withing this
    document. We prevent the default behaviour when javascript
    is enabled.
  */
  event.preventDefault();

  /*
    FormData
    Reference: https://developer.mozilla.org/en-US/docs/Web/API/FormData
  */
  const body = new FormData(event.target);

  /*
    Basic *client* side validation. The problem with client side validation
    is that it doesn't matter. The trade off is that we need to submit the
    form data to get the errors back from the server.

    In some cases it is a good idea to validate on the client before sending
    data to the server. This should only be done to improve user experience.

    const date = body.get("date");
    const pizzas = body.get("pizzas");
    const attendees = body.getAll("attendees");

    const errors = [];

    if (attendees.length < 2) {
      errors.push("Must invite a minimum of 2 people");
    }

    if (!date) {
      errors.push("Date must be set");
    }

    if (Number(pizzas) / attendees.length < 0.5) {
      errors.push("Must have at least half of a pizza per person");
    }

    if (errors.length > 0) {
      ErrorComponent().innerText = errors.join(", ");
      return;
    }

    ErrorComponent().innerText = "";
  */

  /*
    Fetch
    Reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
  */
  const response = await fetch("/api/create", {
    method: "post",
    body,
  });

  /*
    Check that thes status code for the response is expecteed.
  */

  if (response.status === 201) {
    const party = await response.json();

    PartyListComponent().appendChild(PartyComponent(party.id, party));
    ErrorComponent().innerText = "";
    FormComponent().reset();

    return;
  }

  /*
    Render the list of errors provided by the server.
  */

  const errors = await response.json();

  ErrorComponent().innerText = errors.join(", ");
};

export const handleFormReset = (event) => {
  ListComponent().replaceChildren();
};

export const handleAddButtonClick = (event) => {
  const name = NameInputComponent().value;

  /*
    Since adding items to the list is only being handled with
    JavaScript, we can do a check ot make sure that the value
    is not empty here, but we also need to check on the server
    once the request is submitted.
  */
  if (!name) {
    ErrorComponent().innerText = "Name must not be empty";
    return;
  }

  ErrorComponent().innerText = "";

  const Item = ItemComponent(crypto.randomUUID(), {
    name,
  });

  ListComponent().appendChild(Item);

  NameInputComponent().value = "";
};
