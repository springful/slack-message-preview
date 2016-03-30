# Slack Message Preview

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
