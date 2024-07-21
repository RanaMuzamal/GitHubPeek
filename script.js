const userNameInput=document.querySelector('#userName');
const showDetailsBtn=document.querySelector('#showDetails');
const profileInfoDiv=document.querySelector('#profileInfo');
const reposInfoDiv=document.querySelector('#reposInfo');


//fetch and show user info in a card
showDetailsBtn.addEventListener('click',async()=>{
  const userName = userNameInput.value;
  //fetch data of user from github server & resolving it because fetch will return a promise
  const res=await fetch(`https://api.github.com/users/${userName}`)
  const data=await res.json();
  showProfile(data)
  showReposInfo(userName);

});

 function showProfile(data){
    // console.log(data);
     
    // show data in a card
    profileInfoDiv.innerHTML=`<div class="card">
    <div class="card-img">
       <img src=${data.avatar_url} alt=${data.name}>
    </div>
    <div class="card-body">
       <div class="card-title">${data.name}</div>
       <div class="card-subHeading">${data.login}</div>
       <div class="card-text">
        <p>${data.bio}</p>
        <p>${data.followers} followers ${data.following} folloing</p>

        <button>
        <a href=${data.html_url}>Do Checkout Profile</a>
        </button>

       </div>
    </div>
  </div>`


  };

  

// function to show repos of user
async function showReposInfo(userName) {
  const res = await fetch(`https://api.github.com/users/${userName}/repos`)
  const projects = await res.json();
  
  for (let i = 0; i < projects.length; i++) {
      reposInfoDiv.innerHTML += `<div class="card">
              <div class="card-body">
                  <div class="card-title">${projects[i].name}</div>
                  <div class="card-subHeading">${projects[i].language}</div>
                  <div class="card-text">
                      <button>
                          <a href=${projects[i].html_url}>
                              Do checkout Project
                          </a>
                      </button>
                  </div>
              </div>
          </div>`
  }
}