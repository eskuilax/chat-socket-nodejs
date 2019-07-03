const socket = io();

let message = document.getElementById('mensaje');
let nick = document.getElementById('nick');
let btnEnviar = document.getElementById('btn_enviar');
let output = document.getElementById('output');
let action = document.getElementById('action');

btnEnviar.addEventListener('click', ()=>{
console.log('click');
socket.emit('chat:message',{
    username: nick.value,
    message: message.value
});
});

socket.on('chat:message', (data)=>{
    console.log(data);
action.innerHTML = '';
output.innerHTML += `<p>
<strong> ${data.username} </strong>: ${data.message}
</p>`
});

message.addEventListener('keypress', ()=>{
  socket.emit('chat:typing',  nick.value);
});

socket.on('chat:typing', (data)=>{
action.innerHTML =  `<p><em>${data}esta escribiendo...</em></p>`;
});