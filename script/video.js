function getTimeString(time) {
    const totalSec = Number(time);
    const hour = parseInt(time/3600);
    let remainingSec = time%3600;
    const minute = parseInt(remainingSec / 60);
    remainingSec = remainingSec % 60;
    return `${hour} h ${minute} m ${remainingSec} s ago`;
}


const loadDetails = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
}

const displayDetails = (video) => {
  const detailContainer = document.getElementById('modal-content');
  detailContainer.innerHTML = `
  <img src=${video.thumbnail}/>
  <p>${video.description}</p>
  `

  // way 1:
  // document.getElementById('showModalData').click();

  // way 2:
  document.getElementById('my_modal_1').showModal();
}


const loadCategories = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await res.json();
    displayCategories(data.categories);
  }
  catch(error) {
    console.error("Error fetching Categories data");
  }
}

// create display categories button
const displayCategories = async (category) => {
  const categoryContainer = document.getElementById('category');

  category.forEach( (item) => {
    const btn = document.createElement("button");
    btn.classList = "btn";
    btn.innerHTML = `
    ${item.category}
    `

    // add the button to the category container
    categoryContainer.append(btn);
  })
}



const loadVideo = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await res.json();
    console.log(data.videos)
    displayVideos(data.videos)
  }
  catch(error) {
    console.error("Error fetching videos data");
  }
}

const displayVideos = (videoss) => {
  const videoContainer = document.getElementById('videos');

  videoss.forEach( video => {
    console.log(video)
    const card = document.createElement("div");
    card.classList = "card card-compact rounded-lg";
    card.innerHTML = `
    <figure class="relative h-[200px]">
    <img 
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length == 0? "" : `<span class="absolute right-2 bottom-2 bg-black text-xs text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`}
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
    </div>
    <div class="flex flex-col gap-1">
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex gap-2 items-center">
        <p class="text-gray-400">${video.authors[0].profile_name}</p>
        ${video.authors[0].verified ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ""}
    </div>
    <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
    </div>
  </div>
    `

    videoContainer.append(card)
  })
}



loadCategories();
loadVideo();