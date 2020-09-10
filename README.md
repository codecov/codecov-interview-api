<a href="https://github.com/vchaptsev/cookiecutter-django-vue">
    <img src="https://img.shields.io/badge/built%20with-Cookiecutter%20Django%20Vue-blue.svg" />
</a>


codecovify
==========

This is a template app that contains the following:
- Backend: A dockerized Django app that connects to a Postgres database. This app contains simple views for User management (Login/ Logout/ Register). All those functions are powered through an API that is built with DjnagoRestFramework (https://www.django-rest-framework.org/#example)

- Frontend: A dockerized VueJS app that interacts with the Backend. On the home page, the app loads a simple VueJS component that calls the ackend's /api/users API and to list the registered users in the database.



## Development
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-interview.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-interview?ref=badge_shield)

To start the server, run:
+  `docker-compose up --build`


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-interview.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcodecov%2Fcodecov-interview?ref=badge_large)