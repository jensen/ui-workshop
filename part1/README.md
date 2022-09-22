# UI Architecture - Part One

## The Platform

- Requests
- Managing State
- Mutation
- User Experience
- Progressive Enhancement
- Handling Events
- Modifying The Document
- Transport

## 1. Early Years

Sharing information is intrinsic to human communities. As technology advances, we use those advances to improve our ability to communicate information. 

In the early 90s, [Tim Berners-Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee) saw an opportunity to combine computer networking and information communication. He released a [proposal](https://www.w3.org/History/1989/proposal.html) for a HyperCard-inspired approach to linking documents. Hypertext (HTML) and the Hypertext Transfer Protocol (HTTP) provide the basis for the modern internet. In 1991 he posted to [alt.hypertext]([https://www.w3.](https://www.w3.org/People/Berners-Lee/1991/08/art-6484.txt)org/People/Berners-Lee/1991/08/art-6484.txt) an invite to visit the [first website](http://info.cern.ch/hypertext/WWW/TheProject.html) and use software he developed based on his proposal.

In 1994, Netscape Communications Corporation was the first company to try and capitalize on the World Wide Web. Their Netscape Navigator browser grew in popularity quickly; it was superior to their competitors. A documentary, [Project Code Rush](https://www.youtube.com/watch?v=4Q7FTjhvZ7Y), describes the end of Netscape during their effort to release its browser code as open-source software. It is worth watching.

The World Wide Web spread into people's homes, and at this point, anyone with an internet connection was likely using Netscape Navigator to browse documents described as HTML. A specification for HTML or HTTP would be incomplete when Netscape added them to their browser.

Setting up a server using the software provided by Tim Berners-Lee was a barrier to entry for most people if they wanted to post content on the WWW. GeoCities, a web company that started as Beverly Hills Internet, became a very popular web hosting provider.

Users choose a neighbourhood based on the topic of their website. When they sign up, they receive a four-digit address in that neighbourhood. Someone might find a website about computer games using the [URL](https://en.wikipedia.org/wiki/URL) http://www.geocities.com/SiliconValley/4336/. Yahoo purchased GeoCities for $3.57 billion worth of stock in January 1999.

> Demo [neocities](https://neocities.karl.sh/) available on [GitHub](https://github.com/jensen/neocities/).

## 2. Requests

When we start a web server, it opens a port and listens for TCP connections. A basic web server only performs work when a user agent makes a request.

> Example of a [hard-coded](./webservers/src/hardcoded.ts) web server with Deno.

This type of web server requires a restart whenever the contents of the document change. We can alter our web server code to read files and serve them as documents when we find them.

> Example of a [static](./webservers/src/static.ts) web server with Deno.

After visiting a URL, the server returns a document, and the browser parses the document and makes further requests for linked resources. If a user clicks on a link or submits a form, then the browser makes a request to a server.

> Example showing linked requests in the Network tab.

Apache and NGINX are the most common production web servers available today. These servers do an excellent job of serving static files. Another option is deploying static assets to a CDN so that users download the files from servers closer to them. With these approaches available, Rails does not serve static files in production by default.

## 3. Managing State

The ability to request documents and view the latest version on demand proves valuable. We can turn to dynamic web servers when we only need to provide more dynamic information. A server generates a dynamic web page by constructing the content when a user makes a request.

> Example of a [dynamic](./webservers/src/dynamic.ts) web server in Deno.

The server can return relevant data when we provide search parameters as part of the URL. It can also create links to other paths within the site using search parameters that allow us to pass state as part of the URL.

Lou Montulli invented the cookie as a Netscape employee in 1994. Before browser cookies, it was tough to store user state between requests. A server creates a cookie in response to a request from the browser. The browser holds the cookie and sends it with every following request to that site. The server can replace the cookie when values need to be updated.

## 4. Mutation

We introduce most of the complexity in web development by allowing users to mutate data. The most popular sites of our time have ways for users to contribute content. Unknown to most, they submit a form with side effects by using the POST method with their content forming the body data of the request.

The [HTML 2.0](https://www.w3.org/MarkUp/html-spec/html-spec_toc.html) specification contains the `<form>` element.

> Example of a [form with submit and reset](./webservers/src/dynamic.ts). Show redirect after post.

Even though the [HTTP 1.1](https://www.rfc-editor.org/rfc/rfc7231) specification includes new methods for updating or destroying existing resources, the <form> element does not support PUT or DELETE as a method attribute. Rails form helpers include a hidden <input> named “_method” that tells the server how the router should handle the POST request.

## 5. User Experience

Browser vendors' rapid adoption of [HTML 2.0](https://www.w3.org/MarkUp/html-spec/html-spec_toc.html) features quickly turned the WWW from a text-based platform to one that is capable of delivering a rich-media experience.

One of the early challenges for developers was creating more complex layouts without any styling tools. In the period between HTML 2.0 and [HTML 3.2](https://www.w3.org/TR/2018/SPSD-html32-20180315/) with [CSS](https://www.w3.org/TR/CSS1/), a technique of slicing up images and displaying them as the background of table cells is considered normal.

> Example of a [table-based layout](https://neocities.karl.sh/SiliconValley/1000/layout.html) on neocities.

Adding Cascading Style Sheets means that designers can create the types of experiences we see today. A new challenge for developers is supporting multiple popular browser vendors that don’t all implement the CSS to the exact specifications.

Adding more scripts, styles and media to a site takes its toll on an early 90s internet connection. A web server can implement a good [caching strategy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), which instructs the browser on which content it can and for how long to cache it.

> Example of caching in the browser, using neocities site.

## 6. Progressive Enhancement

The term [Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) is growing in popularity. It describes a design philosophy that has evolved to provide a baseline of functionality to as many users as possible. If a user visits with a modern browser, then the experience they have will be determined by the features the browser supports. We can use frameworks to help us build sites that support this idea.

> Example with rails w/ turbo and remix.

It is not only old browsers that may not be supported by today's modern sites. A portion of the population using low-powered mobile devices is excluded when basic support is not provided for basic features. These frameworks want to make it easier to make the decision to include this support.

## 7.Handling Events

When a browser enables JavaScript, we can create an interactive experience without reloading the document. Attaching events to elements that listen for specific user actions allows us to build custom interactivity into our applications.

> Example of the click event handler adding a new field to the form breakpoint using the Sources tab.

Most bugs are the result of state mutation. We can use the developer tools to track down client-side bugs.

## 8. Modifying The Document

We can manipulate what is currently rendered in the browser using the DOM API.

> Demo Event Planner showing the updated DOM elements in the Elements tab.

[React](https://reactjs.org/) uses a virtual DOM to quickly diff against a previous version of the DOM and then apply the changes as a reconciliation step. [Svelte](https://svelte.dev/) and [SolidJS](https://www.solidjs.com/) avoid using a virtual DOM by including a compile step that generates code to perform specific imperative updates when state changes.

## 9. Transport

We can render the HTML for the elements we know about on the server, but we also need to update the DOM dynamically when there is a state mutation. 

> Demo Event Planner showing view source for the server-rendered initial list.

We can list for a “submit” event that the  `<form>` element fires. We prevent the default submission behaviour and make an HTTP request using the [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API.

> Example of the submit event being handled, making the request.

The [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) API has been relied on heavily over the past two decades but is unnecessary for new projects.

## 10. The Platform

While there are infinite ways to build frameworks, the platform that we work with is finite. Frameworks play a significant role in modern web software development. They allow us to build sites faster by providing a convenient way to do common things with enough flexibility to customize features as needed.

A good understanding of the [Web API](https://developer.mozilla.org/en-US/docs/Web/API) allows us to debug issues quicker. We can use the [tools](https://developer.chrome.com/docs/devtools/) built into our browser to reduce the time it takes to locate the source of a defect. The frameworks that we use 

Those responsible for the popular [V8](https://v8.dev/) runtimes, [Node](https://blog.appsignal.com/2022/04/26/nodejs-18-release-whats-new.html) and [Deno](https://deno.land/), are moving towards an API that is compatible with the browser environment.

The World Wide Web comprises various specifications; frameworks and libraries inspire some of those specifications. We recognize that [components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) are a core architecture pattern for user interfaces. We can use the platform's features directly, and we can create abstractions to speed up our development.