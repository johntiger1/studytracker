'use strict';
var start_time ;
// Initializes StudyTracker.
function StudyTracker() {
  this.checkSetup(); //like calling the function of teh class  
  console.log("qqweaaa");

  //checkSetup();

  this.study_start = document.getElementById('button1');

  //"Passes" this into the function
  this.study_start.addEventListener('click', start_handler.bind(this));
  this.study_stop = document.getElementById('button2');
  this.study_stop.addEventListener('click', stop_handler.bind(this));


  this.study_start.addEventListener('click', this.saveMessage.bind(this));
  this.study_stop.addEventListener('click', this.loadMessages.bind(this));
  

  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  this.initFirebase();

};

var start_handler = function()
{
  
  //this.study_start.setAttribute('hidden', 'true');
  

}

var stop_handler = function()
{
  start_time = new Date();
  //this.study_start.removeAttribute('hidden');
  document.getElementById("timee").innerHTML = start_time.toString();
}
StudyTracker.prototype.checkSignedInWithMessage = function() {
  // Return true if the user is signed in Firebase
  if (this.auth.currentUser) {
    return true;
  }
};

// Loads chat messages history and listens for upcoming ones.
StudyTracker.prototype.loadMessages = function() {
  
  // TODO(DEVELOPER): Load and listens for new messages.
  // Reference to the /messages/ database path.
  this.messagesRef = this.database.ref('messages');
  // Make sure we remove all previous listeners.
  this.messagesRef.off();

  // Loads the last 12 messages and listen for new ones.
  var setMessage = function(data) {
    var val = data.val();
    //this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
  }.bind(this);
  this.messagesRef.limitToLast(12).on('child_added', setMessage);
  this.messagesRef.limitToLast(12).on('child_changed', setMessage);
};

// Saves a new message on the Firebase DB.
StudyTracker.prototype.saveMessage = function(e) {

    var date1 = new Date();

  console.log(start_time);
    console.log(date1);
    document.getElementById("timee").innerHTML = date1;
    e.preventDefault();
    this.messagesRef.push({
      start: start_time.toString(),
      end: date1.toString()
    }).then(function(){}.bind(this)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
  };


StudyTracker.prototype.checkSetup = function() {
  //window.alert("hello");
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions.');
  } else if (config.storageBucket === '') {
    window.alert('Your Cloud Storage bucket has not been enabled. Sorry about that. This is ' +
        'actually a Firebase bug that occurs rarely. ' +
        'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
        'and make sure the storageBucket attribute is not empty. ' +
        'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
        'displayed there.');
  }
};

StudyTracker.prototype.initFirebase = function() {
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

};


// Triggers when the auth state change for instance when the user signs-in or signs-out.
StudyTracker.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL;   // TODO(DEVELOPER): Get profile pic.
    
    console.log(profilePicUrl);

    //profilePicUrl = "https://upload.wikimedia.org/wikipedia/en/f/ff/SuccessKid.jpg"
    var userName = user.displayName;        // TODO(DEVELOPER): Get user's name.

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    //try:
    //this.anonButton.setAttribute('hidden', 'false');
    this.anonButton.removeAttribute('hidden');

    // We load currently existing chant messages.
    this.loadMessages();

    // We save the Firebase Messaging Device token and enable notifications.
    this.saveMessagingDeviceToken();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};

StudyTracker.prototype.signIn = function() {
  
  var prov = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(prov);
};

// Signs-out of Friendly Chat.
StudyTracker.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

window.onload = function() {
  window.studyTracker = new StudyTracker(); //we NEED this!
}



//StudyTracker();