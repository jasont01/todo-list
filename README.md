<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://jasont.us">
    <img src="logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ToDo List App</h3>

  <p align="center">
    The ubiquitous javascript project
    <br />
    <br />
    <a href="https://jasont01.github.io/todo-list/">View Demo</a>
    ·
    <a href="https://github.com/jasont01/todo-list/issues">Report Bug</a>
    ·
    <a href="https://github.com/jasont01/todo-list/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#highlights">Highlights</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project, inspired by the background picture found on [unplash](https://unsplash.com/photos/3ym6i13Y9LU), was started as an assignment while completing [The Odin Project](https://www.theodinproject.com/)'s javascript curriculum. Since then, it has been refactored & rewritten as my skillset has grown. This latest iteration was rewritten as a client / server pair. The client was written as a React app, while the server was written as a node/express app.

![preview-screenshot]

### Highlights

- Create multiple lists
- Assign priority levels to tasks
- Save your data to the cloud (must be signed in, otherwise data is saved locally to the browser)

### Built With

- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com)
- [Node](https://nodejs.org)
- [Express](https://expressjs.com)
- [Firebase](https://firebase.google.com)

<!-- GETTING STARTED -->

## Getting Started

- Clone this repo & cd into directory

```sh
  git clone https://github.com/jasont01/todo-list.git && cd todo-list
```

- Install dependencies

```sh
  npm install
```

- Start dev server

```sh
  npm start
```

### Prerequisites

- [Node](https://nodejs.org/)

<!-- ROADMAP -->

## Roadmap

Of course, this project is far from perfect. Some of the features I would like to implement include:

- Mobile/Responsive version without sacrificing the background image
- Custom priority levels
- Pagination - would remove limits on number of lists/items
- Custom fonts / colors

<!-- CONTRIBUTING -->

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->

## Contact

Jason Thompson - [@jasont01](https://twitter.com/jasont01) - contact@jasont.us

Project Link: [https://github.com/jasont01/todo-list](https://github.com/jasont01/todo-list)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

Hosting:

- [GitHub Pages](https://pages.github.com)

Background Picture:

- [Mike Tinnion](https://unsplash.com/photos/3ym6i13Y9LU) on Unsplash

npm packages:

- [nanoid](https://www.npmjs.com/package/nanoid)
- [react-confirm-alert](https://www.npmjs.com/package/react-confirm-alert)
- [react-datepicker](https://www.npmjs.com/package/react-datepicker)
- [react-google-login](https://www.npmjs.com/package/react-google-login)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [react-select](https://www.npmjs.com/package/react-select)
- [react-spinners](https://www.npmjs.com/package/react-spinners)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[preview-screenshot]: preview.png
