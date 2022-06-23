# UI Architecture - Part Two

## Modern Experiences

- Components
- Managing State
- Side Effects
- Ecosystem

## 1. Complexity

Architecture is a term that describes the process of making decisions that allow us to deliver the feature we need today while maintaining a level of changeability that enables us to adapt to our changing environment. We can use architecture to manage the complexity of a project.

Good user experience is a competitive advantage for a business. The details of what we declare a “good” experience vary, but as developers, we recognize that a commitment to creating a good user experience can cause the code we write to increase in complexity. We must deliver an experience that matches growing user expectations. Modern web applications use JavaScript to enhance the experience in many ways.

- Smooth transitions when interacting with the document.
- Retention of user state between transitions.
- Multiple methods of user interaction to trigger transitions.
- Updates automatically with multi-user editing.

It is common to use a library or framework to build web applications. Hotwire with Rails, React, Vue and Angular are all examples. React frameworks like Next.js and Remix provide a fast initial load with server-rendered HTML. These tools primarily want to make it easier to build an experience that matches what the user expects.

React is popular. The State of JS survey from 2021 has it listed at 80%, with Angular being the next most popular at 54%. Many job postings include React as an experience requirement and popular libraries we use with React.

Understanding React application architecture helps us build software that we can maintain in the long term. Breaking an application into components does not automatically provide a clean architecture. The decisions around storing state, handling side-effects and styling are what allow us to reduce bugs and spend more time adding new features. These seven goals can help during the decision-making process.

### Think in interfaces

Specifically the interface of each component. The interface of a component is defined by the props we pass and the elements that the component returns. When designing the interface of a component we must understand the purpose of the component, and create a minimal interface to satisfy the requirements.

### Minimize duplicate JSX

Component-based user interfaces benefit from reuse, we can watch for repetition in our JSX and decide how to divide the application into components. When we design these components we can use composition patterns and ensure that our conditions are localized to reduce the duplication of JSX.

### Minimize duplicate state

React allows us to store state in any component that we create. When we store the same state in more than one location we need to ensure that the state remains in sync. We can avoid this challenge by ensuring that all state has a single origin.

### Prefer handlers for side-effects

Side effects should be triggered through event handlers primarily. Sometimes we need to use effects to synchronize our components with external systems.

### Identify root dependencies

We can pass state from parent to child as props. When integrating the components in our application we will combine the state from various sources to create new types of data. A clear understanding of the path from the data we display back to its root sources helps debug issues.

### List all dependencies, and reduce them if possible

The dependencies of useMemo, useCallback and useEffect are determined by the code that they contain. We need to include all dependencies in the dependency array to avoid bugs related to stale closure. It can be easier to list all dependencies when they are few.

### Use context to share things that don't change

The React context API can reduce the number of props that we need to pass down through many layers of a component tree. If we aren’t careful, creating many context providers can result in a poor developer experience. We want to minimize our use of context, when we do use it, we should use it for values that do not change often. The provider should be located at the lowest point of the tree that allows access from all the required consumers.

## 2. Components

Components are responsible for returning React elements. A static site will always return the same tree each time we render it. Dynamic sites will cause mutations to the DOM based on the state change of state within the application.

We should define categories of components that are associated with base responsibilities. This has an impact on the structure of a project and helps us limit the workload for any one component.

- Shared-use UI controls
- Single-use UI controls
- Page containers
- Context providers
- Layout containers
- Pure props

Within the definition of our component, we decide the styles we apply want to apply to elements. There are a lot of ways to style React components, in this example we are providing a class name to elements. The `cx` function is using a helper called `classnames` to conditionally apply styles.

```jsx
const NavigationItem = (props) => {
  const Icon = props.icon;

  return (
    <li
      className={cx("navigation__item", {
        "navigation__item--active": props.active,
      })}
    >
      <span className="navigation__tab">&nbsp;</span>
      <span className="navigation__icon">
        <Icon size={24} />
      </span>
      <span className="navigation__label">{props.label}</span>
    </li>
  );
};
```

We also choose which elements we display with conditional rendering. We use this pattern to show errors, modals, loading icons and empty states.

```jsx
export default function EntryList(props) {
  const entries = useEntries({
    filter: {
      year: props.year,
      month: props.month,
      day: props.day,
    },
  });

  if (entries.length === 0) {
    return <EmptryEntries />;
  }

  return (
    <ul className="entry-list__container">
      {entries.map((entry) => (
        <EntryItem key={entry.id} entry={entry} />
      ))}
    </ul>
  );
}
```

Any feature that needs to synchronize our components with external systems can use effects. We can provide keyboard based input by registering the necessary event handlers.

```jsx
useEffect(() => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      onPrevious();
    }

    if (event.key === "ArrowRight") {
      onNext();
    }
  };

  document.addEventListener("keyup", handleKeyPress);

  return () => {
    document.removeEventListener("keyup", handleKeyPress);
  };
}, [onPrevious, onNext]);
```

Often we will transform data from one type to another before we display it or pass it to a child component. This code exists as a custom hook to avoid having to repeat this code in each component that needs access to the same structure.

## 3. Managing State

There is no single way to manage the state in a complex application. Depending on the purpose of the state, we might choose a different way to manage it. Our initial considerations determine if the state is required since we want only to store the minimal state necessary. If we require new state, we can categorize it to determine how to manage it.

### Server cache

Persistent data mostly comes from a server. We must store the data we retrieve through an API within the application. We can store the data in a page container and then re-retrieve it each time the container is loaded. We can also store it higher in the tree, so it is available even when the component that requires it reloads.

### Local storage

The browser can store data for a web application in the browser. The local storage API lets us set and get values using a key. Local storage is an external system; using an effect allows us to synchronize with React state.

### Session

A successful login to a site can result in a response that sets a cookie in the browser. It is not common to attempt to read this session within the client application. Instead, we benefit from the automatic behaviour of sending the cookie back to the server with every subsequent request.

### Visual

State that we use to apply conditional styles or conditionally render elements can live in. the closest common ancestor that needs it.

### Controlled input

Input elements store state. When we need to synchronize the state of an input to a React component, we can use a controlled input pattern. We should store this state in the closest common ancestor of the components that need access. There are other form patterns that we can use to avoid controlled inputs.

### Input validation

The validation of user input may result in the need to display an error message. Client-side validation is purely a user experience consideration. The server will need to validate inputs before performing a mutation.

### Async operation

We can combine the state used to track a network request's loading, data and error state. The loading state is set to true when we start the operation. If the operation is successful, we set the data. If the operation results in an error, then we set the error state.

### Navigation

The URL is one of the oldest locations to store state for web applications. Instead of the server parsing the URL for params, we can perform this same operation in our web client. We can conditionally render components based on the current location and use params to make our components display resource-specific data.

## 4. Side Effects

React Hooks have been publicly available for over three years. Since React 16.8, avoiding bad advice on using the “useEffect” Hook has been challenging. Educators that intend to help developers learn how to use Hooks can often provide a minimal explanation that is simple but wrong.

> 🚫 “Leave the dependency array empty if you only want to run the effect on mount.”

This advice is a simple way to think about it, but what if there are dependencies? It is the contents of “useEffect” that define the dependencies. We cannot remove a dependency by leaving it out of our dependency array. Doing so creates stale closure defects that can be hard to debug. Ignoring the eslint error for the “exhaustive-deps” rule prevents any further reporting that may be valid. With React 18, all components will mount, unmount and mount again when we enable Strict Mode.

Instead of taking the simple but wrong path, we can learn the techniques that allow us to include all our dependencies. If we want to avoid the infinite render loops, we need to understand referential stability.

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);

  const getUser = () =>
    fetch("/api/user/me")
      .then((response) => response.json())
      .then((user) => setUser(user));

  useEffect(() => {
    getUser();
  }, []); // getUser is missing from the array

  return user && <div>{user.name}</div>;
}
```

A common technique for fetching data requires a `useEffect` with a call to fetch data and then set the data as React state when the response is successful. Calling a helper function that we declare in our component from a `useEffect` creates a dependency on an object that does not have a stable reference.

If we decide that we want to show user information for any user with an`id` we can change the request to include a param. When the component mounts, it will load data for the user with the value defined by `props.id`. If the value of `props.id` changes; this code will not run to retrieve data for the user with the `id`.

```jsx
function UserProfile(props) {
  const [user, setUser] = useState(null);

  const { id } = props;

  const getUser = () =>
    fetch(`/api/user/${id}`)
      .then((response) => response.json())
      .then((user) => setUser(user));

  useEffect(() => {
    getUser();
  }, []);

  return user && <div>{user.name}</div>;
}
```

When we have a dependency, we include it in the array. To reduce our dependencies, we can move the helper function into the `useEffect` or remove the helper function wrapper altogether. We do not need to declare `setUser` as a dependency because it is guaranteed stable. If the value of `props.id` changes, this code will run to retrieve the data for the user with the `id`.

```jsx
function UserProfile(props) {
  const [user, setUser] = useState(null);

  const { id } = props;

  useEffect(() => {
    fetch(`/api/user/${id}`)
      .then((response) => response.json())
      .then((user) => setUser(user));
  }, [id]);

  return user && <div>{user.name}</div>;
}
```

The dependency array becomes complicated when we start passing objects to children as props. When a component React renders a component, the variables created during the calling of the function will not maintain the same reference from a previous render. A new object could have the same shape and data, but they will not be equal if we compare it to the last object by reference.

```jsx
const { get, set } = useCache(key);

useEffect(() => {
  let ignore = false;

  request().then((data) => {
    if (ignore === false) {
      set(data);
    }
  });

  return () => {
    ignore = true;
  };
}, [request, set]);
```

The `useCache` Hook creates the `set` function whenever a component calls it. When we create a dependency on a function, like `set`, we need to ensure that any closure `set` has is updated with the latest values. If the act of rendering causes us to recreate the `set` function without any of its root dependencies changing, then we can cause an infinite loop.

We can use the `useCallback` Hook to ensure that we only create a new reference for the `set` function when any dependencies change.

```jsx
const set = useCallback(
  (value) => setCache((cache) => ({ ...cache, [key]: value })),
  [key, setCache]
);
```

When a state mutation depends on the state's existing value, we can run into more common problems. When we use the reducer form of `setCache` we avoid creating a dependency on the existing `cache` state. This technique is one of the ways that we can reduce our dependencies. If we don't use the reducer, the `set` function has a new reference each time we update the cache.

```jsx
const set = useCallback(
  (value) => setCache({ ...cache, [key]: value }),
  [key, cache, setCache]
);
```

This reference instability can cascade to child components, causing any effect that depends on `set` to run in a loop without further protection. In this next example, we only request if the data value is currently null. The dependency array includes all of the dependencies for this effect.

```jsx
useEffect(() => {
  if (data !== null) return;

  let ignore = false;

  request().then((data) => {
    if (ignore === false) {
      set(data);
    }
  });

  return () => {
    ignore = true;
  };
}, [request, data, set]);
```

Instead of removing a dependency that belongs in the array, try one of the following approaches to reduce dependencies and control referential stability.

- Move the function into the effect, or remove the wrapper.
- Use the useCallback Hook with a full dependency list.
- Use a reducer function with the set state actions.
- Execute effects conditionally within the effect function.
- Split up effects into multiple useEffect hooks.

With the correct dependency list in place, we can ensure that we return a function from our effect, that allows for cleanup. We can use this to unsubscribe from events, clear timers or ignore the response of an HTTP request.

## 5. Ecosystem

Many packages exist that provide abstractions for React applications. We can learn a lot from these packages, even if we choose to use a limited number of them.

### State Management

[https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)

[https://github.com/pmndrs/zustand](https://zustand-demo.pmnd.rs/)

[https://mobx.js.org/](https://mobx.js.org/README.html)

[https://recoiljs.org/](https://recoiljs.org/)

[https://jotai.org/](https://jotai.org/)

[https://xstate.js.org/](https://xstate.js.org/)

### Routing

[https://reactrouter.com/](https://reactrouter.com/)

[https://react-location.tanstack.com/](https://react-location.tanstack.com/)

### Server Cache Management

[https://react-query.tanstack.com/](https://react-query.tanstack.com/)

[https://www.apollographql.com/docs/react/](https://www.apollographql.com/docs/react/)

[https://relay.dev/](https://relay.dev/)

[https://swr.vercel.app/](https://swr.vercel.app/)

[https://formidable.com/open-source/urql/](https://formidable.com/open-source/urql/)

### Forms

[https://formik.org/](https://formik.org/)

[https://react-hook-form.com/](https://react-hook-form.com/)

### Frameworks

[https://nextjs.org/](https://nextjs.org/)

[https://remix.run/](https://remix.run/)
