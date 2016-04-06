import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import _ from "lodash";
import Remarkable from "remarkable";

import styles from "./SlackMessagePreview.scss";

class SlackMessagePreview extends Component {
  constructor(props, context) {
    super(props, context);
    this.md = new Remarkable({
      breaks: true,
      linkify: true,
    });
  }

  render() {
    if (!this.props.message) {
      return <div />;
    }
    return (
      <div className={classnames(this.props.className, styles.slackMessagePreview)}>
        <div className={styles.messageGutter}>
          <img className={styles.botIcon} src={this.props.user.profile.image_48} />
        </div>
        <div className={styles.messageContent}>
          <div className={styles.header}>
            <span className={styles.botName}> {this.props.user.real_name} </span>
            {this.renderBotLabel(styles)}
            <span className={styles.timestamp}>4:00 PM</span>
          </div>
          <div className={styles.body}>
            {this.renderMessage()}
            {this.renderAttachments()}
          </div>
        </div>
      </div>
    );
  }
  
  renderBotLabel(styles) {
    if (!this.props.user.is_bot) {
      return;
    }
    return <span className={styles.botLabel}>BOT</span>;
  }

  renderMessage() {
    if (!this.props.message.text) {
      return;
    }

    return (
      <div className={styles.message} dangerouslySetInnerHTML={ { __html: this.md.render(this.props.message.text || "") } } />
    );
  }

  renderAttachments() {
    if (!this.props.message.attachments) {
      return;
    }
    return this.props.message.attachments.map((attachment, index) => {
      console.log(attachment);
      return (
        <div key={index} className={styles.attachment}>
          <div className={styles.pretext}  dangerouslySetInnerHTML={ { __html: this.md.render(attachment.pretext || "") } } />
          <div className={styles.attachmentContainer}>
            <div className={styles.attachmentBar} style={this.getAttachmentBarStyle(attachment)}/>
            <div className={styles.attachmentBody}>
              {this.renderAttachmentThumbnail(attachment)}
              <div className={styles.author}>
                {this.renderAttachmentAuthorIcon(attachment)}
                {this.renderAttachmentAuthor(attachment)}
              </div>
              <div className={styles.title}>
                {this.renderAttachmentTitle(attachment)}
              </div>
              <div className={styles.text} dangerouslySetInnerHTML={ { __html: this.md.render(attachment.text || "") } } />
              {this.renderFields(attachment)}
              {this.renderAttachmentImage(attachment)}
            </div>
          </div>
        </div>
      );
    });
  }

  getAttachmentBarStyle(attachment) {
    if (attachment.hasOwnProperty("color")) {
      return {
        backgroundColor: attachment.color
      };
    }
  }

  renderAttachmentAuthor(attachment) {
    if (!attachment.hasOwnProperty("author_name")) {
      return;
    }

    if (attachment.hasOwnProperty("author_link")) {
      return (
        <a className={styles.link} href={attachment.author_link}>
          {attachment.author_name}
        </a>
      );
    } else {
      return attachment.author_name;
    }
  }

  renderAttachmentAuthorIcon(attachment) {
    if (!attachment.hasOwnProperty("author_icon") || !attachment.hasOwnProperty("author")) {
      return;
    }

    if (attachment.hasOwnProperty("author_link")) {
      return (
        <a className={styles.authorIcon} href={attachment.author_link}>
          <img src={attachment.author_icon} />
        </a>
      );
    } else {
      return <img className={styles.authorIcon} src={attachment.author_icon} />
    }
  }

  renderAttachmentTitle(attachment) {
    if (attachment.hasOwnProperty("title_link")) {
      return (
        <a className={styles.link} href={attachment.title_link}>
          {attachment.title}
        </a>
      );
    } else {
      return attachment.title;
    }
  }

  renderFields(attachment) {
    if (!attachment.hasOwnProperty("fields")) {
      return;
    }
    return this.chunkFields(attachment.fields).map((chunk, index) => {
      return (
        <div key={index} className={styles.fieldChunkContainer}>
          {this.renderFieldChunk(chunk)}
        </div>
      );
    });
  }

  chunkFields(fields) {
    const chunks = [];
    for (let i = 0; i < fields.length;) {
      const field = fields[i];
      const nextField = fields[i + 1];
      if (field.short && nextField && nextField.short) {
        chunks.push([field, nextField]);
        i += 2;
      } else {
        chunks.push([field]);
        ++i;
      }
    }
    return chunks;
  }

  renderFieldChunk(chunk) {
    return chunk.map((field, index) => {
      return (
        <div key={index} className={styles.field}>
          <div className={styles.title}>
            {field.title}
          </div>
          <div className={styles.value}>
            {field.value}
          </div>
        </div>
      );
    });
  }

  renderAttachmentImage(attachment) {
    if (!attachment.hasOwnProperty("image_url")) {
      return;
    }

    return <img className={styles.attachmentImage} src={attachment.image_url} />;
  }

  renderAttachmentThumbnail(attachment) {
    if (attachment.hasOwnProperty("image_url") || !attachment.hasOwnProperty("thumb_url")) {
      return;
    }

    return <img className={styles.attachmentThumb} src={attachment.thumb_url} />;
  }
}

SlackMessagePreview.propTypes = {
  message: PropTypes.object,
  className: PropTypes.string,
  user: PropTypes.shape({
    real_name: PropTypes.string,
    profile: PropTypes.shape({
      image_48: PropTypes.string,
    }),
    is_bot: PropTypes.bool,
  })
};

SlackMessagePreview.defaultProps = {
  user: {
    real_name: "Your App",
    profile: {
      image_48: "https://i0.wp.com/slack-assets2.s3-us-west-2.amazonaws.com/8390/img/avatars/ava_0002-48.png?ssl=1",
    },
    is_bot: true,
  }
};

export default SlackMessagePreview;
