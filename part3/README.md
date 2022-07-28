# UI Architecture - Part Three

## Style

- Abstraction
- CSS
- Tooling
- Tailwind
- CSS-in-JS


## 1. Abstraction

Building web interfaces is complicated. Challenges with layout and styling can be daunting when a project reaches a larger scale. These challenges have driven many in the web development community to build abstractions that ease the process. Various CSS frameworks, component libraries and toolchains provide a strong foundation for modern approaches to styling. On occasion, new CSS specifications include features first available from third-party providers.

Our ability to share libraries full of components leads to an incredible increase in productivity. Since good design follows patterns, most libraries implement the same types of components. It is nice not to write all the code for a button with different variants or a complex table component, but this does not include all the benefits.

A design system is what provides structure to a project. It takes less time to build when we already have the answer to most questions surrounding look and feel. The component libraries worth using are all based on a design system. The following are reasonable choices for a new project [Material UI](https://mui.com/), [Bootstrap](https://react-bootstrap.github.io/), [Polaris](https://polaris.shopify.com/components), [Primer](https://primer.style/react/), [Chakra UI](https://chakra-ui.com/), [Fluent UI](https://developer.microsoft.com/en-us/fluentui), [Blueprint](https://blueprintjs.com/), [Rebass](https://rebassjs.org/), [BaseWeb](https://baseweb.design/), [Garden](https://garden.zendesk.com/), [ADS](https://atlassian.design/), [Protocol](https://protocol.mozilla.org/), [Lightning](https://www.lightningdesignsystem.com/), [Cedar](https://rei.github.io/rei-cedar-docs/), [Carbon](https://carbondesignsystem.com/), [Elastic UI](https://elastic.github.io/eui/), [Theme UI](https://theme-ui.com/), and [Mantine](https://mantine.dev/).

It is not typical to mix these libraries; a project should contain at most one of these dependencies. We can break this rule if a project is actively moving from one UI library to another. To choose a library, we can follow a process where we identify the components we need; once we have filtered the list to include libraries that contain the components we need, we determine which approach each one uses for styling.

Sometimes it is enough to choose a library that looks good enough to ship as is, especially for internal projects where branding isn’t necessary. When we are building a project that requires a specific visual design, the most critical part of the UI library to understand is the mechanism we can use to change how it looks. If we design a project using an existing design system as a basis, it is easier to configure our theme to match our target look.

UI libraries are expensive dependencies; they offer a lot of benefits when getting started but can present challenges when we are pushed outside of their constraints. In some cases, teams may decide to implement a custom library of components for their project. Using any approach found in popular UI libraries would provide a good foundation.

Lately, utility-first CSS frameworks have become popular, with [Tailwind CSS](https://tailwindcss.com/) leading the category. These frameworks don’t provide components and instead re-present CSS properties as classes that can be composed using the `class` attribute of an HTML element. [Windi CSS](https://windicss.org/), [Tachyons](http://tachyons.io/), [Basscss](https://basscss.com/) and [Master CSS](https://css.master.co/) frameworks also come with a built-in design system that we can customize.

One of the significant differences between a UI library and a CSS framework is the separation of concerns. A UI library tends to bundle how the component looks and how it behaves as a single consideration. CSS frameworks focus on providing tools to implement the visual design of components within an interface quickly, but they do not take any responsibility for functionality.

In general, we can build components that do not have an opinion on how they look, the term used to categorize these types of components is Headless UI. Libraries like [Downshift](https://www.downshift-js.com/) and [TanStack Table](https://tanstack.com/table/v8) embrace this by providing accessible components we can style using any technique.

[Headless UI](https://headlessui.com/), [Radix](https://www.radix-ui.com/), [React Aria](https://react-spectrum.adobe.com/react-aria/), [Reakit](https://reakit.io/) and [Ariakit](https://ariakit.org/) are all built with this goal in mind. We can compose CSS frameworks and Headless UI libraries to create accessible components that follow a design system. The Headless UI library pairs well with TailwindCSS, while Radix and [Stitches](https://stitches.dev/) provide suitable alternatives to fill the same role.

These abstractions help us build interfaces faster, but they do not allow us to skip understanding the platform-supported features. Avoid buying site templates unless all technologies are well understood; they can cause more confusion than building on a proven design system.

## 2. CSS

Building a design system for a large project using plain CSS is a significant undertaking. Unsurprisingly, smaller teams will reach for an existing solution to save development time. It is still important to understand how the platform works so that we can use the Chrome DevTools when something goes wrong.

CSS allows us to alter how our document looks when it renders. We can break this responsibility into two sub-categories; Layout and Styling. Styling is more straightforward since it mainly involves altering the properties of our typography, including the size and colour. Originally the browser was designed to render documents, not applications.

CSS has added numerous features since its inception to provide tools for layout. With the box model, the initial layout uses static positioning. We can make an element positioned using the values `relative` or `absolute`. Elements we position using `absolute` also fall out of the normal flow of content. We can use this to stack elements in our UI.

Positioning elements based on screen coordinates isn’t very responsive, so we must be cautious when using this approach. We often use Flexbox, Grid, or a combination of the two when addressing our layout. We should lock our spacing values to a scale and apply padding or margins appropriately.

A colour palette for a project is usually quite limited; it is a good practice to declare the colour values as CSS variables using semantic names. We can use Lint to ensure that all rules reference variables instead of hard-coded colour values.

## 3. Tooling

Sass has been around for fifteen years; it provides numerous benefits to those who write large-scale CSS systems. Over time the CSS specification has evolved and now includes features previously only available with third-party tooling. As the platform grows, we should change our approach if it serves us well. For example, now that they are available when we are targeting modern browsers, we can use built-in CSS variables.

The introduction of tooling to the CSS development process allows for incredible flexibility in how we author our CSS. As UI developers, we face challenges with organizing our system due to common issues such as name clashing, specificity overruling and browser compatibility. Tools like PostCSS help us by providing necessary features.

We can reduce the complexity of CSS with features like automatic property prefixing, scoping class names and linting. We configure our tools to allow for non-standard features like nesting.

## 4. Tailwind

Before CSS, it was possible to style text using the `<font>` element with `color` or `size` attributes. When we embed our style with our structure, we seek ways to separate it as we scale. We don’t often recommend inline styles or embedded style tags for anything other than testing stuff out, even though it is pretty convenient to co-locate styles with our HTML.

Advocates base their argument for using Tailwind CSS on the idea that naming things is hard. If we don’t have to come up with class names, we can quickly iterate on our designs. Naming is hard, but it is not the problem we avoid when using Tailwind CSS. Eventually, we will have to name something; avoiding it is not a solution.

We can test Tailwind's highly configurable design system on their [Playground](https://play.tailwindcss.com/). We fill our markup with utility class names without tools like React to abstract components into smaller pieces. As our lists grow in length, we can benefit by using an auto-sorting prettier rule to ensure our class names have some level of organization.

Tailwind Labs offers paid component templates called [Tailwind UI](https://tailwindui.com/) which can reduce the time launching a typical site. It has also inspired complete open source UI libraries like [daisyUI](https://daisyui.com/) and CSS-in-JS runtimes like [Twind](https://twind.dev/).

## 5. CSS-in-JS

CSS-in-JS libraries provide the basis for most of the popular UI component libraries. If we use a UI component library that depends on Emotion, it is probably a good idea to use Emotion for our custom components. When we do this, we gain several benefits.

The most obvious difference is that we can write our CSS directly in our component source files. These tools assign unique CSS class names to avoid a naming collision, and vendor prefixes are added to the resulting output to improve compatibility. Other benefits include good compatibility with SSR and theming support. 

When choosing a library, we should consider the style definition syntax, the style application syntax and the output format. The output format is usually a separate `.css` file or a runtime that creates one or more `<style>` tags in the document. We generally declare our style definition syntax using a template literal or an object. The style application syntax will likely use component factories or the application of props in most cases.

We can see the slight difference in API between [Aphrodite](https://github.com/Khan/aphrodite), [csx](https://github.com/cxs-css/cxs), [Emotion](https://emotion.sh/), [Fela](https://fela.js.org/), [glamorous](https://glamorous.rocks/), [JSS](https://cssinjs.org/), [jsxstyle](https://github.com/jsxstyle/jsxstyle), [Linaria](https://github.com/callstack/linaria), [styled-components](https://styled-components.com/), [Styletron](https://styletron.org/) and [YoCSS](https://github.com/treshugart/yocss) at the [CSS-in-JS Playground](https://css-in-js-playground.com/).