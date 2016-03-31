# Slack Message Preview

Allows previewing Slack messages.

install
-------

```
npm install slack-message-preview
```

Usage
-----

```
import SlackMessagePreview from "slack-message-preview";
import ReactDOM from "react-dom";

const slackMessage = {
  text: "Hi there!"
}

ReactDOM.render(<SlackMessagePreview message={slackMessage} />, container);
```

You must also include this component's styles available at `node_modules/slack-message-preview/dist/index.css`.

***

Slack Message Preview is not created by, affiliated with, or supported by Slack Technologies, Inc.
