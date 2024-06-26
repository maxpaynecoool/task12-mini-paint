<h1>Mini-paint</h1>

## Task

<a href="https://drive.google.com/file/d/1-BO74sLy-wnWHu3Yvuyr4vQ0bNm_32pN/view?usp=sharing">Watch task</a>

## Demo

<a href="https://task12-mini-paint.vercel.app/">Mini-paint</a>

## How to run the app

**Install**

```sh
npm run install
```

**Usage**

```sh
npm run dev
```

**Build**

```sh
npm run build
```


.env template:

```
VITE_apiKey="your_api_key"
VITE_authDomain="..."
VITE_projectId="..."
VITE_storageBucket="..."
VITE_messagingSenderId="..."
VITE_appId="..."
VITE_measurementId="..."
```


### Folder structure

```
├── node_modules
├───public
└───src
│    ├───apiFirebase
│    ├───components
│    │   │───Canvas
│    │   │───Header
│    │   │───ImageItem
│    │   │───ImageList
│    │   │───Toolbar
│    │   └───ui
│    ├───contexts
│    ├───pages
│    │   │───HomePage
│    │   │───PaintPage
│    │   └───SignInUpPage
│    ├───routes
│    ├───store
│    │   │───hooks
│    │   └───slice
│    ├───App.tsx
│    ├───index.css
│    ├───main.tsx
│    └───vite-env.d.ts
├── .eslintrc
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.js
```
