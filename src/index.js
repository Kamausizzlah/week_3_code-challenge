// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const url = ('https://json-server-code-challenge-3.onrender.com/');
    const description = document.getElementById('film-info')
    const movieList = document.getElementById('films');
    const poster = document.getElementById('poster');
    const ticket = document.getElementById('buy-ticket')
    const title = document.getElementById('title');
    const runTime = document.getElementById('runtime');
    const showTime = document.getElementById('showtime');
    const availableTickets = document.getElementById('ticket-num');
    function fetchMovie() {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(film => {
                const title = document.createElement('li')
                title.style.cursor = 'pointer'
                title.textContent = film.title
                title.id=film.id
                title.className = 'film item'
                if ((film.capacity - film.tickets_sold) == 0) {
                    title.classList.add('sold-out')
                }
                movieList.appendChild(title)
                displayFilm(film)
        
            })
        })   

    }
    function displayFilm(movie){
        const name= document.getElementById(movie.id)
        name.addEventListener('click', () => {
            title.textContent = movie.title;
            poster.src = movie.poster;
            runtime.textContent = `${movie.runtime} Minutes`;
            showTime.textContent = movie.showtime
            availableTickets.textContent = movie.capacity - movie.tickets_sold;
            description.textContent = movie.description;
            buyTickets(movie)
        })
    }
    function buyTickets(movie) {
        ticket.onclick= ()=>{
            if(availableTickets.textContent >0){
                availableTickets.textContent--
                movie.tickets_sold++
                if (availableTickets.textContent == 0){
                    document.getElementById(movie.id).classList.add("sold-out")
                    ticket.textContent = 'Sold-Out'
                    
                }
                else{
                    ticket.textContent = 'Buy Tickets'
                } 
                fetch(`${url}/${movie.id}`,{
                    method : 'PATCH',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({tickets_sold : movie.tickets_sold})
                }).then(res=>res.json())
                .then(data=>{
                    availableTickets.textContent=data.capacity - data.tickets_sold
                    if (availableTickets.textContent == 0){
                        document.getElementById(data.id).classList.add("sold-out")
                        ticket.textContent = 'Sold-Out'
                        
                    }
                    else{
                        ticket.textContent = 'Buy Tickets'
                    } 

                })

            }
          
        }
    }


    fetchMovie()
})