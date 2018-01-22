# Wikipedia Viewer

This Wikipedia Viewer app is part of my Free Code Camp portfolio.

View the [Magic](https://blogscot.github.io/wikipedia-viewer/).

## Tips and Tricks

To test this web UI, I tested locally using my three main browswers: Firefox, Chrome and Safari. However, the coolest thing I found was using `ngrok` and passing its Internet feed into `http://sizzy.co/`, a tool for developing responsive websites, see instructions below.

To get the webpage running locally, type:

```zsh
yarn start
```

Currently, for convenience, I'm using `Parcel Bundler` so this serves the page on `localhost:1234`. Using `ngrok` it's possible to serve this localhost page on to the Internet, as shown:

```zsh
ngrok http 1234
```

With _this_ feed, enter the url into the responsive website tool, `http://sizzy.co/`, and view the page in a number of modern mobile devices! Sweet!
