const socket = io.connect()

function renderProducts({response: response}) {
    const prod = document.getElementById("productos");
    
    prod.innerHTML = ejs.render(
      `
        <div class='row g-3'>
            <div class='col-6'>
                <table class='table table-bordered table-dark'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                    <% if(response){ %>
                        <%response.forEach(function(producto) {%>
                            <tr>
                                <td>
                                    <%=producto.title%>
                                </td>
                                <td>
                                    <%=producto.price%>
                                </td>
                                <td><img width="50" src=<%=producto.thumbnail%> alt="not found"></td>
                            </tr>
                        <%});%>
                        <% } else{ %>
                            <tr>
                                <td colspan="3">No se encontraron productos</td>
                            </tr>
                        <% } %>
                    </tbody>    
                </table>
            </div>
        </div>
      `, {response: response}
    );
  }
  
  socket.on("productos", response => {
    renderProducts({response});
  });

  const saveProd = document.getElementById('saveProd')
  console.log(saveProd, 'saveprod')
  saveProd.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: saveProd[0].value,
        price: saveProd[1].value,
        thumbnail: saveProd[2].value
    }
    console.log(producto,'producto')
    socket.emit('save', producto)
    saveProd.reset()
  })

 //----------------------------------------------------------------------------------------------------------------- //

  const chat = document.getElementById('formChat')
  chat.addEventListener('submit', e => {
    e.preventDefault()

    const msj = { 
        name: chat[0].value, 
        text: chat[1].value
    }
    console.log(msj,'msj')
    socket.emit('newMessage', msj)
    chat.reset()
  })

  function renderChat(msj) {
    if(msj){
        return msj.map(elm => {
            return (`
                <b>${msj.message.name}</b>
                [<span>${msj.message.fyh}</span>]:
                <i>${msj.message.text}</i>
            `)
        }).join('</br>')
    }
    return `<span>No hay mensajes</span>`
  }

  socket.on('chat', msj => {
    const html = renderChat(msj)
    document.getElementById('chatMessage').innerHTML = html
  })