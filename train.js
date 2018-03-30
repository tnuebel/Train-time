// initialize firebase
var config = {
    apiKey: "AIzaSyAZx3rmRqYYHqQwr5EEPY23xplkgmNZHvE",
    authDomain: "train-sched-ac143.firebaseapp.com",
    databaseURL: "https://train-sched-ac143.firebaseio.com",
    projectId: "train-sched-ac143",
    storageBucket: "",
    messagingSenderId: "462642729242"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // submit Button
  $("#add-train-btn").click(function(){
    // Prevent page from reloading
    event.preventDefault();


    // get data from input info.
    var trainName = $("#train-name-input").val();
    var destinationName = $("#destination-input").val();
    var firstTrainTime = $("#first-train-time-input").val();
    var freqMin = $("#frequency-input").val();

    console.log(trainName);
    console.log(destinationName);
    console.log(firstTrainTime);
    console.log(freqMin);
  
    // data object to retrieve data 
    var dataObject = {
      TrainName: trainName,
      destinationName : destinationName,
      firstTrainTIme: firstTrainTime,
      freqMin: freqMin
    }

    // save data to firebase:
    database.ref().push(dataObject);

    // clear the form:
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
    // after refreshing; return to 'train name' input area
    $("#train-name-input").focus();
  });

database.ref().on("child_added", function(snap){


  // var data objects:
  var trainName = snap.val().TrainName;
  var destinationName = snap.val().destinationName;
  var firstTrainTIme = snap.val().firstTrainTIme;
  var freqMin = snap.val().freqMin;
  
  // console.log: firstTrainTIme, freqMin
  
  console.log("First:"+firstTrainTIme);
  console.log("Freq:"+freqMin);



    // get current time
    var now = moment();

    // converting first train time to momentjs
    var convertedFirstTime = moment(firstTrainTIme, "h:mm:a");

    // get time difference from now and FirstTrainTime
    var timeDif = moment(now).diff(convertedFirstTime, "minutes");
    console.log(timeDif);


    var mod =  timeDif % freqMin ;
    console.log("Mod: "+mod);

    // time till next train : frequency - mod
    var timeTillNext = freqMin - mod;
    console.log("timeTillNextTrain :"+timeTillNext);




    // addind timeTillNext to now = next arrival
        //.add(2, 'hours');
    var nextArrival = moment().add(timeTillNext, "minutes");
    nextArrival = moment(nextArrival).format("h:mm A");

      //adding data the table in HTML.

      var newtblrow = '<tr><td>'+firstTrainTIme+'</td><td>'+trainName+'</td><td>'+destinationName+'</td><td>'+freqMin+'</td><td>'+nextArrival+'</td><td>'+timeTillNext+'</td></tr>';
      $("#resultsTB").append(newtblrow);
  


});

