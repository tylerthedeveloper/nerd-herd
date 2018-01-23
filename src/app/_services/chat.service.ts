import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AFService } from './af.service';
// --> import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';
import { User } from '../_models/user';

@Injectable()
export class ChatService {

    //user: firebase.User;
    user: User;
    userID: string;
    chatsFirebaseRef : firebase.database.Reference;
    messagesFirebaseRef : firebase.database.Reference;

    constructor(private db: AngularFireDatabase,
                public afService : AFService) //public userService : UserService
                {

                let _user = this.afService.getAppUser();
                if(_user) {
                    this.user = _user;
                    this.userID = _user.uid;
                }
                this.chatsFirebaseRef = firebase.database().ref('chats');
                this.messagesFirebaseRef = firebase.database().ref('messages');
    }

    // getChats(): Observable<any> {
        //let uid = (this.userID) ? this.userID : _userID;
    getChats(userID: String): FirebaseListObservable<any> {
        return this.db.list(`/chats/${userID}`);
    }

    // getChatById(userID: string, recipientID: string): FirebaseListObservable<any> {
    //     return this.db.list(`/chats/${userID}/${recipientID}`);
    // }
    getChatById(userID: string, recipientID: string)  {
        //return this.db.list(`chats/${recipientID}`);
        return this.db.list(`chats/${userID}/${recipientID}`);
        //return this.db.object(`/chats/${userID}/${recipientID}`);
    }

    /*
    checkChatExists(outUID: string) {
        //.orderByChild("ID").equalTo(outUID).
        this.db.database.ref(`chats/${this.userID}/${outUID}`).once('value').then(function(snapshot) {
            console.log(snapshot.val());
            return (snapshot.val() !== null)
        });
    }
    */

    createChat(outUID: string) : string {
        let uid = this.userID;
        var chatKey = this.db.database.ref(`/chats/${uid}`).push().key;
        this.db.database.ref(`chats/${uid}/${outUID}`).set(chatKey);
        this.db.database.ref(`chats/${outUID}/${uid}`).set(chatKey);
        return chatKey;
    }

    // getMessagesByChatID(chatID: string) {
        //return this.db.database.list(`messages/${chatID}`);
        //return this.messagesFirebaseRef.child(chatID);
    //}

    getMessagesByChatID(userID: string, outID: string) {
        return Observable.create((observer : any) => {
            this.getChatById(userID, outID).take(1).subscribe(chatID =>
                observer.next(this.messagesFirebaseRef.child(chatID))
            );
        });
    }

    // sendMessage(userID: string, outUID: string, message: string) {
    //     this.getChatById(userID, outUID).subscribe(chatID => {
    //         console.log(chatID);
    //         let chatKey = (chatID === []) ? chatID : this.createChat(outUID);
    //         this.db.database.ref(`messages/${chatKey}`).push(message);
    //         // this.db.database.ref(`messages/${chatKey}`).update(message);
    //     });
    // }

    sendMessage(chatRoom: string, message: {}) {
        // console.log(chatRoom);
        this.db.database.ref(`messages/${chatRoom}`).push(message);
    }

}

