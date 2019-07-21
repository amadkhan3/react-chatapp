import React, { Component } from 'react';
import { Comment, Image, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';
import firebase from '../../firebase';


class Message extends Component {
    state = {
        seen: false,
        ownMessage: false,
        refPrivateMessages: firebase.database().ref('privateMessages'),
        // channel: this.props.currentChannel,
    }

    timeFromNow = timestamp => moment(timestamp).fromNow();
    
setMessageSeen = (message, user, isPrivateChannel, currentChannel, messageId) => {
    if (isPrivateChannel && (message.user.id !== user.uid)) {
        const ref = this.state.refPrivateMessages.child(currentChannel.id).child(messageId);
        ref.update({ isSeen: true });
    }
}

isOwnMessage = (message, user, isPrivateChannel, currentChannel, messageId) => {
    if (message.user.id === user.uid) {
        this.state.ownMessage = true;
        return  'message__self';
    } else {
        this.setMessageSeen(message, user, isPrivateChannel, currentChannel, messageId);
        this.state.ownMessage = false;
        return '';
    }
}

isImage = (message) => {
    return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
}

deleteMessage = (currentChannel, messageId) => {
    console.log('this is to delete')
    const ref = this.state.refPrivateMessages.child(currentChannel.id).child(messageId);
    ref.remove();
}



    render(){
    const {message, user, isPrivateChannel, currentChannel, messageId } = this.props;
    return(
    <Comment>
        <Comment.Avatar src={message.user.avatar} />
        <Comment.Content className={this.isOwnMessage(message, user, isPrivateChannel, currentChannel, messageId)}>
            <Comment.Author as="a">{message.user.name}</Comment.Author>
            <Comment.Metadata>{this.timeFromNow(message.timestamp)}</Comment.Metadata>
            {this.isImage(message) ?
                <Image src={message.image} className="message__image" /> :
                <Comment.Text>{message.content}</Comment.Text>
            }
            {(isPrivateChannel && this.state.ownMessage) ? <Comment.Text><Icon size='small' name='check' color={message.isSeen === true ? 'blue' : 'grey'} /></Comment.Text> : null}
        </Comment.Content>
        {(isPrivateChannel && this.state.ownMessage && message.isSeen === false) ?
        <Button
            icon
            onClick={()=>this.deleteMessage(currentChannel,messageId)}
            color='red'
        >
            <Icon name='remove circle' />
        </Button> : null
        }
    </Comment>
);
}
}

export default Message;
