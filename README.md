# studytracker

Winner of CSSU x Connected Lab Hack Night March 2017 -- "Most useful tool for Students" category

See it in action here:
https://studytracker-75b82.firebaseapp.com/




### Lessons:
- need to add the FB script to your index.html
- need to include lots of stuff from google cdn to get the snackbar for example
- documentgetelementbyID to interface between javascript and html
- lots of firebase intricacies (for example, can only have one "type" of data (so that having "date" and "start" and "end" will not work))
- need to firebase login and such as well

- prototype is the JS way of classes and such
- after doing this, this.study_stop = document.getElementById('button2');
  can modify many things about it! For example, make it hidden, make it larger etc.

Thanks to this resource
https://codelabs.developers.google.com/codelabs/firebase-web/#5

Think about how JS avoids name collisions. That is, how do we know all the listeners for a button across all files?
Since, we can modify the single css of the page, it seems quite serious/safety issues.
view-source:http://wisdi.me/ext2minator/
