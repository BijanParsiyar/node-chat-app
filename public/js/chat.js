// Connects to server - persisted/continuous data flow
let socket = io();

// Scroll the user to the bottom depending on their position
function scrollToBottom() {
  // Selectors
  var messages = jQuery("#messages");
  var newMessage = messages.children("li:last-child");
  //Heights
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  // The user has to be really close to the end for this to work
  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

// When we first connected to the server, right away we want to emit an event which is going to start
// the process of joining a room
// socket.io has built in support for the idea of rooms, (these isolated areas where only certain peope // can listen and emit events )
socket.on("connect", function() {
  var params = jQuery.deparam(window.location.search);
  // starts the process on emitting join
  socket.emit("join", params, function(err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("No error");
    }
  });
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("updateUserList", function(users) {
  var ul = jQuery("<ul></ul>");

  users.forEach(function(user) {
    ul.append(jQuery("<li></li>").text(user));
  });

  jQuery("#users").html(ul);
});

socket.on("newMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("hh:mm a");
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery("#messages").append(html);
  scrollToBottom();
});

// jQuery("#messages").append(html);

// var formattedTime = moment(message.createAt).format("hh:mm a");

// console.log("New message: ", message);
// var li = jQuery("<li></li>");
// li.text(`${message.from} ${formattedTime}: ${message.text}`);

// jQuery("#messages").append(li);

socket.on("newLocationMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("hh:mm a");
  var template = jQuery("#location-message-template").html();

  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery("#messages").append(html);
  scrollToBottom();
});
/*
var formattedTime = moment(message.createdAt).format("hh:mm a");

  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr("href", message.url);
  li.append(a);
  jQuery("#messages").append(li);
  */

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();

  var messageTextbox = jQuery("[name=message]");

  socket.emit(
    "createMessage",
    {
      text: messageTextbox.val()
    },
    function() {
      messageTextbox.val("");
    }
  );
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }

  locationButton.attr("disabled", "disabled").text("Sending location...");

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr("disabled").text("Send location");

      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationButton.removeAttr("disabled").text("Send location");
      alert("Unable to fetch location.");
    }
  );
});
