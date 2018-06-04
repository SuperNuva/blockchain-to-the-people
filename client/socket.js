import io from 'socket.io-client';
import store from './store';
// import { postVote }  from './store/election';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Front end socket connected!');

  socket.on('newVote', function (data) {
    socket.broadcast.emit('newVote', data);
    console.log('triggered in socket! Here is data: ', data);
  });

});


export default socket;
