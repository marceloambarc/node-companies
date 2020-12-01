# NODE-COMPANIES - A functional local registration system with Node.js

*Node-Companies* provides an easy-to-use test/creating framework for developing registrations with MySQL.

# Announcements

* **2020-11-30**:  A major (breaking) commit has been merged - starting with releases after `v1.0.1`, all services are now exposed via the edge service (port 8080) only! Please update your database config to use this endpoint.

# Overview

**Note:** Starting with version `1.0.0` is accessible on **http://localhost:8080** by default (customizable via aplication on `index.js`).

* **Sequelize**
* **Express**
* **body-parser**
* **ejs**
* **mysql2**
* **slugify**

* **express-session**
* **brcryptjs**

## Requirements

* `npm`
* `node`
* `MySQL`

## Installing

The easiest way to install Node-Companues is via `npm`:

```
npm init
```

## Bugs

*Login icon remains even after the user performs the act.

*Not all private sectors have Session authentication.

*Express-Session remains in standard configuration using machine memory, not allowing large scale.

*Register new users only with a previous admin. (You can change this setting by removing `adminAuth` from the route for creating new users.)

## License

ISC
